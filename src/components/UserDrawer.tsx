import {PlusOutlined} from "@ant-design/icons";
import {Button, Drawer, Form} from "antd";
import * as React from "react";
import {UserForm} from "./UserForm";
import firebaseWrapper from "../services/firebaseWrapper";
import {message} from "antd/es";

export const UserDrawer = () => {
    const [visible, setVisible] = React.useState(false);
    const [submitted, setSubmitted] = React.useState(false);
    const [form] = Form.useForm();

    const onCreateUser = (values: any) => {
        setSubmitted(true);
        firebaseWrapper.db
            .collection("users")
            .add({
                firstName: values.firstName,
                lastName: values.lastName,
                birthYear: values.birthYear.year(),
                gender: values.gender,
                email: values.email,
                phone: values.phone,
                isActive: false
            })
            .then((docRef) => {
                setVisible(false);
                form.resetFields();
                message.info(
                    `User with id '${docRef.id}' was successfully created.`
                );
            })
            .catch((e) => {
                message.error(e.message);
                setSubmitted(false);
            });
    };

    return (
        <>
            <Button
                type="primary"
                style={{marginBottom: 8}}
                onClick={() => setVisible(true)}>
                <PlusOutlined translate={1} /> Add new User
            </Button>
            <Drawer
                title="Create a new User"
                width={720}
                onClose={() => setVisible(false)}
                visible={visible}
                bodyStyle={{paddingBottom: 80}}
                footer={
                    <div
                        style={{
                            textAlign: "right"
                        }}>
                        <Button
                            onClick={() => form.resetFields()}
                            style={{marginRight: 8}}>
                            Reset form
                        </Button>
                        <Button
                            loading={submitted}
                            type="primary"
                            onClick={form.submit}
                            style={{marginRight: 8}}>
                            Save
                        </Button>
                    </div>
                }>
                <UserForm
                    user={null}
                    mode={"create"}
                    form={form}
                    onFinish={onCreateUser}
                />
            </Drawer>
        </>
    );
};
