import { useLocation, useNavigate, useParams } from "react-router-dom";
import Container from "../../../../shared/ui/containerMain/ContainerMain";
import { useProductsControllerCreateWithDetailsMutation, useProductsControllerDeleteByIdMutation, useProductsControllerGetByIdQuery, useProductsControllerGetProductSizesCountQuery, useProductsSizesControllerGetAllSizesByProductIdQuery, useProductsSizesControllerGetByIdQuery, useProductsSizesControllerGetByProductIdQuery } from "../../../../store/product";
import { Flex, Spin, Image, Input, Select, Dropdown, Space, Form, Button, Modal, Upload } from "antd";
import { CloseOutlined, DownOutlined, LoadingOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { styled } from "styled-components"
import { API_URL } from "../../../../shared/utils/constants"
import TypeDropdown from "../../../../shared/ui/dropdown/TypeDropdown";
import { useEffect, useState } from "react";
import TextArea from "antd/es/input/TextArea";
import CategoryDropdown from "../../../../shared/ui/dropdown/CategoryDropdown";
import FilterDropdown from "../../../../shared/ui/dropdown/FilterDropdown";
import VariationsBlock from "../../../../shared/ui/variations/VariationsBlock";
import { FilterWithItems, useFiltersControllerGetAllQuery } from "../../../../store/filter";
import { useCategoriesControllerGetAllQuery } from "../../../../store/category";
import { ButtonText } from "./Products";
import { Numerals } from "../../../../shared/utils/numerals";
import { Block, ImageBlockInside, ImageBlockOutside, StyledCategoriesFiltersBlock, StyledTextArea, StyledVarBlock } from "./Product.styled";
import ts from "typescript";

interface ProductProps {
    onCatChange?: (categories: any[]) => void,
    onFilterChange?: (filters: any[]) => void,
}

export const StyledForm = styled(Form)`
  .ant-form-item {
    margin-bottom: 0px;
  }
`;

export const HeadText = styled.p`
  font-size: 24px;
  font-weight: 600;
`;

export const ValueText = styled.p`
  font-size: 12px;
  font-weight: 400;
  color: var(--text-modal);
`;

export const Text = styled.p`
  font-size: 12px;
  font-weight: 400;
`;

export const NamedField = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: left;
  gap: 4px;
  border-radius: 4px;
  margin-top: 10px;
`;

export const ScrollContainer = styled.div`
  border: 1px solid var(--primary-bg-color);
  border-radius: 4px;
  max-height: 80px;
  height: 80px;
  overflow-x: hidden;
  overflow-y: auto;
  text-align: justify;
  padding: 8px;
`;

export const DeleteModalHead = styled.p`
    font-family: "Inter";
    font-weight: 700;
    font-size: 16px;
    color: var(--secondary-text-color);
`;

const Product: React.FC<ProductProps> = ({ onCatChange, onFilterChange }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const locate = useLocation();
    const { isLoading, data } = useProductsControllerGetByIdQuery({ id: Number(id) });
    const [disabled, setDisabled] = useState(true);
    const [form] = Form.useForm();
    const { data: productFiltCat } = useProductsControllerGetByIdQuery({ id: Number(id) });

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [variations, setVariations] = useState<any[]>([]);
    const [filters, setFilters] = useState<any[]>([]);
    const { data: filtersData, isLoading: filtersLoading } = useFiltersControllerGetAllQuery();
    const { data: categories, isLoading: categoriesLoading } = useCategoriesControllerGetAllQuery();
    const { data: productVariations, isLoading: productVariationsLoading } = useProductsSizesControllerGetAllSizesByProductIdQuery({ id: Number(id) });
    const [createProductWithDetails] = useProductsControllerCreateWithDetailsMutation();
    const [photoUrl, setPhotoUrl] = useState<string | null>(null);
    const [deleteProduct] = useProductsControllerDeleteByIdMutation();
    const productSizesCount = useProductsControllerGetProductSizesCountQuery({ id: Number(id) });
    //@ts-ignore
    const [selectedCategories, setSelectedCategories] = useState<{ name: string; photo: string }[]>(productFiltCat?.categories.map(category => {
        return {
            id: category.id,
            name: category.name,
            photo: "category.image "
        }
    }));
    console.log(productVariations, "productVariations");
    // @ts-ignore
    console.log(productFiltCat, "productFiltCat");
    const handleFormFinish = async (values: any) => {
        const formattedFilters = filters.map((filter) => {
            return {
                filter: {
                    id: filter.filter.id,
                    name: filter.filter.name,
                },
                tags: (filter.tags || []).map((tag: any) => ({
                    id: tag.id,
                    name: tag.name,
                    idFilter: tag.idFilter,
                })),
            };
        });

        const categoriesString = JSON.stringify(
            selectedCategories.map((category: any) => ({
                id: category.id,
                name: category.name,
                photo: category.photo,
            }))
        ).slice(1, -1);

        const filtersString = JSON.stringify(formattedFilters).slice(1, -1);

        const formData = {
            name: values.name,
            type: values.type,
            description: values.description,
            structure: values.structure,
            // @ts-ignore
            photo: photoUrl ? photoUrl : (data?.images?.[0]?.url || ""),
            productSize: variations.map((variation: any) => ({
                idSize: variation.idSize,
                prise: variation.prise,
                paramsSize: variation.paramsSize,
            })),
            categories: categoriesString,
            filters: filtersString,
            // updatedAt: values.updatedAt,
        };

        console.log("Final filters data:", formattedFilters);
        const json = JSON.stringify(formData);
        console.log("JSON:", json);
        console.log(selectedCategories)
        try {
            const response = await createProductWithDetails({ body: formData }).unwrap();
            console.log("Product created successfully:", response);
        } catch (error) {
            console.error("Error creating product:", error);
        }
    };


    const handleCategoryChange = (newCategories: { name: string; photo: string }[]) => {
        setSelectedCategories(newCategories);
    };

    const handleFilterChange = (newFilters: any[]) => {
        setFilters(newFilters);
        console.log("New filters:", newFilters);
    };

    const handleEdit = () => {
        setDisabled(false);
    };

    useEffect(() => {
        if (productFiltCat && productVariations) {


            const filterMap = new Map<number, { filter: { id: number, name: string }, tags: any[] }>();
            // @ts-ignore
            productFiltCat.filters.forEach((productFilter) => {
                const matchingFilter = filtersData?.find((filter) => filter.id === productFilter.idFilter);

                if (matchingFilter) {
                    if (!filterMap.has(productFilter.idFilter)) {
                        filterMap.set(productFilter.idFilter, {
                            filter: {
                                id: productFilter.idFilter,
                                name: matchingFilter.name,
                            },
                            tags: [],
                        });
                    }
                    const filterEntry = filterMap.get(productFilter.idFilter);
                    const tags = (matchingFilter.items || [])
                        .filter((tag) => tag.id === productFilter.id);

                    if (tags.length > 0 && filterEntry) {
                        filterEntry.tags.push(...tags);
                    }
                }
            });
            const mappedFilters = Array.from(filterMap.values());

            // @ts-ignore
            setFilters(mappedFilters);
            console.log("SELECT CAT", selectedCategories);
            console.log("FILTERS", filters);
            const variationsS = productVariations.productsSizes.flatMap(variation => ({
                idSize: variation.idSize,
                prise: variation.prise,
                paramsSize: variation.paramsSize,
            }));
            console.log("aaaaaa", variationsS);
            setSelectedCategories(selectedCategories)
            setVariations(variationsS);
            if (onCatChange) {
                onCatChange(selectedCategories);
            }
            if (onFilterChange) {
                onFilterChange(filters);
            }
        }
    }, [productFiltCat, productVariations, data]);

    useEffect(() => {
        {
            data ? setDisabled(true) : setDisabled(false);
        }
    }, [data]);



    return (
        <Container>
            {isLoading && categoriesLoading && productFiltCat ? (
                <Flex align="center" gap="middle">
                    <Spin indicator={<LoadingOutlined spin />} size="large" />
                </Flex>
            ) : (
                <StyledForm
                    form={form}
                    onFinish={handleFormFinish}
                    layout="vertical"
                    requiredMark={false}
                    initialValues={{
                        name: data?.name,
                        type: data?.idTypeProduct,
                        description: data?.description,
                        structure: data?.structure,
                    }}
                >
                    <HeadText>
                        {data ? (disabled ? `${data?.name}` : "Редактирование продукта") : "Создание продукта"}
                    </HeadText>
                    <Block>
                        <div style={{ width: "600px", display: "flex", flexDirection: "column", marginBottom: "0" }}>
                            <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
                                <Form.Item label={<ValueText>Наименование</ValueText>} name="name" style={{ margin: "5px 0" }}>
                                    <Input
                                        disabled={disabled}
                                        style={{ width: "450px" }}
                                        placeholder="Введите название товара..."
                                    />
                                </Form.Item>
                                <Form.Item label={<ValueText>Тип товара</ValueText>} name="type" style={{ margin: "5px 0" }}>
                                    <TypeDropdown disabled={disabled} />
                                </Form.Item>
                            </div>
                            <Form.Item label={<ValueText>Описание</ValueText>} name="description" style={{ width: "600px", margin: "0" }}>
                                <StyledTextArea
                                    disabled={disabled}
                                    placeholder="Введите описание товара..."
                                    style={{ resize: "none" }}
                                />
                            </Form.Item>
                        </div>
                        <Form.Item name="photo" style={{ alignSelf: "flex-start" }} label={<ValueText>Фотография</ValueText>}>
                            {/* @ts-ignore */}
                            {data?.images?.[0]?.url ? (
                                // @ts-ignore
                                <Image style={{ width: 150, height: 155, borderRadius: 6 }} src={`${API_URL}/products/images/${data.id}/${data?.images[0].url}`}
                                />
                            ) : (
                                <ImageBlockOutside>
                                    <ImageBlockInside>
                                        {/* <ProductPhotoLoader /> */}
                                    </ImageBlockInside>
                                </ImageBlockOutside>
                            )}
                        </Form.Item>
                    </Block>
                    <Form.Item label={<ValueText>Состав</ValueText>} name="structure" style={{ margin: "5px 0" }}>
                        <Input disabled={disabled} style={{ width: "760px" }} />
                    </Form.Item>
                    <Form.Item label={<ValueText>Вариации</ValueText>} name="productSize" style={{ margin: "5px 0" }}>
                        <StyledVarBlock>
                            <VariationsBlock
                                value={variations}
                                onVariationsChange={(newVariations) => setVariations(newVariations)}
                                disabled={disabled}
                            />
                        </StyledVarBlock>
                    </Form.Item>

                    <Form.Item label={<ValueText>Категории</ValueText>} name="categories" style={{ margin: "10px 0" }}>
                        <StyledCategoriesFiltersBlock>
                            <CategoryDropdown
                                value={selectedCategories}
                                onChange={handleCategoryChange}
                                disabled={disabled}
                                name="Добавить категорию"
                                showAddButton={true}
                                data={categories}
                            />
                        </StyledCategoriesFiltersBlock>
                    </Form.Item>
                    <Form.Item label={<ValueText>Фильтры</ValueText>} name="filters" style={{ margin: "10px 0" }}>
                        <StyledCategoriesFiltersBlock>
                            <FilterDropdown value={filters} data={filtersData} onChange={handleFilterChange} disabled={disabled} />
                        </StyledCategoriesFiltersBlock>
                    </Form.Item>

                    <div>
                        {data ? (
                            <>
                                {disabled ? (
                                    <Button onClick={() => {
                                        handleEdit();
                                        // @ts-ignore
                                        console.log("kkk", filters);
                                    }}><ButtonText>Редактировать</ButtonText></Button>
                                ) : (
                                    <Button type="primary">
                                        <ButtonText>Сохранить изменения</ButtonText>
                                    </Button>
                                )}
                                <Button type="primary" danger onClick={() => { setIsModalOpen(true); console.log(productSizesCount) }
                                }>
                                    <ButtonText>Удалить</ButtonText>
                                </Button>
                            </>
                        ) : (
                            <Button onClick={() => {
                                // console.log(productSizes)
                            }} type="primary">
                                Сохранить изменения
                            </Button>
                        )}
                    </div>
                </StyledForm>
            )}
            <Modal open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                footer={null}
                style={{ width: "800px" }}
            >
                <div style={{ display: "flex", flexDirection: "column", gap: "10px", alignItems: "start", }}>
                    <DeleteModalHead>Вы уверены, что хотите удалить "{data?.name}"</DeleteModalHead>
                    <Text style={{ color: "red", fontFamily: "Inter" }}>Это действие удалит {productSizesCount.data?.count} {Numerals.numeralsSizes(productSizesCount.data?.count ?? 0)} со связанным товаром</Text>
                    <div style={{ width: "100%", display: "flex", flexDirection: "row", gap: "10px" }}>

                        <Button type="primary" danger onClick={async () => {
                            try {
                                await deleteProduct({ id: Number(id) });
                                console.log("Product deleted", id);
                                setIsModalOpen(false);
                                navigate(`/admin/products`);
                            } catch (error) {
                                console.error("Failed to delete product", error);
                            }
                        }}
                            style={{ width: "49%" }}>Удалить</Button>
                        <Button onClick={() => setIsModalOpen(false)} style={{ width: "49%" }}>Отмена</Button>

                    </div>
                </div>
            </Modal>
        </Container>
    );
};

export default Product;