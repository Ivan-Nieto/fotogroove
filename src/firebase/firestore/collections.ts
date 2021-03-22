import { firestore } from '../init';
import firebase from 'firebase/app';

export const addCollection = async (name: string, uid: string) => {
  try {
    await firestore
      .collection('users')
      .doc(uid)
      .collection('collections')
      .add({
        name: name || 'name',
        images: [],
        protected: false,
      });

    return {
      error: false,
      message: 'DONE',
    };
  } catch (error) {
    return {
      error: true,
      message: 'Unexpected error',
    };
  }
};

export const getCollections = async (
  uid: string
): Promise<{
  error: boolean;
  empty: boolean;
  message: string;
  collections?: Array<any>;
}> =>
  firestore
    .collection('users')
    .doc(uid)
    .collection('collections')
    .get()
    .then((snapshot) => {
      if (snapshot.empty)
        return {
          error: false,
          empty: true,
          message: 'No collections found',
        };

      const collections = snapshot.docs.map((e) => ({
        ...e.data(),
        docId: e.id,
      }));

      return {
        error: false,
        empty: false,
        message: 'DONE',
        collections,
      };
    })
    .catch(() => ({
      error: true,
      empty: true,
      message: 'Failed to get collections',
    }));

export const updateCollectionsImages = async (
  userUid: string,
  collectionUid: string,
  {
    imagesToAdd,
    imagesToRemove,
    images,
  }: { imagesToAdd?: string[]; imagesToRemove?: string[]; images: string[] }
): Promise<{
  error: boolean;
}> => {
  // Add new images
  let newImages = images.concat(imagesToAdd || []);

  // Remove necessary images
  newImages = newImages.filter((e) => !(imagesToRemove || []).includes(e));

  try {
    await firestore
      .collection('users')
      .doc(userUid)
      .collection('collections')
      .doc(collectionUid)
      .update({
        images: newImages || [],
      });

    return {
      error: false,
    };
  } catch (error) {
    return {
      error: true,
    };
  }
};

export const addRemoveImageFromCollections = async (
  userUid: string,
  imageUid: string,
  {
    addToCollections,
    removeFromCollections,
  }: { addToCollections?: string[]; removeFromCollections?: string[] }
): Promise<{
  error: boolean;
}> => {
  if (
    (!addToCollections || addToCollections.length === 0) &&
    (!removeFromCollections || removeFromCollections.length === 0)
  )
    return {
      error: false,
    };

  const dbRef = firestore
    .collection('users')
    .doc(userUid)
    .collection('collections');

  // Create update queries
  const batch = firestore.batch();

  (addToCollections || []).forEach((e) => {
    batch.update(dbRef.doc(e), {
      images: firebase.firestore.FieldValue.arrayUnion(imageUid),
    });
  });

  (removeFromCollections || []).forEach((e) => {
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
