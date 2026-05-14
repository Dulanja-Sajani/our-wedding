/**
 * Generate a unique token for each guest
 * Used to create personalized RSVP links
 */
export function generateToken(guestId: number, guestEmail: string): string {
  // Create a simple but unique token using base64 encoding
  const data = `${guestId}:${guestEmail}:${Date.now()}`;
  return Buffer.from(data).toString('base64').replace(/=/g, '');
}

/**
 * Decode token to extract guest info
 */
export function decodeToken(token: string): { guestId: number; guestEmail: string } | null {
  try {
    // Add padding if needed
    const padded = token + '='.repeat((4 - (token.length % 4)) % 4);
    const decoded = Buffer.from(padded, 'base64').toString('utf-8');
    const [guestIdStr, guestEmail] = decoded.split(':');
    const guestId = parseInt(guestIdStr, 10);
    if (!isNaN(guestId)) {
      return { guestId, guestEmail };
    }
  } catch (error) {
    console.error('Token decode error:', error);
  }
  return null;
}

/**
 * Build personalized RSVP URL for a guest
 */
export function buildRsvpUrl(guestId: number, guestEmail: string, token: string, baseUrl: string = window.location.origin): string {
  return `${baseUrl}?guest=${token}&name=${encodeURIComponent(guestEmail.split('@')[0])}`;
}
