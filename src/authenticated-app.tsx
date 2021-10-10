import styled from "@emotion/styled";
import { Dropdown, Menu } from "antd";
import MenuItem from "antd/lib/menu/MenuItem";
import { Row } from "components/lib";
import { useAuth } from "context/auth-context";
import { userInfo } from "os";
import { ProjectListScreen } from "screens/project-list";
import { ReactComponent as Logo } from "./assets/software-logo.svg";

const AuthenticatedApp = () => {
  const { logout, user } = useAuth();
  return (
    <Container>
      <Header between={true}>
        <HeaderLeft gap={true}>
          <Logo width="18rem" color="rgb(38,132,255)" />
          <h3>项目</h3>
          <h3>用户</h3>
        </HeaderLeft>
        <HeaderRight>
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item key='logout'>
                  <a onClick={logout}>Log Out</a>
                </Menu.Item>
              </Menu>
            }
          >
              <a onClick={ e => e.preventDefault()}> Hi, {user?.name}</a>
          </Dropdown>
        </HeaderRight>
      </Header>

      <Main>
        <ProjectListScreen />
      </Main>
    </Container>
  );
};

const Container = styled.div`
  height: 100vh;
  display: grid;
  grid-template-rows: 6rem 1fr;
`;

const Header = styled(Row)`
  padding: 3.2rem;
  box-shadow: 0 0 5px 0 rgba(0,0,0,0.1)
`;

const HeaderLeft = styled(Row)``;

const HeaderRight = styled.div``;

const Main = styled.main``;

export default AuthenticatedApp;
