import { useEffect } from "react";
import { Project } from "screens/project-list/list";
import { cleanObject } from "utils";
import { useHttp } from "./http";
import { useAsyncHttp } from "./useAsyncHttp";

export const useEditProject = () => {
  const { fetchData, ...asyncResults } = useAsyncHttp();
  const http = useHttp();

  const mutate = (params: Partial<Project>) => {
    return fetchData(
      http(`projects/${params.id}`, {
        data: params,
        method: "PATCH",
      })
    );
  };
  useEffect(() => {}, []);

  return {
    mutate,
    ...asyncResults,
  };
};
export const useAddProject = () => {
  const { fetchData, ...asyncResults } = useAsyncHttp();
  const http = useHttp();

  const mutate = (params: Partial<Project>) => {
    return fetchData(
      http(`projects/${params.id}`, {
        data: params,
        method: "POST",
      })
    );
  };

  return {
    mutate,
    ...asyncResults,
  };
};

const useProjects = (param?: Partial<Project>) => {
  const { fetchData, ...results } = useAsyncHttp<Project[]>();

  const clientHttp = useHttp();

  const fetchProjects = () =>
    clientHttp("projects", {
      data: cleanObject(param || {}),
    });

  useEffect(() => {
    fetchData(fetchProjects(), { refetch: fetchProjects });
  }, [param]);

  return results;
};

export { useProjects };
