import { QueryKey, useMutation, useQuery, useQueryClient } from "react-query";
import { Kanban } from "types/kanban";
import { useHttp } from "./use-http";
import {
  useDeleteConfig,
  useReorderKanbanConfig,
} from "./use-optimistic-options";

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

export interface ReorderProps {
  // where the Item to be dragged
  fromId?: number;
  // where the Item to be put
  toId?: number;
  // where the Item put in the before or after the target place(toId)
  type?: "before" | "after";
}

export const useReorderKanban = (queryKey: QueryKey) => {
  const http = useHttp();
  return useMutation((params: ReorderProps) => {
    return http("kanbans/reorder", {
      data: params,
      method: "POST",
    });
  }, useReorderKanbanConfig(queryKey));
};
