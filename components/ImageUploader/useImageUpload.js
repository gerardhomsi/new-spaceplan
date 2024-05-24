import { useState, useEffect } from "react";

const useImageUpload = (onImageFilesChange) => {
  const [imageFiles, setImageFiles] = useState([]);

  const fileHandler = (event) => {
    try {
      const files = Array.from(event.target.files);

      const newFiles = files.filter((file) => {
        const isDuplicate = imageFiles.some((imageFile) => imageFile.name === file.name && imageFile.type === file.type);
        if (isDuplicate) {
          alert("Image already selected");
        }
        return !isDuplicate;
      });
      setImageFiles((prevFiles) => [...prevFiles, ...newFiles]);
    } catch (error) {
      console.error("Error handling file input:", error);
      alert("An error occurred while processing the selected files. Please try again.");
    }
  };

  const deleteFile = (index) => {
    try {
      const updatedFiles = imageFiles.filter((_, i) => i !== index);
      setImageFiles(updatedFiles);
    } catch (error) {
      console.error("Error deleting file:", error);
      alert("An error occurred while deleting the file. Please try again.");
    }
  };

  useEffect(() => {
    try {
      onImageFilesChange(imageFiles);
    } catch (error) {
      console.error("Error in useEffect on imageFiles change:", error);
    }
  }, [imageFiles, onImageFilesChange]);
  console.log("USEEFECT INSIDE useImageUpload", imageFiles);

  return { imageFiles, fileHandler, deleteFile };
};

export default useImageUpload;
