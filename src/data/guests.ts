export interface Guest {
  id: number;
  name: string;
  phone: string;
  gender: 'male' | 'female';
  inviteType: 'Individual' | 'Individual - Married' | 'Couple' | 'Family';
  count: number;
}

export const guests: Guest[] = [
  { id: 1,  name: 'පැතුම් පෙරේරා',      phone: '+94711234567', gender: 'male',   inviteType: 'Individual', count: 1 },
  { id: 2,  name: 'කුසුම් ද සිල්වා',    phone: '+94772234568', gender: 'female', inviteType: 'Couple',     count: 2 },
  { id: 3,  name: 'අසංක ප්‍රනාන්දු',    phone: '+94753234569', gender: 'male',   inviteType: 'Family',     count: 4 },
  { id: 4,  name: 'නිලන්ති විජේසිංහ',   phone: '+94704234570', gender: 'female', inviteType: 'Individual', count: 1 },
  { id: 5,  name: 'දිනේෂ් ගුණවර්ධන',   phone: '+94715234571', gender: 'male',   inviteType: 'Couple',     count: 2 },
  { id: 6,  name: 'චතුරිකා ජයසූරිය',   phone: '+94776234572', gender: 'female', inviteType: 'Family',     count: 5 },
  { id: 7,  name: 'රොහාන් අබේසිංහ',    phone: '+94757234573', gender: 'male',   inviteType: 'Individual', count: 1 },
  { id: 8,  name: 'සන්ධ්‍යා කුමාරි',    phone: '+94708234574', gender: 'female', inviteType: 'Couple',     count: 2 },
  { id: 9,  name: 'තරිඳු ලියනගේ',       phone: '+94719234575', gender: 'male',   inviteType: 'Individual', count: 1 },
  { id: 10, name: 'ඉෂානි කරුණාරත්න',   phone: '+94770234576', gender: 'female', inviteType: 'Family',     count: 3 },
];

export function getGuestByToken(token: string): Guest | null {
  try {
    const padded = token + '='.repeat((4 - (token.length % 4)) % 4);
    const decoded = atob(padded);
    const parts = decoded.split(':');
    if (parts[0] === 'w') {
      const id = parseInt(parts[1], 10);
      return guests.find(g => g.id === id) ?? null;
    }
  } catch {
    // invalid token
  }
  return null;
}
