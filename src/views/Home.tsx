import {DeleteFilled, EditFilled} from "@ant-design/icons";
import {
    Button,
    Card,
    Popconfirm,
    Progress,
    Spin,
    Table,
    Typography
} from "antd/es";
import * as React from "react";
import {useCollection} from "react-firebase-hooks/firestore";
import Breakpoints from "../components/Breakpoints";
import {User} from "../models/User";
import firebaseWrapper from "../services/firebaseWrapper";
const {Text} = Typography;

export const Home = () => {
    const [data, loading, error] = useCollection(
        firebaseWrapper.db.collection("users"),
        {
            snapshotListenOptions: {includeMetadataChanges: true}
        }
    );

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
                <Popconfirm
                    title={`Delete ${user.firstName}?`}
                    onConfirm={() => console.log("deleting")}
                    okText="Yes"
                    cancelText="No">
                    <Button
                        danger
                        shape="circle"
                        icon={<DeleteFilled translate={1} />}
                        size={"small"}
                    />
                </Popconfirm>
            ),
            title: "",
            width: 64
        }
    ];

    return (
        <div>
            <Breakpoints />
            <Card title="Profile" style={{width: 400, marginTop: 16}}>
                <p>
                    <Text type="secondary">
                        this is some text about your profile grading
                    </Text>
                </p>
                <Progress
                    key="profile-progress"
                    type="circle"
                    percent={30}
                    width={80}
                />
            </Card>
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
                        dataSource={data.docs.map((doc) => doc.data() as User)}
                        columns={columns}
                        scroll={{y: 800}}
                    />
                </>
            )}
        </div>
    );
};
