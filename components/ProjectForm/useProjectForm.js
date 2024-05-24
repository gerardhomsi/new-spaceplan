"use client";

import { uploadImages } from "@/lib/utils/uploadImages";
import { useRef, useState } from "react";

export const useProjectForm = ({ project, action }) => {
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

  const handleImageFiles = (files) => {
    setImageFiles(files);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    await handleProjectFormSubmit(new FormData(formRef.current), action, isEditing);
    setImageFiles([]);
    console.log("USEPROJECTFORM inside handleformsubmit", imageFiles);
  };

  return {
    isEditing,
    formRef,
    imageFiles,
    isUploading,
    setImageFiles,
    handleFormSubmit,
    handleImageFiles,
  };
};
