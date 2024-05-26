"use client";

import Link from "next/link";
import useProjectForm from "./useProjectForm";

const ProjectForm = ({ project, action }) => {
  const { isEditing, isUploading, formRef, imageFiles, handleFormSubmit, fileHandler, deleteFile } = useProjectForm(action, project);

  const disabledButtonClass = "bg-slate-600 w-full text-white py-2 px-4 rounded-md";
  const enabledButtonClass = "w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600";
  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-center">
      <div className="bg-white p-8 my-2 rounded-lg shadow-md max-w-lg">
        <h2 className="text-2xl mb-4 text-center font-semibold">{isEditing ? "Edit Project" : "Add New Project"}</h2>
        <form ref={formRef} onSubmit={handleFormSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Project Name"
            name="projectName"
            defaultValue={isEditing ? project.projectName : ""}
            required
            className="w-full px-4 py-2 mb-2 border bg-slate-300 border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />

          <input type="text" placeholder="Location" name="location" defaultValue={isEditing ? project.location : ""} required className="w-full px-4 py-2 mb-2 border bg-slate-300 border-gray-300 rounded-md focus:outline-none focus:border-blue-500" />

          <textarea
            required
            name="description"
            id="description"
            rows="6"
            placeholder="Description"
            defaultValue={isEditing ? project.description : ""}
            className="w-full px-4 py-2 border border-gray-300 bg-slate-300 rounded-md focus:outline-none focus:border-blue-500"
          />

          {!isEditing && (
            <div className="flex items-center justify-between gap-4">
              <div>
                <input type="file" className="w-[12rem]" multiple onChange={fileHandler} />
                <p className="mr-auto text-sm">{imageFiles.length} file(s) selected</p>
              </div>
              <div className="pt-6 w-full">
                {imageFiles.length > 0 && (
                  <ul className="flex flex-col gap-1 max-h-52 overflow-y-auto">
                    {imageFiles.map((image, index) => (
                      <li className="flex items-center justify-between border p-1 gap-1" key={image.name}>
                        <span className="truncate max-w-xs overflow-hidden text-ellipsis">{image.name}</span>
                        <button type="button" className="bg-red-500 w-4 h-4 text-white rounded-full flex items-center justify-center" onClick={() => deleteFile(index)}>
                          X
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          )}
          <button disabled={isUploading} type="submit" className={`${isUploading ? disabledButtonClass : enabledButtonClass}`}>
            {isUploading ? "Uploading..." : isEditing ? "Update Project" : "Submit"}
          </button>
        </form>
        {!isEditing && (
          <Link href={"/projects"}>
            <button className="bg-blue-950 rounded hover:bg-blue-900 text-white p-2 mt-3">Projects</button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default ProjectForm;
