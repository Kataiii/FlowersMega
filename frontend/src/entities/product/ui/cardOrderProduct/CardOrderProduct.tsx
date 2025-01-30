import { Image } from "antd";
import { ItemOrder, Postcard } from "../../../../store/order";
import Error from "../../../../shared/assets/no-image.png";
import { API_URL } from "../../../../shared/utils/constants";
import { Product, useCategoryControllerGetIdByNameQuery, useProductsControllerGetByIdQuery } from "../../../../store/product";
import { Title } from "../../../../shared/ui/forAdditionalPages/Title";
import { Text } from "../../../../shared/ui/forAdditionalPages/Content";
import PostcardAddBlock from "../../../../widgets/postcard/PostcardAddBlock";
import PostcardBlock from "../../../../widgets/postcard/PostcardBlock";
import CenteredSpin from "../../../../shared/ui/spinner/CenteredSpin";

type CardOrderProductProps = {
    orderItem: ItemOrder;
    postcards?: Postcard[]
}

const CardOrderProduct: React.FC<CardOrderProductProps> = ({ orderItem, postcards }) => {
    //@ts-ignore
    const { isLoading, data } = useProductsControllerGetByIdQuery({ id: orderItem.idProduct });
    const { data: categoryIdData } = useCategoryControllerGetIdByNameQuery({ name: "Открытки" });
    return (
        <div style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 10px" }}>
            {
                isLoading
                    ? <CenteredSpin />
                    : <>
                        {/* @ts-ignore */}
                        {data.categories[0].id === categoryIdData ? (
                            <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "stretch", gap: "10px", width: "100%" }}>
                                <div style={{ display: "flex", gap: "10px", alignItems: "start", flexWrap: "nowrap", flex: 1 }}>
                                    {/* @ts-ignore */}
                                    <Image src={`${API_URL}/products/images/${data?.id}/${data?.images[0].url}`} width={50} height={50} fallback={Error} style={{ objectFit: "cover", alignSelf: "flex-start" }} />
                                    <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-start" }}>
                                        <Title style={{ fontSize: 16, fontWeight: 500 }}>{data?.name}</Title>
                                    </div>
                                </div>
                                <div style={{ display: "flex", flex: 1, justifyContent: "center", alignItems: "center" }}>
                                    {/* @ts-ignore */}
                                    {postcards && postcards.length > 0 ? (<PostcardBlock idProduct={`${orderItem.idProduct}`} value={postcards || []} />) : (
                                        <p>Нет открыток</p>
                                    )}
                                </div>
                                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", flex: 1 }}>
                                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: "center" }}>
                                        <Text style={{ fontSize: 16, fontWeight: 400 }}>
                                            {/* @ts-ignore */}
                                            {orderItem.extraPrice.toLocaleString()} ₽ × {orderItem.OrderProductSize.count} шт.
                                        </Text>
                                        <Text style={{ fontSize: 16, fontWeight: 600 }}>
                                            {/* @ts-ignore */}
                                            {" "} = {orderItem.extraPrice * orderItem.OrderProductSize.count} ₽
                                        </Text>
                                    </div>
                                </div>
                            </div>


                        ) : (
                            <>
                                <div style={{ display: "flex", gap: 10 }}>
                                    {/* @ts-ignore */}
                                    <Image src={`${API_URL}/products/images/${data?.id}/${data?.images[0].url}`} width={50} height={50} fallback={Error} />
                                    <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                                        <Title style={{ fontSize: 16, fontWeight: 500 }}>{data?.name}</Title>
                                        {/* @ts-ignore */}
                                        <Text style={{ fontSize: 12, fontWeight: 400, color: "var(--text-modal)" }}>{orderItem.paramsSize}</Text>
                                    </div>
                                </div>
                                <div>
                                    {/* @ts-ignore */}
                                    <Text style={{ display: "inline", fontSize: 16, fontWeight: 400 }}>{orderItem.extraPrice.toLocaleString()} ₽ × {orderItem.OrderProductSize.count} шт.</Text>
                                    {/* @ts-ignore */}
                                    <Text style={{ display: "inline", fontSize: 16, fontWeight: 600 }}> = {orderItem.extraPrice * orderItem.OrderProductSize.count} ₽</Text>
                                </div>
                            </>
                        )}

                    </>
            }

        </div>
    )
}

export default CardOrderProduct;