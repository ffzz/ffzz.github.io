import styled from "@emotion/styled";
import { Button, Drawer, Form, Input, Spin } from "antd";
import { useForm } from "antd/lib/form/Form";
import { ErrorBox } from "components/lib";
import { UserSelect } from "components/user-select";
import { useEffect } from "react";
import { useAddProject, useEditProject } from "utils/use-project";
import { useProjectModal } from "./util";

export const ProjectModal = () => {
  const { isOpen, closeCreateProject, closeEditingProject, editingProject, isLoading } =
    useProjectModal();

  const useMutateProject = editingProject ? useEditProject : useAddProject;
  const {mutateAsync, error, isLoading:mutateLoading} = useMutateProject()
  const [form] = useForm()
  const title = editingProject ? "Editing Project" : "Create Project";
  const close = editingProject ? closeEditingProject:closeCreateProject
  const onFinish = (values: any) => {
    mutateAsync({...editingProject, ...values}).then(() => {
      form.resetFields()
      close();
    })
  };

  useEffect(() => {
    form.setFieldsValue(editingProject)
    return () => {
      form.resetFields()
    }
  },[editingProject, form])

  return (
    <Drawer forceRender={true} onClose={close} visible={isOpen} width={"100%"}>
      <Container>
        {isLoading ? (
          <Spin size="large" />
        ) : (
          <>
            <h2>{title}</h2>
            <ErrorBox error={error} />
            <Form
              form={form}
              layout="vertical"
              style={{ width: "40rem" }}
              onFinish={onFinish}
            >
              <Form.Item
                label="Name"
                name="name"
                rules={[
                  { required: true, message: "Please Type In a Project Name" },
                ]}
              >
                <Input placeholder="Please Type In a Project Name" />
              </Form.Item>
              <Form.Item
                label="Organization"
                name="organization"
                rules={[
                  {
                    required: true,
                    message: "Please Type In a organization Name",
                  },
                ]}
              >
                <Input placeholder="Please Type In a Project Name" />
              </Form.Item>
              <Form.Item label="Leader" name="personId">
                <UserSelect defaultOptionName="Leader" />
              </Form.Item>
              <Form.Item style={{textAlign:'center'}}>
                <Button type="primary" htmlType="submit" loading={mutateLoading}>
                  SUBMIT
                </Button>
              </Form.Item>
            </Form>
          </>
        )}
      </Container>
    </Drawer>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 80vh;
`;
