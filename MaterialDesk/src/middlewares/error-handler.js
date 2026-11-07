export default function errorHandler(error, req, res, next) {
  console.error(error);

  if (error.code === 11000) {
    return res.status(409).json({
      message: "Cette valeur existe déjà."
    });
  }

  if (error.name === "ValidationError" || error.name === "CastError") {
    return res.status(400).json({
      message: "Données invalides."
    });
  }

  res.status(error.status || 500).json({
    message: error.status ? error.message : "Internal server error"
  });
}