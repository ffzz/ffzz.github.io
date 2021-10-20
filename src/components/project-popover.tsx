import styled from "@emotion/styled";
import { List, Popover, Spin, Typography } from "antd";
import { Link } from "react-router-dom";
import { useProjectModal } from "screens/project-list/util";
import { useProjects } from "utils/use-project";
import { NoPaddingButton } from "./lib";

export const ProjectPopover = () => {
  const { data: projects, isLoading } = useProjects();
  const pinnedProjects = projects?.filter((project) => project.pin === true);
  const { open } = useProjectModal();

  const content = (
    <Content>
      <List
        header={
          <Typography.Text type="secondary">Marked Projects</Typography.Text>
        }
      >
        {pinnedProjects?.map((project) => (
          <List.Item key={project.id}>
            <List.Item.Meta
              title={
                <Link to={`/projects/${project.id}`} replace>
                  {project.name}
                </Link>
              }
            />
          </List.Item>
        ))}
      </List>
      <NoPaddingButton type='ghost' onClick={open}>
        Create project
      </NoPaddingButton>
    </Content>
  );
  const loadingContent = isLoading ? <Spin size="small" /> : content;
  return (
    <Popover placement="bottom" content={loadingContent}>
      <span>Projects</span>
    </Popover>
  );
};

const Content = styled.div`
  min-width: 15rem;
`;
