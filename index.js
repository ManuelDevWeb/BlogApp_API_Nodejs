// Express
import express from "express";

// Instanciando server
const app = express();

// Permitiendo uso de formato JSON
app.use(express.json());

app.listen(8800, () => {
  console.log("Server running on port 8800");
});
