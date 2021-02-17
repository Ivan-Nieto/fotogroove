import { firestore } from "../init";
import { storage } from "../init";

export const runImageQuery = async (query: any) => {
  const snapshot: any = await query.get().catch((err: any) => {
    console.log(err);
    return { error: err };
  });

  if (snapshot.empty) return { error: true };

  if (snapshot.error) {
    console.error(snapshot.error);
    return snapshot;
  }

  const images = snapshot.docs?.map((doc: any) => {
    const data = doc.data();
    return { ...data, id: doc.id };
  });

  const promises: any = [];
  images?.forEach((e: Record<string, any>, index: number) => {
    Object.keys(e?.thumbUrl || {}).forEach((i) => {
      if (!e.thumbUrl[i] || e.thumbUrl[i].startsWith("http")) {
        return;
      }

      promises.push(
        storage
          .ref(e.thumbUrl[i])
          .getDownloadURL()
          .then((url: any) => {
            images[index].thumbUrl[i] = url;
            return url;
          })
          .catch()
      );
    });
  });
  await Promise.allSettled(promises);
  return { error: false, images };
};

export const getUsersImages = async (uid: string, lastEntry?: any) => {
  let query = firestore
    .collection("images")
    .where("author", "==", uid)
    .where("visibility", "==", "PUBLIC")
    .orderBy("rating", "desc")
    .orderBy("createDate", "desc")
    .limit(15);

  if (lastEntry)
    query = query.startAfter(lastEntry.rating, lastEntry.createDate);

  return runImageQuery(query);
};

export const getLatestImages = (lastEntry?: any) => {
  let query = firestore
    .collection("images")
    .where("visibility", "==", "PUBLIC")
    .orderBy("rating", "desc")
    .orderBy("createDate", "desc")
    .limit(15);

  if (lastEntry)
    query = query.startAfter(lastEntry.rating, lastEntry.createDate);

  return runImageQuery(query);
};

export const getDownloadURL = async (fileLocation: string) => {
  return storage
    .ref(fileLocation)
    .getDownloadURL()
    .then((url: any) => {
      return url;
    })
    .catch((error) => {
      return "";
    });
};
