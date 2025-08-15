export const error = (err, req, res, next) => {
  try {
    let error = { ...err };
    error.message = err.message;

    console.error(err);

    if (err.message === "CastError") {
      const message = "Ресурс не найден";

      error = new Error(message);
      error.statusCode = 404;
    }

    if (err.code === 11000) {
      const message = "Введено дублирующее значение";

      error = new Error(message);
      error.statusCode = 400;
    }

    if (err.name === "ValidationError") {
      const message = Object.values(err.errors).map((val) => val.message);

      error = new Error(message.join(", "));
      error.statusCode = 400;
    }

    res.status(error.statusCode || 500).json({
      success: false,
      error: error.message || "Внутренняя ошибка сервера",
    });
  } catch (error) {
    next(error);
  }
};
