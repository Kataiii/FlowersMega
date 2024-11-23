import { ConfigProvider, Menu, MenuProps } from "antd";
import Sider from "antd/es/layout/Sider";
import { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import {
  ADMIN_PATH,
  ADMIN_PRODUCTS_PATH,
  ADMIN_REVIEWS_PATH,
  HOME_PATH,
} from "../../../../shared/utils/constants";
import { ReactComponent as LogoAdmin } from "../../../../shared/assets/logo-admin.svg";
import { ReactComponent as ArrowBack } from "../../../../shared/assets/arrow-back.svg";
import ruRU from 'antd/locale/ru_RU';
type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  onClick: () => void,
  icon?: React.ReactNode,
  children?: MenuItem[]
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
  background: transparent;
  border: none;
  border-radius: 6px;
  padding: 0.5rem 1rem;
  display: flex;
  align-items: center;
  cursor: pointer;
  &:hover{
        background-color: var(--city-active);
    }
`;

const LinkText = styled.p`
  font-family: "Inter UI", sans-serif,
  font-size: 12px;
  font-weight: 400;
  color: var(--primary-bg-color);
  padding-top: -5px;
`;

const Main: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const items: MenuItem[] = [
    getItem("Заказы", ADMIN_PATH, () => navigate(ADMIN_PATH)),
    getItem("Товары", ADMIN_PRODUCTS_PATH, () => navigate(ADMIN_PRODUCTS_PATH)),
    getItem("Отзывы", ADMIN_REVIEWS_PATH, () => navigate(ADMIN_REVIEWS_PATH)),
  ];

  const changeDefaultSelectedKey = () => {
    switch (location.pathname) {
      case ADMIN_PRODUCTS_PATH:
        return [ADMIN_PRODUCTS_PATH];
      case ADMIN_REVIEWS_PATH:
        return [ADMIN_REVIEWS_PATH];
      case ADMIN_PATH:
      default:
        return [ADMIN_PATH];
    }
  };

  return (
    <ConfigProvider
      locale={ruRU}
      theme={{
        components: {
          Table: {
            cellFontSize: 16,
            headerColor: "var(--primary-review-text)",
            headerBg: "--block-bg-color",
          },
          Button: {
            colorPrimaryText: "var(--primary-bg-color)",
            defaultBorderColor: "var(--primary-bg-color)",
            defaultColor: "var(--primary-bg-color)",
          },
          Select: {
            fontFamily: "Inter",
            colorPrimary: "#F5EFF5",
            colorBgContainer: "var(--city-active)",
            colorBorder: "var(--city-active)",
            colorText: "#1A2030",

          },
          Menu: {
            itemColor: "var(--primary-bg-color)",
            itemHoverColor: "var(--primary-bg-color)",
            itemHoverBg: "var(--city-active)",
          }
        },
        token: {
          // colorText: "var(--primary-text-color)",
        }
      }}
    >
      <Container>
        <Sider
          width={320}
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <LogoAdmin />
          <LinkButton>
            <div style={{ display: "flex", marginRight: "5px" }}><ArrowBack /></div>
            <div><LinkText style={{ display: "inline" }} onClick={() => navigate(HOME_PATH)}>Перейти на сайт</LinkText></div>
          </LinkButton>
          <Menu
            defaultSelectedKeys={changeDefaultSelectedKey()}
            mode="inline"
            items={items}
          />
        </Sider>
        <Outlet></Outlet>
      </Container>
    </ConfigProvider>
  );
};

export default Main;
