// Funcion para personalizar mensaje success
const success = (req, res, message, status) => {
  let statusCode = status || 200;
  let statusMessage = message || "";

  res.status(statusCode).send({
    error: false,
    statusCode,
    body: statusMessage,
  });
};

// Funcion para personalizar mensaje error
const error = (req, res, message = "Internal Server Error", status = 500) => {
  res.status(statusCode).send({
    error: true,
    statusCode: status,
    body: message,
  });
};

export { success, error };
