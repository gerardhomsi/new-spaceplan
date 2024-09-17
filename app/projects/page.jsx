import PaginationComponent from "@/components/Pagination/PaginationComponent";
import ProjectsTable from "@/components/Projects-Table/ProjectsTable";
import { fetchProjects } from "@/lib/data";

const ProjectList = async ({ searchParams }) => {
  let page = parseInt(searchParams.page, 10);
  page = !page || page < 1 ? 1 : page;
  const perPage = 20;
  const { projects, totalProjects } = await fetchProjects(perPage, page);

  const totalPages = Math.ceil(totalProjects / perPage);

  return (
    <div className="bg-slate-400 p-6 min-h-screen">
      <h2 class="text-lg font-semibold text-center">
        <span class="text-red-600">REMINDER:</span> WHEN YOU DELETE A PROJECT GO TO FIREBASE AND DELETE THE PHOTOS
      </h2>
      <ProjectsTable projects={projects} />
      <PaginationComponent currentPage={page} totalPages={totalPages} href="projects" />
    </div>
  );
};

export default ProjectList;
