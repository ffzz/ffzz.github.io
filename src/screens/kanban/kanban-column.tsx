import { Kanban } from "types/kanban";
import { useTasks } from "utils/use-tasks";
import { useTasksSearchParams } from "./utils";
import taskIcon from "../../assets/task.svg";
import bugIcon from "../../assets/bug.svg";
import { useTaskTypes } from "utils/use-taskTypes";
import styled from "@emotion/styled";
import { Card } from "antd";

export const TaskTypeIcon = ({ id }: { id: number }) => {
  const { data: taskTypes } = useTaskTypes();
  const name = taskTypes?.find((taskType) => taskType.id === id)?.name;
  if (!name) {
    return null;
  }
  return (
    <img
      src={name === "task" ? taskIcon : bugIcon}
      alt="task type icon"
      title="task icon"
    />
  );
};

export const KanbanColumn = ({ kanban }: { kanban: Kanban }) => {
  const { data: allTasks } = useTasks(useTasksSearchParams());
  const tasks = allTasks?.filter((task) => task.kanbanId === kanban.id);
  console.log('allTasks', allTasks)
  console.log("useTasksSearchParams", useTasksSearchParams());
  return (
    <Container>
      <h4>{kanban.name}</h4>
      <TasksContainer>
        {tasks?.map((task) => (
          <Card
            style={{ marginBottom: "0.5rem", borderRadius: "0.8rem" }}
            key={task.id}
          >
            <div>{task.name}</div>
            <TaskTypeIcon id={task.typeId} />
          </Card>
        ))}
      </TasksContainer>
    </Container>
  );
};

const Container = styled.div`
  min-width: 27rem;
  border-radius: 0.9rem;
  background-color: rgb(244, 245, 246);
  display: flex;
  flex-direction: column;
  padding: 0.7rem 0.7rem 1rem;
  margin-right: 1.5rem;
`;

const TasksContainer = styled.div`
  overflow: scroll;
  flex: 1;

  ::-webkit-scrollbar {
    display: none;
  }
`;
