// utils/uploadImages.js
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage } from "@/firebase/firebase-config";

export const uploadImages = async (imageFiles, projectName) => {
  const downloadUrls = [];

  for (let i = 0; i < imageFiles.length; i++) {
    const imageFile = imageFiles[i];
    const filePath = `${projectName}/${Date.now()}${imageFile.name}`;
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
