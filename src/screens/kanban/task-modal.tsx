import { Form, Input, Modal } from "antd";
import { useForm } from "antd/lib/form/Form";
import { TaskTypeSelect } from "components/task-type-select";
import { UserSelect } from "components/user-select";
import { useEffect } from "react";
import { useEditTask } from "utils/use-tasks";
import { useTaskEditingModal, useTasksQueryKey } from "./utils"

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

export const TaskCreateModal = () => {
  const [form] = useForm();
  const { editingTaskId, editingTaskData, closeTaskModal } =
    useTaskEditingModal();
  const { mutateAsync: editTask, isLoading: editLoading } = useEditTask(
    useTasksQueryKey()
  );

  const onCancel = () => {
    closeTaskModal();
    form.resetFields();
  };

  const onOK = async () => {
    await editTask({ ...editingTaskData, ...form.getFieldsValue() });
    closeTaskModal();
  };

  useEffect(() => {
    form.setFieldsValue(editingTaskData);
    return () => {
      form.resetFields();
    };
  }, [form, editingTaskData]);

  return (
    <Modal
      onOk={onOK}
      onCancel={onCancel}
      okText="OK"
      cancelText="Cancel"
      confirmLoading={editLoading}
      title="Edit Task"
      visible={!!editingTaskId}
    >
      <Form {...layout} initialValues={editingTaskData} form={form}>
        <Form.Item
          label="Task Name"
          name="name"
          rules={[{ required: true, message: "Please type in a task name" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Assignee Name"
          name="processorId"
        >
          <UserSelect defaultOptionName='Assignee' />
        </Form.Item>
        <Form.Item
          label="Type"
          name="typeId"
        >
          <TaskTypeSelect />
        </Form.Item>
        <Form.Item
          label="Note"
          name="note"
        >
          <Input.TextArea />
        </Form.Item>
      </Form>
    </Modal>
  );
};
