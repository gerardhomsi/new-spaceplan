import { Logout } from "@/lib/actions";
import Link from "next/link";
import React from "react";
import DraggableProjects from "../Projects-Draggable/DraggableProjects";

const ProjectsTable = ({ projects }) => {
  return (
    <>
      <form action={Logout}>
        <button className="bg-red-500 hover:bg-red-600 my-2 text-white py-1 px-3 rounded-md shadow-md transition duration-300 ease-in-out transform" type="submit">
          Logout
        </button>
      </form>
      <div className="mb-4 flex justify-between items-center">
        <Link href="/projects/add">
          <button className="border border-green-700 p-1 rounded bg-green-500 text-white hover:bg-green-600">Add New</button>
        </Link>
      </div>
      <div className="overflow-x-auto rounded">
        <DraggableProjects projects={projects} />
      </div>
    </>
  );
};

export default ProjectsTable;
