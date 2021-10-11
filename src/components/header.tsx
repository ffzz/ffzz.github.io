import styled from "@emotion/styled";
import { Button, Dropdown, Menu } from "antd";
import { Row } from "./lib";
import { ReactComponent as Logo } from "../assets/software-logo.svg";
import { useAuth } from "context/auth-context";
import { Navigate, Router, Routes } from "react-router";
import { resetRoute } from "utils";

const PageHeader = () => {
  const { logout, user } = useAuth();

  return (
    <Header between={true}>
      <HeaderLeft gap={true}>
        <Button type='link' onClick={() => resetRoute()}>
          <Logo width="18rem" color="rgb(38,132,255)" />
        </Button>
        <h3>项目</h3>
        <h3>用户</h3>
      </HeaderLeft>
      <HeaderRight>
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item key="logout">
                <a onClick={logout}>Log Out</a>
              </Menu.Item>
            </Menu>
          }
        >
          <a onClick={(e) => e.preventDefault()}> Hi, {user?.name}</a>
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
