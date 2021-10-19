import { QueryKey, useMutation, useQuery, useQueryClient } from "react-query";
import { Epic } from "../types/epic-types";
import { useHttp } from "./use-http";
import { useDeleteConfig } from "./use-optimistic-options";

export const useEpics = (param?: Partial<Epic>) => {
  const http = useHttp();
  return useQuery<Epic[]>(["epics", param], () =>
    http(`epics`, { data: param })
  );
};

export const useAddEpic = () => {
  const http = useHttp();
  const queryClient = useQueryClient();
  const createdAt = Date.now();
  const id = createdAt;
  return useMutation(
    (params: Partial<Epic>) =>
      http(`epics`, {
        method: "POST",
        data: { id, createdAt, ...params },
      }),
    {
      onSuccess: () => queryClient.invalidateQueries("epics"),
    }
  );
};

export const useDeleteEpic = (queryKey: QueryKey) => {
  const http = useHttp();
  return useMutation(
    (id: number) =>
      http(`epics/${id}`, {
        method: "DELETE",
      }),
    useDeleteConfig(queryKey)
  );
};
