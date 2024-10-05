import { useParams } from "react-router-dom";
import Container from "../../../../shared/ui/containerMain/ContainerMain";
import { useProductsControllerCreateWithDetailsMutation, useProductsControllerGetByIdQuery, useProductsSizesControllerGetAllSizesByProductIdQuery, useProductsSizesControllerGetByIdQuery, useProductsSizesControllerGetByProductIdQuery } from "../../../../store/product";
import { Flex, Spin, Image, Input, Select, Dropdown, Space, Form, Button, Modal, Upload } from "antd";
import { CloseOutlined, DownOutlined, LoadingOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { styled } from "styled-components"
import { API_URL } from "../../../../shared/utils/constants"
import { MenuProps } from "antd/lib";
import TypeDropdown from "../../../../shared/ui/dropdown/TypeDropdown";
import { useEffect, useState } from "react";
import TextArea from "antd/es/input/TextArea";
import CategoryDropdown from "../../../../shared/ui/dropdown/CategoryDropdown";
import FilterDropdown from "../../../../shared/ui/dropdown/FilterDropdown";
import Variation from "../../../../shared/ui/variations/Variation";
import VariationsBlock from "../../../../shared/ui/variations/VariationsBlock";
import { ignore } from "antd/es/theme/useToken";
import LoaderPhoto from "../../../../shared/ui/loaderPhoto/LoaderPhoto";
import ts from "typescript";
import { FilterWithItems, useFiltersControllerGetAllQuery } from "../../../../store/filter";
import { useCategoriesControllerGetAllQuery } from "../../../../store/category";
import { useProductsSizesControllerGetByCategotyIdWithPaginationQuery, useProductsSizesControllerGetProductSizeForCardByIdQuery } from "../../../../store/size";
import Item from "antd/es/list/Item";
import { ButtonText } from "./Products";
import SizeDropdown from "../../../../shared/ui/dropdown/SizeDropdown";
import ModalEmpty from "../../../../shared/ui/modalEmpty/ModalEmpty";
import TryPhoto from "../../../../widgets/loadPhoto/TryPhoto";
import { Title } from "../../../../shared/ui/forAdditionalPages/Title";
import ProductPhotoLoader from "../../../../widgets/loadPhoto/ProductPhotoLoader";

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

const ButtonPhoto = styled.h5`
    cursor: pointer;
    font-family: "Inter";
    font-weight: 400;
    font-size: 16px;
    color: var(--primary-bg-color);
`;

const Product: React.FC<ProductProps> = ({ onCatChange, onFilterChange }) => {
    const { id } = useParams();
    const { isLoading, data } = useProductsControllerGetByIdQuery({ id: Number(id) });
    const [disabled, setDisabled] = useState(true);
    const [form] = Form.useForm();
    const [isOpenPhoto, setIsOpenPhoto] = useState<boolean>(false);
    const [variations, setVariations] = useState<any[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<{ name: string; photo: string }[]>([]);
    const [filters, setFilters] = useState<any[]>([]);
    const { data: filtersData, isLoading: filtersLoading } = useFiltersControllerGetAllQuery();
    const { data: categories, isLoading: categoriesLoading } = useCategoriesControllerGetAllQuery();
    const { data: productVariations, isLoading: productVariationsLoading } = useProductsSizesControllerGetAllSizesByProductIdQuery({ id: Number(id) });
    const { data: productFiltCat } = useProductsControllerGetByIdQuery({ id: Number(id) });
    const [createProductWithDetails] = useProductsControllerCreateWithDetailsMutation();
    const [photoUrl, setPhotoUrl] = useState<string | null>(null);

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

            console.log("xddd", mappedFilters);

            // @ts-ignore
            setSelectedCategories(productFiltCat?.categories.map(category => ({
                id: category.id,
                name: category.name,
                photo: "category.image "
            })));
            // @ts-ignore
            setFilters(mappedFilters);

            const variationsS = productVariations.productsSizes.flatMap(variation => ({
                idSize: variation.idSize,
                prise: variation.prise,
                paramsSize: variation.paramsSize,
            }));
            console.log("aaaaaa", variationsS);

            setVariations(variationsS);
            if (onCatChange) {
                onCatChange(selectedCategories);
            }
            if (onFilterChange) {
                onFilterChange(filters);
            }
            // setVariations(productVariations.);
        }
    }, [productFiltCat, productVariations]);

    useEffect(() => {
        {
            data ? setDisabled(true) : setDisabled(false);
        }
    }, [data]);



    return (
        <Container>
            {isLoading ? (
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
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            gap: "10px",
                            width: "760px",
                            height: "185px",
                            marginBottom: "0",
                        }}
                    >
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
                                    {/* <Select
                                        disabled={disabled}
                                        options={[
                                            { value: "bouquet", label: "Букет" },
                                            { value: "decoration", label: "Композия" },
                                        ]}
                                        style={{
                                            width: "140px",
                                            border: "1px solid var(--primary-bg-color)",
                                            borderRadius: "6px",
                                        }}
                                        bordered={false}
                                    /> */}
                                    <TypeDropdown disabled={disabled} />
                                </Form.Item>
                            </div>
                            <Form.Item label={<ValueText>Описание</ValueText>} name="description" style={{ width: "600px", margin: "0" }}>
                                <TextArea
                                    disabled={disabled}
                                    placeholder="Введите описание товара..."
                                    style={{
                                        resize: "none",
                                        overflowX: "hidden",
                                        overflowY: "auto",
                                        textAlign: "justify",
                                        wordBreak: "normal",
                                        maxHeight: "80px",
                                        height: "80px",
                                        padding: "8px",
                                    }}
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
                                <div
                                    style={{
                                        width: 150,
                                        height: 155,
                                        borderRadius: 12,
                                        border: "1px solid var(--primary-bg-color)",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}
                                >
                                    <div
                                        style={{
                                            width: 142,
                                            height: 147,
                                            borderRadius: 12,
                                            border: "1px dashed var(--primary-bg-color)",
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                        }}
                                    >
                                        {/* <ProductPhotoLoader /> */}
                                    </div>
                                </div>
                            )}
                        </Form.Item>
                    </div>
                    <Form.Item label={<ValueText>Состав</ValueText>} name="structure" style={{ margin: "5px 0" }}>
                        <Input disabled={disabled} style={{ width: "760px" }} />
                    </Form.Item>
                    <Form.Item label={<ValueText>Вариации</ValueText>} name="productSize" style={{ margin: "5px 0" }}>
                        <div
                            style={{
                                width: "760px",
                                height: "250px",
                                maxHeight: "250px",
                                border: "1px solid var(--primary-bg-color)",
                                borderRadius: "8px",
                                margin: "4px 0",
                                padding: "8px",
                            }}
                        >
                            <VariationsBlock
                                value={variations}
                                onVariationsChange={(newVariations) => setVariations(newVariations)}
                                disabled={disabled}
                            />
                        </div>
                    </Form.Item>

                    <Form.Item label={<ValueText>Категории</ValueText>} name="categories" style={{ margin: "10px 0" }}>
                        <div
                            style={{
                                width: "760px",
                                height: "40px",
                                border: "1px solid var(--primary-bg-color)",
                                borderRadius: "8px",
                                margin: "4px 0",
                                alignItems: "center",
                                padding: "2.5px",
                                maxHeight: "150px",
                            }}
                        >
                            <CategoryDropdown
                                value={selectedCategories}
                                onChange={handleCategoryChange}
                                disabled={disabled}
                                name="Добавить категорию"
                                showAddButton={true}
                                data={categories}
                            />
                        </div>
                    </Form.Item>
                    <Form.Item label={<ValueText>Фильтры</ValueText>} name="filters" style={{ margin: "10px 0" }}>
                        <div
                            style={{
                                width: "760px",
                                height: "40px",
                                border: "1px solid var(--primary-bg-color)",
                                borderRadius: "8px",
                                margin: "4px 0",
                                alignItems: "center",
                                padding: "2.5px",
                            }}
                        >
                            <FilterDropdown value={filters} data={filtersData} onChange={handleFilterChange} disabled={disabled} />
                        </div>
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
                                    <Button type="primary" htmlType="submit">
                                        <ButtonText>Сохранить изменения</ButtonText>
                                    </Button>
                                )}
                                <Button type="primary" danger htmlType="submit" onClick={() => {
                                    // @ts-ignore

                                    console.log(data?.images?.[0]?.url);
                                }

                                }>
                                    <ButtonText>Удалить</ButtonText>
                                </Button>
                            </>
                        ) : (
                            <Button onClick={() => {
                                // console.log(productSizes)
                            }} htmlType="submit" type="primary">
                                Сохранить изменения
                            </Button>
                        )}
                    </div>
                </StyledForm>
            )}
            <Modal open={isOpenPhoto} >
                <>
                    <Title style={{ fontSize: 24 }}>Загрузите аватар</Title>
                    <TryPhoto />
                </>
            </Modal>
        </Container>
    );
};

export default Product;