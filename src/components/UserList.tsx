import {DeleteFilled, EditFilled} from "@ant-design/icons";
import {Button, message, Modal, Table} from "antd/es";
import {ColumnsType} from "antd/es/table";
import * as React from "react";
import {useCollection} from "react-firebase-hooks/firestore";
import {User} from "../models/User";
import firebaseWrapper from "../services/firebaseWrapper";
import {UserDrawer} from "./UserDrawer";
import {UserForm} from "./UserForm";
import {useForm} from "antd/es/form/Form";

const {confirm} = Modal;

export const UserList = () => {
    const [visible, setVisible] = React.useState(false);
    const [editUser, setEditUser] = React.useState<User | null>(null);
    const [form] = useForm();
    const [querySnapshot, loading, error] = useCollection(
        // todo ajax server side pagination, sorter, filter
        firebaseWrapper.db.collection("users").orderBy("firstName", "asc"),
        {
            snapshotListenOptions: {includeMetadataChanges: true}
        }
    );

    const onUpdateUser = (values: any) => {
        if (editUser) {
            firebaseWrapper.db
                .collection("users")
                .doc(editUser.id)
                .update({
                    firstName: values.firstName,
                    lastName: values.lastName,
                    birthYear: values.birthYear.year(),
                    gender: values.gender,
                    email: values.email,
                    phone: values.phone,
                    isActive: false
                })
                .then(() => {
                    setVisible(false);
                    form.resetFields();
                    message.info(`User was successfully updated.`);
                })
                .catch((e) => {
                    message.error(e.message);
                });
        }
    };

    function showDeleteConfirm(user: User) {
        confirm({
            content:
                "if you delete this user account data associated with this account will also be removed and cannot be recovered.",
            title: `Are you sure you want to delete '${user.firstName} ${user.lastName}'?`,
            okText: "Yes",
            okType: "danger",
            cancelText: "No",
            onOk() {
                deleteUser(user.id)
                    .then(() => {
                        message.info("User was deleted successfully");
                    })
                    .catch((e) => {
                        message.error(e.message);
                    });
            },
            onCancel() {}
        });
    }

    async function deleteUser(userId: string) {
        try {
            await firebaseWrapper.db
                .collection("users")
                .doc(userId)
                .delete();
        } catch (error) {
            throw error;
        }
    }

    const columns: ColumnsType<User> = [
        {
            dataIndex: "id",
            key: "id",
            title: "Id",
            width: 260
        },
        {
            dataIndex: "firstName",
            key: "firstName",
            title: "First name"
        },
        {
            dataIndex: "lastName",
            key: "lastName",
            title: "Last name"
        },
        {
            dataIndex: "gender",
            filters: [
                {text: "Male", value: "male"},
                {text: "Female", value: "female"}
            ],
            key: "gender",
            title: "Gender"
        },
        {
            dataIndex: "birthYear",
            key: "birthYear",
            sorter: (a: User, b: User) => a.birthYear - b.birthYear,
            title: "Birth year"
        },
        {
            dataIndex: "email",
            key: "email",
            title: "E-mail"
        },
        {
            dataIndex: "phone",
            key: "phone",
            title: "Phone"
        },
        {
            key: "action-edit",
            render: (user: User) => (
                <Button
                    type="primary"
                    shape="circle"
                    icon={<EditFilled translate={1} />}
                    size={"small"}
                    onClick={() => {
                        form.resetFields();
                        setEditUser(user);
                        setVisible(true);
                    }}
                />
            ),
            title: "",
            width: 64
        },
        {
            key: "action-delete",
            render: (user: User) => (
                <Button
                    danger
                    shape="circle"
                    icon={<DeleteFilled translate={1} />}
                    size={"small"}
                    onClick={() => {
                        showDeleteConfirm(user);
                    }}
                />
            ),
            title: "",
            width: 64
        }
    ];

    return (
        <div>
            <Modal
                title={"Edit User"}
                width={800}
                key={"user-modal"}
                centered
                maskClosable={false}
                onCancel={() => setVisible(false)}
                visible={visible}
                footer={[
                    <Button key="back" onClick={() => setVisible(false)}>
                        Cancel
                    </Button>,
                    <Button
                        key="submit"
                        type="primary"
                        onClick={form.submit}
                        style={{marginRight: 8}}>
                        Save
                    </Button>
                ]}>
                {editUser && (
                    <UserForm
                        mode={"edit"}
                        user={editUser}
                        form={form}
                        onFinish={onUpdateUser}
                    />
                )}
            </Modal>
            {error && <strong>Error: {JSON.stringify(error)}</strong>}
            {querySnapshot && (
                <>
                    <Table<User>
                        bordered
                        title={() => <UserDrawer />}
                        loading={loading}
                        rowKey={"id"}
                        dataSource={querySnapshot.docs.map((doc) => {
                            const user = {...doc.data(), id: doc.id};
                            return user as User;
                        })}
                        columns={columns}
                        onChange={(pagination, filters, sorter) => {
                            console.log({pagination, filters, sorter});
                        }}
                    />
                </>
            )}
        </div>
    );
};
