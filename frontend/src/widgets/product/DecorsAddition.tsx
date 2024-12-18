import { useEffect, useState } from "react";
import { useCategoryControllerGetIdByNameQuery, useProductsSizesControllerGetByCategotyIdWithPaginationQuery } from "../../store/product";
import { Modal, Pagination } from "antd";
import { Title } from "../../shared/ui/forAdditionalPages/Title";
import { Text } from "../../shared/ui/forAdditionalPages/Content";
import { SmartProductCard } from "./SmartProductCart";
interface Props {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const DecorsAddition: React.FC<Props> = ({ isOpen, setIsOpen }) => {
    const { data: categoryIdDatA } = useCategoryControllerGetIdByNameQuery({ name: "Мягкие игрушки" });
    const { data: categoryIdDataB } = useCategoryControllerGetIdByNameQuery({ name: "Шары" });
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(4);
    const { data: toys, isLoading: isToysLoading } = useProductsSizesControllerGetByCategotyIdWithPaginationQuery({
        page: page,
        limit: pageSize,
        category: Number(categoryIdDatA),
    });
    const { data: baloons, isLoading: isBaloonsLoading } = useProductsSizesControllerGetByCategotyIdWithPaginationQuery({
        page: page,
        limit: pageSize,
        category: Number(categoryIdDataB),
    });
    const [products, setProducts] = useState(
        toys?.products && baloons?.products ? [...toys.products, ...baloons.products] : []
    );

    const handlePageChange = (newPage: number, newPageSize?: number) => {
        setPage(newPage);
        if (newPageSize) {
            setPageSize(newPageSize);
        }
    };

    const handleCardClick = () => {
        setIsOpen(false);
    };

    useEffect(() => {
        setProducts(
            toys?.products && baloons?.products ? [...toys.products, ...baloons.products] : []
        );
    }, [toys, baloons]);

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
                        gridTemplateColumns: "repeat(4, 1fr)",
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
                                <SmartProductCard product={item} />
                            </div>
                        ))}
                </div>
                <Pagination
                    style={{ marginTop: "16px", textAlign: "center" }}
                    total={products?.length}
                    current={page}
                    pageSize={pageSize}
                    onChange={handlePageChange}
                />
            </Modal>
        )
    );
};

export default DecorsAddition;
