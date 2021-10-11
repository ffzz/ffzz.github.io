import styled from "@emotion/styled";
import PageHeader from "components/header";
import { ProjectListScreen } from "screens/project-list";
import { ProjectScreen } from "screens/project";
import { Navigate, Route, Router, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";

const AuthenticatedApp = () => {
  return (
    <Container>
      <PageHeader />
      <Main>
        <BrowserRouter>
          <Routes>
            <Route path={"/projects"} element={<ProjectListScreen />}></Route>
            <Route
              path={"/projects/:projectId/*"}
              element={<ProjectScreen />}
            ></Route>
            <Navigate to={'/projects'} />
          </Routes>
        </BrowserRouter>
      </Main>
    </Container>
  );
};

const Container = styled.div`
  height: 100vh;
  display: grid;
  grid-template-rows: 6rem 1fr;
`;

const Main = styled.main``;

export default AuthenticatedApp;
