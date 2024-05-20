import ProjectForm from "../ProjectForm";
import { addProject } from "@/lib/actions";

const AddProjectPage = () => {
  return <ProjectForm action={addProject} />;
};

export default AddProjectPage;
