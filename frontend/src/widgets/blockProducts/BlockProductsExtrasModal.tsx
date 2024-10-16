import { Dispatch, SetStateAction } from "react";
import ModalEmpty from "../../shared/ui/modalEmpty/ModalEmpty";
import { FullProductSizeDto, useProductsSizesControllerGetByCategotyIdWithPaginationQuery } from "../../store/product";
import { SmartProductCard } from "../product/SmartProductCart";
import { BlockGrid } from "./BlockProducts";

interface ExtrasModalProps {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    category: number;
}

const nothingStyle: React.CSSProperties = {
    textAlign: "center",
    fontSize: "24px"
};

const BlockProductsExtrasModal: React.FC<ExtrasModalProps> = ({ isOpen, setIsOpen, category }) => {
    
    const { isLoading, data } = useProductsSizesControllerGetByCategotyIdWithPaginationQuery(
        { limit: 10, page: 1, category: category }
    );
    return (
        isOpen ? 
        <ModalEmpty isOpen={isOpen} setIsOpen={setIsOpen}>
            <>
                {console.log("category", category)}
                <h2>Топперы</h2>
                {isLoading ? (
                    <p>Загрузка...</p>
                ) : data ? (
                    <BlockGrid>
                        {data.products.map((product, index) => (
                            <SmartProductCard key={`toppers-${index}`} product={product} />
                        ))}
                    </BlockGrid>
                ) : (
                    <p style={nothingStyle}>Товаров нет :(</p>
                )}
            </>
        </ModalEmpty> : <></>
    );
};

export default BlockProductsExtrasModal;