import { useAuth } from "context/auth-context";
import React from "react";
import { Button, Form, Input } from "antd";

export default function RegisterScreen() {
  const { register } = useAuth();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const username = (e.currentTarget.elements[0] as HTMLInputElement).value;
    const password = (e.currentTarget.elements[1] as HTMLInputElement).value;
    register({ username, password });
  };

  return (
    <Form onFinish={handleSubmit} autoComplete="off">
      <Form.Item name={"username"}>
        <Input placeholder='username' type="text" id={"username"} />
      </Form.Item>
      <Form.Item name={"password"}>
        <Input placeholder='password' type="password" id={"password"} />
      </Form.Item>
      <Button htmlType={"submit"} type={"primary"}>
        Register
      </Button>
    </Form>
  );
}
