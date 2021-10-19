import styled from "@emotion/styled";
import { List, Popover, Spin } from "antd";
import { Link } from "react-router-dom";
import { useUsers } from "../utils/use-users";

export const UsersPopover = () => {
  const { data: users, isLoading } = useUsers();

  const content = (
    <Content>
      <List>
        {users?.map((user) => (
          <List.Item key={user.id}>
            <List.Item.Meta
              title={
                <Link to={`/users/${user.id}`} replace>
                  {user.name}
                </Link>
              }
            />
          </List.Item>
        ))}
      </List>
    </Content>
  );
  const loadingContent = isLoading ? <Spin size="small" /> : content;
  return (
    <Popover placement="bottom" content={loadingContent}>
      <span>Users</span>
    </Popover>
  );
};

const Content = styled.div`
  min-width: 15rem;
`;
