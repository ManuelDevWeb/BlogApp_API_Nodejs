import jwt from "jsonwebtoken";

// Config DB
import { connectionDB as db } from "../db/index.js";
// Environments
import { environments } from "../config.js";
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
    "SELECT p.id, `username`,`title`,`desc`,p.image, u.image as userImage,`cat`,`date_post` FROM users u JOIN posts p ON u.id=p.uid WHERE p.id=?";

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
const addPost = (req, res) => {
  // TODO: Validate if token exist

  // Query para agregar nuevo post
  const queryInsert =
    " INSERT INTO posts(`title`,`desc`,`image`,`cat`,`date_post`,`uid`) VALUES (?)";

  const values = [
    req.body.title,
    req.body.desc,
    req.body.image,
    req.body.cat,
    req.body.date_post,
    req.body.uid,
  ];

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
        return success(req, res, "Post has been created", 200);
      }
    }
  );
};

// Funcion para eliminar un post
const deletePost = (req, res) => {
  // Obteniendo y validando el token de la cookie
  const token = req.cookies.access_token;

  if (!token) {
    return res.status(401).json("Not authenticated!");
  }

  // Verificamos token
  jwt.verify(token, environments.jwt.secretKey, (err, userInfo) => {
    if (err) {
      return error(req, res, "Token is not valid", 403);
    }

    const postId = req.params.id;

    // Query para eliminar el post
    const query = "DELETE FROM posts WHERE `id`= ? AND `uid`= ?";

    db.query(
      query,
      // Cada elemento equivale a un ?
      [postId, userInfo.id],
      (err, data) => {
        if (err) {
          // Retornamos respuesta personalizada
          return error(req, res, "You can delete only your posts", 500);
        }

        return success(req, res, "Post has been deleted!", 200);
      }
    );
  });
};

// Funcion para actualizar un post
const updatePost = (req, res) => {
  const postId = req.params.id;

  // TODO: Validate if token exist

  // Query para agregar nuevo post
  const queryUpdate =
    " UPDATE posts SET `title`=?,`desc`=?, `cat`=?, `image`=? WHERE `id`=? AND `uid`=?";

  const values = [req.body.title, req.body.desc, req.body.cat, req.body.image];

  db.query(
    queryUpdate,
    // El arreglo values equivale al valor del ?
    [...values, postId, req.body.uid],
    (err, data) => {
      if (err) {
        // Retornamos respuesta personalizada
        return error(req, res, err.message, 500);
      }

      if (data) {
        return success(req, res, "Post has been updated", 200);
      }
    }
  );
};

export { getPosts, getPost, addPost, deletePost, updatePost };
