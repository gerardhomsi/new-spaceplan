"use client";

import { useState } from "react";
import { addProject, updateProject } from "@/lib/actions";

import ImageUpload from "@/components/ImageUploader/ImageUploader";

const ProjectForm = ({ project }) => {
  const isEditing = !!project;

  const [formData, setFormData] = useState(!!project ? project : { projectName: "", location: "", description: "", downloadUrls: [] });

  const handleChange = (event) => setFormData({ ...formData, [event.target.name]: event.target.value });

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      console.log("AAAAAAAAAAAAhandleSubmit formData", formData);
      const combinedData = { ...formData }; // No need to spread again

      if (isEditing) await updateProject(combinedData);
      else await addProject(combinedData);
    } catch (err) {
      console.error("Error submitting project:", err);
      // Handle errors (e.g., display an error message to the user)
    } finally {
      // You can optionally add logic here to handle post-submission actions
      // such as redirecting the user
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl mb-4 text-center font-semibold">{isEditing ? "Edit Project" : "Add New Project"}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" placeholder="Project Name" name="projectName" value={formData.projectName} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" />
          <input type="text" placeholder="Location" name="location" value={formData.location} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" />
          <textarea name="description" id="description" rows="6" placeholder="Description" value={formData.description} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" />
          <ImageUpload droppedImages={formData.downloadUrls} setDroppedImages={setFormData} />
          <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
            {isEditing ? "Update Project" : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProjectForm;
