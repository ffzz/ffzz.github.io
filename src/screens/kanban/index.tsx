import styled from "@emotion/styled";
import { useDocumentTitle } from "utils";
import { useKanbans } from "utils/use-kanban";
import { KanbanColumn } from "./kanban-column";
import { SearchPanel } from "./search-panel";
import { useKanbanSearchParams, useProjectInUrl } from "./utils";

export const KanbanScreen = () => {
  useDocumentTitle("Kanban List");

  const { data: currentProject } = useProjectInUrl();
  const { data: kanbanList } = useKanbans(useKanbanSearchParams());

  return (
    <div>
      <h2>{currentProject?.name} Kanban</h2>
      <SearchPanel />
      <ColumnsContainer>
        {kanbanList?.map((kanban) => (
          <KanbanColumn kanban={kanban} key={kanban.id} />
        ))}
      </ColumnsContainer>
    </div>
  );
};

const ColumnsContainer = styled.div`
  display: flex;
  overflow: hidden;
  margin-right:2rem;
`;
