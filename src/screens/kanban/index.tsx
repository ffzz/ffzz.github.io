import styled from "@emotion/styled";
import { ScreenContainer } from "components/lib";
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
    <ScreenContainer>
      <h2>{currentProject?.name} Kanban</h2>
      <SearchPanel />
      <ColumnsContainer>
        {kanbanList?.map((kanban) => (
          <KanbanColumn kanban={kanban} key={kanban.id} />
        ))}
      </ColumnsContainer>
    </ScreenContainer>
  );
};

const ColumnsContainer = styled.div`
  display: flex;
  overflow: scroll;
  flex: 1;
  -ms-overflow-style: none; /* hide scrollbar on Internet Explorer 10+ */
  scrollbar-width: none; /* hide scrollbar on Firefox */
  ::-webkit-scrollbar {
    display: none; /* hide scrollbar on Safari and Chrome */
  }
`;
