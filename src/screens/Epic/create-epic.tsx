import styled from "@emotion/styled";
import { Button, Drawer, DrawerProps, Form, Input } from "antd";
import useForm from "antd/lib/form/hooks/useForm";
import { useEffect } from "react";
import { ErrorBox } from "../../components/lib";
import { useAddEpic } from "../../utils/use-epic";
import { useProjectIdInUrl } from '../kanban/utils';

export const CreateEpic = (
  props: Pick<DrawerProps, "visible"> & { onClose: () => void }
) => {
  const { visible, onClose } = props;
  const { mutate: addEpic, isLoading: mutateLoading, error } = useAddEpic();
  const [form] = useForm();
  const projectId = useProjectIdInUrl()

  const onFinish = async (values: any) => {
    await addEpic({...values, projectId});
    onClose();
  };

  useEffect(() => {
    form.resetFields();
    return () => {};
  }, [form, visible]);

  return (
    <Drawer
      visible={visible}
      onClose={onClose}
      forceRender
      destroyOnClose
      width={"100%"}
    >
      <Container>
        <>
          <h2>Create Epic</h2>
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
                { required: true, message: "Please Type In a Epic Name" },
              ]}
            >
              <Input placeholder="Please Type In a Epic Name" />
            </Form.Item>
            <Form.Item style={{ textAlign: "center" }}>
              <Button type="primary" htmlType="submit" loading={mutateLoading}>
                SUBMIT
              </Button>
            </Form.Item>
          </Form>
        </>
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
