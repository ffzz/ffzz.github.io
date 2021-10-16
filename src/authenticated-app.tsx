import styled from "@emotion/styled";
import PageHeader from "components/header";
import { ProjectListScreen } from "screens/project-list";
import { ProjectScreen } from "screens/project";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ProjectModal } from "screens/project-list/project-create-modal";

const AuthenticatedApp = () => {
  return (
    <Container>
      <BrowserRouter>
        <PageHeader />
        <Main>
          <Routes>
            <Route path={"/projects"} element={<ProjectListScreen />} />
            <Route
              path={"/projects/:projectId/*"}
              element={<ProjectScreen />}
            />
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

const Main = styled.main`
  display: flex;
  overflow: hidden;
`;

export default AuthenticatedApp;
