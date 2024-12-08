export const createErrorMsg = (err) => {
  let errorMsg = null;

  switch (err?.name) {
    case "ValidationError":
      errorMsg = Object.values(err.errors)
        .map((err) => err.message)
        .join(", ");
      break;
    case "CastError":
      errorMsg = "Missing or invalid data!";
      break;
    case "MongooseError":
      errorMsg = "Server is busy, please try again later!";
      break;
    default:
      errorMsg = err?.message || null;
  }

  return errorMsg;
};
