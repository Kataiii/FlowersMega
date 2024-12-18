import { Button } from "antd";
import { API_URL } from "../../../../shared/utils/constants";
import { Category, useCategoriesProductsControllerGetAllQuery } from "../../../../store/product";
import { ButtonText } from "../../../../pages/admin/ui/products/Products";
import { Numerals } from "../../../../shared/utils/numerals";

type Props = {
    category: Category | null;
    clickHandler: () => void;
    name: string;
    count: number;
}

const AdditionProductCard: React.FC<Props> = ({ category, clickHandler, name, count }) => {

    return (
        <div
            onClick={clickHandler}
            data-proportion-h="1"
            style={{
                cursor: "pointer",
                width: "100%",
                minWidth: "1px",
                boxShadow: "0px 0px 2px 0px #EEB2CE",
                backgroundColor: "var(--block-bg-color)",
                borderRadius: "6px",
                padding: "10px 8px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "10px",
            }}

        >
            <img
                style={{
                    width: '96%',
                    height: '64%',
                    borderRadius: '6px',
                    objectFit: 'contain'
                }}
                src={`${API_URL}/categories/${category?.id}/${category?.url}`}
                alt={category?.name}
            />
            <p
                style={{
                    margin: "auto",
                    textAlign: "center",
                    fontFamily: 'Inter',
                    fontWeight: 600,
                    fontSize: '24px',
                    color: 'var(--secondary-text-color)'
                }}
            >
                {name}
            </p>



            <p
                style={{
                    textAlign: "center",
                    fontFamily: 'Inter',
                    fontWeight: 600,
                    fontSize: "10px",
                    color: "#0000004D"
                }}
            >
                {`${count === 0 ? " " : count + " " + Numerals.numeralsProducts(Number(count))}`}
            </p>
            <Button style={{ width: "100%", height: "50px" }} type="primary"><ButtonText style={{ fontSize: "18px" }}>Выбрать</ButtonText></Button>
        </div >
    );

}
export default AdditionProductCard;