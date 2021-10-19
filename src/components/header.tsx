import styled from "@emotion/styled";
import { Button, Dropdown, Menu } from "antd";
import { useAuth } from "context/auth-context";
import { Link } from "react-router-dom";
import { resetRoute } from "utils";
import { ReactComponent as Logo } from "../assets/software-logo.svg";
import { NoPaddingButton, Row } from "./lib";
import { ProjectPopover } from "./project-popover";
import { UsersPopover } from "./users-popover";

const PageHeader = () => {
  const { logout, user } = useAuth();

  return (
    <Header between={true}>
      <HeaderLeft gap={true}>
        <NoPaddingButton type="link" onClick={() => resetRoute()}>
          <Logo width="18rem" color="rgb(38,132,255)" />
        </NoPaddingButton>
        <Link to="projects">
          <ProjectPopover />
        </Link>
        <Link to="users">
          <UsersPopover />
        </Link>
      </HeaderLeft>
      <HeaderRight>
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item key="logout">
                <Button type="link" onClick={logout}>
                  Log Out
                </Button>
              </Menu.Item>
            </Menu>
          }
        >
          <Button
            type="text"
            color="primary"
            onClick={(e) => e.preventDefault()}
          >
            {" "}
            Hi, {user?.name}
          </Button>
        </Dropdown>
      </HeaderRight>
    </Header>
  );
};

const Header = styled(Row)`
  padding: 3.2rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  z-index: 1;
`;

const HeaderLeft = styled(Row)``;

const HeaderRight = styled.div``;

export default PageHeader;
