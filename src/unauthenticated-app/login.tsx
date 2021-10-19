import { Button, Form, Input } from "antd";
import FormItem from "antd/lib/form/FormItem";
import { useAuth } from "context/auth-context";
import React from "react";
import { useAsyncHttp } from "utils/use-AsyncHttp";

export default function LoginScreen({
  onError,
}: {
  onError: (error: Error) => void;
}) {
  const { login } = useAuth();
  const { fetchData, isLoading} = useAsyncHttp(undefined, {throwError: true})

  const handleSubmit = async (values: {
    username: string;
    password: string;
  }) => {
    try {
     await fetchData(login(values))
    } catch (error: any) {
      onError(error);
    }
  };

  return (
    <Form onFinish={handleSubmit} autoComplete="off">
      <Form.Item
        name={"username"}
        rules={[{ required: true, message: "Please type in username" }]}
      >
        <Input placeholder={"username"} type="text" id={"username"} />
      </Form.Item>
      <FormItem
        name={"password"}
        rules={[{ required: true, message: "Please type in password" }]}
      >
        <Input placeholder={"password"} type="password" id={"password"} />
      </FormItem>
      <Button loading={isLoading} htmlType={"submit"} type={"primary"}>
        Login
      </Button>
    </Form>
  );
}
