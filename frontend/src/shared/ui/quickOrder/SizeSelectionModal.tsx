import { Dispatch, SetStateAction, useMemo } from "react";
import { ProductCatalogCard, ProductSize } from "../../../store/product";
import { CartProduct } from "../../../entities/cart/types";
import ModalEmpty from "../modalEmpty/ModalEmpty";
import { useAppSelector } from "../../../store/store";
import { isInCartSelector } from "../../../entities/cart/redux/selectors";
import ElementSizeSelection from "./ElementSizeSelection";

interface SizeSelectionModalProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  product: ProductCatalogCard;
  hoveredIndex: number | null;
  setHoveredIndex: (index: number | null) => void;
  onSizeClick: (product: ProductCatalogCard, index: number) => void;
  onChange?: (isInCart: boolean) => void;
}

const SizeSelectionModal: React.FC<SizeSelectionModalProps> = ({
  isOpen,
  setIsOpen,
  product,
  hoveredIndex,
  setHoveredIndex,
  onSizeClick,
  onChange,
}) => {
  return (
    <ModalEmpty
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      children={
        <div>
          <p
            style={{
              width: "40%",
              textAlign: "start",
              fontSize: "24px",
              fontFamily: "Inter",
              fontWeight: "600",
              marginBottom: "32px",
              color: "var(--secondary-text-color)"
            }}
          >
            Выберите размер
          </p>
          {product.productSizes.map((element, index) => {
            return (
              <ElementSizeSelection
                key={index}
                product={product}
                productSize={element}
                hoveredIndex={hoveredIndex}
                index={index}
                setHoveredIndex={setHoveredIndex}
                onSizeClick={onSizeClick}
                onChange={onChange}
              />
            );
          })}
        </div>
      }
    />
  );
};

export default SizeSelectionModal;
