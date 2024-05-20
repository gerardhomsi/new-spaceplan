import ProjectForm from "../ProjectForm";
import { fetchProject } from "@/lib/data";
import { updateProject } from "@/lib/actions";

const SingleProjectPage = async ({ params }) => {
  const { id } = params;
  const projectDocument = await fetchProject(id);

  // Convert the Mongoose document to a plain JavaScript object
  const project = projectDocument.toObject();

  // Ensure _id is a string
  project._id = project._id.toString();

  return <ProjectForm project={project} action={updateProject} />;
};

export default SingleProjectPage;
