import { useDebounce, useDocumentTitle } from "utils";
import { List } from "./list";
import { SearchPanel } from "./search-panel";
import styled from "@emotion/styled";
import { useProjects } from "utils/use-project";
import { useUsers } from "utils/use-users";
import { useProjectModal, useProjectsSearchParams } from "./util";
import { ErrorBox, NoPaddingButton, Row } from "components/lib";

export const ProjectListScreen = () => {
  useDocumentTitle("Project list", false);

  const [param, setParam] = useProjectsSearchParams();
  const debouncedParam = useDebounce(param, 200);

  const { open } = useProjectModal();

  // To fetch list da
  const { isLoading, error, data: list } = useProjects(debouncedParam);
  // To fetch users data
  const { data: users } = useUsers();

  return (
    <Container>
      <Row between={true}>
        <h3>Projects List</h3>
        <NoPaddingButton onClick={open} type="link">
          Create project
        </NoPaddingButton>
      </Row>
      <SearchPanel users={users || []} param={param} setParam={setParam} />
      {error ? <ErrorBox error={error} /> : ""}
      <List users={users || []} dataSource={list || []} loading={isLoading} />
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  padding: 2rem 3.2rem;
`;
