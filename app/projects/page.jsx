import Pagination from "@/components/Pagination/Pagination";
import { deleteProject } from "@/lib/actions";
import { fetchProjects } from "@/lib/data";
import Link from "next/link";

const ProjectList = async ({ searchParams }) => {
  let page = parseInt(searchParams.page, 10);
  page = !page || page < 1 ? 1 : page;
  const perPage = 15;
  const { projects, totalProjects } = await fetchProjects(perPage, page);

  const totalPages = Math.ceil(totalProjects / perPage);

  return (
    <div className="bg-slate-400 p-6 min-h-screen">
      <div className="mb-4 flex justify-between items-center">
        <Link href="/projects/add">
          <button className="border border-green-700 p-1 rounded bg-green-500 text-white hover:bg-green-600">Add New</button>
        </Link>
      </div>
      <div className="overflow-x-auto rounded">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="text-left bg-gray-300">
              <th className="px-2 py-2 border-b">Project Name</th>
              <th className="px-2 py-2 border-b">Location</th>
              <th className="px-2 py-2 border-b">Description</th>
              <th className="px-2 py-2 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project._id.toString()} className="hover:bg-gray-100">
                <td className="px-2 py-1 border-b">{project.projectName}</td>
                <td className="px-2 py-1 border-b">{project.location}</td>
                <td className="px-2 py-1 border-b truncate max-w-xs">{project.description}</td>
                <td className="px-2 py-1 border-b flex gap-1">
                  <Link href={`/projects/${project._id}`}>
                    <button className="text-sm border border-blue-700 p-1 rounded bg-blue-500 text-white hover:bg-blue-600">Edit</button>
                  </Link>
                  <form action={deleteProject}>
                    <input type="hidden" name="id" value={project.id} />
                    <button className="text-sm border border-red-700 p-1 rounded bg-red-500 text-white hover:bg-red-600">Delete</button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination currentPage={page} totalPages={totalPages} />
    </div>
  );
};

export default ProjectList;
