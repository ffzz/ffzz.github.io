import { Button, Input } from "antd";
import { Row } from "components/lib";
import { TaskTypeSelect } from "components/task-type-select";
import { UserSelect } from "components/user-select";
import { useUrlQueryParam } from "utils/url";
import { useTasksSearchParams } from "./utils";

export const SearchPanel = () => {
  //const searchParams = useTasksSearchParams()
  const [searchParams , setSearchParams] = useUrlQueryParam([
    "typeId",
    "processorId",
    "tagId",
    "name",
  ]);
  const reset = () => {
    setSearchParams({
      typeId: undefined,
      processorId: undefined,
      tagId: undefined,
      name: undefined,
    });
  };

  return <Row marginBottom={2} gap={true}>
    <Input style={{width:'20rem'}} placeholder='Task Name' value={searchParams.name} onChange={evt => setSearchParams({name:evt.target.value})} />
    <UserSelect defaultOptionName='Assignee' value={searchParams.processorId} onChange={value => setSearchParams({processorId: value})} />
    <TaskTypeSelect defaultOptionName='Type' value={searchParams.typeId} onChange={value => setSearchParams({typeId: value})} />
    <Button onClick={reset}>Clear search params</Button>
  </Row>;
};
