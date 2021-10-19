import { useAuth } from "context/auth-context";
import React from "react";
import { Button, Form, Input } from "antd";
import { useAsyncHttp } from "utils/use-AsyncHttp";

export default function RegisterScreen({
  onError,
}: {
  onError: (error: Error) => void;
}) {
  const { register } = useAuth();
  const { fetchData, isLoading } = useAsyncHttp(undefined,{throwError:true});

  const handleSubmit = async ({
    cpassword,
    ...values
  }: {
    cpassword: string;
    username: string;
    password: string;
  }) => {
    if (cpassword !== values.password) {
      onError(new Error("Please make sure you enter the same password twice."));
      return;
    }
    try {
      await fetchData(register(values));
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
        <Input placeholder="username" type="text" id={"username"} />
      </Form.Item>
      <Form.Item
        name={"password"}
        rules={[{ required: true, message: "Please type in password" }]}
      >
        <Input placeholder="password" type="password" id={"password"} />
      </Form.Item>
      <Form.Item
        name={"cpassword"}
        rules={[{ required: true, message: "Please type in password again" }]}
      >
        <Input
          placeholder="conform your password"
          type="password"
          id={"cpassword"}
        />
      </Form.Item>
      <Button loading={isLoading} htmlType={"submit"} type={"primary"}>
        Register
      </Button>
    </Form>
  );
}
