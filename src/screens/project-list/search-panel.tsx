import { Input, Form } from "antd";
import { UserSelect } from "components/user-select";
import React from "react";
import { Project } from "./list";

export interface User {
  id: number;
  name: string;
  email: string;
  tittle: string;
  organization: string;
  token: string;
}

interface SearchPanelProps {
  users: User[];
  param: Partial<Pick<Project, "name" | "personId">>;
  setParam: (param: SearchPanelProps["param"]) => void;
}

export const SearchPanel = ({ param, setParam }: SearchPanelProps) => {
  const handleChange: (e: React.FormEvent<HTMLInputElement>) => void = (e) => {
    setParam({ ...param, name: e.currentTarget.value });
  };

  return (
    <Form layout="inline" style={{ marginBottom: "2rem" }}>
      <Form.Item>
        <Input
          type="text"
          placeholder="project name"
          value={param.name}
          onChange={handleChange}
        />
      </Form.Item>
      <Form.Item>
        <UserSelect
          defaultOptionName='Leader'
          value={param.personId}
          onChange={(value: number | undefined) =>
            setParam({ ...param, personId: value })
          }
        />
      </Form.Item>
    </Form>
  );
};
