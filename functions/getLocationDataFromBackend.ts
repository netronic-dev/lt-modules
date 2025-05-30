const getLocationDataFromBackend = async () => {
  try {
    const res = await fetch("https://back.netronic.net/user-location", {
      credentials: "include",
    });

    if (!res.ok) {
      console.error("Помилка при запиті на бекенд");
      return null;
    }

    const location = await res.json();
    return location;
  } catch (err) {
    console.error("Network error", err);
    return null;
  }
};
