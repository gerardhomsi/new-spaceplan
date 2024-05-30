import Gallery from "@/components/Gallery/Gallery";
import PaginationComponent from "@/components/Pagination/PaginationComponent";
import { fetchProjects } from "@/lib/data";

const GalleryPage = async ({ searchParams }) => {
  let page = parseInt(searchParams.page, 10);
  page = !page || page < 1 ? 1 : page;
  const perPage = 2;
  const { projects, totalProjects } = await fetchProjects(perPage, page);

  const totalPages = Math.ceil(totalProjects / perPage);
  return (
    <div className="min-h-screen">
      <Gallery projects={projects} />
      <PaginationComponent currentPage={page} totalPages={totalPages} href="gallery" />
    </div>
  );
};

export default GalleryPage;
