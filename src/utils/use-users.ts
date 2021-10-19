import { useAsyncHttp } from "utils/use-AsyncHttp";
import { useEffect } from "react";
import { useHttp } from "./use-http";
import { Project } from "types";
import { cleanObject } from "utils";
import { User } from "types/User";
import { useQuery } from "react-query";

export const useUsers = (param?: Partial<Project>) => {
  const clientHttp = useHttp();
  const { fetchData, ...results } = useAsyncHttp<User[]>();

  useEffect(() => {
    fetchData(clientHttp("users", { data: cleanObject(param || {}) }));
  }, [clientHttp, fetchData, param]);

  return results;
};

export const useFetchUser = (id?: number) => {
  const http = useHttp();
  return useQuery<User>(["user", { id }], () => http(`users/${id}`), {
    enabled: Boolean(id),
  });
};
