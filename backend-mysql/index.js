import express from "express";
import cors from "cors";
import { StatusCodes } from "http-status-codes";
import StudentRouter from "./src/routes/StudentRoutes.js";
import AdminRouter from "./src/routes/AdminRoutes.js";

const app = express();
const port = 3700;
app.use(cors());
app.use(express.json()); // Middleware
app.use("/students", StudentRouter); // routers will act as a middleware
app.use("/admin", AdminRouter); //Routers will act as a middleware

app.get("/", (request, response) => {
  // BASE URL
  response.status(StatusCodes.OK).send({ message: "Welcome to my CRUD app" });
});

app.listen(port, () => {
  console.log("Server started at " + port);
});
