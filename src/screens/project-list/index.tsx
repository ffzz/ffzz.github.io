import React, { useState, useEffect } from "react";
import { cleanObject, useDebounce } from "utils";
import { List } from "./list";
import { SearchPanel } from "./search-panel";
import { useHttp } from "utils/http";
import styled from "@emotion/styled";

interface param {
  name: string,
  personId: string
}

export const ProjectListScreen = () => {
  const initialState:param = {
    name: "",
    personId: "",
  };

  const [list, setList] = useState([]);
  const [param, setParam] = useState(initialState);
  const [users, setUsers] = useState([]);

  const debouncedParam = useDebounce(param, 500);

  const clientHttp = useHttp()
  useEffect(() => {
    clientHttp('projects',{data:cleanObject(debouncedParam)}).then(setList)
  },[debouncedParam])
  // To fetch list da

  // To fetch users data
  useEffect(()=>{
    clientHttp('users').then(setUsers)
  }, [])

  return (
    <Container>
      <h3>Projects List</h3>
      <SearchPanel users={users} param={param} setParam={setParam} />
      <List users={users} list={list} />
    </Container>
  );
};

const Container = styled.div`
  padding: 2rem 3.2rem;
`
