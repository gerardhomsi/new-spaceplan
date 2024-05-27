import Project from "@/lib/models/project";
import connectToDB from "@/lib/mongoDB";
import { NextResponse } from "next/server";

export const PUT = async (req) => {
  try {
    const { newOrder } = await req.json();

    if (!newOrder || !Array.isArray(newOrder)) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    await connectToDB();

    // Loop through the new order array and update the order of each project
    for (let i = 0; i < newOrder.length; i++) {
      const projectId = newOrder[i]; // Assuming each item in newOrder is the project ID
      await Project.findByIdAndUpdate(projectId, { order: i + 1 }); // Assuming order starts from 1
    }

    return new NextResponse({ message: "Project order updated successfully" });
  } catch (error) {
    console.error("Error updating project order:", error);
    return new NextResponse({ error: "Internal server error" }, { status: 500 });
  }
};
