import {  Input } from "antd";
import { useState } from "react";
import { useAddKanban } from "utils/use-kanban";
import { Container } from "./kanban-column";
import { useProjectIdInUrl } from "./utils";

export default function CreateKanban() {
  const [name, setName] = useState("");
  const projectId = useProjectIdInUrl();
  useAddKanban();
  const { mutateAsync: addKanban } = useAddKanban();

  const submit = async () => {
    const data = { name, projectId };
    await addKanban(data);
    setName('')
  };

  return (
    <Container>
      <Input
        size="small"
        placeholder="Kanban column name"
        onPressEnter={submit}
        name="name"
        value={name}
        onChange={(evt) => setName(evt.target.value)}
      />
    </Container>
  );
}
