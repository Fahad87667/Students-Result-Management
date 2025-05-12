import express from "express";
import {
  AdminLogin,
  GetAllAdmins,
  RegisterAdmin,
} from "../controllers/AdminController.js";
import { verifytoken } from "../middlewares/verifytoken.js";

const AdminRouter = express.Router();
// Beacause routing is now getting handled in separate file.

AdminRouter.get("/", verifytoken, GetAllAdmins);

AdminRouter.post("/", verifytoken, RegisterAdmin);

AdminRouter.post("/login", AdminLogin);

export default AdminRouter;
