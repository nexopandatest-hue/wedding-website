import { 
  doc, 
  setDoc, 
  getDoc, 
  serverTimestamp 
} from 'firebase/firestore';
import { db } from './firebase';

export interface RSVPData {
  guestCode: string;
  attending: 'yes' | 'no';
  bringingPlusOne?: boolean;
  plusOneName?: string;
  allergies?: string;
  transportation?: 'car' | 'bus';
  email?: string;
  message?: string;
  submittedAt: any; // Firestore timestamp
}

// Save RSVP to Firestore
export const saveRSVP = async (rsvpData: Omit<RSVPData, 'submittedAt'>): Promise<void> => {
  try {
    const rsvpRef = doc(db, 'rsvps', rsvpData.guestCode);
    await setDoc(rsvpRef, {
      ...rsvpData,
      submittedAt: serverTimestamp()
    });
    console.log('RSVP saved successfully');
  } catch (error) {
    console.error('Error saving RSVP:', error);
    throw error;
  }
};

// Check if RSVP already exists
export const checkExistingRSVP = async (guestCode: string): Promise<RSVPData | null> => {
  try {
    const rsvpRef = doc(db, 'rsvps', guestCode);
    const rsvpSnap = await getDoc(rsvpRef);
    
    if (rsvpSnap.exists()) {
      return rsvpSnap.data() as RSVPData;
    }
    return null;
  } catch (error) {
    console.error('Error checking existing RSVP:', error);
    return null;
  }
};
