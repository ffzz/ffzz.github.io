import styled from "@emotion/styled";
import { Card, Input, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { useAddTask } from "utils/use-tasks";
import { useProjectIdInUrl, useTasksQueryKey } from "./utils";

export const CreateTask = ({ kanbanId }: { kanbanId: number }) => {
  const [name, setName] = useState("");
  const { mutateAsync: addTask } = useAddTask(useTasksQueryKey());
  const projectId = useProjectIdInUrl();
  const [inputMode, setInputMode] = useState(false);

  const submit = async () => {
    await addTask({ projectId, name, kanbanId });
    setInputMode(false);
    setName("");
  };

  const toggle = () => setInputMode((mode) => !mode);

  const changeHandler = (
    e: {target:HTMLInputElement} 
  ) => {
    setName(e?.target.value);
  };

  useEffect(() => {
    if(!inputMode){
      setName('')
    }
  }, [inputMode])

  if (!inputMode) {
    return (
      <Text onClick={toggle} type='success' >
         + Create a task!
      </Text>
    );
  }

  return (
    <Card>
      <Input
        onPressEnter={submit}
        value={name}
        onChange={changeHandler}
        onBlur={toggle}
        placeholder="What to do"
        autoFocus={true}
      />
    </Card>
  );
};

const Text = styled(Typography.Text)`
  margin: 1rem;
  cursor: pointer;
`;