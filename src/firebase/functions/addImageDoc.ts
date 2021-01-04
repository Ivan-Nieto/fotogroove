import { functions } from "../init";

const addImageDoc = async (data: any) => {
  const addImageDocFunc = functions.httpsCallable("addImageDoc");
  return addImageDocFunc(data).catch((error: any) => ({
    error: true,
    err: error,
  }));
};

export default addImageDoc;
