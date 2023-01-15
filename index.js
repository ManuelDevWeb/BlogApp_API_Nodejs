// Express
import express from "express";
// Importando cors
import cors from "cors";

// Routes
import authRoutes from "./routes/auth.js";
import postsRoutes from "./routes/posts.js";
import usersRoutes from "./routes/users.js";

// Instanciando server
const app = express();

// Permitiendo uso de formato JSON
app.use(express.json());

// Configuración CORS
// Dominios permitidos (Para probar desde postman quitar esta configuración)
// const whiteList = ["http://localhost:3000"];
// const corsOptions = {
//   // Verifica que el origen de la petición este en la lista blanca
//   origin: function (origin, callback) {
//     if (whiteList.includes(origin)) {
//       // Puede consultar la API
//       callback(null, true);
//     } else {
//       // No esta permitido su Request
//       callback(new Error("Error de Cors"));
//     }
//   },
// };

// app.use(cors(corsOptions));

// ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/posts", postsRoutes);

app.listen(8800, () => {
  console.log("Server running on port 8800");
});
