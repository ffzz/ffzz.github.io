import { useAsyncHttp } from "utils/useAsyncHttp";
import { useEffect } from "react";
import { useHttp } from "./http";
import { Project } from "screens/project-list/list";
import { cleanObject } from "utils";
import { User } from "screens/project-list/search-panel";

export const useUsers = (param?: Partial<Project>) => {
  const clientHttp = useHttp();
  const { fetchData, ...results } = useAsyncHttp<User[]>();

  useEffect(() => {
    fetchData(clientHttp("users", { data: cleanObject(param || {}) }));
  }, [param]);

  return results;
};
