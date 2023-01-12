// Mysql
import mysql from "mysql";

// Environments
import { environments } from "../config.js";

// Configuracion DB
const configDB = {
  host: environments.mysql.host,
  user: environments.mysql.user,
  password: environments.mysql.password,
  database: environments.mysql.database,
};

// Conexion a la DB
const connectionDB = mysql.createConnection(configDB);

export { connectionDB };
