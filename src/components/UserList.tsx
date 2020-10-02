import {DeleteFilled, EditFilled} from "@ant-design/icons";
import {Button, message, Modal, Popconfirm, Table} from "antd/es";
import * as React from "react";
import {useCollection} from "react-firebase-hooks/firestore";
import {User} from "../models/User";
import firebaseWrapper from "../services/firebaseWrapper";

const {confirm} = Modal;

export const UserList = () => {
    const [data, loading, error] = useCollection(
        firebaseWrapper.db.collection("users"),
        {
            snapshotListenOptions: {includeMetadataChanges: true}
        }
    );

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
                    .then()
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

    const columns = [
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
                    onClick={() => console.log("modal edit")}
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
            {error && <strong>Error: {JSON.stringify(error)}</strong>}
            {data && (
                <>
                    <Table
                        title={() => (
                            <Button type="primary" style={{marginBottom: 16}}>
                                Add new User
                            </Button>
                        )}
                        loading={loading}
                        rowKey={"id"}
                        dataSource={data.docs.map((doc) => {
                            const user = {...doc.data(), id: doc.id};
                            return user as User;
                        })}
                        columns={columns}
                    />
                </>
            )}
        </div>
    );
};
