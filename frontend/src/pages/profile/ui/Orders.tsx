import { useState } from "react";
import OrderEmpty from "../../../entities/order/ui/OrderEmpty";

const Orders: React.FC = () => {
    const [orders, setOrders] = useState<number[]>([]);

    return(
        <div style={{padding: 35, width: "100%", height: "100%"}}>
            {
                orders.length === 0
                ? <OrderEmpty/>
                : null
            }
        </div>
    )
}

export default Orders;