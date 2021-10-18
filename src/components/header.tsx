import styled from "@emotion/styled";
import { Button, Dropdown, Menu } from "antd";
import { NoPaddingButton, Row } from "./lib";
import { ReactComponent as Logo } from "../assets/software-logo.svg";
import { useAuth } from "context/auth-context";
import { resetRoute } from "utils";
import { ProjectPopover } from "./project-popover";
import { Link, Route, Routes } from "react-router-dom";
import { ProjectScreen } from "screens/project";

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
        <Routes>
          <Route element={<ProjectScreen />} />
        </Routes>
        <span>users</span>
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

