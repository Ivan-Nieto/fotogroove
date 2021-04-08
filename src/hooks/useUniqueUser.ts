import { useEffect } from 'react';
import firebase from 'firebase/app';
import cuid from 'cuid';

const useUniqueUser = () => {
  useEffect(() => {
    try {
      if (!window.localStorage) return;

      // Check if user is returning
      const isReturning = Boolean(window.localStorage.getItem('fotogroove-unique-visit'));
      if (Boolean(isReturning)) return;

      const visitId = cuid();
      // Report visit
      firebase
        .firestore()
        .collection('uniqueVisits')
        .doc(visitId)
        .set({
          date: firebase.firestore.Timestamp.now(),
          id: visitId,
        })
        .catch(() => {});

      window.localStorage.setItem('fotogroove-unique-visit', visitId);
    } catch (error) {}
  }, []);
};

export default useUniqueUser;
