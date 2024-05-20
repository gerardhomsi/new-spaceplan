"use server";

import { revalidatePath } from "next/cache";

import connectToDB from "./mongoDB";
import Project from "./models/project";
import { redirect } from "next/navigation";

export const handleProjectSubmit = async (req, res) => {
  console.log("1111111111111111");
  console.log("formData", formData);

  try {
    console.log("33333333");
    // if (isEditing) {
    //   await updateProject({ _id: projectData._id, projectName, location, description, downloadUrls });
    //   console.log("Project updated successfully!");
    //   // Handle success scenario (confirmation message, etc.)
    //   res.status(200).json({ message: "Project updated successfully!" }); // Assuming you want to send a JSON response
    // } else {
    //   await addProject({ projectName, location, description, downloadUrls });
    //   console.log("Project created successfully!");
    //   // Handle success scenario (redirect, confirmation message, etc.)
    //   res.status(201).json({ message: "Project created successfully!" }); // Assuming you want to send a JSON response
    // }
  } catch (err) {
    console.error("Error creating/updating project:", err);
    res.status(500).json({ message: "Error creating/updating project!" }); // Send an error response
  }
};

export const addProject = async (formData) => {
  try {
    console.log("AAAAAAAAAAAAAAAAAAAAA formData", formData);
    const { projectName, location, description, downloadUrls } = Object.fromEntries(formData);
    connectToDB();

    const newProject = new Project({ projectName, location, description, downloadUrls });

    await newProject.save();
  } catch (err) {
    console.log("CCCCCCCCCCCCCCCC");
    console.log("BBBBBBBBBB", err);
    throw new Error("Failed to create product!");
  }

  revalidatePath("/projects");
};

export const updateProject = async (formData) => {
  try {
    console.log("updateProject formData", formData);
    const { _id, projectName, location, description, downloadUrls } = Object.fromEntries(formData);

    connectToDB();

    const updateFields = { projectName, location, description, downloadUrls };

    const updatedProject = await Project.findByIdAndUpdate(_id, updateFields);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to update product!");
  }

  revalidatePath("/projects");
  redirect("/projects");
};

// export const deleteProject = async (formData) => {
//   const { id } = Object.fromEntries(formData);

//   try {
//     connectToDB();
//     await Project.findByIdAndDelete(id);
//   } catch (err) {
//     console.log(err);
//     throw new Error("Failed to delete product!");
//   }

//   revalidatePath("/projects");
// };
