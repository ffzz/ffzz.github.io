import { User } from "screens/project-list/search-panel";

const localStorageKey = "__auth_provider_token__";

export interface LoginUser {
  username: string;
  password: string;
}

const getToken = () => window.localStorage.getItem(localStorageKey);

const handleUserResponse = (user: User) => {
  window.localStorage.setItem(localStorageKey, user.token || "");
  console.log(user.token);
  return user;
};

const loginUrl = process.env.REACT_APP_BASE_URL;

const login = (data: LoginUser) => {
  return fetch(`${loginUrl}/login`, {
    method: "post",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(async (response: Response) => {
    let data = null;
    if (response.ok) {
      data = await response.json();
      return handleUserResponse(data.user);
    } else {
      return Promise.reject(data);
    }
  });
};

const register = (user: LoginUser) => {
  return fetch(`${loginUrl}/register`, {
    method: "post",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(user),
  }).then(async (response: Response) => {
    let result = null;
    if (response.ok) {
      result = await response.json();
      return handleUserResponse(result);
    } else {
      return Promise.reject(result);
    }
  });
};

const logout = async () => {
  window.localStorage.removeItem(localStorageKey);
};

export { localStorageKey, getToken, login, register, logout };
