import OrderCard from "../../../entities/order/ui/OrderCard";
import OrderEmpty from "../../../entities/order/ui/OrderEmpty";
import CenteredSpin from "../../../shared/ui/spinner/CenteredSpin";
import { useOrdersControllerGetByUserQuery } from "../../../store/order";

const Orders: React.FC = () => {
    const { isLoading, data, isError } = useOrdersControllerGetByUserQuery();

    return (
        <div style={{ padding: 35, width: "100%", height: "100%" }}>
            {
                isLoading
                    ? <CenteredSpin />
                    : isError
                        ? <OrderEmpty />
                        : data && data?.map((item, index) => { return <OrderCard key={`order-card-${index}`} order={item} /> })
            }
        </div>
    )
}

export default Orders;