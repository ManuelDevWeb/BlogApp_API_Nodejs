// Express
import express from "express";

// Conexion DB
import { connectionDB } from "./db/index.js";
// Routes
import postsRoutes from "./routes/posts.js";

// Instanciando server
const app = express();

// Permitiendo uso de formato JSON
app.use(express.json());

// ROUTES
// app.use("/api/users");
// app.use("/api/auth");
app.use("/api/posts", postsRoutes);

app.listen(8800, () => {
  console.log("Server running on port 8800");
});
