import { createdbConnection } from "../configs/dbconfig.js";
import { StatusCodes } from "http-status-codes";
import { compareSync, hashSync } from "bcrypt";
import jwt from "jsonwebtoken";

const conn = createdbConnection();

export const GetAllAdmins = (request, response) => {
  try {
    const qry = "select * from admin";
    conn.query(qry, (error, result) => {
      if (error) {
        response
          .status(StatusCodes.BAD_REQUEST)
          .send({ message: "Bad request..." });
      } else {
        response.send(result);
      }
    });
  } catch (error) {
    response
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ message: "Something went wrong" });
  }
};

export const RegisterAdmin = (request, response) => {
  // To Insert the values into admin
  try {
    const data = request.body;
    const encrptedpassword = hashSync(data.password, 10);
    data.password = ""; // Just in case
    const qry = `insert into admin values(${data.id},"${data.name}","${data.username}","${encrptedpassword}")`;

    conn.query(qry, (err, result) => {
      if (err) {
        console.log(err);
        if (err.errno == 1062) {
          response
            .status(StatusCodes.BAD_REQUEST)
            .send({ message: "Bad request" });
        } else {
          response
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .send({ message: "Invalid data..." });
        }
      } else {
        response
          .status(StatusCodes.OK)
          .send({ message: "ADMIN Registered!!!" });
      }
    });
  } catch (error) {
    response
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ message: "Something went wrong.." });
  }
};

export const AdminLogin = (request, response) => {
  try {
    const reqdata = request.body;
    const qry = `Select * from admin where username = "${reqdata.username}"`;

    conn.query(qry, (err, result) => {
      if (err) {
        response
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .send({ message: "Internal Server Error..S" });
      } else {
        //console.log(result);
        if (result.length == 0) {
          response
            .status(StatusCodes.NOT_FOUND)
            .send({ message: "User Not Found" });
        } else {
          if (compareSync(reqdata.password, result[0].password)) {
            const token = jwt.sign(
              { adminId: result[0].id },
              "sohail-secret-key"
            );
            response
              .status(StatusCodes.OK)
              .send({ message: "Logged in successfully", token });
          } else {
            response
              .status(StatusCodes.BAD_REQUEST)
              .send({ message: "Invalid Username or Password" });
          }
        }
      }
    });
  } catch (error) {
    response
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ message: "Something went wrong.." });
  }
};
