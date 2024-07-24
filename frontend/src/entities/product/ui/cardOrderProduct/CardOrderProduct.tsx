import { Image } from "antd";
import { ItemOrder } from "../../../../store/order";
import Error from "../../../../shared/assets/no-image.png";
import { API_URL } from "../../../../shared/utils/constants";
import { useProductsControllerGetByIdQuery } from "../../../../store/product";
import { Title } from "../../../../shared/ui/forAdditionalPages/Title";
import { Text } from "../../../../shared/ui/forAdditionalPages/Content";

type CardOrderProductProps = {
    orderItem: ItemOrder;
}

const CardOrderProduct: React.FC<CardOrderProductProps> = ({orderItem}) => {
    //@ts-ignore
    const {isLoading, data} = useProductsControllerGetByIdQuery({id: orderItem.idProduct});

    return(
        <div style={{width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 10px"}}>
            {
                isLoading
                ?   <p>Загрузка...</p>
                :   <>
                        <div style={{ display: "flex", gap: 10}}>
                            {/* @ts-ignore */}
                            <Image src={`${API_URL}/products/images/${data?.id}/${data?.images[0].url}`} width={50} height={50} fallback={Error}/>
                            <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
                                <Title style={{fontSize: 16, fontWeight: 500}}>{data?.name}</Title>
                                {/* @ts-ignore */}
                                <Text style={{fontSize: 12, fontWeight: 400, color: "var(--text-modal)"}}>{orderItem.paramsSize}</Text>
                            </div>
                        </div>
                        <div>
                            {/* @ts-ignore */}
                            <Text style={{display: "inline", fontSize: 16, fontWeight: 400}}>{orderItem.prise.toLocaleString()} ₽ × {orderItem.OrderProductSize.count} шт.</Text>
                            {/* @ts-ignore */}
                            <Text style={{display: "inline", fontSize: 16, fontWeight: 600}}> = {orderItem.prise * orderItem.OrderProductSize.count} ₽</Text>
                        </div>
                    </>
            }

        </div>
    )
}

export default CardOrderProduct;