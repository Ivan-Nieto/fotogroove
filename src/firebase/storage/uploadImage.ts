import { storage } from "../init";
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

  uploadTask.on("state_changed", handleProgress, handleError, () => {
    handleComplete();
  });
};

export default uploadImage;
