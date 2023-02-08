// Bcrypt
import bcrypt from "bcryptjs";
// JWT
import jwt from "jsonwebtoken";

// Config DB
import { connectionDB as db } from "../db/index.js";
// Environments
import { environments } from "../config.js";

// Respuestas personalizadas
import { success, error } from "../utils/response.js";

// Funcion para registrar usuario
const register = (req, res) => {
  const { email, username, password } = req.body;

  // Validate existing user
  const queryFind = "SELECT * FROM users WHERE email=? OR username=?";

  db.query(
    queryFind,
    // Este arreglo equivale al valor de cada ? y van en el mismo orden
    [email, username],
    (err, data) => {
      if (err) {
        // Retornamos respuesta personalizada
        return error(req, res, err.message, 500);
      }

      if (data.length) {
        // Retornamos respuesta personalizada
        return success(req, res, "User already exist", 409);
      }

      // Hash the password
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);

      // Create user
      const queryInsert =
        "INSERT INTO users(`username`,`email`,`password`) VALUES (?)";

      const values = [username, email, hash];

      db.query(
        queryInsert,
        // El arreglo values equivale al valor del ?
        [values],
        (err, data) => {
          if (err) {
            // Retornamos respuesta personalizada
            return error(req, res, err.message, 500);
          }

          if (data) {
            // Retornamos respuesta personalizada
            return success(req, res, "User has been created", 200);
          }
        }
      );
    }
  );
};

// Funcion para iniciar sesion
const login = (req, res) => {
  // Validate existing user
  const queryFind = "SELECT * FROM users WHERE username=?";
  db.query(
    queryFind,
    // Equivale al valor del ?
    [req.body.username],
    (err, data) => {
      if (err) {
        // Retornamos respuesta personalizada
        return error(req, res, err.message, 500);
      }

      if (data.length === 0) {
        // Retornamos respuesta personalizada
        return error(
          req,
          res,
          `User with username ${req.body.username} doesn't exist`,
          404
        );
      }

      // Compare password
      const isPasswordCorrect = bcrypt.compareSync(
        req.body.password,
        data[0].password
      );

      if (!isPasswordCorrect) {
        // Retornamos respuesta personalizada
        return error(req, res, "Invalid credentials", 400);
      }

      // Create token
      const token = jwt.sign({ id: data[0].id }, environments.jwt.secretKey);
      const { password, ...otherInformation } = data[0];

      // Return response in cookie
      res
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .status(200)
        .json(otherInformation);
    }
  );
};

// Funcion para cerrar sesion
const logout = (req, res) => {
  // Clear cookie
  res
    .clearCookie("access_token", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .json("User has been logged out.");
};

export { register, login, logout };
