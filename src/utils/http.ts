import { useAuth } from "context/auth-context";
import * as auth from "./auth-provider";
import qs from "qs";
const apiUrl = process.env.REACT_APP_BASE_URL;

interface Config extends RequestInit {
  token?: string;
  data?: object;
}

const http = async (
  endpoint: string,
  { data, token, headers, ...customConfig }: Config = {}
) => {
  const config = {
    method: "GET",
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": data ? "application/json" : "",
    },
    ...customConfig,
  };

  if (config.method.toUpperCase() === "GET") {
    endpoint += `${qs.stringify(data)}`;
  } else {
    config.body = JSON.stringify(data || {});
  }

  return window
    .fetch(`${apiUrl}/${endpoint}`, config)
    .then(async (response) => {
      // when token is out of date or it is not logged in, response status is 401
      if (response.status === 401) {
        await auth.logout();
        window.location.reload();
        return Promise.reject({ message: "Please log in again ~" });
      }

      const data = await response.json();
      if (response.ok) {
        return data;
      } else {
        return Promise.reject(data);
      }
    });
};

const useHttp = () => {
  const { user } = useAuth();
  return (...[endpoint, config]: Parameters<typeof http>) =>
    http(endpoint, { ...config, token: user?.token });
};

export { http, useHttp };
