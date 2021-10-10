import { useEffect } from "react";
import { Project } from "screens/project-list/list";
import { cleanObject } from "utils";
import { useHttp } from "./http";
import { useAsyncHttp } from "./useAsyncHttp";

const useProjects = (param?: Partial<Project>) => {
  const { fetchData, ...results } = useAsyncHttp<Project[]>();

  const clientHttp = useHttp();

  useEffect(() => {
    fetchData(clientHttp("projects", { data: cleanObject(param || {}) }));
  }, [param]);

  return results;
};

export default useProjects;
