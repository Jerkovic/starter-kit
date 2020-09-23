// @flow
import * as React from "react";
import firebase from "../services/firebase";
import {useState} from "react";
import {Button} from "antd";
import {Checkbox, Form, Input, message} from "antd/es";
import {useHistory} from "react-router-dom";

const layout = {
    labelCol: {span: 8},
    wrapperCol: {span: 8}
};
const tailLayout = {
    wrapperCol: {offset: 8, span: 8}
};

export const Login = () => {
    const history = useHistory();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function login() {
        try {
            await firebase.login(email, password);
            message.success("You are logged in");
            history.push("/");
        } catch (error) {
            message.error("Error occurred" + error);
        }
    }

    const onFinish = (values: any) => {
        login().then();
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log("Failed:", errorInfo);
    };

    return (
        <div>
            <Form
                {...layout}
                name="basic"
                initialValues={{remember: true}}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}>
                <Form.Item
                    label="E-mail"
                    name="email"
                    rules={[
                        {required: true, message: "Please input your e-mail."}
                    ]}>
                    <Input
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {required: true, message: "Please input your password."}
                    ]}>
                    <Input.Password
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                </Form.Item>

                <Form.Item
                    {...tailLayout}
                    name="remember"
                    valuePropName="checked">
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                        Sign in
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};
