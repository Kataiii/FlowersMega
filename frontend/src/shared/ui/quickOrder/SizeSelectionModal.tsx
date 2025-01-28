import { Dispatch, SetStateAction, useState } from "react"
import { Product, ProductCatalogCard, ProductSize } from "../../../store/product"
import { useDispatch } from "react-redux"
import { CartProduct } from "../../../entities/cart/types"
import ModalEmpty from "../modalEmpty/ModalEmpty"
import { addOneToCart } from "../../../entities/cart/redux/slice"

interface SizeSelectionModalProps {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    product: ProductCatalogCard;
    hoveredIndex: number | null;
    setHoveredIndex: (index: number | null) => void;
    onSizeClick: (product: ProductCatalogCard) => void;
    onChange?: () => void;
}

const SizeSelectionModal: React.FC<SizeSelectionModalProps> = ({
    isOpen,
    setIsOpen,
    product,
    hoveredIndex,
    setHoveredIndex,
    onSizeClick
}) => {

    return (
        <ModalEmpty
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            children={
                <div>
                    <p style={{ width: "40%", textAlign: "start", fontSize: "24px", fontFamily: "Inter", fontWeight: "600", marginBottom: "32px" }}>
                        Выберите размер
                    </p>
                    {
                        product.productSizes.map((productSize, index) => {
                            const isHovered = hoveredIndex === index;
                            return (
                                <div
                                    key={index}
                                    style={{
                                        display: 'flex', flexDirection: 'row', justifyContent: 'space-between', padding: '8px',
                                        border: "1px solid var(--primary-bg-color)", marginBottom: "8px",
                                        borderRadius: "4px", alignItems: 'center',
                                        backgroundColor: isHovered ? "var(--main-bg-color)" : "transparent",
                                        cursor: "pointer", transition: "background-color 0.3s ease",
                                    }}
                                    onMouseEnter={() => setHoveredIndex(index)}
                                    onMouseLeave={() => setHoveredIndex(null)}
                                    onClick={() => onSizeClick(product)}
                                >
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: "4px" }}>
                                        <p style={{ fontFamily: 'Inter', fontWeight: '400', fontSize: '16px' }}>{productSize.size.name}</p>
                                        <p style={{ fontFamily: 'Inter', fontWeight: '400', fontSize: '12px', color: "var(--text-modal)" }}>
                                            Параметры размера: {productSize.productSize.paramsSize}
                                        </p>
                                    </div>
                                    <p style={{ fontFamily: 'Inter', fontWeight: '600', fontSize: '16px' }}>{productSize.productSize.prise} ₽</p>
                                </div>
                            );
                        })
                    }
                </div>
            }
        />
    );
};

export default SizeSelectionModal;