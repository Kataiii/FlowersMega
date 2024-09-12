import { Button, Flex, Form, Input, Rate, Spin, Image } from "antd";
import { useParams } from "react-router-dom";
import { useReviewsControllerGetByIdQuery } from "../../../../store/review";
import Container from "../../../../shared/ui/containerMain/ContainerMain";
import { CloseOutlined, LoadingOutlined } from "@ant-design/icons";
import { useMemo, useState } from "react";
import { HeadText, ValueText } from "../products/Product";
import { API_URL } from "../../../../shared/utils/constants";
import TextArea from "antd/es/input/TextArea";
import ts from "typescript";
import { ignore } from "antd/es/theme/useToken";

const Review: React.FC = () => {
    const { id } = useParams();
    const { isLoading, data } = useReviewsControllerGetByIdQuery({ id: Number(id) });
    const [form] = Form.useForm();
    // @ts-ignore
    const [images, setImages] = useState(data?.images || []);


    const handleFormFinish = (values: any) => {

        const formData = {
            id: id,
            firstname: values.name,
            phone: values.phone,
            rate: values.rate,
            images: values.images,
            comment: values.comment,
            idProductSize: data?.idProductSize,
            updatedAt: Date.now(),
            idUser: data?.idUser,
        };
        console.log("Form values:", formData);
        const jsonString = JSON.stringify(formData);
        console.log(jsonString);
    }

    // const reviewData = useMemo(() => {
    //     if (!data) return null;
    //     return data;
    // })

    return (
        <Container>
            {
                isLoading ?
                    (<Flex align="center" gap="middle">
                        <Spin indicator={<LoadingOutlined spin />} size="large" />
                    </Flex>) : (
                        <Form
                            form={form}
                            onFinish={handleFormFinish}
                            layout="vertical"
                            requiredMark={false}
                            initialValues={{
                                name: data?.firstname,
                                // @ts-ignore
                                phone: data?.phone,
                                comment: data?.comment,
                                rate: data?.rating,
                                // @ts-ignore
                                images: data?.images,

                            }}
                        >
                            <HeadText>
                                Отзыв <span style={{ color: "var(--primary-review-text)", display: "inline-flex" }}>{data?.firstname}</span>{" "}

                                <span style={{ color: "var(--unactive-text-color)", display: "inline-flex" }}>
                                    {/* @ts-ignore */}
                                    от {" "}{new Date(data.createdAt).toLocaleDateString()}
                                </span>
                            </HeadText>
                            <div>
                                <div style={{ display: "flex", flexDirection: "row", }}>
                                    <div style={{ display: "flex", flexDirection: "column" }}>
                                        <Form.Item label={<ValueText>Имя пользователя</ValueText>} name="name" style={{ margin: "5px 0" }}>
                                            <Input
                                                style={{ width: "440px" }}
                                                placeholder="Измените имя пользователя..."
                                            />
                                        </Form.Item>
                                        <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
                                            <Form.Item label={<ValueText>Номер телефона</ValueText>} name="phone" style={{ margin: "5px 0" }}>
                                                <Input
                                                    style={{ width: "300px" }}
                                                    placeholder="+7 (800) 555 35-35"
                                                />
                                            </Form.Item>
                                            <Form.Item label={<ValueText>Оценка</ValueText>} name="rate" style={{ margin: "5px 0" }}>
                                                <Rate value={data?.rating} style={{ color: "var(--primary-bg-color)", width: "140px" }} />
                                            </Form.Item>
                                        </div>

                                    </div>
                                    <div>
                                        <Form.Item label={<ValueText>Вложения</ValueText>} name="images" style={{ margin: "5px 0" }}>
                                            <div style={{ width: "320px", height: "100px", border: "1px solid var(--primary-bg-color)", borderRadius: "12px", padding: "8px 20px", display: "flex", gap: "20px", justifyContent: "center" }}>

                                                {/* @ts-ignore */}
                                                {data?.images.slice(0, 3).map((item) => {
                                                    return (<Image src={`${API_URL}/products/images_reviews/${item.idReview}/${item.url}`} style={{ width: "80px", height: "80px", }} />)

                                                })}
                                            </div>
                                        </Form.Item>


                                    </div>
                                </div>

                                <Form.Item label={<ValueText>Комментарий</ValueText>} name="comment" style={{ width: "770px", margin: "0" }}>
                                    <TextArea
                                        placeholder="Измените комментарий пользователя..."
                                        maxLength={1000}
                                        showCount
                                        style={{
                                            resize: "none",
                                            // textAlign: "justify",
                                            // wordBreak: "normal",
                                            maxHeight: "150px",
                                            height: "150px",
                                            // padding: "4px",
                                        }}
                                        value={data?.comment}

                                    />
                                </Form.Item>
                            </div>

                            <div style={{ display: "flex", justifyContent: "space-between", width: "770px", margin: "20px 0" }}>
                                <Button type="primary" htmlType="submit" style={{ width: "49%" }} onClick={
                                    // @ts-ignore
                                    () => console.log(data?.images)

                                }>
                                    Сохранить изменения
                                </Button>
                                <Button type="primary" danger style={{ width: "49%" }}>
                                    Удалить
                                </Button>
                            </div>





                        </Form>
                    )

            }
        </Container>

    )
}

export default Review;