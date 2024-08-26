import { Menu, MenuProps } from "antd";
import Sider from "antd/es/layout/Sider";
import { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { ADMIN_PATH, ADMIN_PRODUCTS_PATH, ADMIN_REVIEWS_PATH } from "../../../../shared/utils/constants";
import {ReactComponent as LogoAdmin} from "../../../../shared/assets/logo-admin.svg";
import {ReactComponent as ArrowBack} from "../../../../shared/assets/arrow-back.svg";

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    onClick: () => void,
    icon?: React.ReactNode,
    children?: MenuItem[],
  ): MenuItem {
    return {
      key,
      onClick,
      icon,
      children,
      label,
    } as MenuItem;
  }

const Container = styled.div`
    min-height: 100vh;
    display: flex;
`;

const LinkButton = styled.button`
    
`;

const Main:React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const items: MenuItem[] = [
        getItem('Заказы', ADMIN_PATH, () => navigate(ADMIN_PATH)),
        getItem('Товары', ADMIN_PRODUCTS_PATH, () => navigate(ADMIN_PRODUCTS_PATH)),
        getItem('Отзывы', ADMIN_REVIEWS_PATH, () => navigate(ADMIN_REVIEWS_PATH))
    ];

    const changeDefaultSelectedKey = () => {
        switch(location.pathname){
            case ADMIN_PRODUCTS_PATH:
                return [ADMIN_PRODUCTS_PATH];
            case ADMIN_REVIEWS_PATH:
                return [ADMIN_REVIEWS_PATH];
            case ADMIN_PATH:
            default:
                return [ADMIN_PATH];
        }
    }

    return(
        <Container>
            <Sider width={320} style={{minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center"}}>
                <LogoAdmin/>
                <LinkButton>
                    <ArrowBack/>
                    Перейти на сайт
                </LinkButton>
                <Menu defaultSelectedKeys={changeDefaultSelectedKey()} mode="inline" items={items} />
            </Sider>
            <Outlet></Outlet>
        </Container>
    )
}

export default Main;