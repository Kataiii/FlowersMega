import { Button, Image, Table } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { productSizesControllerGetProductsWithPaginationApiResponse, useProductsControllerGetByIdQuery, useProductsSizesControllerGetByProductIdQuery } from "../../store/product";
import { Numerals } from "../../shared/utils/numerals";
import { API_URL } from "../../shared/utils/constants";
import { useMemo, useState } from "react";
import { useProductsSizesControllerGetProductSizeForCardByIdQuery, useSizesControllerGetAllQuery } from "../../store/size";
import { ButtonText } from "../../pages/admin/ui/products/Products";
import { styled } from "styled-components";
import { retry } from "@reduxjs/toolkit/query";


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
    id?: number;
    name?: string;
    type?: string;
    onCategoriesAndFiltersChange?: (categories: string[], filters: string[]) => void;
    productSizedPag?: productSizesControllerGetProductsWithPaginationApiResponse;
}

const ProductAdminCard: React.FC<ProductAdminCardProps> = ({ id, name, type, onCategoriesAndFiltersChange, productSizedPag }) => {
    const navigate = useNavigate();
    const locate = useLocation();
    const { data: productSizes } = useProductsSizesControllerGetByProductIdQuery({ id: Number(id) });
    const { data } = useProductsControllerGetByIdQuery({ id: Number(id) });
    const { data: sizes, isLoading: isSizesLoading } = useSizesControllerGetAllQuery();
    // const { data: productInfo } = useProductsSizesControllerGetProductSizeForCardByIdQuery({ id: Number(id) });
    const [isExpanded, setIsExpanded] = useState(false);

    // console.log(productSizes, "PPPPPPPPPPPPPPPPPPPPPPPPPP");
    // console.log(productSizedPag, "PPPPPPPPPPPPPPPPPPPPPPPPPPPP");
    const dataSource = useMemo(() => {
        if (!productSizedPag || !sizes || !id) return [];

        return productSizedPag.products
            .filter((item) => item.products.id === id)
            .flatMap((items) => {
                console.log(items, "Filtered Product Items");

                return items.productsSizes.map((info) => {
                    console.log(info, "ProductSize Info");
                    const size = sizes?.find((s) => s.id === info.productSize.idSize);
                    console.log(size, "Matching Size");
                    if (size) {
                        return {
                            key: info.productSize.id,
                            sizeName: size.name,
                            paramSize: info.productSize.paramsSize,
                            price: info.productSize.prise,
                        };
                    }
                    return null;
                });
            })
            .filter((item): item is NonNullable<typeof item> => item !== null);
    }, [productSizedPag, sizes, id]);

    // console.log(dataSource, "LMAKWINFOIENIRENIREIERIJERIJ");
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
                        display: "grid",
                        gridTemplateColumns: "3fr 1fr 1fr",
                        // flexDirection: "row",
                        gap: "8px",
                        // alignItems: "center",
                        // justifyContent: "space-between",
                    }}
                >
                    <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                        <div style={{ fontFamily: "Inter", fontWeight: 400, fontSize: 12 }}>№ {id}</div>
                        {/* @ts-ignore */}
                        <Image style={{ width: "32px", height: "32px", borderRadius: "6px" }} src={`${API_URL}/products/images/${data?.id}/${data?.images?.[0]?.url}`}
                        />
                        <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                            <div><CardTextHeader>{name}</CardTextHeader></div>
                            <div><CardTypeTextHeader>Тип: {type}</CardTypeTextHeader></div>
                        </div>
                    </div>

                    <Button
                        type="primary"
                        style={{ backgroundColor: "var(--primary-bg-color)" }}
                        onClick={() => {
                            navigate(`/admin/product/${id}`, { state: { previousLocation: locate.pathname } });
                        }}
                    >
                        <ButtonText>
                            Редактировать
                        </ButtonText>

                    </Button>

                    <Button
                        style={{ backgroundColor: "var(--primary-bg-color)" }}
                        type="primary"
                        onClick={() => { setIsExpanded(!isExpanded); console.log(sizes) }}
                    >
                        <ButtonText>
                            {productSizes && productSizes.length > 0
                                ? `${productSizes.length} ${Numerals.numeralsSizes(productSizes.length)}`
                                : "Нет"}

                        </ButtonText>

                    </Button>
                </div>

                <ExpandableContent isExpanded={isExpanded}>
                    <div style={{ marginTop: "16px" }}>
                        <Table
                            size="small"
                            pagination={false}
                            style={{ width: "350px" }}
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
