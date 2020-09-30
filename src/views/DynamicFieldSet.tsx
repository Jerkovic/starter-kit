import {MinusCircleOutlined, PlusOutlined} from "@ant-design/icons";
import {Button} from "antd";
import {Form, Input} from "antd/es";
import React from "react";

const formItemLayout = {
    labelCol: {
        sm: {span: 4},
        xs: {span: 24}
    },
    wrapperCol: {
        sm: {span: 20},
        xs: {span: 24}
    }
};
const formItemLayoutWithOutLabel = {
    wrapperCol: {
        sm: {span: 20, offset: 4},
        xs: {span: 24, offset: 0}
    }
};

export const DynamicFieldSet = () => {
    const onFinish = (values: any) => {
        console.log("Received values of form:", values);
    };

    return (
        <Form
            name="dynamic_form_item"
            {...formItemLayoutWithOutLabel}
            onFinish={onFinish}>
            <Form.List name="names">
                {(fields, {add, remove}) => {
                    return (
                        <div>
                            {fields.map((field, index) => (
                                <Form.Item
                                    {...(index === 0
                                        ? formItemLayout
                                        : formItemLayoutWithOutLabel)}
                                    label={index === 0 ? "Interest" : ""}
                                    required={false}
                                    key={field.key}>
                                    <Form.Item
                                        {...field}
                                        validateTrigger={["onChange", "onBlur"]}
                                        rules={[
                                            {
                                                message:
                                                    "Please input or delete this field",
                                                required: true,
                                                whitespace: true
                                            }
                                        ]}
                                        noStyle>
                                        <Input
                                            placeholder="enter some data"
                                            style={{width: "60%"}}
                                        />
                                    </Form.Item>
                                    {fields.length > 1 ? (
                                        <MinusCircleOutlined
                                            translate={1}
                                            className="dynamic-delete-button"
                                            style={{margin: "0 8px"}}
                                            onClick={() => {
                                                remove(field.name);
                                            }}
                                        />
                                    ) : null}
                                </Form.Item>
                            ))}
                            <Form.Item>
                                <Button
                                    type="dashed"
                                    onClick={() => {
                                        add();
                                    }}
                                    style={{width: "60%"}}>
                                    Add field
                                </Button>
                                <Button
                                    type="dashed"
                                    onClick={() => {
                                        add("The head item", 0);
                                    }}
                                    style={{width: "60%", marginTop: "20px"}}>
                                    Add field at head
                                </Button>
                            </Form.Item>
                        </div>
                    );
                }}
            </Form.List>

            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};
