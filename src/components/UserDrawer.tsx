import {PlusOutlined} from "@ant-design/icons";
import {Button, Col, Drawer, Form, Input, Row, Select} from "antd";
import * as React from "react";

export const UserDrawer = () => {
    const [visible, setVisible] = React.useState(false);

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
                            onClick={() => setVisible(false)}
                            style={{marginRight: 8}}>
                            Cancel
                        </Button>
                        <Button
                            onClick={() => console.log("submitted")}
                            style={{marginRight: 8}}>
                            Submit
                        </Button>
                    </div>
                }>
                <Form layout="vertical" hideRequiredMark>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="name"
                                label="Name"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please enter user name"
                                    }
                                ]}>
                                <Input placeholder="Please enter user name" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="url"
                                label="Url"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please enter url"
                                    }
                                ]}>
                                <Input
                                    style={{width: "100%"}}
                                    addonBefore="http://"
                                    addonAfter=".com"
                                    placeholder="Please enter url"
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="owner"
                                label="Owner"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please select an owner"
                                    }
                                ]}>
                                <Select placeholder="Please select an owner"></Select>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="type"
                                label="Type"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please choose the type"
                                    }
                                ]}>
                                <Select placeholder="Please choose the type"></Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="approver"
                                label="Approver"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please choose the approver"
                                    }
                                ]}>
                                <Select placeholder="Please choose the approver"></Select>
                            </Form.Item>
                        </Col>
                        <Col span={12}></Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                name="description"
                                label="Description"
                                rules={[
                                    {
                                        required: true,
                                        message: "please enter url description"
                                    }
                                ]}>
                                <Input.TextArea
                                    rows={4}
                                    placeholder="please enter url description"
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Drawer>
        </>
    );
};
