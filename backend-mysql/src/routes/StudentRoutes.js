import express from "express";
import {
  DeleteRecordById,
  getAllStudents,
  RegisterStudent,
  SearchRecordById,
  updateStudentRecordById,
} from "../controllers/StudentController.js";
import { verifytoken } from "../middlewares/verifytoken.js";

const StudentRouter = express.Router();
// Beacause routing is now getting handled in separate file.
StudentRouter.get("/", verifytoken, getAllStudents);

StudentRouter.get("/:id", verifytoken, SearchRecordById);

StudentRouter.post("/", verifytoken, RegisterStudent);

StudentRouter.delete("/:id", verifytoken, DeleteRecordById);

StudentRouter.put("/", verifytoken, updateStudentRecordById);

export default StudentRouter;
