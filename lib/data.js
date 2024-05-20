import Admin from "./models/admin";
import Project from "./models/project";
import connectToDB from "./mongoDB";

export const fetchAdmin = async () => {
  try {
    await connectToDB();
    console.log("Connected to MongoDB");

    // Try finding all admins (remove filtering if applicable)
    // const admins = await Admin.find({});
    const admin = await Admin.find();

    console.log("Fetched admins:", admin); // Log retrieved admins

    // If expecting one admin, uncomment and adjust filtering

    return admin; // Return all admins (or the single admin if using findOne)
  } catch (error) {
    console.error("Error fetching Admin:", error);
    throw new Error("Failed to fetch Admin", error);
  }
};

export const fetchProjects = async () => {
  try {
    await connectToDB();
    console.log("Connected to MongoDB");

    const projects = await Project.find(); // Find all projects
    if (!projects) throw new Error("No projects found");

    return projects;
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw new Error("Failed to fetch projects", error);
  }
};

export const fetchProject = async (id) => {
  try {
    connectToDB();
    const project = await Project.findById(id);
    return project;
  } catch (err) {
    console.log("AAAAAAAAA", err);
    throw new Error("Failed to fetch project!");
  }
};
