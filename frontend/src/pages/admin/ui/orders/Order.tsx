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
            <Text style={{ margin: "0 0 8px 0" }}><strong>Заказ №{data?.id}</strong> <span style={{ color: "var(--unactive-text-color)" }}>от {data?.dateOrder ? new Date(data.dateOrder).toLocaleDateString() : "Неизвестная дата"}</span></Text>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div style={{ width: "350px", display: "flex", justifyContent: "start", flexWrap: "nowrap", gridGap: "15px", margin: "8px 0", padding: "8px", borderRadius: "6px", border: "1px solid var(--primary-bg-color)" }}>
                <div style={{ borderRight: "solid 1px var(--primary-bg-color)" }}>
                  <Text style={{ color: "var(--unactive-text-color)" }}>
                    Получатель
                  </Text>
                  <Text style={{ width: "160px", overflowWrap: "break-word" }}>
                    {data?.nameCustomer}
                  </Text>
                </div>
                <div>
                  <Text style={{ color: "var(--unactive-text-color)" }}>
                    Номер
                  </Text>
                  <Text style={{ width: "150px", textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: "hidden" }}>
                    {data?.phoneCustomer ? formatPhoneNumber(data?.phoneCustomer) : "Неизвестный номер"}
                  </Text>
                </div>
              </div>
              <div style={{ display: "flex", gap: 15, alignItems: "center" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                  <Text style={{ fontWeight: 600, fontSize: 14, color: "var(--text-modal)" }}>{countItemOrders} {Numerals.numeralsProducts(countItemOrders)} на</Text>
                  <Text style={{ fontWeight: 600, fontSize: 24 }}>{data?.cost.toLocaleString()} ₽</Text>
                </div>
              </div>
            </div>

            <div style={{ width: '850px', display: "flex", justifyContent: "start", flexWrap: "nowrap", gridGap: "15px", margin: "8px 0", padding: "8px", borderRadius: "6px", border: "1px solid var(--primary-bg-color)" }}>
              <div style={{ borderRight: "solid 1px var(--primary-bg-color)" }}>
                <Text style={{ color: "var(--unactive-text-color)" }}>
                  Получатель
                </Text>
                <Text style={{ width: "160px", overflowWrap: "break-word" }}>
                  {data?.nameCustomer}
                </Text>
              </div>
              <div style={{ borderRight: "solid 1px var(--primary-bg-color)" }}>
                <Text style={{ color: "var(--unactive-text-color)" }}>
                  Номер
                </Text>
                <Text style={{ width: "170px", paddingRight: "10px" }}>
                  {data?.phoneCustomer ? formatPhoneNumber(data?.phoneCustomer) : "Неизвестный номер"}
                </Text>
              </div>
              <div style={{ borderRight: "solid 1px var(--primary-bg-color)" }}>
                <Text style={{ color: "var(--unactive-text-color)" }}>
                  Адрес
                </Text>
                <Text style={{ width: "240px", overflowWrap: "break-word" }}>
                  {data?.addressDelivery}
                </Text>
              </div>
              <div style={{ width: "250px" }}>
                <Text style={{ color: "var(--unactive-text-color)" }}>
                  Дата и время доставки
                </Text>
                <Text style={{ textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: "hidden" }}>
                  {data?.dateDelivery ? new Date(data.dateDelivery).toLocaleDateString() : "Неизвестная дата"} c {data?.startTimeDelivery} до {data?.endTimeDelivery}
                </Text>
              </div>
            </div>
            <div>
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
