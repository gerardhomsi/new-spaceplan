import Admin from "./models/admin";
import connectToDB from "./mongoDB";
import Project from "./models/project";

export const fetchAdmin = async () => {
  try {
    await connectToDB();

    const admin = await Admin.find();
    return admin;
  } catch (error) {
    console.error("Error fetching Admin:", error);
    throw new Error("Failed to fetch Admin", error);
  }
};

export const fetchProjects = async (perPage, page) => {
  try {
    await connectToDB();

    const projects = await Project.find()
      .skip(perPage * (page - 1))
      .limit(perPage);
    if (!projects) throw new Error("No projects found");

    const totalProjects = await Project.countDocuments();

    return { projects, totalProjects };
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
