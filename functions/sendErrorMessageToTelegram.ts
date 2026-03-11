import axios from "axios";

export const sendErrorMessageToTelegram = async (message: string) => {
  try {
    const response = await axios.post(
      "https://back.netronic.net/telegram/send-error-message",
      {
        message: `frontend error: ${message}`,
      },
    );
    return response.data;
  } catch (error) {
    console.error(
      "An error occurred when sending a message in Telegram",
      error,
    );
  }
};
