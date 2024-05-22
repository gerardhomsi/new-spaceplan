"use client";

import Link from "next/link";
import { useProjectForm } from "./useProjectForm";
import ImageUpload from "@/components/ImageUploader/ImageUpload";

const ProjectForm = ({ project, action }) => {
  const { isEditing, formRef, imageFiles, isUploading, setImageFiles, handleFormSubmit, handleImageFiles } = useProjectForm({ project, action });

  const disabledButtonClass = "bg-slate-600 w-full text-white py-2 px-4 rounded-md";
  const enabledButtonClass = "w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600";
  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-center">
      <div className="bg-white p-8 my-2 rounded-lg shadow-md max-w-lg">
        <h2 className="text-2xl mb-4 text-center font-semibold">{isEditing ? "Edit Project" : "Add New Project"}</h2>
        <form ref={formRef} onSubmit={handleFormSubmit} className="space-y-4">
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
          {!isEditing && <ImageUpload onImageFilesChange={handleImageFiles} imageFiles={imageFiles} setImageFiles={setImageFiles} />}
          <button disabled={isUploading} type="submit" className={`${isUploading ? disabledButtonClass : enabledButtonClass}`}>
            {isUploading ? "Uploading..." : isEditing ? "Update Project" : "Submit"}
          </button>
        </form>
        {!isEditing && (
          <Link href={"/projects"}>
            <button className="bg-blue-950 rounded text-white p-2 mt-3">Projects</button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default ProjectForm;
