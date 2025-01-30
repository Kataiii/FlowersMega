import { useEffect, useState } from "react";
import { ProductCatalogCard, useCategoryControllerGetIdByNameQuery, useProductsSizesControllerGetProductsCatalogWithPaginationQuery } from "../../store/product";
import { Modal, Pagination } from "antd";
import { Title } from "../../shared/ui/forAdditionalPages/Title";
import { Text } from "../../shared/ui/forAdditionalPages/Content";
import { SmartProductCardCatalog } from "./SmartProductCardCatalog";
interface Props {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const DecorsAddition: React.FC<Props> = ({ isOpen, setIsOpen }) => {
    const { data: categoryIdDatA } = useCategoryControllerGetIdByNameQuery({ name: "Мягкие игрушки" });
    const { data: categoryIdDataB } = useCategoryControllerGetIdByNameQuery({ name: "Шары" });
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(20);
    const [products, setProducts] = useState<ProductCatalogCard[]>([]);
    const [totalItems, setTotalItems] = useState(0);

    const { data: toys, isLoading: isToysLoading } = useProductsSizesControllerGetProductsCatalogWithPaginationQuery({
        page,
        limit: pageSize / 2,
        category: Number(categoryIdDatA),
    });

    const { data: baloons, isLoading: isBaloonsLoading } = useProductsSizesControllerGetProductsCatalogWithPaginationQuery({
        page,
        limit: pageSize / 2,
        category: Number(categoryIdDataB),
    });



    useEffect(() => {
        const totalCount = (toys?.count || 0) + (baloons?.count || 0);
        setTotalItems(totalCount);
    }, [toys?.count, baloons?.count]);

    useEffect(() => {
        const combinedProducts = [
            ...(toys?.products || []),
            ...(baloons?.products || []),
        ];
        setProducts(combinedProducts);
    }, [toys?.products, baloons?.products]);

    const handlePageChange = (newPage: number, newPageSize?: number) => {
        setPage(newPage);
        setProducts([]);
        if (newPageSize) {
            setPageSize(newPageSize);
        }
    };

    const handleCardClick = () => {
        setIsOpen(false);
    };

    // const totalItems = Math.min(toys?.count || 0, pageSize * page) + Math.min(baloons?.count || 0, pageSize * page);
    console.log(totalItems, "total")

    return (
        (products.length === 0 && isToysLoading && isBaloonsLoading) ? (
            <Modal
                width={"1100px"}
                open={isOpen}
                onCancel={() => setIsOpen(false)}
                footer={false}
            >
                <Title>Декор</Title>
                <Text style={{ fontSize: "16px", textAlign: "center" }}>Нет товаров</Text>
            </Modal>
        ) : (
            <Modal
                width={"1100px"}
                open={isOpen}
                onCancel={() => setIsOpen(false)}
                footer={false}
            >
                <Title>Декор</Title>
                <div
                    style={{
                        width: "100%",
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
                        gridGap: "5px",
                    }}
                >
                    {products &&
                        products.map((item, index) => (
                            <div
                                key={`productSizes-${index}`}
                                onClick={handleCardClick}
                                style={{ cursor: "pointer" }}
                            >
                                <SmartProductCardCatalog product={item} />
                            </div>
                        ))}
                </div>
                <Pagination
                    style={{ marginTop: "16px", display: 'block', textAlign: 'center' }}
                    total={totalItems}
                    current={page}
                    pageSize={pageSize}
                    onChange={handlePageChange}
                />
            </Modal>
        )
    );
};

export default DecorsAddition;
