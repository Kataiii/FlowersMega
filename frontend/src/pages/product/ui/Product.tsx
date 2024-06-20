import { useParams } from "react-router-dom";
import Container from "../../../shared/ui/containerMain/ContainerMain";
import { API_URL } from "../../../shared/utils/constants";
import { useProductsControllerGetByIdQuery } from "../../../store/product";
import { useSizesControllerGetAllQuery } from "../../../store/size";

const Product: React.FC = () => {
    const {name, size} = useParams();
    const { isLoading, data } = useProductsControllerGetByIdQuery({ id: 1 });
    const sizes = useSizesControllerGetAllQuery();

    return (
        <div style={{ display: "flex", justifyContent: "center", padding: "25px 0" }}>
            <Container>
                <h1 style={{fontFamily: "Inter", fontSize: 32, fontWeight: 600, color: "var(--secondary-text-color)"}}>{name}</h1>
                <div style={{display: "flex", justifyContent: "space-between"}}>
                    <div style={{display: "flex", flexDirection: "column", gap: 20, width: "45%"}}>
                        {/* @ts-ignore */}
                        <img style={{width: "100%", borderRadius: 6}} src={`${API_URL}/products/images/${data?.id}/${data?.images[0].url}`} alt="image1"/>
                        <div style={{ display: "flex", width: 568, gap: 20}}>
                            {
                                //@ts-ignore
                                data?.images.map((item, index) => {
                                    return <img style={{width: 124, height: 124, borderRadius: 6}} src={`${API_URL}/products/images/${data?.id}/${item.url}`} key={index} alt={index}/>
                                })
                            }
                        </div>
                    </div>
                    <div style={{height:"fit-content", width: "50%", backgroundColor: "var(--block-bg-color)", padding: "24px 16px 50px", borderRadius: 6, display: "flex", flexDirection: "column", gap: 24}}>
                        <div style={{display: "flex", gap: 16}}>
                        {
                            sizes.isLoading
                            ? <p>Загрузка...</p>
                            :  sizes.data?.map((item, index) => {
                                return <button key={index} style={{cursor: "pointer", width: "24%", height: 28, border: "1px solid #FF749F", backgroundColor: "var(--block-bg-color)", borderRadius: 6, padding: "0 16px", fontFamily: "Inter", fontWeight: 400, fontSize: 14, color: "var(--primary-bg-color)"}}>{item.name}</button>
                            })
                        }
                        </div>
                        <p style={{fontFamily: "Inter", fontWeight: 600, fontSize: 24, color: "var(--secondary-text-color)"}}>1 800 ₽</p>
                        <p style={{fontFamily: "Inter", fontWeight: 400, fontSize: 16, color: "var(--secondary-text-color)"}}>Размер букета 56 см x 68 см</p>
                    
                        <div style={{display: "flex", justifyContent: "space-between"}}>
                            <button style={{width: "49%", cursor: "pointer", minWidth: 380, height: 55, backgroundColor: "var(--primary-bg-color)", border: "1px solid #FF749F", borderRadius: 6, fontFamily: "Inter", fontWeight: 400, fontSize: 20, color: "var(--primary-text-color)"}}>Заказать</button>
                            <button style={{width: "49%", cursor: "pointer", minWidth: 380, height: 55, backgroundColor: "var(--block-bg-color)", border: "1px solid #FF749F", borderRadius: 6, fontFamily: "Inter", fontWeight: 400, fontSize: 20, color: "var(--primary-bg-color)"}}>Купить в 1 клик</button>
                        </div>

                        <h3 style={{fontFamily: "Inter", fontWeight: 500, fontSize: 24, color: "var(--secondary-text-color)"}}>Состав и описание</h3>
                        <div style={{display: "flex", flexDirection: "column", gap: 5}}>
                            <p style={{fontFamily: "Inter", fontWeight: 400, fontSize: 20, color: "#52414680"}}>В состав входит :</p>
                            <ul style={{padding: "0 16px"}}>
                                <li style={{fontFamily: "Inter", fontWeight: 400, fontSize: 15, color: "#52414680"}}>101 красная роза</li>
                                <li style={{fontFamily: "Inter", fontWeight: 400, fontSize: 15, color: "#52414680"}}>Бумажная упаковка</li>
                            </ul>
                        </div>
                        <p style={{fontFamily: "Inter", fontWeight: 300, fontSize: 16, color: "var(--secondary-text-color)"}}>Крутое описание этого букета на странице товара является лучшим подарком для любого маркетплейса! Крутое описание этого букета на странице товара является лучшим подарком для любого маркетплейса! Крутое описание этого букета на странице товара является лучшим подарком для любого маркетплейса!    Крутое описание этого букета на странице товара является лучшим подарком для любого маркетплейса!</p>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default Product;