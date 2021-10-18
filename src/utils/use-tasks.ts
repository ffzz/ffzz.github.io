import {
  useAddConfig,
  useDeleteConfig,
  useEditConfig,
  useReorderTaskConfig,
} from "./use-optimistic-options";

import { QueryKey, useMutation, useQuery } from "react-query";
import { Task } from "types/Task";
import { useHttp } from "./use-http";

export const useTasks = (param?: Partial<Task>) => {
  const http = useHttp();
  return useQuery<Task[]>(["tasks", param], () =>
    http(`tasks`, { data: param })
  );
};

export const useFetchTask = (id?: number) => {
  const http = useHttp();
  return useQuery<Task>(["task", { id }], () => http(`tasks/${id}`), {
    enabled: Boolean(id),
  });
};

export const useDeleteTask = (queryKey: QueryKey) => {
  const http = useHttp();
  return useMutation(
    (id: number) =>
      http(`tasks/${id}`, {
        method: "DELETE",
      }),
    useDeleteConfig(queryKey)
  );
};

export const useAddTask = (queryKey: QueryKey) => {
  const http = useHttp();
  const createdAt = Date.now();
  const id = createdAt;

  return useMutation(
    (params: Partial<Task>) =>
      http(`tasks`, {
        method: "POST",
        data: { id, createdAt, ...params },
      }),
    useAddConfig(queryKey)
  );
};

export const useEditTask = (queryKey: QueryKey) => {
  const http = useHttp();
  return useMutation(
    (params: Partial<Task>) =>
      http(`tasks/${params.id}`, {
        method: "PATCH",
        data: params,
      }),
    useEditConfig(queryKey)
  );
};

export interface ReorderTaskProps {
  // where the Item to be dragged
  fromId: number | undefined;
  // where the Item to be put
  toId: number | undefined;
  // where the Item put in the before or after the target place(toId)
  type: "before" | "after";
  fromKanbanId?: number;
  toKanbanId?: number;
}

export const useReorderTask = (queryKey: QueryKey) => {
  const http = useHttp();
  return useMutation((params: ReorderTaskProps) => {
    return http("tasks/reorder", {
      data: params,
      method: "POST",
    });
  }, useReorderTaskConfig(queryKey));
};
