"use server";

import bcrypt from "bcrypt";
import { revalidatePath } from "next/cache";

import Admin from "./models/admin";
import connectToDB from "./mongoDB";
import Project from "./models/project";
import { redirect } from "next/navigation";
import { signIn, signOut } from "@/auth";

export const addProject = async (formData) => {
  try {
    const projectName = formData.get("projectName");
    const location = formData.get("location");
    const description = formData.get("description");
    const downloadUrls = JSON.parse(formData.get("downloadUrls"));

    await connectToDB();

    const maxOrder = await Project.find().sort({ order: -1 }).limit(1).select({ order: 1 });

    const newOrder = maxOrder.length > 0 ? maxOrder[0].order + 1 : 1;

    const newProject = new Project({ projectName, location, description, downloadUrls, order: newOrder });

    await newProject.save();

    revalidatePath("/projects");
  } catch (err) {
    console.error(err);
    throw new Error("Failed to create project!");
  }
};

export const updateProject = async (formData) => {
  try {
    const { id, projectName, location, description, downloadUrls } = Object.fromEntries(formData);

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
    throw new Error("Failed to delete project!");
  }

  revalidatePath("/projects");
};

export const addAdmin = async (formData) => {
  try {
    const username = formData.get("username");
    const password = formData.get("password");
    await connectToDB();

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newAdmin = new Admin({ username, password: hashedPassword });

    await newAdmin.save();
  } catch (err) {
    console.log(err);
    throw new Error("Failed to create Admin!");
  }

  redirect("/login");
};

export async function Login(formData) {
  try {
    // Retrieve username and password from environment variables
    const expectedUsername = process.env.LOGIN_USERNAME;
    const expectedPassword = process.env.LOGIN_PASSWORD;

    if (!expectedUsername || !expectedPassword) throw new Error("Missing environment variables: NEXT_PUBLIC_LOGIN_USERNAME or NEXT_PUBLIC_LOGIN_PASSWORD");

    // Get username and password from form data
    const username = formData.get("username");
    const password = formData.get("password");

    // Validate username and password
    if (!username || !password) throw new Error("Invalid username or password");

    // Compare entered password with stored password
    const passwordMatch = password === expectedPassword && username === expectedUsername; // For production, use bcrypt

    if (!passwordMatch) throw new Error("Invalid username or password");

    // Login successful
    return { success: true, message: "Login successful" };
  } catch (error) {
    return { success: false, message: error.message };
  }
}

export async function Logout() {
  await signOut({ redirectTo: "/" });
}
