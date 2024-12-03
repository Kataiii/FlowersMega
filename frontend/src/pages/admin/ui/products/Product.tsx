import { useLocation, useNavigate, useParams } from "react-router-dom";
import Container from "../../../../shared/ui/containerMain/ContainerMain";
import {
  ItemFilter,
  useProductsControllerCreateWithDetailsMutation,
  useProductsControllerDeleteByIdMutation,
  useProductsControllerGetByIdQuery,
  useProductsControllerGetProductSizesCountQuery,
  useProductsSizesControllerGetAllSizesByProductIdQuery,
} from "../../../../store/product";
import { Flex, Spin, Image, Input, Form, Button, Modal } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { styled } from "styled-components";
import { API_URL } from "../../../../shared/utils/constants";
import TypeDropdown from "../../../../shared/ui/dropdown/TypeDropdown";
import { useEffect, useState } from "react";
import CategoryDropdown from "../../../../shared/ui/dropdown/CategoryDropdown";
import FilterDropdown from "../../../../shared/ui/dropdown/FilterDropdown";
import VariationsBlock from "../../../../shared/ui/variations/VariationsBlock";
import { Filter, useFiltersControllerGetAllQuery } from "../../../../store/filter";
import { useCategoriesControllerGetAllQuery } from "../../../../store/category";
import { ButtonText } from "./Products";
import { Numerals } from "../../../../shared/utils/numerals";
import {
  Block,
  ImageBlockInside,
  ImageBlockOutside,
  StyledCategoriesFiltersBlock,
  StyledTextArea,
  StyledVarBlock,
} from "./Product.styled";
import ProductPhotoLoader from "../../../../widgets/loadPhoto/ProductPhotoLoader";
import axios from "axios";
import { RootState, useAppSelector } from "../../../../store/store";
import { selectToken } from "../../../../entities/credential/redux/selectors";
import Error from "../../../../shared/assets/no-image.png";

interface ProductProps {
  onCatChange?: (categories: any[]) => void;
  onFilterChange?: (filters: any[]) => void;
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
  const { isLoading, data } = useProductsControllerGetByIdQuery({
    id: Number(id),
  });
  const [disabled, setDisabled] = useState(true);
  const [form] = Form.useForm();
  const [createProductWithDetails] = useProductsControllerCreateWithDetailsMutation();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [variations, setVariations] = useState<any[]>([]);
  const [filters, setFilters] = useState<any[]>([]);
  const { data: filtersData, isLoading: filtersLoading } =
    useFiltersControllerGetAllQuery();
  const { data: categories, isLoading: categoriesLoading } =
    useCategoriesControllerGetAllQuery();
  const { data: productVariations, isLoading: productVariationsLoading } =
    useProductsSizesControllerGetAllSizesByProductIdQuery({ id: Number(id) });
  const [file, setFile] = useState<File | null>(null);
  const [deleteProduct] = useProductsControllerDeleteByIdMutation();
  const productSizesCount = useProductsControllerGetProductSizesCountQuery({
    id: Number(id),
  });
  const token = useAppSelector(selectToken);

  const [selectedCategories, setSelectedCategories] = useState<
    { name: string; photo: string }[]
  >(
    //@ts-ignore
    data?.categories.map((category) => {
      return {
        id: category.id,
        name: category.name,
        photo: "category.image ",
      };
    })
  );

  const handleFormFinish = async (values: any) => {
    const filtersString = filters.map((filter: Filter & {tags: ItemFilter[]}) => filter.tags).flat();

    const categoriesString = 
      selectedCategories.map((category: any) => ({
        id: category.id,
        name: category.name,
        photo: category.photo,
      }));

    const productSizes = variations.map((variation: any) => ({
      idSize: variation.idSize,
      prise: variation.prise,
      paramsSize: variation.paramsSize,
    }));

    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("type",  values.type);
    formData.append("description",  values.description);
    formData.append("structure",  values.structure);
    // @ts-ignore
    formData.append("photo",  file ? file : data?.images?.[0]?.url || "");
    formData.append("productSize",  JSON.stringify(productSizes).slice(1, JSON.stringify(productSizes).length - 1));
    formData.append("categories",  JSON.stringify(categoriesString).slice(1, JSON.stringify(categoriesString).length - 1));
    formData.append("filters",  JSON.stringify(filtersString).slice(1, JSON.stringify(filtersString).length - 1));

    try {
      let response;
      if(id && locate.pathname !== "/admin/product/create"){
        formData.append("id", id ?? "-1");
        response = await axios.patchForm(`${API_URL}/products-sizes/full-product`, formData, {
          headers: {
            Authorization: `Bearer ${token}`
          },
          withCredentials: true
        })
      }
      else{
        response = await axios.postForm(`${API_URL}/products-sizes/full-product `, formData, {
          headers: {
            Authorization: `Bearer ${token}`
          },
          withCredentials: true
        })
      }
      await createProductWithDetails({body: undefined});
      console.log("Product created successfully:", response);
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  const handleCategoryChange = (
    newCategories: { name: string; photo: string }[]
  ) => {
    setSelectedCategories(newCategories);
  };

  const handleFilterChange = (newFilters: any[]) => {
    setFilters(newFilters);
  };

  const handleEdit = () => {
    setDisabled(false);
  };

  useEffect(() => {
    if (data && productVariations) {
      const filterMap = new Map<
        number,
        { filter: { id: number; name: string }; tags: any[] }
      >();
      // @ts-ignore
      data.filters.forEach((productFilter) => {
        const matchingFilter = filtersData?.find(
          (filter) => filter.id === productFilter.idFilter
        );

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
          const tags = (matchingFilter.items || []).filter(
            (tag) => tag.id === productFilter.id
          );

          if (tags.length > 0 && filterEntry) {
            filterEntry.tags.push(...tags);
          }
        }
      });
      const mappedFilters = Array.from(filterMap.values());

      // @ts-ignore
      setFilters(mappedFilters);
      const variationsS = productVariations.productsSizes.flatMap(
        (variation) => ({
          idSize: variation.idSize,
          extraPrice: variation.extraPrice,
          paramsSize: variation.paramsSize,
        })
      );
      setSelectedCategories(selectedCategories);
      setVariations(variationsS);
      if (onCatChange) {
        onCatChange(selectedCategories);
      }
      if (onFilterChange) {
        onFilterChange(filters);
      }
    }
  }, [productVariations, data]);

  useEffect(() => {
    {
      data ? setDisabled(true) : setDisabled(false);
    }
  }, [data]);

  return (
    <Container>
      {isLoading && categoriesLoading && data ? (
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
            {data
              ? disabled
                ? `${data?.name}`
                : "Редактирование продукта"
              : "Создание продукта"}
          </HeadText>
          <Block>
            <div
              style={{
                width: "600px",
                display: "flex",
                flexDirection: "column",
                marginBottom: "0",
              }}
            >
              <div
                style={{ display: "flex", flexDirection: "row", gap: "10px" }}
              >
                <Form.Item
                  label={<ValueText>Наименование</ValueText>}
                  name="name"
                  style={{ margin: "5px 0" }}
                >
                  <Input
                    disabled={disabled}
                    style={{ width: "450px" }}
                    placeholder="Введите название товара..."
                  />
                </Form.Item>
                <Form.Item
                  label={<ValueText>Тип товара</ValueText>}
                  name="type"
                  style={{ margin: "5px 0" }}
                >
                  <TypeDropdown disabled={disabled} />
                </Form.Item>
              </div>
              <Form.Item
                label={<ValueText>Описание</ValueText>}
                name="description"
                style={{ width: "600px", margin: "0" }}
              >
                <StyledTextArea
                  disabled={disabled}
                  placeholder="Введите описание товара..."
                  style={{ resize: "none" }}
                />
              </Form.Item>
            </div>
            <Form.Item
              name="photo"
              style={{ alignSelf: "flex-start" }}
              label={<ValueText>Фотография</ValueText>}
            >
              {/* @ts-ignore */}
              {disabled && locate.pathname !== "/admin/product/create" ? (
                // @ts-ignore
                <Image
                  style={{ width: 150, height: 155, borderRadius: 6 }}
                  //@ts-ignore
                  src={data && data?.images[0] ? `${API_URL}/products/images/${data.id}/${data?.images[0].url}` : undefined}
                  fallback={Error}
                />
              ) : (
                <ImageBlockOutside>
                  <ImageBlockInside>
                    {/* @ts-ignore */}
                    <ProductPhotoLoader previewUrl={ data&& data?.images[0] ? `${API_URL}/products/images/${data.id}/${data?.images[0].url}` : undefined} onUploadSuccess={(file: File) => {setFile(file)}}/>
                  </ImageBlockInside>
                </ImageBlockOutside>
              )}
            </Form.Item>
          </Block>
          <Form.Item
            label={<ValueText>Состав</ValueText>}
            name="structure"
            style={{ margin: "5px 0" }}
          >
            <Input disabled={disabled} style={{ width: "760px" }} />
          </Form.Item>
          <Form.Item
            label={<ValueText>Вариации</ValueText>}
            name="productSize"
            style={{ margin: "5px 0" }}
          >
            <StyledVarBlock>
              <VariationsBlock
                value={variations}
                onVariationsChange={(newVariations) =>
                  setVariations(newVariations)
                }
                disabled={disabled}
              />
            </StyledVarBlock>
          </Form.Item>

          <Form.Item
            label={<ValueText>Категории</ValueText>}
            name="categories"
            style={{ margin: "10px 0" }}
          >
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
          <Form.Item
            label={<ValueText>Фильтры</ValueText>}
            name="filters"
            style={{ margin: "10px 0" }}
          >
            <StyledCategoriesFiltersBlock>
              <FilterDropdown
                value={filters}
                data={filtersData}
                onChange={handleFilterChange}
                disabled={disabled}
              />
            </StyledCategoriesFiltersBlock>
          </Form.Item>

          <div>
            {data ? (
              <>
                {disabled ? (
                  <Button
                    onClick={() => {
                      handleEdit();
                    }}
                    style={{marginRight: 10}}
                  >
                    <ButtonText>Редактировать</ButtonText>
                  </Button>
                ) : (
                  <Button type="primary" onClick={() => form.submit()} style={{marginRight: 10}}>
                    <ButtonText>Сохранить изменения</ButtonText>
                  </Button>
                )}
                <Button
                  type="primary"
                  danger
                  onClick={() => {
                    setIsModalOpen(true);
                    console.log(productSizesCount);
                  }}
                >
                  <ButtonText>Удалить</ButtonText>
                </Button>
              </>
            ) : (
              <Button onClick={() => form.submit()} type="primary">
                Сохранить изменения
              </Button>
            )}
          </div>
        </StyledForm>
      )}
      <Modal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        style={{ width: "800px" }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            alignItems: "start",
          }}
        >
          <DeleteModalHead>
            Вы уверены, что хотите удалить "{data?.name}"
          </DeleteModalHead>
          <Text style={{ color: "red", fontFamily: "Inter" }}>
            Это действие удалит {productSizesCount.data?.count}{" "}
            {Numerals.numeralsSizes(productSizesCount.data?.count ?? 0)} со
            связанным товаром
          </Text>
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              gap: "10px",
            }}
          >
            <Button
              type="primary"
              danger
              onClick={async () => {
                try {
                  await deleteProduct({ id: Number(id) });
                  setIsModalOpen(false);
                  navigate(`/admin/products`);
                } catch (error) {}
              }}
              style={{ width: "49%" }}
            >
              Удалить
            </Button>
            <Button
              onClick={() => setIsModalOpen(false)}
              style={{ width: "49%" }}
            >
              Отмена
            </Button>
          </div>
        </div>
      </Modal>
    </Container>
  );
};

export default Product;