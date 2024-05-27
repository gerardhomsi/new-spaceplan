import { Schema, model, models } from "mongoose";

const projectSchema = new Schema(
  {
    downloadUrls: [{ type: String, required: true }],
    projectName: { type: String, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
    order: { type: Number, required: true, default: 1 },
  },
  { Timestamps: true }
);

// Use models.Project if it already exists, otherwise create a new model
const Project = models.Project || model("Project", projectSchema);

export default Project;
