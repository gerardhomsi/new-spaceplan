import { uploadImages } from "@/lib/utils/uploadImages";
import { useState, useRef } from "react";

export const useProjectForm = (action, project) => {
  const isEditing = !!project;
  const formRef = useRef(null);
  const [imageFiles, setImageFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  const handleProjectFormSubmit = async (formData, action, isEditing) => {
    setIsUploading(true);
    try {
      const projectName = formData.get("projectName");
      const downloadUrls = await uploadImages(imageFiles, projectName);

      formData.append("downloadUrls", JSON.stringify(downloadUrls));
      if (isEditing) {
        formData.append("id", project._id);
      }
      await action(formData);
      if (!isEditing) {
        formRef.current.reset();
      }
    } catch (error) {
      console.error("Error submitting project form:", error);
      alert("An error occurred while submitting the project. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    await handleProjectFormSubmit(new FormData(formRef.current), action, isEditing);
    setImageFiles([]);
  };

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
  return { isEditing, isUploading, formRef, imageFiles, handleFormSubmit, fileHandler, deleteFile };
};

export default useProjectForm;
