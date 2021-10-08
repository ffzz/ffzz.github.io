import React, { useState, useEffect } from "react";
import { cleanObject, useDebounce } from "utils";
import { List } from "./list";
import { SearchPanel } from "./search-panel";
import { useHttp } from "utils/http";

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
    <div>
      <SearchPanel users={users} param={param} setParam={setParam} />
      <List users={users} list={list} />
    </div>
  );
};
