const express = require("express");

const router = express.Router();

const auth = require("../middleware/authMiddleware");

const {
  addEmployee,
  getEmployees,
  searchEmployee,
  deleteEmployee,
} = require("../controllers/employeeController");

router.post("/", auth, addEmployee);

router.get("/", auth, getEmployees);

router.get("/search", auth, searchEmployee);

router.delete("/:id", auth, deleteEmployee);

module.exports = router;