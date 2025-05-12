import { createdbConnection } from "../configs/dbconfig.js";
import { StatusCodes } from "http-status-codes";

const conn = createdbConnection();

export const RegisterStudent = (request, response) => {
  // To Insert the values
  try {
    const data = request.body;
    const qry = `insert into students values(${data.id},"${data.name}","${data.phone}",${data.marks})`;

    conn.query(qry, (err, result) => {
      if (err) {
        console.log(err);
        if (err.errno == 1062) {
          response
            .status(StatusCodes.BAD_REQUEST)
            .send({ message: "Duplicate records not allowed..." });
        } else {
          response
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .send({ message: "Invalid data..." });
        }
      } else {
        response
          .status(StatusCodes.OK)
          .send({ message: "Student Registered!!!" });
      }
    });
  } catch (error) {
    response
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ message: "Something went wrong.." });
  }
};

export const getAllStudents = (request, response) => {
  // To get all the values from student tables
  try {
    const qry = "select * from students";
    conn.query(qry, (error, result) => {
      if (error) {
        console.log(error);
        response
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .send({ message: "Failed to fetch student data" });
      } else {
        response.status(StatusCodes.OK).send(result);
      }
    });
  } catch (error) {
    response
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ message: "Something went wrong.." });
  }
};

export const updateStudentRecordById = (request, response) => {
  // // To Update the data
  try {
    const data = request.body;
    const qry = `update students set name = "${data.name}", phone = "${data.phone}", marks = ${data.marks} where id = ${data.id}`;

    conn.query(qry, (err, result) => {
      if (err) {
        console.log(err);
        if (err.errno == 1062) {
          response
            .status(StatusCodes.BAD_REQUEST)
            .send({ message: "Duplicate records not allowed..." });
        } else {
          response
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .send({ message: "Invalid data..." });
        }
      } else {
        response
          .status(StatusCodes.OK)
          .send({ message: `Student with id: ${data.id} Updated!!!` });
      }
    });
  } catch (error) {
    response
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ message: "Something went wrong.." });
  }
};

export const DeleteRecordById = (request, response) => {
  /// delete data of student w.r.t id
  try {
    const id = parseInt(request.params.id);
    const qry = `delete from students where id = ${id}`;
    conn.query(qry, (error, result) => {
      if (error) {
        console.log(error);
        response
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .send({ message: "Internal server error" });
      } else {
        if (result.length === 0) {
          response
            .status(StatusCodes.NOT_FOUND)
            .send({ message: `No Student with id = ${id} exist!!` });
        } else {
          response
            .status(StatusCodes.OK)
            .send({ message: `Student with id: ${id} deleted successfully!!` });
        }
      }
    });
  } catch (error) {
    response
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ message: "Internal Server error!!" });
  }
};

export const SearchRecordById = (request, response) => {
  /// get data of one particular student w.r.t id
  try {
    const id = parseInt(request.params.id);
    const qry = `select * from students where id = ${id}`;
    conn.query(qry, (error, result) => {
      if (error) {
        console.log(error);
        response
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .send({ message: "Failed to fetch student data" });
      } else {
        if (result.length === 0) {
          response
            .status(StatusCodes.NOT_FOUND)
            .send({ message: `Student with id = ${id} not found!!` });
        } else {
          response.status(StatusCodes.OK).send(result[0]); // Because its unnecessary to return the error of single object.
        }
      }
    });
  } catch (error) {
    response
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ message: "Internal Server error!!" });
  }
};
