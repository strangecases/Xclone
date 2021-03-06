import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Menu } from "antd";
import Link from "next/link";
import {
    AppstoreOutlined,
    LoginOutlined,
    UserAddOutlined,
    LogoutOutlined,
    CoffeeOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/router";
import allActions from "../../store/actions";
import antNavStyle from "../../styles/modules/componentStyles/AntNav.module.css";

const { Item, SubMenu } = Menu;

const TopNav = ({ children }) => {
    const [current, setCurrent] = useState("");
    const [mount, setMount] = useState(false);

    const { admin } = useSelector((state) => state.auth);

    const dispatch = useDispatch();

    const router = useRouter();

    useEffect(() => {
        if (process.browser) setCurrent(router.pathname);
        setMount(true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [router.pathname]);

    const logout = async () => {
        dispatch(allActions.adminActions.logOut());
    };

    console.log("topnac hiii");

    return (
        mount && (
            <>
                <Menu
                    mode="horizontal"
                    onClick={(e) => setCurrent(e.key)}
                    selectedKeys={[current]}
                    className={antNavStyle["top-nav-menu"]}
                >
                    <Item
                        key="/"
                        icon={<AppstoreOutlined />}
                        className={antNavStyle["header-bold"]}
                    >
                        <Link href="/">
                            <a>ScholarX</a>
                        </Link>
                    </Item>

                    {admin === null ? (
                        <Menu mode="horizontal" className="margin-left-auto">
                            <Item key="/login" icon={<LoginOutlined />}>
                                <Link href="/login">
                                    <a>Login</a>
                                </Link>
                            </Item>
                            <Item
                                key="/register"
                                icon={<UserAddOutlined />}
                                className="display-register"
                            >
                                <Link href="/register">
                                    <a>Register</a>
                                </Link>
                            </Item>
                        </Menu>
                    ) : (
                        <SubMenu
                            key="#"
                            icon={<CoffeeOutlined />}
                            title={admin && admin.name}
                            className="margin-left-auto"
                        >
                            <Item key="/admin">
                                <Link href="/admin">
                                    <a>Dashboard</a>
                                </Link>
                            </Item>
                            <Item
                                key="/logout"
                                onClick={logout}
                                icon={<LogoutOutlined />}
                            >
                                Logout
                            </Item>
                        </SubMenu>
                    )}
                </Menu>

                {children}
            </>
        )
    );
};

export default TopNav;
