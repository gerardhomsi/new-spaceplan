import React from "react";
import { Reorder } from "framer-motion";
import Link from "next/link";
import { deleteProject } from "@/lib/actions";

const DraggableItem = ({ project }) => (
  <Reorder.Item key={project._id} value={project} className="flex items-center justify-between p-1 bg-white rounded-lg shadow-md border border-gray-200">
    <div className="text-sm font-semibold w-1/4">{project.projectName}</div>
    <div className="text-gray-600 w-1/4">{project.location}</div>
    <div className="text-gray-500 truncate w-1/4">{project.description}</div>
    <div className="px-2 py-1 border-b flex justify-end w-1/4">
      <Link href={`/projects/${project._id}`}>
        <button className="text-sm border border-blue-700 p-1 rounded bg-blue-500 text-white hover:bg-blue-600">Edit</button>
      </Link>
      <form action={deleteProject}>
        <input type="hidden" name="id" value={project._id.toString()} />
        <button className="text-sm border border-red-700 p-1 rounded bg-red-500 text-white hover:bg-red-600">Delete</button>
      </form>
    </div>
  </Reorder.Item>
);

export default DraggableItem;
