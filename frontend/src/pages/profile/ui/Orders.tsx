import OrderEmpty from "../../../entities/order/ui/OrderEmpty";
import { useOrdersControllerGetByUserQuery } from "../../../store/order";

const Orders: React.FC = () => {
    const {isLoading, data, isError} = useOrdersControllerGetByUserQuery();

    return(
        <div style={{padding: 35, width: "100%", height: "100%"}}>
            {
                isLoading
                ?   <p>Загрузка...</p>
                :   isError
                    ?   <OrderEmpty/>
                    :   <p>Заказы есть</p>
            }
        </div>
    )
}

export default Orders;