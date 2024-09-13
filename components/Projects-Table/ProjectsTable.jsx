"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { Logout } from "@/lib/actions";
import DraggableProjects from "../Projects-Draggable/DraggableProjects";

const ProjectsTable = ({ projects }) => {
  const router = useRouter();

  if (typeof window !== "undefined") {
    const asdasdasdasd = localStorage.getItem("auth_token");
    console.log("asdasdasdasd  ", asdasdasdasd);

    console.log("process.env.AUTH_TOKEN", process.env.NEXT_PUBLIC_AUTH_TOKEN);
    console.log("!asdasdasdasd === process.env.AUTH_TOKEN", asdasdasdasd !== process.env.NEXT_PUBLIC_AUTH_TOKEN);
    if (asdasdasdasd !== process.env.NEXT_PUBLIC_AUTH_TOKEN) router.push("/login");
  }
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
