// Agregando variables de entorno
const environments = {
  api: {
    port: process.env.API_PORT || 8800,
  },
  mysql: {
    host: process.env.MYSQL_HOST || "localhost",
    user: process.env.MYSQL_USER || "root",
    password: process.env.MYSQL_PASSWORD || "admin123",
    database: process.env.MYSQL_DB || "db_blog",
  },
};

export { environments };
