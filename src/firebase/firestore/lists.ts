import { firestore } from '../init';
import firebase from 'firebase/app';

export const addRemove = async (
  userUid: string,
  imageUid: string,
  { addToLists, removeFromLists }: { addToLists?: string[]; removeFromLists?: string[] },
  col: string
): Promise<{
  error: boolean;
}> => {
  if ((!addToLists || addToLists.length === 0) && (!removeFromLists || removeFromLists.length === 0))
    return {
      error: false,
    };

  const dbRef = firestore.collection('users').doc(userUid).collection(col);

  // Create update queries
  const batch = firestore.batch();

  (addToLists || []).forEach((e) => {
    batch.update(dbRef.doc(e), {
      images: firebase.firestore.FieldValue.arrayUnion(imageUid),
    });
  });

  (removeFromLists || []).forEach((e) => {
    batch.update(dbRef.doc(e), {
      images: firebase.firestore.FieldValue.arrayRemove(imageUid),
    });
  });

  try {
    await batch.commit();
    return {
      error: false,
    };
  } catch (error) {
    return {
      error: true,
    };
  }
};

export const addRemoveImageFromCollection = (
  userUid: string,
  imageUid: string,
  { addToLists, removeFromLists }: { addToLists?: string[]; removeFromLists?: string[] }
) => {
  return addRemove(userUid, imageUid, { addToLists, removeFromLists }, 'collections');
};

export const addRemoveImageFromLists = async (
  userUid: string,
  imageUid: string,
  { addToLists, removeFromLists }: { addToLists?: string[]; removeFromLists?: string[] }
): Promise<{
  error: boolean;
}> => {
  return addRemove(userUid, imageUid, { addToLists, removeFromLists }, 'lists');
};
