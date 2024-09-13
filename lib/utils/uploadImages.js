// utils/uploadImages.js
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage } from "@/firebase/firebase-config";
import { v4 as uuidv4 } from "uuid";

export const uploadImages = async (imageFiles, projectName) => {
  const downloadUrls = [];
  const projectUUID = uuidv4();

  for (let i = 0; i < imageFiles.length; i++) {
    const imageFile = imageFiles[i];
    const filePath = `${projectName}___${projectUUID}/${imageFile.name}_${Date.now()}`;
    const fileRef = ref(storage, filePath);
    await uploadBytesResumable(fileRef, imageFile);
    try {
      const url = await getDownloadURL(ref(storage, filePath));
      downloadUrls.push(url);
    } catch (error) {
      console.error(`Error getting download URL for ${filePath}:`, error);
    }
  }

  return new Promise((resolve) => resolve(downloadUrls));
};
