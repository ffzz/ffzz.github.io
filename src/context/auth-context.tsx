import { ReactNode, useCallback } from "react";
import { LoginUser } from "utils/auth-provider";
import * as auth from "utils/auth-provider";
import { User } from "screens/project-list/search-panel";
import { http } from "utils/http";
import { useFetch } from "utils";
import { useAsyncHttp } from "utils/useAsyncHttp";
import { FullPageError, FullPageLoading } from "components/full-page-loading";
import { useDispatch, useSelector } from "react-redux";
import * as authStore from "store/auth.slice";

// interface Auth {
//   user: User | null;
//   register: (form: LoginUser) => Promise<void>;
//   login: (form: LoginUser) => Promise<void>;
//   logout: () => Promise<void>;
// }

export const bootstrapUser = async () => {
  let user = null;
  const token = auth.getToken();
  if (token) {
    const data = await http("me", { token });
    user = data.user;
  }
  return user;
};

//export const AuthContext = React.createContext<Auth | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const {
    fetchData,
    data: user,
    error,
    isLoading,
    isPending,
    isError,
    setData: setUser,
  } = useAsyncHttp<User | null>();

  //   const login = (form: LoginUser) =>
  //     auth.login(form).then((user) => setUser({ ...user }));
  //   const register = (form: LoginUser) =>
  //     auth.register(form).then((user) => setUser(user));
  //   const logout = () => auth.logout().then(() => setUser(null));
  const dispatch: (...args: unknown[]) => Promise<User> = useDispatch();
  useFetch(() => {
    fetchData(dispatch(authStore.bootstrap()));
  });

  if (isPending || isLoading) {
    return <FullPageLoading />;
  }

  if (isError) {
    return <FullPageError error={error} />;
  }

  //   return (
  //     <AuthContext.Provider
  //       children={children}
  //       value={{ user, login, register, logout }}
  //     />
  //   );

  return <>{children}</>
};

/*

export const useAuth = () => {
    const context = React.useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used in AuthProvider')
    }
    return context
}
*/

export const useAuth = () => {
  const dispatch: (...args: unknown[]) => Promise<User> = useDispatch();
  const user = useSelector(authStore.selectUser);
  const login = useCallback(
    (form: LoginUser) => dispatch(authStore.login(form)),
    [dispatch]
  );
  const register = useCallback(
    (form: LoginUser) => dispatch(authStore.register(form)),
    [dispatch]
  );
  const logout = useCallback(() => dispatch(authStore.logout()), [dispatch]);
  return {
    user,
    login,
    register,
    logout,
  };
};


