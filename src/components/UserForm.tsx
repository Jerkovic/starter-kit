import * as React from "react";
import {Col, Form, Input, Row, Select} from "antd";
import {DatePicker} from "antd/es";
import {FormInstance} from "antd/es/form";
import {User} from "../models/User";
import moment from "moment";

const {Option} = Select;

export interface UserFormProps {
    form: FormInstance;
    onFinish: (values: any) => void;
    user: User | null;
    mode: "create" | "edit";
}

export const UserForm = (props: UserFormProps) => {
    const [user, setUser] = React.useState<User | null>(props.user);

    React.useEffect(() => {
        setUser(props.user);
        console.log(user);
        if (user) {
            props.form.setFieldsValue({
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                phone: user.phone,
                gender: user.gender,
                birthYear: moment(user.birthYear, "YYYY")
            });
        }
    });

    return (
        <div>
            <Form
                form={props.form}
                layout="vertical"
                hideRequiredMark
                onFinish={props.onFinish}>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            name="firstName"
                            label="First Name"
                            rules={[
                                {
                                    required: true,
                                    message: "Please enter first name"
                                }
                            ]}>
                            <Input placeholder="Please enter first name" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="lastName"
                            label="Last Name"
                            rules={[
                                {
                                    required: true,
                                    message: "Please enter last name"
                                }
                            ]}>
                            <Input placeholder="Please enter last name" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            name="gender"
                            label="Gender"
                            rules={[
                                {
                                    required: true,
                                    message: "Please select gender"
                                }
                            ]}>
                            <Select placeholder="Please select gender">
                                <Option value="male">Male</Option>
                                <Option value="female">Female</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="birthYear"
                            label="Birth Year"
                            rules={[
                                {
                                    required: true,
                                    message: "Please select birth year"
                                }
                            ]}>
                            <DatePicker format={"YYYY"} picker="year" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            name="email"
                            label="E-mail"
                            rules={[
                                {
                                    type: "email",
                                    message: "The input is not valid E-mail!"
                                },
                                {
                                    required: true,
                                    message: "Please input your E-mail!"
                                }
                            ]}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="phone"
                            label="Phone Number"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your phone number!"
                                }
                            ]}>
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </div>
    );
};
