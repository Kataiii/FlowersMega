import { Button, Image, Table } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { useProductsControllerGetByIdQuery, useProductsSizesControllerGetByProductIdQuery } from "../../store/product";
import { Numerals } from "../../shared/utils/numerals";
import { API_URL } from "../../shared/utils/constants";
import { useMemo, useState } from "react";
import { useProductsSizesControllerGetProductSizeForCardByIdQuery, useSizesControllerGetAllQuery } from "../../store/size";

interface ProductAdminCardProps {
    id?: number;
    name?: string;
    type?: number;
    onCategoriesAndFiltersChange?: (categories: string[], filters: string[]) => void;
}

const ProductAdminCard: React.FC<ProductAdminCardProps> = ({ id, name, type, onCategoriesAndFiltersChange }) => {
    const navigate = useNavigate();
    const locate = useLocation();
    const { data: productSizes } = useProductsSizesControllerGetByProductIdQuery({ id: Number(id) });
    const { data } = useProductsControllerGetByIdQuery({ id: Number(id) });
    const { data: sizes } = useSizesControllerGetAllQuery();
    const { data: productInfo } = useProductsSizesControllerGetProductSizeForCardByIdQuery({ id: Number(id) });
    const [isExpanded, setIsExpanded] = useState(false);

    const dataSource = useMemo(() => {
        if (!productSizes || !sizes || !productInfo) return [];

        const categories = productInfo.product.categories.map((category) => category.name);
        const filters = productInfo.product.filters.map((filter) => filter.name);

        if (onCategoriesAndFiltersChange) {
            onCategoriesAndFiltersChange(categories, filters);
        }

        return productSizes
            .map((productSize) => {
                const size = sizes.find((s) => s.id === productSize.idSize);
                if (size) {
                    return {
                        key: productSize.id,
                        sizeName: size.name,
                        paramsSize: productSize.paramsSize,
                        price: productSize.prise,
                        categories: categories.join(", "),
                        filters: filters.join(", "),
                    };
                }
                return null;
            })
            .filter((item): item is NonNullable<typeof item> => item !== null);
    }, [productSizes, sizes, productInfo, onCategoriesAndFiltersChange]);

    const columns = [
        {
            title: "Размер",
            dataIndex: "sizeName",
            key: "sizeName",
        },
        {
            title: "Цена",
            dataIndex: "price",
            key: "price",
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
                        display: "flex",
                        flexDirection: "row",
                        gap: "8px",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                        <div>№ {id}</div>
                        {/* @ts-ignore */}
                        <Image style={{ width: "32px", height: "32px", borderRadius: "6px" }} src={`${API_URL}/products/images/${data?.id}/${data?.images?.[0]?.url}`}
                        />
                        <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                            <div>{name}</div>
                            <div>Тип: {type}</div>
                        </div>
                    </div>

                    <Button
                        type="primary"
                        style={{ backgroundColor: "var(--primary-bg-color)" }}
                        onClick={() => {
                            navigate(`/admin/product/${id}`, { state: { previousLocation: locate.pathname } });
                        }}
                    >
                        Редактировать
                    </Button>

                    <Button
                        style={{ backgroundColor: "var(--primary-bg-color)" }}
                        type="primary"
                        onClick={() => setIsExpanded(!isExpanded)}
                    >
                        {productSizes && productSizes.length > 0
                            ? `${productSizes.length} ${Numerals.numeralsSizes(productSizes.length)}`
                            : "Нет"}
                    </Button>
                </div>

                {isExpanded && (
                    <div style={{ marginTop: "16px" }}>
                        <Table
                            size="small"
                            pagination={false}
                            style={{ width: "350px" }}
                            dataSource={dataSource}
                            columns={columns}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductAdminCard;
