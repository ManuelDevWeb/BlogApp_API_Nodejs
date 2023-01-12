// Funcion para personalizar error
const error = (message, codeStatus) => {
  let e = new Error(message);

  if (codeStatus) {
    e.codeStatus = codeStatus;
  }

  return e;
};

export { error };
