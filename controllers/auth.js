// Bcrypt
import bcrypt from "bcryptjs";

// Config DB
import { connectionDB as db } from "../db/index.js";

// Respuestas personalizadas
import { success, error } from "../utils/response";

// Funcion para registrar usuario
const register = (req, res) => {
  const { email, username, password } = req.body;

  // Valida existing user
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
        values,
        (err, data) => {
          if (err) {
            // Retornamos respuesta personalizada
            return error(req, res, err.message, 500);
          }

          if (data.length) {
            // Retornamos respuesta personalizada
            return success(req, res, "User has been created ", 200);
          }
        }
      );
    }
  );
};

// Funcion para iniciar sesion
const login = (req, res) => {};

// Funcion para cerrar sesion
const logout = (req, res) => {};

export { register, login, logout };
