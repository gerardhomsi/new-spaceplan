import { fetchProject } from "@/lib/data";
import { updateProject } from "@/lib/actions";
import ProjectForm from "@/components/ProjectForm/ProjectForm";

const SingleProjectPage = async ({ params }) => {
  const { id } = params;
  const projectDocument = await fetchProject(id);
  const project = projectDocument.toObject();

  project._id = project._id.toString();

  return <ProjectForm project={project} action={updateProject} />;
};

export default SingleProjectPage;
