import styled from "@emotion/styled";
import { Menu } from "antd";
import { useLocation } from "react-router";
import { Link, Navigate, Route, Routes } from "react-router-dom";
import { EpicScreen } from "screens/Epic";
import { KanbanScreen } from "screens/kanban";

const useRouteType = () => {
  const units = useLocation().pathname.split("/");
  return units[units.length - 1];
};

export const ProjectScreen = () => {
  const routeType = useRouteType();
  return (
    <Container>
      <Aside>
        <Menu
          style={{ width: "100%" }}
          mode="inline"
          selectedKeys={[routeType]}
        >
          <Menu.Item key="kanban">
            <Link to={"kanban"}>Kanban</Link>
          </Menu.Item>
          <Menu.Item key="epic">
            <Link to={"epic"}>Epic</Link>
          </Menu.Item>
        </Menu>
      </Aside>
      <Main>
        <Routes>
          <Route path={"/kanban"} element={<KanbanScreen />} />
          <Route path={"/epic"} element={<EpicScreen />} />
          <Route
            path={"/"}
            element={
              <Navigate
                to={window.location.pathname + "/kanban"}
                replace
              />
            }
          />
        </Routes>
      </Main>
    </Container>
  );
};

const Aside = styled.aside`
  background-color: rgb(244, 245, 247);
  display: flex;
`;

const Main = styled.div`
  display:flex;
  box-shadow: -5px 0 5px -5px rgba(0, 0, 0, 0.1);
  overflow:hidden;
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: 15rem 1fr;
  overflow:hidden;
  width:100%;
`;
