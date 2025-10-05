// Guest Data - Easy to update!
// To add Name 2: just add it after the comma: name2: "Partner Name"
// To add new guests: copy a line and update the code, name1, and optionally name2

export interface GuestData {
  code: string;
  name1: string;
  name2?: string; // Optional second name (plus-one, partner, etc.)
}

export const guestList: GuestData[] = [
  { code: "MZCWJ9", name1: "Sara", name2: "Juan" },
    { code: "BA1U6E", name1: "Julian" },
    { code: "5N4U7M", name1: "Marisa", name2: "Juan Antonio" },
    { code: "1LXCD2", name1: "Jorge", name2: "Elena" },
    { code: "OUB2BB", name1: "Sergio", name2: "+1" },
    { code: "QSP0G6", name1: "David", name2: "Linda" },
    { code: "K9BB5C", name1: "Sadie" },
    { code: "Z3CEPN", name1: "Belli" },
    { code: "H36LEU", name1: "Zule", name2: "Mario" },
    { code: "EXQPGP", name1: "Andrea Gomez" },
    { code: "6S2D45", name1: "Silvia", name2: "Edgar" },
    { code: "61IINO", name1: "Sandra", name2: "Oscar" },
    { code: "706QKZ", name1: "Alichicki", name2: "Johnny" },
    { code: "BQKJO3", name1: "Alicia Ramon", name2: "Gonzalo" },
    { code: "U5LEOM", name1: "Kike" },
    { code: "EDNQNO", name1: "Laura", name2: "Sergio" },
    { code: "09JGP1", name1: "AiNoah", name2: "Jorge" },
    { code: "R4UV0Y", name1: "Amelia", name2: "Manu" },
    { code: "TFH2DO", name1: "Carmen", name2: "Tamara" },
    { code: "TUGDM2", name1: "Alberto", name2: "+1" },
    { code: "TN576T", name1: "Juan", name2: "+1" },
    { code: "W129QJ", name1: "Patri", name2: "Adri" },
    { code: "3B471E", name1: "Leti", name2: "Pablo" },
    { code: "3E1R4Q", name1: "Belen" },
    { code: "YV2OHH", name1: "Laura", name2: "Chris" },
    { code: "4WJ2HF", name1: "Chris", name2: "Chris" },
    { code: "T3OEFJ", name1: "Chris (lawyer)", name2: "Jesus" },
    { code: "OSNPSB", name1: "Ali", name2: "+1" },
    { code: "W62KHH", name1: "Mar", name2: "+1" },
    { code: "XU2VFW", name1: "Menchi" },
    { code: "IM5BZ8", name1: "Marta", name2: "+1" },
    { code: "Y2IXVM", name1: "Vega", name2: "+1" },
    { code: "HQGMTC", name1: "Irene", name2: "Moncho" },
    { code: "RBDC70", name1: "Monica", name2: "Adri" },
    { code: "88T6ZA", name1: "Raquel" },
    { code: "T1V3RK", name1: "Diego" },
    { code: "T29JM3", name1: "Elena", name2: "Roberto" },
    { code: "9YLBZ3", name1: "Rafa", name2: "+1" },
    { code: "NMR5B6", name1: "Julia" },
    { code: "YAGYBA", name1: "Christina" },
    { code: "3219CI", name1: "Janina" },
    { code: "VRKBZZ", name1: "Michaela" },
    { code: "82KXHG", name1: "Roger" },
    { code: "CDYJEA", name1: "Ray", name2: "Monique" },
    { code: "VZMTBU", name1: "Jana", name2: "Jouri" },
    { code: "0PK8OA", name1: "Chris", name2: "+1" },
    { code: "NNFD42", name1: "Niklas", name2: "Vanessa" },
    { code: "VW32ZI", name1: "David" },
    { code: "YCCRTP", name1: "Alex", name2: "Gabie" },
    { code: "Z5IJ2H", name1: "Mateusz", name2: "+1" },
    { code: "UOKQ21", name1: "Philipp", name2: "Cara" },
  { code: "LMT3H3", name1: "Lena" }
];

// Helper function to get guest data by code
export const getGuestByCode = (code: string): GuestData | undefined => {
  return guestList.find(guest => guest.code === code);
};

// Helper function to get display name (Name 1 + Name 2 if exists)
export const getDisplayName = (guest: GuestData): string => {
  return guest.name2 ? `${guest.name1} & ${guest.name2}` : guest.name1;
};
