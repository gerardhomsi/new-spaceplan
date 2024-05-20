import { Schema, model, models } from "mongoose";

const adminSchema = new Schema({ userName: { type: String }, password: { type: String } });

const Admin = models.Admin || model("Admin", adminSchema);

export default Admin;

// export const Admin = models.Admin || model.Admin("Admin", adminSchema);
