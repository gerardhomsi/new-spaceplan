"use server";

import { revalidatePath } from "next/cache";

import connectToDB from "./mongoDB";
import Project from "./models/project";
import { redirect } from "next/navigation";

export const addProject = async (formData) => {
  try {
    const projectName = formData.get("projectName");
    const location = formData.get("location");
    const description = formData.get("description");
    const downloadUrls = JSON.parse(formData.get("downloadUrls")); // Parse the download URLs from the formData

    connectToDB();

    const newProject = new Project({ projectName, location, description, downloadUrls });

    await newProject.save();
  } catch (err) {
    console.log(err);
    throw new Error("Failed to create project!");
  }

  revalidatePath("/projects");
};

export const updateProject = async (formData) => {
  const { id, projectName, location, description, downloadUrls } = Object.fromEntries(formData);
  try {
    connectToDB();

    const updateFields = { projectName, location, description, downloadUrls };

    await Project.findByIdAndUpdate(id, updateFields);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to update product!");
  }

  revalidatePath("/projects");
  redirect("/projects");
};

export const deleteProject = async (formData) => {
  const { id } = Object.fromEntries(formData);

  try {
    connectToDB();
    await Project.findByIdAndDelete(id);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to delete product!");
  }

  revalidatePath("/projects");
};
