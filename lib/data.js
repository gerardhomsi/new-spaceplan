// import Admin from "./models/admin";
import connectToDB from "./mongoDB";
import Project from "./models/project";

// export const fetchAdmin = async () => {
//   try {
//     await connectToDB();

//     const admin = await Admin.find();
//     return admin;
//   } catch (error) {
//     console.error("Error fetching Admin:", error);
//     throw new Error("Failed to fetch Admin", error);
//   }
// };

// export const fetchProjects = async (perPage, page) => {
//   try {
//     await connectToDB();

//     const projects = await Project.find()
//       .skip(perPage * (page - 1))
//       .limit(perPage)
//       .lean();
//     if (!projects) throw new Error("No projects found");

//     const totalProjects = await Project.countDocuments();

//     return { projects, totalProjects };
//   } catch (error) {
//     console.error("Error fetching projects:", error);
//     throw new Error("Failed to fetch projects", error);
//   }
// };

// export const fetchProject = async (id) => {
//   try {
//     connectToDB();
//     const project = await Project.findById(id);
//     return project;
//   } catch (err) {
//     console.log("AAAAAAAAA", err);
//     throw new Error("Failed to fetch project!");
//   }
// };

export const fetchProjects = async (perPage, page) => {
  try {
    await connectToDB();

    const projects = await Project.find()
      .skip(perPage * (page - 1))
      .limit(perPage)
      .lean(); // Convert Mongoose documents to plain objects

    if (!projects) throw new Error("No projects found");

    const totalProjects = await Project.countDocuments();

    // Convert ObjectId to string
    const plainProjects = projects.map((project) => ({
      ...project,
      _id: project._id.toString(),
    }));

    return { projects: plainProjects, totalProjects };
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw new Error("Failed to fetch projects");
  }
};

// ///////////////////////////////////////////////////////
// export const fetchProjectsOrder = async () => {
//   try {
//     await connectToDB();

//     const projects = await Project.find().select("order"); // Fetch only the order field
//     return projects;
//   } catch (error) {
//     console.error("Error fetching projects order:", error);
//     throw new Error("Failed to fetch projects order");
//   }
// };
