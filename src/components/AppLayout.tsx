import Icon from "antd/lib/icon";
import Layout from "antd/lib/layout";
import Menu from "antd/lib/menu";
import * as React from "react";
import {Link} from "react-router-dom";
import {MenuItem} from "../ui/MenuItem";
const {Content, Footer, Sider, Header} = Layout;

import {PageHeader} from "antd";

interface AppLayoutProps {
    children: any;
    menuItems: MenuItem[];
}

export class AppLayout extends React.Component<AppLayoutProps, any> {
    public render() {
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
                    </Menu>
                </Header>
                <Layout style={{minHeight: "100vh"}}>
                    <Sider style={{background: "#fff"}} collapsible>
                        <Menu style={{height: "100%"}}>
                            {this.renderMenuItems()}
                        </Menu>
                    </Sider>
                    <Layout>
                        <PageHeader
                            style={{
                                border: "1px solid rgb(235, 237, 240)"
                            }}
                            title="Use this area for contextual content for your view"
                            subTitle="UI stuffz"
                        />
                        <Content
                            style={{
                                backgroundColor: "#fff",
                                margin: "0",
                                padding: "16px"
                            }}>
                            {this.props.children}
                        </Content>
                        <Footer style={{textAlign: "center"}}>
                            <a
                                href="https://github.com/yetric/yetric-ui"
                                target="_blank">
                                <Icon type="github" /> Yetric UI Kit
                            </a>{" "}
                            ©2019 - Created by{" "}
                            <a href="https://yetric.com" target="_blank">
                                Yetric AB
                            </a>
                        </Footer>
                    </Layout>
                </Layout>
            </div>
        );
    }

    private renderMenuItems() {
        let menuIndex = 0;
        return this.props.menuItems.map((item: MenuItem) => {
            return (
                <Menu.Item key={menuIndex++}>
                    <Link to={item.path}>
                        <Icon type={item.icon} />
                        <span>{item.label}</span>
                    </Link>
                </Menu.Item>
            );
        });
    }
}
