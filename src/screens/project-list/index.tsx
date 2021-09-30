import React, { useState } from "react";
import qs from "qs";
import { cleanObject, useDebounce, useFetch } from "utils";
import { List } from "./list";
import { SearchPanel } from "./search-panel";

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

  const apiUrl = process.env.REACT_APP_BASE_URL;

  const debouncedParam = useDebounce(param, 500);

  const projectsApi = `${apiUrl}/projects?${qs.stringify(
    cleanObject(debouncedParam)
  )}`;
  // To fetch list data
  useFetch(projectsApi, setList, [debouncedParam, projectsApi]);

  const usersApi = `${apiUrl}/users`;
  // To fetch users data
  useFetch(usersApi, setUsers, [usersApi]);

  return (
    <div>
      <SearchPanel users={users} param={param} setParam={setParam} />
      <List users={users} list={list} />
    </div>
  );
};
