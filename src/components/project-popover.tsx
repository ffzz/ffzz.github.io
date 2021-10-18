import styled from "@emotion/styled";
import { Divider, List, Popover, Spin, Typography } from "antd";
import { useProjectModal } from "screens/project-list/util";
import { useProjects } from "utils/use-project";
import { NoPaddingButton } from "./lib";

export const ProjectPopover = () => {
  const { data: projects, isLoading } = useProjects();
  const pinnedProjects = projects?.filter((project) => project.pin === true);
  const { open } = useProjectModal();
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
      <NoPaddingButton onClick={open} type="link">
        Create project
      </NoPaddingButton>
    </Content>
  );
  const loadingContent = isLoading ? <Spin size='small' /> : content
  return (
    <Popover placement="bottom" content={loadingContent}>
      <span>projects</span>
    </Popover>
  );
};

const Content = styled.div`
  padding: 2rem 1rem;
  min-width: 15rem;
`;
