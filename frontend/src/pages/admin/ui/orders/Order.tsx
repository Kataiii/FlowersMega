import { Button, Flex, Spin } from "antd";
import Container from "../../../../shared/ui/containerMain/ContainerMain";
import { useOrdersControllerGetByIdQuery } from "../../../../store/order";
import { useParams } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";
import { useMemo, useState } from "react";
import { Title } from "../../../../shared/ui/forAdditionalPages/Title";
import { Text } from "../../../../shared/ui/forAdditionalPages/Content"
import { Numerals } from "../../../../shared/utils/numerals";
import CardOrderProduct from "../../../../entities/product/ui/cardOrderProduct/CardOrderProduct";
import { styled } from "styled-components";


export const OrderHeader = styled.p`
  font-family: "Inter UI", sans-serif;
  font-size: 20px;
  font-weight: thin;
`

export const OrderInfoText = styled.p`
  font-family: "Inter UI", sans-serif;
  font-size: 12px;
  font-weight: normal;
`


const Order: React.FC = () => {

  const { id } = useParams();
  const { isLoading, data } = useOrdersControllerGetByIdQuery({ id: Number(id) });
  //@ts-ignore
  const [countItemOrders, _] = useState<number>(data?.itemsOrder.reduce((count, currentItem) => { return count + (currentItem.OrderProductSize.count ?? -1); }, 0));

  const formatPhoneNumber = (phone: string) => {
    const phoneNumber = phone.replace(/\D/g, '');
    const match = phoneNumber.match(/(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})/);
    if (match) {
      return `+${match[1]} (${match[2]}) ${match[3]}-${match[4]}-${match[5]}`;
    }
    return phone;
  }

  return (
    <Container>
      {isLoading ?
        (<Flex align="center" gap="middle">
          <Spin indicator={<LoadingOutlined spin />} size="large" />
        </Flex>) : (
          <div style={{ width: "850px", display: "flex", flexDirection: "column" }}>
            <OrderHeader style={{ margin: "0 0 8px 0" }}><strong>Заказ №{data?.id}</strong> <span style={{ color: "var(--unactive-text-color)" }}>от {data?.dateOrder ? new Date(data.dateOrder).toLocaleDateString() : "Неизвестная дата"}</span></OrderHeader>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div style={{ width: "350px", display: "flex", justifyContent: "start", flexWrap: "nowrap", gridGap: "15px", margin: "8px 0", padding: "8px", borderRadius: "6px", border: "1px solid var(--primary-bg-color)" }}>
                <div style={{ borderRight: "solid 1px var(--primary-bg-color)" }}>
                  <OrderInfoText style={{ color: "var(--unactive-text-color)" }}>
                    Получатель
                  </OrderInfoText>
                  <Text style={{ width: "160px", overflowWrap: "break-word" }}>
                    {data?.nameCustomer}
                  </Text>
                </div>
                <div>
                  <OrderInfoText style={{ color: "var(--unactive-text-color)" }}>
                    Номер
                  </OrderInfoText>
                  <Text style={{ width: "160px", textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: "hidden" }}>
                    {data?.phoneCustomer ? formatPhoneNumber(data?.phoneCustomer) : "Неизвестный номер"}
                  </Text>
                </div>
              </div>
              <div style={{ display: "flex", gap: 15, alignItems: "center" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                  <Text style={{ fontWeight: 600, fontSize: 14, color: "var(--text-modal)" }}>{countItemOrders} {Numerals.numeralsProducts(countItemOrders)} на</Text>
                  <OrderInfoText style={{ fontWeight: 600, fontSize: 24 }}>{data?.cost.toLocaleString()} ₽</OrderInfoText>
                </div>
              </div>
            </div>
            {
              data?.comment && (
                <div style={{ display: "flex", justifyContent: "space-between", flexDirection: "column", borderRadius: "6px", border: "1px solid var(--primary-bg-color)", padding: "8px" }}>
                  <OrderInfoText style={{ color: "var(--unactive-text-color)" }}>
                    Комментарий
                  </OrderInfoText>
                  <Text style={{ width: "100%", height: "140px", maxHeight: "140px", overflowY: "auto" }}>
                    {data?.comment}
                  </Text>
                </div>
              )
            }


            <div style={{ width: '850px', display: "flex", justifyContent: "start", flexWrap: "nowrap", gridGap: "15px", margin: "8px 0", padding: "8px", borderRadius: "6px", border: "1px solid var(--primary-bg-color)" }}>
              <div style={{ borderRight: "solid 1px var(--primary-bg-color)" }}>
                <OrderInfoText style={{ color: "var(--unactive-text-color)" }}>
                  Получатель
                </OrderInfoText>
                <Text style={{ width: "160px", overflowWrap: "break-word" }}>
                  {data?.nameCustomer}
                </Text>
              </div>
              <div style={{ borderRight: "solid 1px var(--primary-bg-color)" }}>
                <OrderInfoText style={{ color: "var(--unactive-text-color)" }}>
                  Номер
                </OrderInfoText>
                <Text style={{ width: "170px", paddingRight: "10px" }}>
                  {data?.phoneCustomer ? formatPhoneNumber(data?.phoneCustomer) : "Неизвестный номер"}
                </Text>
              </div>
              <div style={{ borderRight: "solid 1px var(--primary-bg-color)" }}>
                <OrderInfoText style={{ color: "var(--unactive-text-color)" }}>
                  Адрес
                </OrderInfoText>
                <Text style={{ width: "240px", overflowWrap: "break-word" }}>
                  {data?.addressDelivery}
                </Text>
              </div>
              <div style={{ width: "250px" }}>
                <OrderInfoText style={{ color: "var(--unactive-text-color)" }}>
                  Дата и время доставки
                </OrderInfoText>
                <Text style={{ textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: "hidden" }}>
                  {data?.dateDelivery ? new Date(data.dateDelivery).toLocaleDateString() : "Неизвестная дата"} c {data?.startTimeDelivery} до {data?.endTimeDelivery}
                </Text>
              </div>
            </div>
            <div style={{
              maxHeight: "250px",
              overflowY: "auto",
              overflowX: "hidden",
            }}>
              {
                data?.itemsOrder.map((item, index) => {
                  return <CardOrderProduct key={`card-order-product-${index}`} orderItem={item} />
                })
              }
            </div>
          </div>

        )
      }
    </Container >
  );
};

export default Order;
