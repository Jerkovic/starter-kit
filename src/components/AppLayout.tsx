import Layout from "antd/lib/layout";
import Menu from "antd/lib/menu";
import * as React from "react";
const {Content, Footer, Header} = Layout;

import {PageHeader} from "antd";

interface AppLayoutProps {
    children: any;
}

export const AppLayout = (props: AppLayoutProps) => {
    return (
        <div>
            <Header>
                <div className="logo" />
                <Menu
                    style={{lineHeight: "64px"}}
                    theme={"dark"}
                    mode={"horizontal"}>
                    <Menu.Item key="1">Menu Item 1</Menu.Item>
                    <Menu.Item key="2">Menu Item 2</Menu.Item>
                    <Menu.Item key="3">Menu Item 3</Menu.Item>
                    <Menu.Item key="4">Menu Item 4</Menu.Item>
                </Menu>
            </Header>
            <Layout style={{minHeight: "100vh"}}>
                <Layout>
                    <PageHeader
                        style={{
                            border: "1px solid rgb(235, 237, 240)"
                        }}
                        title="Use this area for contextual content for your view"
                        subTitle="UI stuffs"
                    />
                    <Content
                        style={{
                            backgroundColor: "#fff",
                            margin: "0",
                            padding: "16px"
                        }}>
                        {props.children}
                    </Content>
                    <Footer style={{textAlign: "center"}}>Footer</Footer>
                </Layout>
            </Layout>
        </div>
    );
};
