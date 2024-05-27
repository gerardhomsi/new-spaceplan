"use client";

import { useState } from "react";
import { Reorder } from "framer-motion";
import useDragItems from "./useDragItems";
import DraggableItem from "./DraggableItem";

const DraggableProjects = ({ projects }) => {
  const [projectOrder, setProjectOrder] = useState(projects);
  const debouncedHandleReorder = useDragItems(setProjectOrder);

  return (
    <div>
      <div className="flex items-center justify-between p-2 text-gray-300 bg-gray-500 rounded-lg shadow-md">
        <div className="font-bold w-1/4">Project Name</div>
        <div className="font-bold w-1/4">Location</div>
        <div className="font-bold w-1/4">Description</div>
        <div className="font-bold w-1/4 text-end">Actions</div>
      </div>
      <Reorder.Group
        axis="y"
        values={projectOrder}
        onReorder={(newOrder) => {
          setProjectOrder(newOrder);
          debouncedHandleReorder(newOrder);
        }}
        className="space-y-1"
      >
        {projectOrder.map((project) => (
          <DraggableItem key={project._id} project={project} />
        ))}
      </Reorder.Group>
    </div>
  );
};

export default DraggableProjects;
