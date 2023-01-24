// Config DB
import { connectionDB as db } from "../db/index.js";
// Respuestas personalizadas
import { success, error } from "../utils/response.js";

// Funcion para obtener todos los post
const getPosts = (req, res) => {
  // Query para obtener los posts, validamos si viene o no una categoria por la query de la req (?cat=art)
  const query = req.query.cat
    ? "SELECT * FROM posts WHERE cat=?"
    : "SELECT * FROM posts";

  db.query(
    query,
    // Este arreglo equivale al valor del ?
    [req.query.cat],
    (err, data) => {
      if (err) {
        // Retornamos respuesta personalizada
        return error(req, res, err.message, 500);
      }

      return success(req, res, data, 200);
    }
  );
};

// Funcion para obtener un post especifico
const getPost = (req, res) => {
  // Query para obtener un post especifico
  const query =
    "SELECT `username`,`title`,`desc`,p.image, u.image as userImage,`cat`,`date_post` FROM users u JOIN posts p ON u.id=p.uid WHERE p.id=?";

  db.query(
    query,
    // Este arreglo equivale al valor del ?
    [req.params.id],
    (err, data) => {
      if (err) {
        // Retornamos respuesta personalizada
        return error(req, res, err.message, 500);
      }

      return success(req, res, data, 200);
    }
  );
};

// Funcion para crear un post
const addPost = (req, res) => {};

// Funcion para eliminar un post
const deletePost = (req, res) => {};

// Funcion para actualizar un post
const updatePost = (req, res) => {};

export { getPosts, getPost, addPost, deletePost, updatePost };
