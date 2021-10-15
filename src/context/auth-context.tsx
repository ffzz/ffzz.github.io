import React, { ReactNode } from "react";
import { LoginUser } from "utils/auth-provider";
import * as auth from "utils/auth-provider";
import { User } from "screens/project-list/search-panel";
import { http } from "utils/http";
import { useFetch } from "utils";
import { useAsyncHttp } from "utils/useAsyncHttp";
import { FullPageError, FullPageLoading } from "components/full-page-loading";
import { useQueryClient } from "react-query";

interface Auth {
  user: User | null;
  register: (form: LoginUser) => Promise<void>;
  login: (form: LoginUser) => Promise<void>;
  logout: () => Promise<void>;
}

const bootstrapUser = async () => {
  let user = null;
  const token = auth.getToken();
  if (token) {
    const data = await http("me", { token });
    user = data.user;
  }
  return user;
};

const AuthContext = React.createContext<Auth | undefined>(undefined);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const {
    fetchData,
    data: user,
    error,
    isLoading,
    isPending,
    isError,
    setData: setUser,
  } = useAsyncHttp<User | null>();

  const queryClient = useQueryClient()

  const login = (form: LoginUser) =>
    auth.login(form).then((user) => setUser({ ...user }));
  const register = (form: LoginUser) =>
    auth.register(form).then((user) => setUser(user));
  const logout = () =>
    auth.logout().then(() => {
      setUser(null);
      queryClient.clear()
    });

  useFetch(() => {
    fetchData(bootstrapUser());
  });

  if (isPending || isLoading) {
    return <FullPageLoading />;
  }

  if (isError) {
    return <FullPageError error={error} />;
  }

  return (
    <AuthContext.Provider
      children={children}
      value={{ user, login, register, logout }}
    />
  );
};

const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used in AuthProvider");
  }
  return context;
};

export { useAuth, AuthContext, AuthProvider };
