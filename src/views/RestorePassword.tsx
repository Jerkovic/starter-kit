import * as React from "react";
import {Form, Input, message} from "antd/es";
import {Button} from "antd";
import firebaseWrapper from "../services/firebaseWrapper";

const layout = {
    labelCol: {span: 8},
    wrapperCol: {span: 8}
};

const tailLayout = {
    wrapperCol: {offset: 8, span: 8}
};

export const RestorePassword = () => {
    const [email, setEmail] = React.useState("");
    const [submitted, setSubmitted] = React.useState(false);

    async function sendPasswordResetEmail() {
        try {
            await firebaseWrapper.sendPasswordResetEmail(email);
        } catch (error) {
            throw error;
        }
    }

    const onFinish = (values: any) => {
        setSubmitted(true);
        sendPasswordResetEmail()
            .then(() => {
                message.info("Email was sent");
                setSubmitted(false);
            })
            .catch((e) => {
                setSubmitted(false);
                message.error(e.message);
            });
    };

    return (
        <div>
            <Form
                {...layout}
                name="login-form"
                initialValues={{remember: true}}
                hideRequiredMark
                onFinish={onFinish}
                onFinishFailed={() => console.log("finish fail")}>
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

                <Form.Item {...tailLayout}>
                    <Button
                        block
                        loading={submitted}
                        type="primary"
                        htmlType="submit">
                        Send
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};
