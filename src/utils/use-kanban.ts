import { QueryKey, useMutation, useQuery, useQueryClient } from "react-query";
import { Kanban } from "types/kanban";
import { useHttp } from "./use-http";
import { useDeleteConfig } from "./use-optimistic-options";

export const useKanbans = (param?: Partial<Kanban>) => {
  const http = useHttp();
  return useQuery<Kanban[]>(["kanbans", param], () =>
    http(`kanbans`, { data: param })
  );
};

export const useAddKanban = () => {
  const http = useHttp();
  const queryClient = useQueryClient();
  const createdAt = Date.now();
  const id = createdAt;
  return useMutation(
    (params: Partial<Kanban>) =>
      http(`kanbans`, {
        method: "POST",
        data: { id, createdAt, ...params },
      }),
    {
      onSuccess: () => queryClient.invalidateQueries("kanbans"),
    }
  );
};

export const useDeleteKanban = (queryKey: QueryKey) => {
  const http = useHttp();
  return useMutation(
    (id: number) =>
      http(`kanbans/${id}`, {
        method: "DELETE",
      }),
    useDeleteConfig(queryKey)
  );
};
