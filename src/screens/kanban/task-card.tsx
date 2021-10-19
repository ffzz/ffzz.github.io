import { Button, Card, Dropdown, Menu, Modal, Typography } from "antd";
import { Task } from "types/Task";
import {
  useTaskEditingModal,
  useTasksQueryKey,
  useTasksSearchParams,
} from "./utils";
import taskIcon from "../../assets/task.svg";
import bugIcon from "../../assets/bug.svg";
import { useTaskTypes } from "utils/use-taskTypes";
import { useFetchUser } from "utils/use-users";
import { useEffect, useState } from "react";
import { MarkText } from "components/mark";
import styled from "@emotion/styled";
import { useDeleteTask } from "utils/use-tasks";

export const TaskCard = ({ task }: { task: Task }) => {
  const [assignee, setAssignee] = useState("");
  const { startEditTask } = useTaskEditingModal();

  const { name: keyword } = useTasksSearchParams();

  const { data: user } = useFetchUser(task.processorId);

  useEffect(() => {
    setAssignee(user?.name || "");
  }, [user]);

  return (
    <Card
      onClick={() => startEditTask(task.id)}
      style={{
        marginBottom: "0.5rem",
        borderRadius: ".8rem",
        cursor: "pointer",
        position: "relative",
      }}
      key={task.id}
    >
      <h4>
        <MarkText keyword={keyword || undefined} name={task.name} />
      </h4>
      <TaskMoreOptions id={task.id} startEditTask={startEditTask} />
      <Typography.Text type="secondary">Assignee: {assignee}</Typography.Text>
      <div>
        <TaskTypeIcon id={task.typeId} />
      </div>
    </Card>
  );
};

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

const TaskMoreOptions = ({ id, startEditTask }: { id: number, startEditTask:(id:number) => void }) => {
  const { mutateAsync: deleteTask } = useDeleteTask(useTasksQueryKey());

  const startEdit = () => {
    Modal.confirm({
      okText: "OK",
      cancelText: "Cancel",
      title: "Are you sure to delete this task?",
      onOk() {
        deleteTask(Number(id));
      },
    });
  };

  const overlay = (
    <Menu>
      <Menu.Item>
        <Button
          size='small'
          type='link'
          onClick={(e) => {
            e.stopPropagation();
            e.nativeEvent.stopImmediatePropagation();
            startEdit();
          }}
        >
          Delete
        </Button>
      </Menu.Item>
      <Menu.Item>
        <Button
          size='small'
          type='link'
          onClick={(e) => {
            e.stopPropagation();
            e.nativeEvent.stopImmediatePropagation();
            startEditTask(id)
          }}
        >
          Edit
        </Button>
      </Menu.Item>
    </Menu>
  );
  return (
    <MoreOptions onClick={e => {
      e.stopPropagation();
      e.nativeEvent.stopImmediatePropagation();
    }}>
      <Dropdown overlay={overlay}>
        <Button size="small" type="link">
          ···
        </Button>
      </Dropdown>
    </MoreOptions>
  );
};

const MoreOptions = styled.div`
  position: absolute;
  right: 1.5rem;
  top: 1rem;
`;
