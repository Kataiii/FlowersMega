import { useState } from "react";
import { useCategoryControllerGetIdByNameQuery, useProductsSizesControllerGetByCategotyIdWithPaginationQuery, useProductsSizesControllerGetProductsCatalogWithPaginationQuery } from "../../store/product";
import { Modal, Pagination } from "antd";
import { Title } from "../../shared/ui/forAdditionalPages/Title";
import { Text } from "../../shared/ui/forAdditionalPages/Content";
import { SmartProductCardCatalog } from "./SmartProductCardCatalog";
interface Props {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    categoryName: string;
}

const Additions: React.FC<Props> = ({ isOpen, setIsOpen, categoryName }) => {
    const { data: categoryIdData } = useCategoryControllerGetIdByNameQuery({ name: categoryName });
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(12);
    const { data, isLoading } = useProductsSizesControllerGetProductsCatalogWithPaginationQuery({
        page: page,
        limit: pageSize,
        category: Number(categoryIdData)
    });

    const handlePageChange = (newPage: number, newPageSize?: number) => {
        setPage(newPage);
        if (newPageSize) {
            setPageSize(newPageSize);
        }
    };

    const handleCardClick = () => {
        setIsOpen(false);
    };

    return (
        (data?.count === 0 && !isLoading) ? (
            <Modal
                width={"1100px"}
                open={isOpen}
                onCancel={() => setIsOpen(false)}
                footer={false}
            >
                <Title>{categoryName}</Title>
                <Text style={{ fontSize: "16px", textAlign: 'center' }}>Нет товаров</Text>
            </Modal>
        ) : (
            <Modal
                width={"1100px"}
                open={isOpen}
                onCancel={() => setIsOpen(false)}
                footer={false}
            >
                <Title>{categoryName}</Title>
                <div style={{
                    width: '100%',
                    display: 'grid',
                    gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
                    gridGap: '5px',
                }}>
                    {data && data.products.map((item, index) => (
                        <div
                            key={`productSizes-${index}`}
                            onClick={handleCardClick}
                            style={{ cursor: 'pointer' }}
                        >
                            <SmartProductCardCatalog product={item} />
                        </div>
                    ))}
                </div>
                <Pagination
                    style={{ marginTop: "16px", textAlign: "center", display: 'block' }}
                    total={data?.count}
                    current={page}
                    pageSize={pageSize}
                    onChange={handlePageChange}
                />
            </Modal>
        )
    );
};
export default Additions;
