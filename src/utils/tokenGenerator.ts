export function generateToken(guestId: number): string {
  return btoa(`w:${guestId}`).replace(/=/g, '');
}

export function decodeToken(token: string): number | null {
  try {
    const padded = token + '='.repeat((4 - (token.length % 4)) % 4);
    const decoded = atob(padded);
    const parts = decoded.split(':');
    if (parts[0] === 'w') {
      const id = parseInt(parts[1], 10);
      if (!isNaN(id)) return id;
    }
  } catch {
    // invalid token
  }
  return null;
}

export function buildRsvpUrl(guestId: number, baseUrl = 'https://dulanja-sajani.github.io/our-wedding'): string {
  return `${baseUrl}/?guest=${generateToken(guestId)}`;
}
