import firebase from 'firebase/app';

// Delete image folder
export const deleteFolder = async (path: string) => {
  try {
    const ref = firebase.storage().ref(path);
    const directories = await ref.listAll();

    // Continue deleting sub folders
    directories.items.forEach((fileRef) => {
      deleteFile(ref.fullPath, fileRef.name);
    });

    // Delete files in this folder
    await Promise.all(
      directories.prefixes.map(async (folderRef) => {
        return deleteFolder(folderRef.fullPath).catch(console.error);
      })
    );
  } catch (error) {
    console.error(error);
  }
};

export const deleteFile = async (folderPath: string, fileName: string) => {
  const ref = firebase.storage().ref(folderPath);
  const childRef = ref.child(fileName);
  await childRef.delete().catch(console.error);
};
