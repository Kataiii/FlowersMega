import { Button, Image, Table } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { ProductWithSizes, Size } from "../../store/product";
import { Numerals } from "../../shared/utils/numerals";
import { API_URL } from "../../shared/utils/constants";
import { useMemo, useState } from "react";
import { ButtonText } from "../../pages/admin/ui/products/Products";
import { styled } from "styled-components";


const ExpandableContent = styled.div<{ isExpanded: boolean }>`
  max-height: ${(props) => (props.isExpanded ? "500px" : "0")};
  overflow: hidden;
  transition: max-height 0.3s ease-in-out;
  grid-column: span 2; 
`;

export const CardTextHeader = styled.p`
    font-family: "Inter UI", sans-serif;
    font-size: 12px;
    font-weight: 600;
`

export const CardTypeTextHeader = styled.p`
    font-family: "Inter", sans-serif;
    font-size: 10px;
    font-weight: 600;
    color: var(--text-modal);
`


interface ProductAdminCardProps {
    product: ProductWithSizes;
    type?: string;
    sizes?: Size[];
    onCategoriesAndFiltersChange?: (categories: string[], filters: string[]) => void;
}

const ProductAdminCard: React.FC<ProductAdminCardProps> = ({ product, sizes, type, onCategoriesAndFiltersChange }) => {
    const navigate = useNavigate();
    const locate = useLocation();
    const [isExpanded, setIsExpanded] = useState(false);

    const dataSource = useMemo(() => {
        if (!product || !sizes) return [];
        return product.productsSizes.map(productSize => {
            return {
                key: productSize.productSize.id,
                sizeName: sizes?.find((s) => s.id == productSize.productSize.idSize)?.name,
                paramsSize: productSize.productSize.paramsSize,
                extraPrice: productSize.productSize.extraPrice,
                price: productSize.productSize.prise,
            };
        }).sort((a, b) => a.price - b.price)
    }, [product, sizes]);

    const columns = [
        {
            title: "Размер",
            dataIndex: "sizeName",
            key: "sizeName",
        },
        {
            title: "Цена, ₽",
            dataIndex: "price",
            key: "price",
        },
        {
            title: "Цена с наценкой, ₽",
            dataIndex: "extraPrice",
            key: "extraPrice",
        },
        {
            title: "Уточнение",
            dataIndex: "paramsSize",
            key: "paramsSize",
        },
    ];

    return (

        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <div
                style={{
                    overflow: "hidden",
                    border: "1px solid var(--primary-bg-color)",
                    padding: "16px",
                    borderRadius: "6px",
                }}
            >
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "3fr 1fr 1fr",
                        gap: "8px",
                    }}
                >
                    <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                        <div style={{ fontFamily: "Inter", fontWeight: 400, fontSize: 12 }}>№ {product.products.id}</div>
                        {/* TODO переделать на передачу корректной ссылки */}
                        {/* @ts-ignore */}
                        <Image style={{ width: "32px", height: "32px", borderRadius: "6px" }} src={`${API_URL}/products/images/${product.products?.id}/${product.productsSizes[0]?.product.image?.url}`}
                        />
                        <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                            <div><CardTextHeader>{product.products.name}</CardTextHeader></div>
                            <div><CardTypeTextHeader>Тип: {type}</CardTypeTextHeader></div>
                        </div>
                    </div>

                    <Button
                        type="primary"
                        style={{ backgroundColor: "var(--primary-bg-color)" }}
                        onClick={() => {
                            navigate(`/admin/product/${product.products.id}`, { state: { previousLocation: locate.pathname } });
                        }}
                    >
                        <ButtonText>
                            Редактировать
                        </ButtonText>

                    </Button>

                    <Button
                        style={{ backgroundColor: "var(--primary-bg-color)" }}
                        type="primary"
                        onClick={() => { setIsExpanded(!isExpanded); }}
                    >
                        <ButtonText>
                            {product.productsSizes && product.productsSizes.length > 0
                                ? `${product.productsSizes.length} ${Numerals.numeralsSizes(product.productsSizes.length)}`
                                : "Нет"}

                        </ButtonText>

                    </Button>
                </div>

                <ExpandableContent isExpanded={isExpanded}>
                    <div style={{ marginTop: "16px" }}>
                        <Table
                            size="small"
                            pagination={false}
                            // style={{ width: "350px" }}
                            dataSource={dataSource}
                            columns={columns}
                        />
                    </div>
                </ExpandableContent>
            </div>
        </div>
    );
};

export default ProductAdminCard;
