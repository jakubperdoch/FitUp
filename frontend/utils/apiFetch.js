import axios from "axios";
import objectToQueryString from "@/utils/objectToQueryString";
import handlePayload from "@/utils/handlePayload";
import * as SecureStore from "expo-secure-store";

/**
 * Wrapper for axios that handles authentication and file uploads.
 * @param {string} url An API endpoint.
 * @param {object} options An options object.
 * @returns {Promise<any>} An API response.
 */

const apiFetch = async (url, options = {}) => {
  const baseUrl = process.env.EXPO_PUBLIC_API_URL;
  let fullUrl = `${baseUrl}${url}`;

  const userToken = await SecureStore.getItemAsync("userToken");

  if (options.query) {
    fullUrl += `?${objectToQueryString(options.query)}`;
    delete options.query;
  }

  const axiosConfig = {
    url: fullUrl,
    method: options.method || "GET",
    headers: options.headers || {},
  };

  if (userToken) {
    (axiosConfig.headers ??= {}).Authorization = `Bearer ${userToken}`;
    (axiosConfig.headers ??= {}).Accept = "application/json";
  }

  if (options.body) {
    const { payload, hasFiles } = handlePayload(options.body);
    axiosConfig.data = payload;
    axiosConfig.headers["Accept"] = "application/json";

    if (
      hasFiles &&
      ["PUT", "PATCH"].includes((options.method || "GET").toUpperCase())
    ) {
      axiosConfig.method = "POST";
      const query = options.query || {};
      query._method = options.method.toUpperCase();
      const queryString = objectToQueryString(query);
      axiosConfig.url += `?${queryString}`;
    }
  }

  try {
    const response = await axios(axiosConfig);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      const data = error.response.data;

      if (data.message) {
        throw new Error(data.message);
      }

      if (data.errors && typeof data.errors === "object") {
        const errorMessages = Object.values(data.errors).flat().join("\n");
        throw new Error(errorMessages || "API request failed");
      }
    } else if (error.request) {
      throw new Error("No response received from the server");
    }

    throw new Error("API request failed");
  }
};

export default apiFetch;
