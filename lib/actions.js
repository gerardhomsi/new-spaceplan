"use server";

import { revalidatePath } from "next/cache";

import connectToDB from "./mongoDB";
import Project from "./models/project";
import { redirect } from "next/navigation";

// export const addProject = async (formData) => {
//   try {
//     const projectName = formData.get("projectName");
//     const location = formData.get("location");
//     const description = formData.get("description");
//     const downloadUrls = JSON.parse(formData.get("downloadUrls")); // Parse the download URLs from the formData

//     connectToDB();

//     const newProject = new Project({ projectName, location, description, downloadUrls });

//     await newProject.save();
//   } catch (err) {
//     console.log(err);
//     throw new Error("Failed to create project!");
//   }

//   revalidatePath("/projects");
// };

export const addProject = async (formData) => {
  try {
    const projectName = formData.get("projectName");
    const location = formData.get("location");
    const description = formData.get("description");
    const downloadUrls = JSON.parse(formData.get("downloadUrls")); // Parse the download URLs from the formData

    await connectToDB();

    // 1. Find the maximum order value (adjust based on your needs)
    const maxOrder = await Project.find().sort({ order: -1 }).limit(1).select({ order: 1 });

    // 2. Assign a new order value based on the maximum (or 1 if none exist)
    const newOrder = maxOrder.length > 0 ? maxOrder[0].order + 1 : 1;

    const newProject = new Project({
      projectName,
      location,
      description,
      downloadUrls,
      order: newOrder, // Assign the calculated order
    });

    await newProject.save();

    revalidatePath("/projects"); // Assuming revalidatePath function for updating client-side cache
  } catch (err) {
    console.error(err);
    throw new Error("Failed to create project!");
  }
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
