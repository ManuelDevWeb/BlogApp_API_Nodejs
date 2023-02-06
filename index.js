// Express
import express from "express";
// Importando cors
import cors from "cors";
// Importando cookie parser
import cookieParser from "cookie-parser";
// Importando multer
import multer from "multer";

// Routes
import authRoutes from "./routes/auth.js";
import postsRoutes from "./routes/posts.js";
import usersRoutes from "./routes/users.js";

// Instanciando server
const app = express();

// Permitiendo uso de formato JSON
app.use(express.json());
// Permitiendo manejo de cookies
app.use(cookieParser());

// Configuración CORS
// Dominios permitidos (Para probar desde postman quitar esta configuración)
const whiteList = ["http://localhost:3000", "https://localhost:3000"];
const corsOptions = {
  // Verifica que el origen de la petición este en la lista blanca
  origin: function (origin, callback) {
    if (whiteList.includes(origin)) {
      // Puede consultar la API
      callback(null, true);
    } else {
      // No esta permitido su Request
      callback(new Error("Error de Cors"));
    }
  },
};

app.use(cors(corsOptions));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../client/public/upload");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

// Indicando el destino de los archivos a subir
const upload = multer({ storage });

// Endpoint para la subida de imagenes
app.post("/api/upload", upload.single("file"), function (req, res) {
  const file = req.file;

  res.status(200).json(file.filename);
});

// ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/posts", postsRoutes);

app.listen(8800, () => {
  console.log("Server running on port 8800");
});
