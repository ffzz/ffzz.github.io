import styled from "@emotion/styled";
import PageHeader from "components/header";
import { ProjectListScreen } from "screens/project-list";
import { ProjectScreen } from "screens/project";
import { Navigate, Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import { ProjectModal } from "screens/project-list/project-create-modal";

const AuthenticatedApp = () => {
  return (
    <Container>
      <BrowserRouter>
        <PageHeader />
        <Main>
          <Routes>
            <Route path={"/projects"} element={<ProjectListScreen />}></Route>
            <Route
              path={"/projects/:projectId"}
              element={<ProjectScreen />}
            ></Route>
            <Navigate to={"/projects"} />
          </Routes>
        </Main>
        <ProjectModal />
      </BrowserRouter>
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
