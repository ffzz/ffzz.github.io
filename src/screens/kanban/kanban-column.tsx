import { Kanban } from "types/kanban";
import { useTasks } from "utils/use-tasks";
import { useKanbansQueryKey, useTasksSearchParams } from "./utils";
import styled from "@emotion/styled";
import { TaskCard } from "./task-card";
import { CreateTask } from "./create-task";
import { useDeleteKanban } from "utils/use-kanban";
import { Button, Dropdown, Menu, Modal } from "antd";
import { Row } from "components/lib";

export const KanbanColumn = ({ kanban }: { kanban: Kanban }) => {
  const { data: allTasks } = useTasks(useTasksSearchParams());
  const tasks = allTasks?.filter((task) => task.kanbanId === kanban.id);
  console.log("allTasks", allTasks);
  console.log("useTasksSearchParams", useTasksSearchParams());
  return (
    <Container>
      <Row between={true}>
        <h4 style={{ textAlign: "center" }}>{kanban.name}</h4>
        <MoreOptions kanban={kanban} />
      </Row>
      <TasksContainer>
        {tasks?.map((task) => (
          <TaskCard task={task} />
        ))}
        <CreateTask kanbanId={kanban.id} />
      </TasksContainer>
    </Container>
  );
};

export const Container = styled.div`
  min-width: 27rem;
  border-radius: 0.9rem;
  background-color: rgb(244, 245, 246);
  display: flex;
  flex-direction: column;
  padding: 0.7rem 1.5rem 1rem 1.5rem;
  margin-right: 1.5rem;
`;

const TasksContainer = styled.div`
  overflow: scroll;
  flex: 1;

  ::-webkit-scrollbar {
    display: none;
  }
`;

const MoreOptions = ({ kanban }: { kanban: Kanban }) => {
  const { mutateAsync: deleteKanban } = useDeleteKanban(useKanbansQueryKey());

  const startEdit = () => {
    Modal.confirm({
      okText: "OK",
      cancelText: "Cancel",
      title: "Are you sure to delete this task?",
      onOk() {
        deleteKanban(Number(kanban.id));
      },
    });
  };

  const overlay = (
    <Menu>
      <Menu.Item>
        <Button type='link' size='small' onClick={startEdit}>Delete</Button>
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={overlay}>
      <Button type="link">···</Button>
    </Dropdown>
  );
};
