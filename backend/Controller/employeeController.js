import { Employee } from "../Models/Schema.js";

export const getEmployees = async (req, res) => {
  const { search, page = 1, limit = 10, sort = "createdAt" } = req.query;

  let query = {};
  if (search) {
    query.name = { $regex: search, $options: "i" };
  }

  const employees = await Employee.find(query)
    .sort(sort)
    .skip((page - 1) * limit)
    .limit(Number(limit));

  const total = await Employee.countDocuments(query);

  res.json({ employees, total });
};

export const addEmployee = async (req, res) => {
  const employee = await Employee.create({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    designation: req.body.designation,
    salary: req.body.salary,
    profileImage: null,
  });

  res.status(201).json(employee);
};

export const getEmployee = async (req, res) => {
  const employee = await Employee.findById(req.params.id);
  res.json(employee);
};

export const updateEmployee = async (req, res) => {
  const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.json(employee);
};

export const deleteEmployee = async (req, res) => {
  await Employee.findByIdAndDelete(req.params.id);
  res.json({ message: "Employee deleted" });
};
