import { Employee } from "../Models/Schema.js";

export const uploadEmployeeImage = async (req, res) => {
  const employee = await Employee.findById(req.params.id);

  if (!employee) {
    return res.status(404).json({ message: "Employee not found" });
  }

  if (!req.file) {
    return res.status(400).json({ message: "Image is required" });
  }

  employee.profileImage = {
    data: req.file.buffer,
    contentType: req.file.mimetype,
  };

  await employee.save();

  res.json({ message: "Profile image uploaded successfully" });
};
export const getEmployeeImage = async (req, res) => {
  const employee = await Employee.findById(req.params.id);

  if (!employee) {
    return res.status(404).json({
      message: "Employee not found",
    });
  }

  if (!employee.profileImage || !employee.profileImage.data) {
    return res.status(200).json({
      message: "No image has been uploaded for this employee",
    });
  }

  res.set("Content-Type", employee.profileImage.contentType);
  res.send(employee.profileImage.data);
};

export const deleteEmployeeImage = async (req, res) => {
  const employee = await Employee.findById(req.params.id);

  if (!employee || !employee.profileImage) {
    return res.status(404).json({ message: "Image not found" });
  }

  employee.profileImage = null;
  await employee.save();

  res.json({ message: "Profile image deleted" });
};
