import styled from "@emotion/styled";
import PageHeader from "components/header";
import { ProjectListScreen } from "screens/project-list";
import { ProjectScreen } from "screens/project";
import { Navigate, Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import { useState } from "react";
import { ProjectModal } from "screens/project-list/project-create-modal";
import { Button } from "antd";
import { NoPaddingButton } from "components/lib";

const AuthenticatedApp = () => {
  const [projectModalOpen, setProjectModalOpen] = useState(false);

  const createProjectButton = (
    <NoPaddingButton onClick={()=>setProjectModalOpen(true)} type="link">
      Create project
    </NoPaddingButton>
  );

  return (
    <Container>
      <PageHeader createProjectButton={createProjectButton} />
      <Main>
        <BrowserRouter>
          <Routes>
            <Route
              path={"/projects"}
              element={
                <ProjectListScreen createProjectButton={createProjectButton} />
              }
            ></Route>
            <Route
              path={"/projects/:projectId/*"}
              element={<ProjectScreen />}
            ></Route>
            <Navigate to={"/projects"} />
          </Routes>
        </BrowserRouter>
      </Main>
      <ProjectModal
        projectModalOpen={projectModalOpen}
        onClose={() => setProjectModalOpen(false)}
      />
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
