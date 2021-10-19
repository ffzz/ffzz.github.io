import { useMutation, useQuery, useQueryClient } from "react-query";
import { Project } from "types";
import { cleanObject } from "utils";
import { useHttp } from "./use-http";

export const useEditProject = () => {
  const http = useHttp();
  const queryClient = useQueryClient();
  return useMutation(
    (params: Partial<Project>) =>
      http(`projects/${params.id}`, {
        method: "PATCH",
        data: params,
      }),
    {
      onSuccess: () => queryClient.invalidateQueries("projects"),
    }
  );
};
export const useAddProject = () => {
  const http = useHttp();
  const queryClient = useQueryClient();
  const createdAt = Date.now();
  const id = createdAt;
  const pin = false;
  return useMutation(
    (params: Partial<Project>) =>
      http(`projects`, {
        method: "POST",
        data: { id, createdAt, pin, ...params },
      }),
    {
      onSuccess: () => queryClient.invalidateQueries("projects"),
    }
  );
};

export const useProjects = (param?: Partial<Project>) => {
  const clientHttp = useHttp();
  return useQuery<Project[]>(["projects", cleanObject(param)], () =>
    clientHttp("projects", { data: cleanObject(param) })
  );
};

export const useProject = (id?: number) => {
  const http = useHttp();
  return useQuery<Project>(["project", { id }], () => http(`projects/${id}`), {
    enabled: Boolean(id),
  });
};

export const useDeleteProject = () => {
  const http = useHttp();
  const queryClient = useQueryClient();
  return useMutation(
    (id: number) =>
      http(`projects/${id}`, {
        method: "DELETE",
      }),
    {
      onSuccess: () => queryClient.invalidateQueries("projects"),
    }
  );
};
