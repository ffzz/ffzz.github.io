import styled from "@emotion/styled";
import { Spin } from "antd";
import { ErrorBox, ScreenContainer } from "components/lib";
import { useDocumentTitle } from "utils";
import { useKanbans } from "utils/use-kanban";
import { useTasks } from "utils/use-tasks";
import CreateKanban from "./create-kanban";
import { KanbanColumn } from "./kanban-column";
import { SearchPanel } from "./search-panel";
import { TaskCreateModal } from "./task-modal";
import { useKanbanSearchParams, useProjectInUrl } from "./utils";

export const KanbanScreen = () => {
  useDocumentTitle("Kanban List");

  const { data: currentProject } = useProjectInUrl();
  const {
    data: kanbanList,
    isLoading: kanbanLoading,
    error,
  } = useKanbans(useKanbanSearchParams());
  const { isLoading: tasksLoading } = useTasks();

  return (
    <ScreenContainer>
      <h2>{currentProject?.name} Kanban</h2>
      <SearchPanel />
      <ColumnsContainer>
        <ErrorBox error={error} />
        {kanbanLoading || tasksLoading ? (
          <Spin />
        ) : (
          kanbanList?.map((kanban) => (
            <KanbanColumn kanban={kanban} key={kanban.id} />
          ))
        )}
        <CreateKanban />
      </ColumnsContainer>
      <TaskCreateModal />
    </ScreenContainer>
  );
};

export const ColumnsContainer = styled.div`
  display: flex;
  overflow: scroll;
  flex: 1;
  -ms-overflow-style: none; /* hide scrollbar on Internet Explorer 10+ */
  scrollbar-width: none; /* hide scrollbar on Firefox */
  ::-webkit-scrollbar {
    display: none; /* hide scrollbar on Safari and Chrome */
  }
`;
