export const handleServerErrors = (error, setError) => {
  const rawErrors =
    error?.response?.data?.message || error?.response?.data || error;

  if (Array.isArray(rawErrors)) {
    rawErrors.forEach((err) => {
      if (
        typeof err === "object" &&
        err &&
        err.property &&
        ["name", "email", "phoneNumber"].includes(err.property)
      ) {
        setError(err.property, {
          type: "server",
          message: Object.values(err.constraints || {})[0] || "Invalid value",
        });
      }
    });
    return;
  }

  if (rawErrors && typeof rawErrors === "object") {
    Object.entries(rawErrors).forEach(([key, message]) => {
      if (["name", "email", "phoneNumber"].includes(key)) {
        setError(key, {
          type: "server",
          message: Array.isArray(message) ? message.join(", ") : message,
        });
      }
    });
  }
};
