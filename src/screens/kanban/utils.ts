import { useMemo } from "react";
import { useDebounce } from "utils";
import { useLocation } from "react-router";
import { useUrlQueryParam } from "utils/url";
import { useProject } from "utils/use-project";

export const useProjectIdInUrl = () => {
  const { pathname } = useLocation();
  const id = pathname.match(/projects\/(\d+)/)?.[1];
  return Number(id);
};

export const useProjectInUrl = () => useProject(useProjectIdInUrl());

export const useKanbanSearchParams = () => ({ projectId: useProjectIdInUrl() });

export const useKanbansQueryKey = () => ["kanbans", useKanbanSearchParams()];

export const useTasksSearchParams = () => {
  const [param] = useUrlQueryParam(["name", "typeId", "processorId", "tagId"]);
  const projectId = useProjectIdInUrl();
  console.log("param", param);
  const debouncedName = useDebounce(param.name, 200);
  return useMemo(
    () => ({
      projectId,
      typeId: Number(param.typeId) || undefined,
      processorId: Number(param.processorId) || undefined,
      tagId: Number(param.tagId) || undefined,
      name: debouncedName || undefined,
    }),
    [projectId, param, debouncedName]
  );
};

export const useTasksQueryKey = () => ["tasks", useTasksSearchParams()];
