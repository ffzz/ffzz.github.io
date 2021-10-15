import { reorder } from "./reorder";
import { QueryKey, useQueryClient } from "react-query";

export const useConfig = (
  queryKey: QueryKey,
  callback: (target: any, odl?: any[]) => any[]
) => {
  const queryClient = useQueryClient();
  return {
    onSuccess: () => queryClient.invalidateQueries(queryKey),
    async onMutate(target: any) {
      const previousItems = queryClient.getQueryData(queryKey);
      queryClient.setQueryData(queryKey, (old?: any[]) => {
        return callback(target, old);
      });
      return { previousItems };
    },
    onerror(error: any, newItem: any, context: any) {
      queryClient.setQueryData(queryKey, context.previousItems);
    },
  };
};

export const useDeleteConfig = (querykey: QueryKey) =>
  useConfig(
    querykey,
    (target, old) => old?.filter((item) => item.id !== target.id) || []
  );

export const useEditConfig = (querykey: QueryKey) =>
  useConfig(
    querykey,
    (target, old) =>
      old?.map((item) =>
        item.id === target.id ? { ...item, ...target } : item
      ) || []
  );

export const useAddConfig = (querykey: QueryKey) =>
  useConfig(querykey, (target, old) => reorder({ list: old, ...target }));
