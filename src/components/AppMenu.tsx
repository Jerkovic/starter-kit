import {
    CloudUploadOutlined,
    HomeOutlined,
    SearchOutlined,
    SettingOutlined,
    UserOutlined
} from "@ant-design/icons";
import {Menu} from "antd";
import * as React from "react";
import {Link, useHistory} from "react-router-dom";
import firebaseWrapper from "../services/firebaseWrapper";
import {useAuth} from "./AuthProvider";

const {SubMenu} = Menu;

export interface AppMenuProps {
    isMobile: boolean;
}

export const AppMenu = (props: AppMenuProps) => {
    const auth = useAuth();
    const history = useHistory();
    const [selected, setSelected] = React.useState("");

    async function logout() {
        await firebaseWrapper.logout();
        history.push("/");
    }

    return (
        <Menu selectedKeys={[selected]} mode="horizontal">
            <Menu.Item key="mail" icon={<HomeOutlined translate={1} />}>
                <Link to={"/"}>Home</Link>
            </Menu.Item>
            <Menu.Item
                key="upload"
                icon={<CloudUploadOutlined translate={1} />}>
                <Link to={"/upload"}>Upload</Link>
            </Menu.Item>
            <Menu.Item
                key="app"
                disabled
                icon={<SearchOutlined translate={1} />}>
                Search
            </Menu.Item>
            <SubMenu
                key="SubMenu"
                icon={<SettingOutlined translate={1} />}
                title="More options">
                <Menu.ItemGroup title="Item 1">
                    <Menu.Item key="setting:1">Option 1</Menu.Item>
                    <Menu.Item key="setting:2">Option 2</Menu.Item>
                </Menu.ItemGroup>
                <Menu.ItemGroup title="Item 2">
                    <Menu.Item key="setting:3">Option 3</Menu.Item>
                    <Menu.Item key="setting:4">Option 4</Menu.Item>
                </Menu.ItemGroup>
            </SubMenu>
            {auth.currentUser ? (
                <SubMenu
                    key="user-menu"
                    icon={<UserOutlined translate={1} />}
                    title={auth.currentUser.email}>
                    <Menu.ItemGroup>
                        <Menu.Item key="nav-profile">Profile</Menu.Item>
                        <Menu.Item key="nav-set">Settings</Menu.Item>
                        <Menu.Item key="nav-logout" onClick={logout}>
                            Logout
                        </Menu.Item>
                    </Menu.ItemGroup>
                </SubMenu>
            ) : (
                <>
                    <Menu.Item
                        key="login"
                        icon={<UserOutlined translate={1} />}>
                        <Link to={"/login"}>Login</Link>
                    </Menu.Item>
                    <Menu.Item
                        key="register"
                        icon={<UserOutlined translate={1} />}>
                        <Link to={"/register"}>Register</Link>
                    </Menu.Item>
                </>
            )}
        </Menu>
    );
};
