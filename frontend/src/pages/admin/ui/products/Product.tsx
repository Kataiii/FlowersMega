import { useParams } from "react-router-dom";
import Container from "../../../../shared/ui/containerMain/ContainerMain";
import { useProductsControllerGetByIdQuery, useProductsSizesControllerGetAllSizesByProductIdQuery, useProductsSizesControllerGetByIdQuery, useProductsSizesControllerGetByProductIdQuery } from "../../../../store/product";
import { Flex, Spin, Image, Input, Select, Dropdown, Space, Form, Button } from "antd";
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

const Product: React.FC = () => {
    const { id } = useParams();
    const { isLoading, data } = useProductsControllerGetByIdQuery({ id: Number(id) });
    const [disabled, setDisabled] = useState(true);
    const [form] = Form.useForm();
    const [variations, setVariations] = useState<any[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<{ name: string; photo: string }[]>([]);
    const [filters, setFilters] = useState<any[]>([]);
    const { data: sizeData, isLoading: sizeDataLoading } = useProductsSizesControllerGetAllSizesByProductIdQuery({ id: Number(id) });
    const { data: filtersData, isLoading: filtersLoading } = useFiltersControllerGetAllQuery();
    const { data: categories, isLoading: categoriesLoading } = useCategoriesControllerGetAllQuery();
    const { data: productSizes, isLoading: sizesLoading } = useProductsSizesControllerGetProductSizeForCardByIdQuery({ id: Number(id) });
    const { data: productVariations, isLoading: productVariationsLoading } = useProductsSizesControllerGetByProductIdQuery({ id: Number(id) });

    const handleFormFinish = (values: any) => {

        const formData = {
            name: values.name,
            type: values.type,
            description: values.description,
            structure: values.structure,
            // @ts-ignore
            photo: data?.images?.[0]?.url ? data?.images?.[0] : "",
            productSize: variations,
            categories: selectedCategories,
            filters: filters,
            updatedAt: values.updatedAt,
        };
        console.log("Filters state:", filters);
        console.log("Form values:", formData);
        const jsonString = JSON.stringify(formData)
        console.log(jsonString);
    };

    const handleCategoryChange = (newCategories: { name: string; photo: string }[]) => {
        setSelectedCategories(newCategories);
    };

    const handleFilterChange = (newFilters: any[]) => {
        setFilters(newFilters);
    };

    const handleEdit = () => {
        setDisabled(false);
    };

    useEffect(() => {
        if (productSizes && productVariations) {

            const { product } = productSizes;
            setSelectedCategories(product.categories.map(category => ({
                name: category.name,
                photo: "category.image "
            })));
            setFilters(product.filters.map(filter => ({
                id: filter.id,
                name: filter.name
            })));

            const variations = productVariations.flatMap(variation => ({
                idSize: variation.idSize,
                prise: variation.prise,
                paramsSize: variation.paramsSize,
            }));

            setVariations(variations);
            console.log(selectedCategories);
            // setVariations(productVariations.);
        }
    }, [productSizes, productVariations]);

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
                                    <Select
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
                                    />
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
                                        <LoaderPhoto handleChange={undefined} maxFiles={1} fileList={[]} />
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
                            <FilterDropdown data={filtersData} onChange={handleFilterChange} disabled={disabled} />
                        </div>
                    </Form.Item>

                    <Form.Item>
                        {data ? (
                            <>
                                {disabled ? (
                                    <Button onClick={() => {
                                        handleEdit();
                                        console.log({ selectedCategories, filters })
                                    }}>Редактировать</Button>
                                ) : (
                                    <Button type="primary" htmlType="submit">
                                        Сохранить изменения
                                    </Button>
                                )}
                                <Button type="primary" danger>
                                    Удалить
                                </Button>
                            </>
                        ) : (
                            <Button onClick={() => {
                                console.log(productSizes)
                            }} type="primary" htmlType="submit">
                                Сохранить изменения
                            </Button>
                        )}
                    </Form.Item>
                </StyledForm>
            )}
        </Container>
    );
};

export default Product;