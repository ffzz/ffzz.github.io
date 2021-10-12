import styled from "@emotion/styled";
import { Divider, List, Popover, Typography } from "antd";
import { useProjects } from "utils/project";
import { NoPaddingButton } from "./lib";

export const ProjectPopover = (props: {
  createProjectButton: React.ReactElement;
}) => {
  const { data: projects, isLoading } = useProjects();
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
      <Divider orientation='center' style={{ margin: "1rem" }} />
      {props.createProjectButton}
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
