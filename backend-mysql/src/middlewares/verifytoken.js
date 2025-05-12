import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";

export function verifytoken(request, response, next) {
  const authHeader = request.get("Authorization");
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, "sohail-secret-key", (error, payload) => {
      if (error) {
        response
          .status(StatusCodes.UNAUTHORIZED)
          .send({ message: "Unauthorized token!!" });
      } else {
        next();
      }
    });
  } else {
    response
      .status(StatusCodes.UNAUTHORIZED)
      .send({ message: "Token is not available" });
  }
}
