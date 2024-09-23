import { Alert, Button, Flex, Input, Select, Space, Spin, Table } from "antd";
import Container from "../../../../shared/ui/containerMain/ContainerMain";
import { Order, useOrdersControllerGetAllQuery } from "../../../../store/order";
import { LoadingOutlined, SearchOutlined } from "@ant-design/icons";
import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import OrderContainer from "../../../../shared/ui/orderContainer/OrderContainer";
import { ButtonText, NameContainer, NamePage } from "../products/Products";

export const SortText = styled.p`
  font-family: "Inter UI", sans-serif;
  font-size: 12px;
  font-weight: bold;
`


const Orders: React.FC = () => {
  const { isLoading, data: initialData } = useOrdersControllerGetAllQuery();
  const [sortOrder, setSortOrder] = useState<string>("dateNew");
  const [searchId, setSearchId] = useState<string>("");
  const navigate = useNavigate();
  const locate = useLocation();
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    if (initialData) {
      setOrders(initialData);
    }
  }, [initialData]);

  const columns = [
    {
      title: "№",
      dataIndex: "orderId",
      key: "orderId",
    },
    {
      title: "Заказчик",
      dataIndex: "customer",
      key: "customer",
    },
    {
      title: "Сумма",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Дата доставки",
      dataIndex: "date",
      key: "date",
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Номер",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "",
      dataIndex: "moreInfo",
      key: "moreInfo",
    },
  ];

  const dataSource = useMemo(() => {
    return orders.map((order, index) => ({
      key: index,
      orderId: order.id,
      customer: order.nameCustomer,
      price: order.cost,
      date: order.dateDelivery,
      phoneNumber: order.phoneCustomer,
      moreInfo: (
        <Button
          block
          type="primary"
          onClick={() => navigate(`/admin/order/${order.id}`, { state: { previousLocation: locate.pathname } })}
          style={{ width: "50%" }}
          shape="round"
        >
          <ButtonText>
            Подробнее
          </ButtonText>

        </Button>
      ),
    }));
  }, [orders, navigate, locate]);

  const filteredData = useMemo(() => {
    if (!searchId) return dataSource;
    return dataSource.filter(order => order.orderId.toString().includes(searchId));
  }, [searchId, dataSource]);

  const sortedData = useMemo(() => {
    const sorted = [...filteredData];
    switch (sortOrder) {
      case "idASC":
        return sorted.sort((a, b) => a.orderId - b.orderId);
      case "idDESC":
        return sorted.sort((a, b) => b.orderId - a.orderId);
      case "dateNew":
        return sorted.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      case "dateOld":
        return sorted.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      case "customerASC":
        return sorted.sort((a, b) => a.customer.localeCompare(b.customer));
      case "customerDESC":
        return sorted.sort((a, b) => b.customer.localeCompare(a.customer));
      case "costASC":
        return sorted.sort((a, b) => a.price - b.price);
      case "costDESC":
        return sorted.sort((a, b) => b.price - a.price);
      default:
        return sorted;
    }
  }, [filteredData, sortOrder]);

  return (
    <Container
      style={{
        backgroundColor: "var(--main-bg-color)",
      }}
    >
      <div
        style={{
          display: "flex",
          margin: "16px 0 0 16px",
        }}
      >
        <NamePage>
          Заказы
        </NamePage>

      </div>
      <OrderContainer>
        <div style={{ display: "flex", margin: "8px" }}>
          <NameContainer>
            База заказов
          </NameContainer>
        </div>
        <div
          style={{
            border: "1px solid var(--primary-bg-color)",
            borderRadius: "10px",
            padding: "5px",
          }}
        >
          <Space.Compact size="large" block>
            <Input
              placeholder="Поиск по ID"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
            />
            <Button style={{ width: "150px" }} type="primary"><ButtonText style={{ display: "inline" }}>Найти</ButtonText> <SearchOutlined /></Button>
          </Space.Compact>
        </div>
        <div
          style={{
            display: "flex",
          }}
        >
          <div
            style={{
              color: "var(--secondary-bg-color)",
              marginRight: "10px",
              paddingTop: "5px",
            }}
          >
            <SortText>
              Сортировать по
            </SortText>

          </div>
          <Select
            allowClear
            defaultActiveFirstOption={true}
            defaultValue="dateNew"
            style={{
              width: 150,
              height: 25,
            }}
            options={[
              { value: "dateNew", label: "Дата (новые)" },
              { value: "dateOld", label: "Дата (старые)" },
              { value: "customerASC", label: "Заказчик (А-Я)" },
              { value: "customerDESC", label: "Заказчик (Я-А)" },
              { value: "costASC", label: "Цена (возрастание)" },
              { value: "costDESC", label: "Цена (убывание)" },
            ]}
            placeholder="Выбрать"
            value={sortOrder}
            onChange={(value) => setSortOrder(value)}
          />

        </div>
        {isLoading ? (
          <Flex align="center" gap="middle">
            <Spin indicator={<LoadingOutlined spin />} size="large" />
          </Flex>
        ) : (
          <Table dataSource={sortedData} columns={columns} />
        )}
      </OrderContainer>
    </Container>
  );
};

export default Orders;
