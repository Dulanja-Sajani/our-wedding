import { buildRsvpUrl } from './tokenGenerator';
import type { Guest } from '../data/guests';

interface InvitationPayload {
  guestName: string;
  rsvpUrl: string;
  phone: string;
}

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

export async function sendInvitationsToGuests(
  guests: Guest[],
  baseUrl?: string
): Promise<Map<number, boolean>> {
  const results = new Map<number, boolean>();

  for (const guest of guests) {
    try {
      const rsvpUrl = buildRsvpUrl(guest.id, baseUrl);

      const payload: InvitationPayload = {
        guestName: guest.name,
        rsvpUrl,
        phone: guest.phone,
      };

      const success = await sendWhatsAppInvitation(payload);
      results.set(guest.id, success);
    } catch (error) {
      console.error(`Error sending invitation to ${guest.name}:`, error);
      results.set(guest.id, false);
    }
  }

  return results;
}
