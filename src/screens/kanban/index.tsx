import styled from "@emotion/styled";
import { Spin } from "antd";
import { ErrorBox, ScreenContainer } from "components/lib";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useDocumentTitle } from "utils";
import { useKanbans } from "utils/use-kanban";
import { useReorderTask, useTasks } from "utils/use-tasks";
import { Drag, Drop, DropChild } from "../../components/drag-and-drop";
import CreateKanban from "./create-kanban";
import { KanbanColumn } from "./kanban-column";
import { SearchPanel } from "./search-panel";
import { TaskCreateModal } from "./task-modal";
import { useKanbanSearchParams, useKanbansQueryKey, useProjectInUrl, useTasksQueryKey, useTasksSearchParams } from "./utils";
import { useReorderKanban } from '../../utils/use-kanban';
import { useCallback } from 'react';

export const KanbanScreen = () => {
  useDocumentTitle("Kanban List");

  const { data: currentProject } = useProjectInUrl();
  const {
    data: kanbanList,
    isLoading: kanbanLoading,
    error,
  } = useKanbans(useKanbanSearchParams());
  const { isLoading: tasksLoading } = useTasks();

  const onDragEnd = useDragEnd()

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <ScreenContainer>
        <h2>{currentProject?.name} Kanban</h2>
        <SearchPanel />
        <ColumnsContainer>
          <ErrorBox error={error} />
          <Drop type="COLUMN" direction="horizontal" droppableId="kanban">
            <DropChild style={{ display: "flex" }}>
              {kanbanLoading || tasksLoading ? (
                <Spin />
              ) : (
                kanbanList?.map((kanban, index) => (
                  <Drag
                    key={kanban.id}
                    draggableId={"kanbanColumn" + kanban.id}
                    index={index}
                  >
                    <KanbanColumn kanban={kanban} key={kanban.id} />
                  </Drag>
                ))
              )}
            </DropChild>
          </Drop>
          <CreateKanban />
        </ColumnsContainer>
        <TaskCreateModal />
      </ScreenContainer>
    </DragDropContext>
  );
};

export const useDragEnd = () => {

  const {data:kanbans} = useKanbans(useKanbanSearchParams())
  const {data: allTasks} = useTasks(useTasksSearchParams())

  const {mutate: reorderKanban} = useReorderKanban(useKanbansQueryKey())
  const {mutate: reorderTask} = useReorderTask(useTasksQueryKey())
  
  return useCallback(({ source, destination, type }: DropResult) => {
    if (!destination) {
      return
    }
    // reorder Kanban
    if (type==='COLUMN') {
      const fromId = kanbans?.[source.index].id;
      const toId = kanbans?.[destination.index].id ;
      if(!fromId || !toId || fromId === toId) {
        return
      }
      const type = destination.index > source.index ? 'after' : 'before'
      reorderKanban({type,fromId,toId})
    }

    // reorder tasks
    if (type==='ROW') {
      const fromKanbanId = +source.droppableId
      const toKanbanId = +destination.droppableId
      
      const fromTask = allTasks?.filter(
        (task) => task.kanbanId === fromKanbanId
        )[source.index];
      const toTask = allTasks?.filter(task => task.kanbanId === toKanbanId)[destination.index]
      if (fromTask?.id === toTask?.id) {
        return
      }
      
      console.log('to task: ', toTask)
      if (fromTask?.id === toTask?.id) {
        return
      }

      reorderTask({
        fromId: fromTask?.id,
        toId: toTask?.id,
        fromKanbanId,
        toKanbanId,
        type: fromKanbanId === toKanbanId && destination.index > source.index ? 'after' : 'before'
      })

    }

  },[kanbans, reorderKanban, allTasks, reorderTask])
}


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
