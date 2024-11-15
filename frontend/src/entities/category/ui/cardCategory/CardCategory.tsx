import { API_URL } from "../../../../shared/utils/constants";
import { Numerals } from "../../../../shared/utils/numerals";
import { Category } from "../../../../store/category";
import { useCategoriesProductsControllerGetAllQuery } from "../../../../store/product";

type CardCategoryProps = {
    category: Category;
    clickHandler: () => void;
}

const CardCategory: React.FC<CardCategoryProps> = ({category, clickHandler}) => {
    const {isLoading, data} = useCategoriesProductsControllerGetAllQuery({id: category.id ?? -1});

    return(
        <div onClick={clickHandler} style={{cursor: "pointer", width: "100%", boxShadow: "0px 0px 2px 0px #EEB2CE", backgroundColor: "var(--block-bg-color)", borderRadius: "6px", padding: "10px 8px", display: "flex", flexDirection: "column", alignItems: "center", gap: "10px"}}>
            <img style={{width: '96%', borderRadius: '6px'}} src={`${API_URL}/categories/${category.id}/${category.url}`} alt={category.name}/>
            <p style={{textAlign: "center", fontFamily: 'Inter', fontWeight: 600, fontSize: '16px', color: 'var(--secondary-text-color)'}}>{category.name}</p>
            <p style={{textAlign: "center", fontFamily: 'Inter', fontWeight: 600, fontSize: "10px", color: "#0000004D"}}>{ isLoading ? "Загрузка..." : `${data === 0 ? " " : data + " " + Numerals.numeralsProducts(Number(data))}`}</p>
        </div>
    )
}

export default CardCategory;