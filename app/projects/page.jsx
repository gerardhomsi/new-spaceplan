import { fetchProjects } from "@/lib/data";
import Link from "next/link";

const ProjectList = async () => {
  const projects = await fetchProjects();

  return (
    <div className="bg-slate-400 p-6 min-h-screen">
      <div className="mb-4 flex justify-between items-center">
        <Link href="/projects/add">
          <button className="border border-green-700 p-2 rounded bg-green-500 text-white hover:bg-green-600">Add New</button>
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Project Name</th>
              <th className="py-2 px-4 border-b">Location</th>
              <th className="py-2 px-4 border-b">Description</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project._id.toString()} className="hover:bg-gray-100">
                <td className="py-2 px-4 border-b">{project.projectName}</td>
                <td className="py-2 px-4 border-b">{project.location}</td>
                <td className="py-2 px-4 border-b truncate max-w-xs">{project.description}</td>
                <td className="py-2 px-4 border-b flex flex-col lg:flex-row lg:items-center lg:space-x-2 space-y-2 lg:space-y-0">
                  <Link href={`/projects/${project._id}`}>
                    <button className="lg:ml-4 border border-blue-700 p-2 rounded bg-blue-500 text-white hover:bg-blue-600">Edit</button>
                  </Link>
                  <form>
                    <button className="lg:ml-2 border border-red-700 p-2 rounded bg-red-500 text-white hover:bg-red-600">Delete</button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProjectList;
