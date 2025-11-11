import {
  getStorage,
  ref,
  uploadString,
  getDownloadURL,
} from "firebase/storage";

export const uploadImage = async (
  url: string,
  userId: string,
  name: string
): Promise<string | undefined> => {
  try {
    const storage = getStorage();
    const imageRef = ref(storage, userId + `/${name}`);
    await uploadString(imageRef, url, "data_url");
    return await getDownloadURL(imageRef).then((downloadURL) => {
      return downloadURL;
    });
  } catch (error) {
    console.error(`Error uploading iamge: ${name}: `, error);
    throw error;
  }

  //   return undefined;
};
