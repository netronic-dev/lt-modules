const getOrCreateExternalId = () => {
  if (typeof document === "undefined") return null;

  const key = "external_id";

  const cookie = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${key}=`))
    ?.split("=")[1];

  if (cookie) return cookie;

  const newId = crypto.randomUUID();
  document.cookie = `${key}=${newId}; path=/; max-age=${90 * 24 * 60 * 60}`;
  return newId;
};

export default getOrCreateExternalId;
