import styled from "@emotion/styled";
import { Button, List, Modal } from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Row, ScreenContainer } from "../../components/lib";
import { useDeleteEpic, useEpics } from "../../utils/use-epic";
import { useTasks } from "../../utils/use-tasks";
import { useProjectInUrl } from "../kanban/utils";
import { CreateEpic } from "./create-epic";
import { useEpicSearchParams, useEpicsQueryKey } from "./utils";

export const EpicScreen = () => {
  const { data: currentProject } = useProjectInUrl();
  const { data: epics } = useEpics(useEpicSearchParams());
  const { data: tasks } = useTasks({ projectId: currentProject?.id });
  const { mutate: deleteEpic } = useDeleteEpic(useEpicsQueryKey());

  const [isEpicCreateModalOpen, setIsEpicCreateModalOpen] = useState(false);

  const conformDeleteEpic = (id: number) => {
    Modal.confirm({
      title: "Are you sure to delete this Epic?",
      content: "Click OK to delete",
      okText: "OK",
      onOk() {
        deleteEpic(id);
      },
    });
  };

  return (
    <ScreenContainer>
      <Row between>
        <h4>{currentProject?.name} Epic</h4>
        <Button type="link" onClick={() => setIsEpicCreateModalOpen(true)}>
          Create Epic
        </Button>
      </Row>
      <Container>
        <List
          dataSource={epics}
          itemLayout="vertical"
          renderItem={(epic) => (
            <List.Item>
              <List.Item.Meta
                title={
                  <Row between={true}>
                    <span>{epic.name}</span>
                    <Button
                      onClick={() => conformDeleteEpic(epic.id)}
                      type="link"
                    >
                      Delete
                    </Button>
                  </Row>
                }
                description={
                  <div>
                    <p>Start Time: {dayjs(epic.start).format("MMM-D-YYYY")}</p>
                    <p>End Time: {dayjs(epic.end).format("MMM-D-YYYY")}</p>
                  </div>
                }
              />
              <div>
                {tasks
                  ?.filter((task) => task.epicId === epic.id)
                  .map((task) => (
                    <Link
                      to={`/projects/${currentProject?.id}/kanban?editingTaskId=${task.id}`}
                      key={task.id}
                    >
                      {task.name}
                    </Link>
                  ))}
              </div>
            </List.Item>
          )}
        />
      </Container>
      <CreateEpic
        onClose={() => setIsEpicCreateModalOpen(false)}
        visible={isEpicCreateModalOpen}
      />
    </ScreenContainer>
  );
};

const Container = styled.div`
  height: 100%;
  overflow: scroll;
  -ms-overflow-style: none; /* hide scrollbar on Internet Explorer 10+ */
  scrollbar-width: none; /* hide scrollbar on Firefox */
  ::-webkit-scrollbar {
    display: none; /* hide scrollbar on Safari and Chrome */
  }
`;