import { Alert, Button, Flex, Input, InputNumber, Pagination, Select, Space, Spin, Table } from "antd";
import Container from "../../../../shared/ui/containerMain/ContainerMain";
import { Order, useOrdersControllerGetAllQuery, useOrdersControllerGetWithPaginationQuery } from "../../../../store/order";
import { LoadingOutlined, SearchOutlined } from "@ant-design/icons";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import OrderContainer from "../../../../shared/ui/orderContainer/OrderContainer";
import { ButtonText, NameContainer, NamePage } from "../products/Products";
import { Debouncer } from "../../../../shared/utils/debounce";
import { useMinOrderCostCreatMutation, useMinOrderCostGetQuery } from "../../../../store/minOrderCost";

export const SortText = styled.p`
  font-family: "Inter", sans-serif;
  font-size: 14px;
  font-weight: bold;
`

type ValueType = string | number | null;
const Orders: React.FC = () => {

  const [sortOrder, setSortOrder] = useState<string>("updatedAt ASC");
  const [searchId, setSearchId] = useState<string>("");
  const navigate = useNavigate();
  const locate = useLocation();
  const [orders, setOrders] = useState<Order[]>([]);
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(8);
  const [finalSearchId, setFinalSearchId] = useState<string>("");
  const { isLoading, data: initialData } = useOrdersControllerGetWithPaginationQuery(
    { page: page, limit: pageSize, search: finalSearchId, field: sortOrder.split(' ')[0], type: sortOrder.split(' ')[1] },
  );
  const { data: lastMinimalCost, isLoading: isLoadingMin } = useMinOrderCostGetQuery();
  const [minCost] = useMinOrderCostCreatMutation();
  const [minimalOrderCost, setMinimalOrderCost] = useState<number>();
  const debouncer = new Debouncer();


  useEffect(() => {
    if (lastMinimalCost) {
      setMinimalOrderCost(lastMinimalCost[0].value);
    }

  }, [lastMinimalCost])

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

    return initialData?.orders.map((data, index) => ({
      key: index,
      orderId: data.id,
      customer: data.nameCustomer,
      price: data.cost,
      date: data.dateDelivery,
      phoneNumber: data.phoneCustomer,
      moreInfo: (
        <Button
          block
          type="primary"
          onClick={() => navigate(`/admin/order/${data.id}`, { state: { previousLocation: locate.pathname } })}
          style={{ width: "50%" }}
          shape="round"
        >
          <ButtonText>
            Подробнее
          </ButtonText>

        </Button>
      ),
    }));
  }, [initialData, navigate, locate]);

  const debouncedSearch = useCallback(
    debouncer.debounce((searchValue: string) => {
      setFinalSearchId(searchValue);
      setPage(1);
    }, 2000), []
  );

  const debounceCreation = useCallback(
    debouncer.debounce((newCost: number) => {
      minCost({ createMinOrderCosrDto: { value: newCost } });
    }, 1000), []
  )

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchValue = e.target.value;
    setSearchId(newSearchValue);
    debouncedSearch(newSearchValue);
  };

  const handleCostChange = (value: ValueType | null) => {
    if (value !== null) {
      const newCost = Number(value);
      setMinimalOrderCost(newCost);
      // debounceCreation(newCost);
    }
  };


  const handleSearchButtonClick = () => {
    setFinalSearchId(searchId);
    setPage(1);
    // setShouldFetch(true);
  };

  const handleSortChange = (value: string) => {
    setSortOrder(value);
    setPage(1);
  };

  const handlePageChange = (newPage: number, newPageSize: number) => {
    setPage(newPage);
    if (newPageSize) setPageSize(newPageSize);

  }

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
      <OrderContainer style={{ display: "flex", flexDirection: "column", gap: "8px", padding: "8px" }}>
        <div style={{ display: "flex", margin: "8px" }}>
          <NameContainer>
            Конфигурация заказов
          </NameContainer>
        </div>
        <div style={{
          width: "100%",
          border: "1px solid var(--primary-bg-color)",
          borderRadius: "10px",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "8px",
        }}>
          <div style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "10px",
          }}>
            <NameContainer style={{ color: "var(--extra-pice)", fontWeight: "normal" }}>
              Минимальная сумма заказа

            </NameContainer>
            {isLoadingMin ?
              (
                <Spin />
              ) : (
                <InputNumber
                  onKeyPress={(event) => {
                    if (!/[0-9]/.test(event.key)) {
                      event.preventDefault();
                    }
                  }}
                  value={minimalOrderCost}
                  style={{
                    border: "1px solid var(--primary-bg-color)",
                    width: 150,
                  }}
                  onChange={handleCostChange}
                />
              )
            }

            <NameContainer style={{ color: "var(--extra-pice)", fontWeight: "normal" }}>
              ₽
            </NameContainer>
          </div>

          <Button type="primary" onClick={() => debounceCreation(minimalOrderCost)}><ButtonText>Применить</ButtonText></Button>
        </div>
      </OrderContainer>
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
              onChange={handleSearchChange}
            />
            <Button style={{ width: "150px" }} type="primary"><ButtonText style={{ display: "inline" }} onClick={handleSearchButtonClick}>Найти</ButtonText> <SearchOutlined /></Button>
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

            defaultActiveFirstOption={true}
            defaultValue="updatedAt ASC"
            style={{
              width: 150,
              height: 25,
            }}
            options={[
              { value: "updatedAt ASC", label: "Дата (новые)" },
              { value: "updatedAt DESC", label: "Дата (старые)" },
              { value: "nameCustomer ASC", label: "Заказчик (А-Я)" },
              { value: "nameCustomer DESC", label: "Заказчик (Я-А)" },
              { value: "cost ASC", label: "Цена (возрастание)" },
              { value: "cost DESC", label: "Цена (убывание)" },
            ]}
            placeholder="Выбрать"
            value={sortOrder}
            onChange={handleSortChange}
          />

        </div>
        {isLoading ? (
          <Flex align="center" gap="middle">
            <Spin indicator={<LoadingOutlined spin />} size="large" />
          </Flex>
        ) : (

          <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
            <Table dataSource={dataSource} columns={columns} pagination={false} style={{ width: "100%" }} />
            <Pagination current={page} total={initialData?.count} pageSize={pageSize} onChange={handlePageChange} style={{ alignItems: "center", display: "block" }} />
          </div>
        )}

      </OrderContainer>

    </Container>
  );
};

export default Orders;
