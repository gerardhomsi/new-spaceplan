import ProjectForm from "@/components/ProjectForm/ProjectForm";
import { addProject } from "@/lib/actions";

const AddProjectPage = () => {
  return <ProjectForm action={addProject} />;
};

export default AddProjectPage;
