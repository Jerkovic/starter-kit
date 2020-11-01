import {Card, Progress, Typography} from "antd/es";
import * as React from "react";
import Breakpoints from "../components/Breakpoints";
import {UserList} from "../components/UserList";
import {DynamicFieldSet} from "./DynamicFieldSet";

const {Text} = Typography;

export const Home = () => {
    return (
        <div>
            <Breakpoints />
            <Card
                title="Profile"
                style={{width: 400, marginTop: 16, marginBottom: 16}}>
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
            <DynamicFieldSet />
            <UserList />
        </div>
    );
};
