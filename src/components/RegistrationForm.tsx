import {Button, Checkbox, Form, Input} from "antd";
import {message, notification} from "antd/es";
import React from "react";
import {useHistory} from "react-router-dom";
import firebaseWrapper from "../services/firebaseWrapper";

const formItemLayout = {
    labelCol: {
        sm: {span: 8},
        xs: {span: 24}
    },
    wrapperCol: {
        sm: {span: 8},
        xs: {span: 24}
    }
};
const tailFormItemLayout = {
    wrapperCol: {
        sm: {
            offset: 8,
            span: 8
        },
        xs: {
            offset: 0,
            span: 24
        }
    }
};

export const RegistrationForm = () => {
    const [form] = Form.useForm();
    const history = useHistory();
    const [submitted, setSubmitted] = React.useState(false);

    const openNotification = () => {
        notification.open({
            description: "This is the content of the notification",
            message: "Account",
            onClick: () => {
                console.log("Notification Clicked!");
            }
        });
    };

    const onFinish = (values: any) => {
        setSubmitted(true);
        firebaseWrapper
            .register(values.email, values.password)
            .then(() => {
                history.push("/login");
                openNotification();
            })
            .catch((e) => {
                setSubmitted(false);
                message.error(e.message);
            });
    };

    return (
        <Form
            {...formItemLayout}
            form={form}
            name="register"
            onFinish={onFinish}
            scrollToFirstError>
            <Form.Item
                name="email"
                label="E-mail"
                rules={[
                    {
                        message: "The input is not valid E-mail",
                        type: "email"
                    },
                    {
                        message: "Please input your E-mail",
                        required: true
                    }
                ]}>
                <Input />
            </Form.Item>

            <Form.Item
                name="password"
                label="Password"
                rules={[
                    {
                        message: "Please input your password!",
                        required: true
                    }
                ]}
                hasFeedback>
                <Input.Password />
            </Form.Item>

            <Form.Item
                name="confirm"
                label="Confirm Password"
                dependencies={["password"]}
                hasFeedback
                rules={[
                    {
                        message: "Please confirm your password!",
                        required: true
                    },
                    ({getFieldValue}) => ({
                        validator(rule, value) {
                            if (!value || getFieldValue("password") === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject(
                                "The two passwords that you entered do not match!"
                            );
                        }
                    })
                ]}>
                <Input.Password />
            </Form.Item>
            <Form.Item
                name="agreement"
                valuePropName="checked"
                rules={[
                    {
                        validator: (_, value) =>
                            value
                                ? Promise.resolve()
                                : Promise.reject("Should accept agreement")
                    }
                ]}
                {...tailFormItemLayout}>
                <Checkbox>
                    I have read the <a href="">agreement</a>
                </Checkbox>
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
                <Button
                    block
                    loading={submitted}
                    type="primary"
                    htmlType="submit">
                    Register
                </Button>
            </Form.Item>
        </Form>
    );
};
