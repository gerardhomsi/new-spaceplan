// "use server";

import Admin from "./models/admin";
import connectToDB from "./mongoDB";
import Project from "./models/project";

export const fetchAdmin = async (username) => {
  try {
    await connectToDB();

    const admin = await Admin.findOne({ username });

    return admin;
  } catch (error) {
    console.error("Error fetching Admin:", error);
    throw new Error("Failed to fetch Admin", error);
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

export const fetchProjects = async (perPage, page, orderBy) => {
  try {
    await connectToDB();

    const sortCriteria = {};
    if (orderBy) {
      // Handle valid order fields (e.g., "name" for ascending, "-name" for descending)
      const [field, order] = orderBy.split("-");
      sortCriteria[field] = order === "desc" ? -1 : 1;
    } else sortCriteria.order = 1; // Sort by 'order' field ascending by default

    const projects = await Project.find()
      .skip(perPage * (page - 1))
      .limit(perPage)
      .sort(sortCriteria)
      .lean();

    if (!projects) throw new Error("No projects found");

    const totalProjects = await Project.countDocuments();

    const plainProjects = projects.map((project) => ({ ...project, _id: project._id.toString() }));

    return { projects: plainProjects, totalProjects };
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw new Error("Failed to fetch projects");
  }
};
