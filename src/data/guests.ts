export interface Guest {
  id: number;
  name: string;         // Display name (Sinhala or English)
  email: string;
  phone: string;
  relationship: string; // e.g. 'family', 'friend', 'colleague'
}

export const guests: Guest[] = [
  {
    id: 1,
    name: 'පංකජ බාලසූරිය',
    email: 'pankajabalasooriya566@gmail.com',
    phone: '',
    relationship: 'family',
  },
];
