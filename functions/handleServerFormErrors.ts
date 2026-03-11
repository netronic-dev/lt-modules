export const handleServerFormErrors = (
  error: { [key: string]: string },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setError: any,
) => {
  Object.entries(error).forEach(([key, message]) => {
    if (["name", "email", "phoneNumber"].includes(key)) {
      setError(key as "name" | "email" | "phoneNumber", {
        type: "server",
        message,
      });
    }
  });
};
