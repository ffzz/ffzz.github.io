import { useQuery } from "react-query";
import { Task } from "types/Task";
import { useHttp } from "./use-http";

export const useTasks = (param?: Partial<Task>) => {
  const http = useHttp();
  return useQuery<Task[]>(["tasks", param], () =>
    http(`tasks`, { data: param })
  );
};
