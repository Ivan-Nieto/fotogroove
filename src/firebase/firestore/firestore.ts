import { firestore } from "../init";
import { storage } from "../init";

export const getUsersImages = async (uid: string) => {
  const snapshot: any = await firestore
    .collection("images")
    .where("author", "==", uid)
    .get()
    .catch(() => ({ error: true }));

  if (snapshot.empty) return { error: true };

  const images = snapshot.docs.map((doc: any) => {
    const data = doc.data();
    return data || {};
  });

  const promises: any = [];
  images.forEach((e: Record<string, any>, index: number) => {
    Object.keys(e?.thumbUrl || {}).forEach((i) => {
      Object.keys(e?.thumbUrl[i]).forEach((k: any) => {
        if (!e.thumbUrl[i][k] || e.thumbUrl[i][k].startsWith("http")) {
          return;
        }

        promises.push(
          storage
            .ref(e.thumbUrl[i][k])
            .getDownloadURL()
            .then((url: any) => {
              images[index].thumbUrl[i][k] = url;
              return url;
            })
            .catch((error) => {
              console.log(error);
            })
        );
      });
    });
  });
  await Promise.allSettled(promises);

  return { error: false, images };
};
