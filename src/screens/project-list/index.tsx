import  { useState } from "react";
import { useDebounce } from "utils";
import { List } from "./list";
import { SearchPanel } from "./search-panel";
import styled from "@emotion/styled";
import { Typography } from "antd";
import useProjects from "utils/project";
import { useUsers } from "utils/users";

interface param {
  name: string;
  personId: string;
}

export const ProjectListScreen = () => {
  const initialState: param = {
    name: "",
    personId: "",
  };

  const [param, setParam] = useState(initialState);
  // const [list, setList] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState<null | Error>(null);

  const debouncedParam = useDebounce(param, 200)

  // To fetch list da
  const {isLoading, error, data: list} = useProjects(debouncedParam)

  // To fetch users data
  const {data: users} = useUsers()

  return (
    <Container>
      <h3>Projects List</h3>
      <SearchPanel users={users || []} param={param} setParam={setParam} />
      {error ? (
        <Typography.Text type='warning'>{error.message}</Typography.Text>
      ) : (
        ""
      )}
      <List users={users || []} dataSource={list || [] } loading={isLoading} />
    </Container>
  );
};

const Container = styled.div`
  padding: 2rem 3.2rem;
`;
