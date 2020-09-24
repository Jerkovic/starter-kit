import Layout from "antd/lib/layout";
import Menu from "antd/lib/menu";
import {useContext} from "react";
import * as React from "react";
const {Content, Footer, Header} = Layout;

import {PageHeader} from "antd";
import {Link} from "react-router-dom";
import {AuthContext} from "./AuthProvider";

interface AppLayoutProps {
    children: any;
}

export const AppLayout = (props: AppLayoutProps) => {
    const currentUser = useContext(AuthContext);
    return (
        <div>
            <Header>
                <div className="logo">
                    {currentUser ? (
                        currentUser.email
                    ) : (
                        <Link to={"/login"}>Login</Link>
                    )}
                </div>
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
