import { firestore } from '../init';

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
