import { isInCartSelector } from "../../../entities/cart/redux/selectors";
import { CartProduct } from "../../../entities/cart/types";
import {
  Product,
  ProductCatalogCard,
  ProductSize,
  Size,
} from "../../../store/product";
import { useAppSelector } from "../../../store/store";

type ElementSizeSelectionProps = {
  product: ProductCatalogCard;
  productSize: {
    productSize: ProductSize;
    size: Size;
  };
  hoveredIndex: number | null;
  index: number;
  setHoveredIndex: (index: number | null) => void;
  onSizeClick: (product: ProductCatalogCard, index: number) => void;
  onChange?: (isInCart: boolean) => void;
};

const ElementSizeSelection: React.FC<ElementSizeSelectionProps> = ({
  product,
  productSize,
  hoveredIndex,
  index,
  setHoveredIndex,
  onSizeClick,
  onChange
}) => {
  const mapProductSizeToCartProduct = (
    product: ProductCatalogCard,
    productSize: ProductSize
  ): Omit<CartProduct, "count"> => ({
    ...productSize,
    product: {
      id: product.id ?? 0,
      name: product.name,
      description: product.description,
      structure: product.structure ?? "",
      idTypeProduct: product.idTypeProduct,
      image: product.image,
    },
  });

  const cartProduct = mapProductSizeToCartProduct(
    product,
    productSize.productSize
  );

  const isInCart = useAppSelector((state) =>
    isInCartSelector(state, cartProduct)
  );

  const isHovered = hoveredIndex === index;
  
  isInCart === true ? onChange?.(isInCart) : null;

  return (
    <div
      key={index}
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        padding: "8px",
        border: "1px solid var(--primary-bg-color)",
        marginBottom: "8px",
        borderRadius: "4px",
        alignItems: "center",
        backgroundColor: isHovered ? "var(--main-bg-color)" : "transparent",
        cursor: "pointer",
        transition: "background-color 0.3s ease",
      }}
      onMouseEnter={() => setHoveredIndex(index)}
      onMouseLeave={() => setHoveredIndex(null)}
      onClick={() => {
        onSizeClick(product, index);
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
        <p style={{ fontFamily: "Inter", fontWeight: "400", fontSize: "16px" }}>
          {productSize.size.name}
        </p>
        <p
          style={{
            fontFamily: "Inter",
            fontWeight: "400",
            fontSize: "12px",
            color: "var(--text-modal)",
          }}
        >
          Параметры размера: {productSize.productSize.paramsSize}
        </p>
      </div>
      <p style={{ fontFamily: "Inter", fontWeight: "600", fontSize: "16px" }}>
        {productSize.productSize.prise} ₽
      </p>
    </div>
  );
};

export default ElementSizeSelection;
