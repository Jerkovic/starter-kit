import {PlusOutlined} from "@ant-design/icons";
import {Button, Col, Drawer, Form, Input, Row, Select} from "antd";
import * as React from "react";
import {UserForm} from "./UserForm";

export const UserDrawer = () => {
    const [visible, setVisible] = React.useState(false);
    const [form] = Form.useForm();

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
                            type="primary"
                            onClick={form.submit}
                            style={{marginRight: 8}}>
                            Save
                        </Button>
                    </div>
                }>
                <UserForm form={form} onFinish={() => setVisible(false)} />
            </Drawer>
        </>
    );
};
