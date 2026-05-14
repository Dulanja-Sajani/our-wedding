import { generateToken, buildRsvpUrl } from './tokenGenerator';

interface Guest {
  id: number;
  name: string;
  email: string;
  phone: string;
  relationship: string;
}

interface InvitationPayload {
  guestName: string;
  rsvpUrl: string;
  email: string;
  phone: string;
  type: 'email' | 'whatsapp' | 'both';
}

/**
 * Send email invitation via EmailJS or similar service
 * Make sure to set up your email service credentials
 */
export async function sendEmailInvitation(payload: InvitationPayload): Promise<boolean> {
  try {
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        to: payload.email,
        guestName: payload.guestName,
        rsvpUrl: payload.rsvpUrl,
      }),
    });
    return response.ok;
  } catch (error) {
    console.error('Email invitation error:', error);
    return false;
  }
}

/**
 * Send WhatsApp invitation via Twilio or similar service
 * Make sure to set up your WhatsApp business account
 */
export async function sendWhatsAppInvitation(payload: InvitationPayload): Promise<boolean> {
  try {
    const response = await fetch('/api/send-whatsapp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        phone: payload.phone,
        guestName: payload.guestName,
        rsvpUrl: payload.rsvpUrl,
      }),
    });
    return response.ok;
  } catch (error) {
    console.error('WhatsApp invitation error:', error);
    return false;
  }
}

/**
 * Send invitations to all guests
 */
export async function sendInvitationsToGuests(
  guests: Guest[],
  invitationType: 'email' | 'whatsapp' | 'both' = 'both',
  baseUrl?: string
): Promise<Map<number, boolean>> {
  const results = new Map<number, boolean>();

  for (const guest of guests) {
    try {
      const token = generateToken(guest.id, guest.email);
      const rsvpUrl = buildRsvpUrl(guest.id, guest.email, token, baseUrl);

      const payload: InvitationPayload = {
        guestName: guest.name,
        rsvpUrl,
        email: guest.email,
        phone: guest.phone,
        type: invitationType,
      };

      let success = false;

      if (invitationType === 'email' || invitationType === 'both') {
        success = await sendEmailInvitation(payload);
      }

      if ((invitationType === 'whatsapp' || invitationType === 'both') && success) {
        success = await sendWhatsAppInvitation(payload);
      }

      results.set(guest.id, success);
    } catch (error) {
      console.error(`Error sending invitation to ${guest.name}:`, error);
      results.set(guest.id, false);
    }
  }

  return results;
}
