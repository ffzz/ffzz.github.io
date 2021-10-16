import { useQuery } from "react-query";
import { Kanban } from "types/kanban";
import { useHttp } from "./use-http";

export const useKanbans = (param?: Partial<Kanban>) => {
  const http = useHttp();
  return useQuery<Kanban[]>(["kanbans", param], () =>
    http(`kanbans`, { data: param })
  );
};
