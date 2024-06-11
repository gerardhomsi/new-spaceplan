"use server";

import { revalidatePath } from "next/cache";

import { redirect } from "next/navigation";
import bcrypt from "bcrypt";
import Project from "./models/project";
import Admin from "./models/admin";

import connectToDB from "./mongoDB";
import { signIn, signOut } from "@/app/api/auth/[...nextauth]/route";
// import { signIn, signOut } from "@/auth";

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

    const newAdmin = new Admin({
      username,
      password: hashedPassword,
    });

    await newAdmin.save();
  } catch (err) {
    console.log(err);
    throw new Error("Failed to create Admin!");
  }

  redirect("/login");
};

export async function Login(formData) {
  try {
    await connectToDB();

    const username = formData.get("username");
    const password = formData.get("password");
    console.log("Logging in user:", username);

    // Fetch the admin user from the database based on username
    const admin = await Admin.findOne({ username });
    console.log("Fetched admin:", admin);

    if (!admin) {
      throw new Error("Invalid username or password"); // More descriptive error
    }

    // Compare the entered password with the hashed password using bcrypt
    const isPasswordMatch = await bcrypt.compare(password, admin.password);
    console.log("Password match:", isPasswordMatch);

    if (!isPasswordMatch) {
      throw new Error("Invalid username or password"); // Consistent error message
    }

    // Successful login logic (e.g., generate session token, redirect)
    // ...
    const result = await signIn("credentials", { username, password, redirect: false });
    if (result.error) {
      throw new Error(result.error.message);
    }
    return { success: true, message: "Login successful" }; // Informative response
  } catch (error) {
    console.error(error); // Log the error for debugging
    throw new Error("Login failed"); // General error message for user
  }
}

export async function Logout() {
  await signOut({ redirectTo: "/" });
}
