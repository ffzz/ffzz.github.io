import { Dropdown, Menu, Table, TableProps } from "antd";
import { NoPaddingButton } from "components/lib";
import { Pin } from "components/rate";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { useEditProject } from "utils/project";
import { User } from "./search-panel";

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
  createProjectButton: React.ReactElement
}

export const List = ({ users, ...props }: ListProps) => {
  const { mutate } = useEditProject();
  // const editPinStatus = (id:number, pin: boolean) => mutate({id, pin})
  // currying 科里化写法 与上面是一样的性质
  const editPinStatus = (id: number) => (pin: boolean) => {
    mutate({ id, pin }).then(props.refresh);
    //window.location.reload()
  };

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
          title:'Edit',
          key:'edit',
          render(value, project) {
            return (
              <Dropdown
                overlay={
                  <Menu>
                    <Menu.Item key="edit">
                      {props.createProjectButton}
                    </Menu.Item>
                  </Menu>
                }
              >
                <NoPaddingButton type='link'>...</NoPaddingButton>
              </Dropdown>
            );
          },
        },
      ]}
      {...props}
    />
  );
};
