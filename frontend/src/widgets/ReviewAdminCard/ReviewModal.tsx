import { Form, Input, Modal, Rate, Image } from "antd";
import { HeadText, ValueText } from "../../pages/admin/ui/products/Product";
import { API_URL } from "../../shared/utils/constants";
import TextArea from "antd/es/input/TextArea";

interface ReviewModalProps {
    data: any;
    isModalVisible: boolean;
    onClose: () => void;
}

const ReviewModal: React.FC<ReviewModalProps> = ({ data, isModalVisible, onClose }) => {
    return (
        <Modal
            title={
                <HeadText>
                    Отзыв <span style={{ color: "var(--primary-review-text)" }}>{data?.firstname}</span>{" "}
                    <span style={{ color: "var(--unactive-text-color)" }}>от{" "}
                        {new Date(data.createdAt).toLocaleDateString()}
                    </span>
                </HeadText>
            }
            open={isModalVisible}
            footer={null}
            width={810}
            onCancel={onClose}
        >
            <Form
                layout="vertical"
                initialValues={{
                    name: data?.firstname,
                    phone: data?.phone,
                    comment: data?.comment,
                    rate: data?.rating,
                    images: data?.images,
                }}
            >
                <div style={{ display: "flex", flexDirection: "row" }}>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <Form.Item label={<ValueText>Имя пользователя</ValueText>} name="name" style={{ margin: "5px 0" }}>
                            <Input style={{ width: "440px" }} placeholder="Измените имя пользователя..." className="inputModal" disabled={true} />
                        </Form.Item>
                        <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
                            <Form.Item label={<ValueText>Номер телефона</ValueText>} name="phone" style={{ margin: "5px 0" }}>
                                <Input style={{ width: "300px" }} placeholder="+7 (800) 555 35-35" className="inputModal" disabled={true} />
                            </Form.Item>
                            <Form.Item label={<ValueText>Оценка</ValueText>} name="rate" style={{ margin: "5px 0" }}>
                                <Rate style={{ color: "var(--primary-bg-color)", width: "140px", }} className="inputModal" disabled={true} />
                            </Form.Item>
                        </div>
                    </div>
                    <div>
                        <Form.Item label={<ValueText>Вложения</ValueText>} name="images" style={{ margin: "5px 0", display: "flex" }}>
                            <div style={{ width: "320px", height: "100px", border: "1px solid var(--primary-bg-color)", borderRadius: "12px", padding: "8px 20px", display: "flex", gap: "20px", justifyContent: "center" }}>
                                {/* @ts-ignore */}
                                {data?.images?.slice(0, 3).map((item) => (
                                    <Image src={`${API_URL}/products/images_reviews/${item.idReview}/${item.url}`} style={{ width: "80px", height: "80px" }} />
                                ))}
                            </div>
                        </Form.Item>
                    </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <Form.Item label={<ValueText>Комментарий</ValueText>} name="comment" style={{ width: "770px", margin: "0" }}>
                        <Input.TextArea
                            placeholder="Измените комментарий пользователя..."
                            maxLength={1000}
                            // showCount
                            className="inputModal"
                            disabled={true}
                            style={{ resize: "none", height: "150px" }}
                        />
                    </Form.Item>
                </div>
            </Form>
        </Modal>
    );
};

export default ReviewModal;
