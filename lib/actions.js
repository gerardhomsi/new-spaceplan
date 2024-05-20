"use server";

import { revalidatePath } from "next/cache";

import connectToDB from "./mongoDB";
import Project from "./models/project";
import { redirect } from "next/navigation";

export const addProject = async (formData) => {
  try {
    console.log("formData", formData);

    const { projectName, location, description, downloadUrls } = Object.fromEntries(formData);
    connectToDB();

    const newProject = new Project({ projectName, location, description, downloadUrls });

    await newProject.save();
  } catch (err) {
    console.log(err);
    throw new Error("Failed to create product!");
  }

  revalidatePath("/projects");
};

export const updateProject = async (formData) => {
  try {
    console.log("formData", formData);
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
