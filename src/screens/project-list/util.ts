import { useMemo } from "react";
import { useProject } from "utils/use-project";
import { useUrlQueryParam } from "utils/url";

export const useProjectModal = () => {
  const [{ projectCreate }, setProjectCreate] = useUrlQueryParam([
    "projectCreate",
  ]);

  const [{ editingProjectId }, setEditingProjectId] = useUrlQueryParam([
    "editingProjectId",
  ]);

  const { data: editingProject, isLoading } = useProject(
    Number(editingProjectId)
  );

  const editProject = (id: number) =>
    setEditingProjectId({ editingProjectId: id });

  const open = () => {
    console.log("open click");
    setProjectCreate({ projectCreate: true });
  };

  const closeCreateProject = () => {
    setProjectCreate({ projectCreate: undefined });
  };
  const closeEditingProject = () => {
    setEditingProjectId({ editingProjectId: undefined });
  };

  const isOpen = projectCreate === "true" || Boolean(editingProjectId);

  return {
    isOpen,
    open,
    closeCreateProject,
    closeEditingProject,
    editProject,
    isLoading,
    editingProject,
  };
};

export const useProjectsSearchParams = () => {
  const [param, setParam] = useUrlQueryParam(["name", "personId"]);
  return [
    useMemo(
      () => ({ ...param, personId: Number(param.personId) || undefined }),
      [param]
    ),
    setParam,
  ] as const;
};
