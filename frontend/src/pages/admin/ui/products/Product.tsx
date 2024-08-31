import { useParams } from "react-router-dom";
import Container from "../../../../shared/ui/containerMain/ContainerMain";
import { useProductsControllerGetByIdQuery } from "../../../../store/product";
import { Flex, Spin, Image, Input, Select, Dropdown, Space, Form, Button } from "antd";
import { CloseOutlined, DownOutlined, LoadingOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { styled } from "styled-components"
import { API_URL } from "../../../../shared/utils/constants"
import { MenuProps } from "antd/lib";
import TypeDropdown from "../../../../shared/ui/dropdown/TypeDropdown";
import { useState } from "react";
import TextArea from "antd/es/input/TextArea";
import CategoryDropdown from "../../../../shared/ui/dropdown/CategoryDropdown";
import FilterDropdown from "../../../../shared/ui/dropdown/FilterDropdown";

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

const items: MenuProps['items'] = [
    {
        label: 'Букет',
        key: '0',
    },
    {
        label: 'Копозиция',
        key: '1',
    },

];

const Product: React.FC = () => {
    const { id } = useParams();
    const { isLoading, data } = useProductsControllerGetByIdQuery({ id: Number(id) });
    const [disabled, setDisabled] = useState(true);
    const [editValue, setEditValue] = useState(false);
    const [form] = Form.useForm();

    const handleFormFinish = (values: any) => { }
    const handleEdit = () => {
        setEditValue(true);
        setDisabled(false);
    };
    return (
        <Container>
            {
                isLoading ?
                    (<Flex align="center" gap="middle">
                        <Spin indicator={<LoadingOutlined spin />} size="large" />
                    </Flex>) : (

                        <StyledForm
                            form={form}
                            onFinish={handleFormFinish}
                            layout="vertical"
                            requiredMark={false}
                            initialValues={data ? {
                                name: data?.name,
                                type: data?.idTypeProduct,
                                description: data?.description,
                                structure: data?.structure
                            } : {}}
                        >
                            <HeadText>{data ? (disabled ? 'Редактирование продукта' : `${data?.name}`) : 'Создание продукта'}</HeadText>
                            <div style={{ display: "flex", flexDirection: "row", gap: "10px", width: "760px", height: "185px", marginBottom: "0" }}>
                                <div style={{ width: "600px", display: "flex", flexDirection: "column", marginBottom: "0" }}>

                                    <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
                                        <Form.Item label={
                                            <ValueText>
                                                Наименование
                                            </ValueText>} style={{ margin: "5px 0" }}

                                        >
                                            <Input disabled={disabled} style={{ width: "450px" }} value={data?.name} placeholder="Введите название товара..." />
                                        </Form.Item>
                                        <Form.Item label={
                                            <ValueText>
                                                Тип товара
                                            </ValueText>} style={{ margin: "5px 0" }}
                                        >
                                            <Select
                                                disabled={disabled}
                                                options={[
                                                    { value: "bouquet", label: "Букет" },
                                                    { value: "decoration", label: "Композия" },
                                                ]}
                                                style={
                                                    {
                                                        width: "140px",
                                                        border: "1px solid var(--primary-bg-color)",
                                                        borderRadius: "6px",
                                                    }
                                                }
                                                bordered={false}
                                            >
                                            </Select>
                                        </Form.Item>
                                    </div>
                                    <Form.Item label={
                                        <ValueText>
                                            Описание
                                        </ValueText>
                                    } style={{ width: "600px", margin: "0" }}>

                                        <TextArea disabled={disabled} placeholder="Введите описание товара..." style={{ resize: 'none', overflowX: "hidden", overflowY: "auto", textAlign: "justify", wordBreak: "normal", maxHeight: "80px", height: "80px", padding: "8px" }}
                                            value={data?.description}>
                                        </TextArea>
                                    </Form.Item>
                                </div>
                                <Form.Item style={{ alignSelf: "flex-start" }} label={
                                    <ValueText>
                                        Фотография
                                    </ValueText>
                                }>
                                    {/* @ts-ignore */}
                                    {data?.images?.[0]?.url ? (
                                        <>
                                            {/* @ts-ignore */}
                                            <Image style={{ width: 150, height: 155, borderRadius: 6 }} src={`${API_URL}/products/images/${data.id}/${data?.images[0].url}`} />
                                        </>
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
                                                margin: "0",
                                                padding: "0",
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
                                                    margin: "0",
                                                    padding: "0",
                                                }}
                                            >
                                            </div>
                                        </div>
                                    )}




                                </Form.Item>
                            </div>
                            <Form.Item style={{ margin: "5px 0" }}>
                                <ValueText>
                                    Состав
                                </ValueText>
                                <Input
                                    disabled={disabled}
                                    style={
                                        {
                                            width: "760px",
                                        }
                                    }
                                    value={data?.structure}
                                />
                            </Form.Item>
                            <Form.Item style={{ margin: "5px 0" }}>
                                <ValueText>
                                    Вариации
                                </ValueText>
                                <div style={{
                                    width: "760px",
                                    height: "250px",
                                    maxHeight: "250px",
                                    border: "1px solid var(--primary-bg-color)",
                                    borderRadius: "8px",
                                    margin: "4px 0",
                                    padding: "8px",
                                }}>
                                    <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                                        <div style={{
                                            height: "180px",
                                            overflowX: "hidden",
                                            overflowY: "auto",
                                            marginBottom: "10px",
                                            scrollbarWidth: "thin",
                                            scrollbarColor: "var(--primary-bg-color) var(--block-bg-color)"
                                        }}>
                                            <div style={
                                                {
                                                    width: "740px",
                                                    height: "140px",
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    border: "1px solid var(--main-bg-color)",
                                                    borderRadius: "4px",
                                                    marginBottom: "8px"
                                                }
                                            }>
                                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                                    <StyledForm.Item
                                                        label={
                                                            <ValueText>
                                                                Размер
                                                            </ValueText>

                                                        }
                                                        style={{
                                                            margin: "0 0 5px 8px",
                                                            padding: "0"
                                                        }}
                                                    >
                                                        <TypeDropdown />
                                                    </StyledForm.Item>
                                                    <Form.Item
                                                        label={
                                                            <ValueText>
                                                                Цена
                                                            </ValueText>

                                                        }
                                                        style={{
                                                            margin: "0 0 5px 8px",

                                                        }}
                                                    >
                                                        <Input placeholder="Введите стоимость товара в рублях..." style={{ width: "490px" }}></Input>
                                                    </Form.Item>
                                                    <CloseOutlined style={{ margin: "5px 5px", backgroundColor: "var(--primary-bg-color)", borderRadius: "5px", padding: "2px", height: "15px", width: "15px" }} />
                                                </div>
                                                <Form.Item
                                                    label={
                                                        <ValueText>
                                                            Уточнение для размера
                                                        </ValueText>

                                                    }
                                                    style={{
                                                        margin: "0 0 5px 8px",
                                                    }}
                                                >
                                                    <Input placeholder="Введите уточняющее описание размера..." style={{ width: "720px" }}></Input>
                                                </Form.Item>

                                            </div>
                                            <div style={
                                                {
                                                    width: "740px",
                                                    height: "140px",
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    border: "1px solid var(--main-bg-color)",
                                                    borderRadius: "4px",
                                                    marginBottom: "8px"
                                                }
                                            }>
                                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                                    <StyledForm.Item
                                                        label={
                                                            <ValueText>
                                                                Размер
                                                            </ValueText>

                                                        }
                                                        style={{
                                                            margin: "0 0 5px 8px",
                                                            padding: "0"
                                                        }}
                                                    >
                                                        <TypeDropdown />
                                                    </StyledForm.Item>
                                                    <Form.Item
                                                        label={
                                                            <ValueText>
                                                                Цена
                                                            </ValueText>

                                                        }
                                                        style={{
                                                            margin: "0 0 5px 8px",

                                                        }}
                                                    >
                                                        <Input placeholder="Введите стоимость товара в рублях..." style={{ width: "490px" }}></Input>
                                                    </Form.Item>
                                                    <CloseOutlined style={{ margin: "5px 5px", backgroundColor: "var(--primary-bg-color)", borderRadius: "5px", padding: "2px", height: "15px", width: "15px" }} />
                                                </div>
                                                <Form.Item
                                                    label={
                                                        <ValueText>
                                                            Уточнение для размера
                                                        </ValueText>

                                                    }
                                                    style={{
                                                        margin: "0 0 5px 8px",
                                                    }}
                                                >
                                                    <Input placeholder="Введите уточняющее описание размера..." style={{ width: "720px" }}></Input>
                                                </Form.Item>

                                            </div>
                                        </div>


                                        <Button > Добавить вариацию <PlusCircleOutlined style={{ color: "var(--primary-bg)" }} /></Button>


                                    </div>


                                </div>
                            </Form.Item>
                            <Form.Item style={{ margin: "10px 0" }}>
                                <ValueText>
                                    Категории
                                </ValueText>
                                <div style={{
                                    width: "760px",
                                    height: "40px",
                                    border: "1px solid var(--primary-bg-color)",
                                    borderRadius: "8px",
                                    margin: "4px 0",
                                    alignItems: "center",
                                    padding: "2.5px",
                                    maxHeight: "150px"
                                }}>
                                    <CategoryDropdown />
                                </div>
                            </Form.Item>
                            <Form.Item style={{ margin: "10px 0" }}>
                                <ValueText>
                                    Фильтры
                                </ValueText>
                                <div style={{
                                    width: "760px",
                                    height: "40px",
                                    border: "1px solid var(--primary-bg-color)",
                                    borderRadius: "8px",
                                    margin: "4px 0",
                                    alignItems: "center",
                                    padding: "2.5px",

                                }}>
                                    <FilterDropdown />
                                </div>
                            </Form.Item>

                            {/* {data ? (
                                editValue ? (
                                    <Button type="primary">
                                        Сохранить изменения
                                    </Button>
                                ) : (
                                    <Button type="default" onClick={handleEdit}>
                                        Редактировать
                                    </Button>
                                )
                            ) : (
                                <Button type="primary">
                                    Сохранить изменения
                                </Button>
                            )}
                            {data && (
                                <Button type="primary" danger onClick={() => console.log('Delete product logic')}>
                                    Удалить
                                </Button>
                            )} */}

                        </StyledForm>

                    )


            }
        </Container >
    )
}

export default Product;
