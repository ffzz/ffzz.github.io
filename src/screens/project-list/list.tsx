import { Dropdown, Menu, Table, TableProps } from "antd";
import { NoPaddingButton } from "components/lib";
import { Pin } from "components/rate";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { useDeleteProject, useEditProject } from "utils/project";
import { User } from "./search-panel";
import { useProjectModal } from "./util";

export interface Project {
  id: number;
  name: string;
  personId: number;
  pin: boolean;
  organization: string;
  createdAt: string;
}

interface ListProps extends TableProps<Project> {
  users: User[];
  refresh?: () => void;
}

export const List = ({ users, ...props }: ListProps) => {
  const { mutate } = useEditProject();
  // const editPinStatus = (id:number, pin: boolean) => mutate({id, pin})
  // currying 科里化写法 与上面是一样的性质
  const editPinStatus = (id: number) => (pin: boolean) => {
    mutate({ id, pin });
    //window.location.reload()
  };
  const { editProject: edit } = useProjectModal();
  const editProject = (id: number) => () => edit(id);

  const {mutateAsync} = useDeleteProject();

  const deleteProject = (id: number) => () => mutateAsync(id);

  return (
    <Table
      rowKey="id"
      pagination={false}
      columns={[
        {
          title: <Pin checked={true} disabled={true} />,
          render(value, project) {
            return (
              <Pin
                checked={project.pin}
                onCheckedChange={editPinStatus(project.id)}
              />
            );
          },
        },
        {
          title: "Name",
          dataIndex: "name",
          key: "name",
          sorter: (a, b) => a.name.localeCompare(b.name),
          render(value, project) {
            return <Link to={String(project.id)}>{project.name}</Link>;
          },
        },
        {
          title: "Organization",
          dataIndex: "organization",
          key: "organization",
        },
        {
          title: "Leader",
          key: "Leader",
          render(value, project) {
            return (
              <span>
                {users.find((user: User) => user.id === project.personId)
                  ?.name || "unknown"}
              </span>
            );
          },
        },
        {
          title: "Created Date",
          key: "Created Date",
          render(value, project) {
            return (
              <span>
                {project.createdAt
                  ? dayjs(project.createdAt).format("MMMM D, YYYY")
                  : ""}
              </span>
            );
          },
        },
        {
          title: "Edit",
          key: "edit",
          render(value, project) {
            return (
              <Dropdown
                overlay={
                  <Menu>
                    <Menu.Item key="edit">
                      <NoPaddingButton
                        onClick={editProject(project.id)}
                        type="link"
                      >
                        edit
                      </NoPaddingButton>
                    </Menu.Item>
                    <Menu.Item key="delete">
                      <NoPaddingButton
                        onClick={deleteProject(project.id)}
                        type="link"
                      >
                        delete
                      </NoPaddingButton>
                    </Menu.Item>
                  </Menu>
                }
              >
                <NoPaddingButton type="link">...</NoPaddingButton>
              </Dropdown>
            );
          },
        },
      ]}
      {...props}
    />
  );
};
