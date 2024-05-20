"use client";

import { useState } from "react";

import ImageUpload from "@/components/ImageUploader/ImageUploader";

const ProjectForm = ({ project, action }) => {
  const isEditing = !!project;

  const formAction = action ? action : "#";
  const [droppedImages, setDroppedImages] = useState(!!project ? project.downloadUrls : []);

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl mb-4 text-center font-semibold">{isEditing ? "Edit Project" : "Add New Project"}</h2>
        <form action={formAction} className="space-y-4">
          <input type="text" placeholder="Project Name" name="projectName" defaultValue={isEditing ? project.projectName : ""} required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" />
          <input type="text" placeholder="Location" name="location" defaultValue={isEditing ? project.location : ""} required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" />
          <textarea
            required
            name="description"
            id="description"
            rows="6"
            placeholder="Description"
            defaultValue={isEditing ? project.description : ""}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
          <ImageUpload droppedImages={droppedImages} setDroppedImages={setDroppedImages} />
          <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
            {isEditing ? "Update Project" : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProjectForm;
