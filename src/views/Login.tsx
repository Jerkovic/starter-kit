import {Button} from "antd";
import {Checkbox, Form, Input, message} from "antd/es";
import * as React from "react";
import {useHistory} from "react-router-dom";
import firebaseWrapper from "../services/firebaseWrapper";

const layout = {
    labelCol: {span: 8},
    wrapperCol: {span: 8}
};
const tailLayout = {
    wrapperCol: {offset: 8, span: 8}
};

export const Login = () => {
    const history = useHistory();
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    async function login() {
        try {
            await firebaseWrapper.login(email, password);
            history.push("/");
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    const onFinish = (values: any) => {
        login()
            .then()
            .catch((e) => message.error(e.message));
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
