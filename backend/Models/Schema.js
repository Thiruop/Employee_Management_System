import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
});

const employeeSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    phone: String,
    designation: String,
    salary: Number,

    profileImage: {
      data: Buffer,
      contentType: String,
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
export const Employee = mongoose.model("Employee", employeeSchema);
