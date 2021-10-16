import { useQuery } from "react-query";
import { TaskType } from "../types/task-type";
import { useHttp } from "./use-http";

export const useTaskTypes = () => {
  const http = useHttp();
  return useQuery<TaskType[]>(["TaskTypes"], () => http(`taskTypes`));
};
