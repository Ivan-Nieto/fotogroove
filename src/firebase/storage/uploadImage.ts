import { storage } from "../init";
import addImageDocFunc from "../functions/addImageDoc";
import cuid from "cuid";

const uploadImage = async (
  image: any,
  userId: string,
  handleProgress: (event: any) => void | undefined,
  handleComplete: () => void | undefined,
  handleError: () => void | undefined,
  documentData?: Record<string, any>
) => {
  const id = cuid().toString();
  const fileID = `${userId}${cuid().toString()}`;
  const ref = storage.ref(`images/${userId}/${id}`).child(fileID);
  const uploadTask = ref.put(image);

  uploadTask.on("state_changed", handleProgress, handleError, async () => {
    const thumbUrl = {
      portrait: {
        small: `images/${userId}/${id}/thumbs/${id}_200x300.jpg`,
        large: `images/${userId}/${id}/thumbs/${id}_300x200.jpg`,
      },
      landscape: {
        small: `images/${userId}/${id}/thumbs/${id}_300x450.jpg`,
        large: `images/${userId}/${id}/thumbs/${id}_450x300.jpg`,
      },
    };

    const uploadData = {
      ...documentData,
      url: await ref.getDownloadURL(),
      thumbUrl,
      metadata: await ref.getMetadata(),
    };
    await addImageDocFunc(uploadData);
    handleComplete();
  });
};

export default uploadImage;
