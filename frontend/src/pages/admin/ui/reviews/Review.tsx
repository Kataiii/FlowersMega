import { Button, Flex, Form, Input, Rate, Spin, Image, Modal } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { UpdateReviewDto, useReviewControllerDeleteMutation, useReviewControllerUpdateMutation, useReviewsControllerGetByIdQuery } from "../../../../store/review";
import Container from "../../../../shared/ui/containerMain/ContainerMain";
import { CloseOutlined, LoadingOutlined } from "@ant-design/icons";
import { useMemo, useState } from "react";
import { HeadText, ValueText } from "../products/Product";
import { API_URL } from "../../../../shared/utils/constants";
import TextArea from "antd/es/input/TextArea";
import ts from "typescript";
import { ignore } from "antd/es/theme/useToken";
import { ButtonText } from "../products/Products";

interface ReviewProps {
    refetchReviews?: () => void;
}

const Review: React.FC<ReviewProps> = ({ refetchReviews }) => {
    const { id } = useParams();
    const { isLoading, data } = useReviewsControllerGetByIdQuery({ id: Number(id) });
    const [form] = Form.useForm();
    {/* @ts-ignore*/ }
    const [images, setImages] = useState(data?.images || []);
    const [updateReview] = useReviewControllerUpdateMutation();
    const [deleteReview] = useReviewControllerDeleteMutation();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const navigate = useNavigate();



    const showDeleteConfirm = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleFormFinish = async (values: any) => {
        try {
            const formData: UpdateReviewDto = {
                id: Number(id),
                rating: values.rate,
                comment: values.comment,
                idUser: data?.idUser || 0,
                firstname: values.name,
                phone: values.phone,
                idProductSize: data?.idProductSize || 0,
            };
            const response = await updateReview({ updatedReview: formData });
            console.log("Updated review:", response);
        } catch (error) {
            console.error("Error updating review:", error);
        }
    };

    const handleDelete = async () => {
        try {
            await deleteReview({ id: Number(id) });
            console.log("Review deleted successfully");
            setIsModalVisible(false);
            if (refetchReviews) {
                refetchReviews();
            }
            navigate("/admin/reviews");
        } catch (error) {
            console.error("Error deleting review:", error);
        }
    };

    return (
        <Container>
            {
                isLoading ? (
                    <Flex align="center" gap="middle">
                        <Spin indicator={<LoadingOutlined spin />} size="large" />
                    </Flex>
                ) : (
                    <>
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
                                Отзыв <span style={{ color: "var(--primary-review-text)" }}>{data?.firstname}</span>{" "}
                                <span style={{ color: "var(--unactive-text-color)" }}>от{" "}
                                    <>
                                        {/* @ts-ignore*/}
                                        {new Date(data.createdAt).toLocaleDateString()}
                                    </>
                                </span>
                            </HeadText>
                            <div>
                                <div style={{ display: "flex", flexDirection: "row" }}>
                                    <div style={{ display: "flex", flexDirection: "column" }}>
                                        <Form.Item label={<ValueText>Имя пользователя</ValueText>} name="name" style={{ margin: "5px 0" }}>
                                            <Input style={{ width: "440px" }} placeholder="Измените имя пользователя..." />
                                        </Form.Item>
                                        <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
                                            <Form.Item label={<ValueText>Номер телефона</ValueText>} name="phone" style={{ margin: "5px 0" }}>
                                                <Input style={{ width: "300px" }} placeholder="+7 (800) 555 35-35" />
                                            </Form.Item>
                                            <Form.Item label={<ValueText>Оценка</ValueText>} name="rate" style={{ margin: "5px 0" }}>
                                                <Rate style={{ color: "var(--primary-bg-color)", width: "140px" }} />
                                            </Form.Item>
                                        </div>
                                    </div>
                                    <div>
                                        <Form.Item label={<ValueText>Вложения</ValueText>} name="images" style={{ margin: "5px 0" }}>
                                            <div style={{ width: "320px", height: "100px", border: "1px solid var(--primary-bg-color)", borderRadius: "12px", padding: "8px 20px", display: "flex", gap: "20px", justifyContent: "center" }}>
                                                {/* @ts-ignore*/}
                                                {data?.images?.slice(0, 3).map((item) => (
                                                    <Image src={`${API_URL}/products/images_reviews/${item.idReview}/${item.url}`} style={{ width: "80px", height: "80px" }} />
                                                ))}
                                            </div>
                                        </Form.Item>
                                    </div>
                                </div>

                                <Form.Item label={<ValueText>Комментарий</ValueText>} name="comment" style={{ width: "770px", margin: "0" }}>
                                    <TextArea
                                        placeholder="Измените комментарий пользователя..."
                                        maxLength={1000}
                                        showCount
                                        style={{ resize: "none", maxHeight: "150px", height: "150px" }}
                                    />
                                </Form.Item>
                            </div>

                            <div style={{ display: "flex", justifyContent: "space-between", width: "770px", margin: "20px 0" }}>
                                <Button shape="round" type="primary" htmlType="submit" style={{ width: "49%" }}>
                                    <ButtonText>Сохранить изменения</ButtonText>
                                </Button>
                                <Button shape="round" type="primary" onClick={showDeleteConfirm} danger style={{ width: "49%" }}>
                                    <ButtonText>Удалить</ButtonText>
                                </Button>
                            </div>
                        </Form>
                        <Modal
                            title="Подтвердите удаление"
                            visible={isModalVisible}
                            onOk={handleDelete}
                            onCancel={handleCancel}
                            okText={<ButtonText>Удалить</ButtonText>}
                            cancelText={<ButtonText>Отмена</ButtonText>}
                        >
                            <p>Вы уверены, что хотите удалить этот отзыв?</p>
                        </Modal>
                    </>
                )
            }
        </Container>
    );
}

export default Review;


