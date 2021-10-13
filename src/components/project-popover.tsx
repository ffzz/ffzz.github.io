import styled from "@emotion/styled";
import { Divider, List, Popover, Typography } from "antd";
import { useDispatch } from "react-redux";
import { projectListSliceActions } from "screens/project-list/project-list.slice";
import { useProjects } from "utils/project";
import { NoPaddingButton } from "./lib";

export const ProjectPopover = () => {

  const dispatch = useDispatch()

  const { data: projects } = useProjects();
  const pinnedProjects = projects?.filter((project) => project.pin === true);
  const content = (
    <Content>
      <Typography.Text type="secondary">Marked Projects</Typography.Text>
      <Divider style={{ margin: "1rem" }} />
      <List>
        {pinnedProjects?.map((project) => (
          <List.Item.Meta key={project.id} title={project.name} />
        ))}
      </List>
      <Divider orientation="center" style={{ margin: "1rem" }} />
      <NoPaddingButton onClick={() => dispatch(projectListSliceActions.openProjectModal())} type="link">
        Create project
      </NoPaddingButton>
    </Content>
  );
  return (
    <Popover placement="bottom" content={content}>
      <span>projects</span>
    </Popover>
  );
};

const Content = styled.div`
  padding: 2rem 1rem;
  min-width: 15rem;
`;
