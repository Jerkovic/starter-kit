import Layout from "antd/lib/layout";
import * as React from "react";
const {Content, Footer, Header} = Layout;

import {PageHeader} from "antd";
import {Link} from "react-router-dom";
import {AppMenu} from "./AppMenu";
import {useAuth} from "./AuthProvider";

interface AppLayoutProps {
    children: any;
}

export const AppLayout = (props: AppLayoutProps) => {
    const auth = useAuth();

    return (
        <div>
            <Header style={{background: "#fff"}}>
                <AppMenu isMobile={false} />
            </Header>
            <Layout style={{minHeight: "100vh"}}>
                <Layout>
                    <PageHeader
                        style={{
                            border: "1px solid rgb(235, 237, 240)"
                        }}
                        title="page header title"
                        subTitle="sub head"
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
