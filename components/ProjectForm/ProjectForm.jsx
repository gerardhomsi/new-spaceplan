// "use client";

// import Link from "next/link";
// import { useProjectForm } from "./useProjectForm";
// import ImageUpload from "@/components/ImageUploader/ImageUpload";

// const ProjectForm = ({ project, action }) => {
//   const { isEditing, formRef, imageFiles, isUploading, handleFormSubmit, handleImageFiles } = useProjectForm({ project, action });

//   const disabledButtonClass = "bg-slate-600 w-full text-white py-2 px-4 rounded-md";
//   const enabledButtonClass = "w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600";
//   console.log("INSIDE PROJECTFORM", imageFiles);
//   return (
//     <div className="bg-gray-100 min-h-screen flex justify-center items-center">
//       <div className="bg-white p-8 my-2 rounded-lg shadow-md max-w-lg">
//         <h2 className="text-2xl mb-4 text-center font-semibold">{isEditing ? "Edit Project" : "Add New Project"}</h2>
//         <form ref={formRef} onSubmit={handleFormSubmit} className="space-y-4">
//           <input type="text" placeholder="Project Name" name="projectName" defaultValue={isEditing ? project.projectName : ""} required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" />
//           <input type="text" placeholder="Location" name="location" defaultValue={isEditing ? project.location : ""} required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" />
//           <textarea
//             required
//             name="description"
//             id="description"
//             rows="6"
//             placeholder="Description"
//             defaultValue={isEditing ? project.description : ""}
//             className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
//           />
//           {!isEditing && <ImageUpload onImageFilesChange={handleImageFiles} imageFiles={imageFiles} />}
//           <button disabled={isUploading} onClick={() => console.log("=========================================================")} type="submit" className={`${isUploading ? disabledButtonClass : enabledButtonClass}`}>
//             {isUploading ? "Uploading..." : isEditing ? "Update Project" : "Submit"}
//           </button>
//         </form>
//         {!isEditing && (
//           <Link href={"/projects"}>
//             <button className="bg-blue-950 rounded text-white p-2 mt-3">Projects</button>
//           </Link>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ProjectForm;

"use client";

import { uploadImages } from "@/lib/utils/uploadImages";
import Link from "next/link";
import { useRef, useState } from "react";

const ProjectForm = ({ project, action }) => {
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
            <button className="bg-blue-950 rounded text-white p-2 mt-3">Projects</button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default ProjectForm;
