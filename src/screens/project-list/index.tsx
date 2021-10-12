
import { useDebounce, useDocumentTitle } from "utils";
import { List } from "./list";
import { SearchPanel } from "./search-panel";
import styled from "@emotion/styled";
import { Typography } from "antd";
import {useProjects} from "utils/project";
import { useUsers } from "utils/users";
import { useProjectsSearchParams } from "./util";



export const ProjectListScreen = () => {

  useDocumentTitle('Project list', false)

  const [param, setParam] = useProjectsSearchParams()
  const debouncedParam = useDebounce(param, 200);
  

  // To fetch list da
  const {isLoading, error, data: list, refetch} = useProjects(debouncedParam)
  // To fetch users data
  const {data: users} = useUsers()

  return (
    <Container>
      <h3>Projects List</h3>
      <SearchPanel
        users={users || []}
        param={param}
        setParam={setParam}
      />
      {error ? (
        <Typography.Text type="warning">{error.message}</Typography.Text>
      ) : (
        ""
      )}
      <List refresh={refetch} users={users || []} dataSource={list || []} loading={isLoading} />
    </Container>
  );
};

const Container = styled.div`
  padding: 2rem 3.2rem;
`;
