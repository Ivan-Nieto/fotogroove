import { firestore } from "../init";
import { storage } from "../init";

export const getImages = async (uid: string) => {
  try {
    const snapshot = await firestore
      .collection("images")
      .where("author", "==", uid)
      .get();

    if (snapshot.empty) return { error: false, empty: true };

    const images: any = [];
    await Promise.all(
      snapshot.docs.map(async (e) => {
        const data = e.data() || {};
        const thumbUrl = data?.thumbs || {};

        await Promise.all(
          Object.keys({ ...data?.thumbs?.landscape }).map(async (e) => {
            if (!data?.thumbs?.landscape?.large?.startsWith("http"))
              thumbUrl.landscape.large = await storage
                .ref(data?.thumbs?.landscape?.large)
                .getDownloadURL();

            if (!data?.thumbs?.landscape?.small?.startsWith("http"))
              thumbUrl.landscape.small = await storage
                .ref(data?.thumbs?.landscape.small)
                .getDownloadURL();
          })
        );

        await Promise.all(
          Object.keys({ ...data?.thumbs?.portrait }).map(async (e) => {
            if (!data?.thumbs?.portrait[e].large?.startsWith("http"))
              thumbUrl.portrait.large = await storage
                .ref(data?.thumbs?.portrait.large)
                .getDownloadURL();

            if (!data?.thumbs?.portrait?.small?.startsWith("http"))
              thumbUrl.portrait.small = await storage
                .ref(data?.thumbs?.portrait.small)
                .getDownloadURL();
          })
        );

        images.push(data);
      })
    );

    return { error: false, images };
  } catch (error) {
    return { error: true };
  }
};
