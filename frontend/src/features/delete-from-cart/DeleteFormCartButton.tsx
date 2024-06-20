import { deleteAllProducts } from "../../entities/cart/redux/slice"
import { ProductSize } from "../../store/product"
import { useAppDispatch } from "../../store/store"
import Delete from "../../shared/assets/delete.svg";

type DeleteFromCartButtonProps = {
    id: ProductSize['id']
}

export const DeleteFromCartButton: React.FC<DeleteFromCartButtonProps> = ({id}) => {


    const dispatch = useAppDispatch();

    const deleteFromCart = () => {
        dispatch(deleteAllProducts(id));
    }

    return (
        <img style={{width: 24, height: 24, cursor: "pointer"}} src={Delete} alt="delete" onClick={deleteFromCart}/>
    )
}