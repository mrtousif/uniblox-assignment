import React, { useState } from 'react';
import { Button, Form, Input, InputNumber, Radio } from 'antd';
import type { FormProps } from 'antd';

export type FieldType = {
  code?: string;
  amount?: number;
  nthOrder?: number;
};

type Props = {
  onFinish: (values: FieldType) => void;
};

const DiscountForm = ({ onFinish }: Props) => {
  const [form] = Form.useForm();

  return (
    <Form
      layout={'inline'}
      form={form}
      initialValues={{ layout: 'inline' }}
      onFinish={onFinish}
    >
      <Form.Item<FieldType>
        label="Code"
        name="code"
        rules={[{ required: true }]}
      >
        <Input placeholder="input discount code" />
      </Form.Item>
      <Form.Item<FieldType>
        label="Amount"
        name="amount"
        rules={[{ required: true, type: 'integer' }]}
      >
        <InputNumber placeholder="input amount" />
      </Form.Item>
      <Form.Item<FieldType>
        label="Nth Order"
        name="nthOrder"
        rules={[{ required: true, type: 'integer' }]}
      >
        <InputNumber placeholder="input nth order" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default DiscountForm;
