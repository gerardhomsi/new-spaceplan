import { NextResponse } from "next/server";

import connectToDB from "@/lib/mongoDB";
import Project from "@/lib/models/project";

export const PUT = async (req) => {
  try {
    const { newOrder } = await req.json();

    if (!newOrder || !Array.isArray(newOrder)) return NextResponse.json({ error: "Invalid input" }, { status: 400 });

    await connectToDB();

    for (let i = 0; i < newOrder.length; i++) {
      const projectId = newOrder[i];
      await Project.findByIdAndUpdate(projectId, { order: i + 1 });
    }

    return new NextResponse({ message: "Project order updated successfully" });
  } catch (error) {
    console.error("Error updating project order:", error);
    return new NextResponse({ error: "Internal server error" }, { status: 500 });
  }
};
