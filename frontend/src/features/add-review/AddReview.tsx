import { styled } from "styled-components";
import { Title } from "../../shared/ui/forAdditionalPages/Title";
import {ReactComponent as Close} from "../../shared/assets/closeModal.svg";
import { ConfigProvider, Form, Input, Rate, UploadFile, UploadProps } from "antd";
import { useAppSelector } from "../../store/store";
import { selectToken, selectUser } from "../../entities/credential/redux/selectors";
import PhoneInput from "react-phone-input-2";
import TextArea from "antd/es/input/TextArea";
import LoaderPhoto from "../../shared/ui/loaderPhoto/LoaderPhoto";
import Button from "../../shared/ui/button/Button";
import { useState } from "react";
import { useReviewsControllerCreateMutation } from "../../store/review";
import axios from "axios";
import { API_URL } from "../../shared/utils/constants";

const Container = styled.div`
    padding: 10px 10px 30px;
    gap: 10px;
    border-radius: 6px;
    background-color: var(--block-bg-color);
`;

type AddReviewProps = {
    closeHandler: () => void;
    idProductSize: number;
}

const AddReview: React.FC<AddReviewProps> = ({ closeHandler, idProductSize }) => {
    const user = useAppSelector(selectUser);
    const token = useAppSelector(selectToken);
    const [rating, setRating] = useState<number>(0);
    const [form] = Form.useForm();
    const [fileList, setFileList] = useState<File[]>([]);

    const onFinish = async (values: any) => {
        const response = await axios.postForm(`${API_URL}/reviews`, {
            rating: rating,
                comment: values.comment, 
                idProductSize: idProductSize,
                firstname: values.name,
                phone: values.phone,
                files: fileList
        }, {
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    };

    //@ts-ignore
    const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => setFileList(newFileList);

    return (
        <Container>
            <ConfigProvider
                theme={{
                    token: {
                        fontFamily: "Inter",
                        colorText: "var(--text-modal)",
                        colorTextDescription: "var(--text-modal)",
                        fontSize: 12,
                        colorTextTertiary: "var(--text-modal)",
                        colorTextLabel: "var(--text-modal)",
                        colorBorder: "var(--primary-bg-color)"
                    },
                    components: {
                        Segmented: {
                            itemSelectedBg: "var(--primary-bg-color)",
                            itemSelectedColor: "var(--primary-text-color)",
                            trackBg: "var(--block-bg-color)",
                            itemHoverBg: "var(--block-bg-color-hover)",
                            colorText: "var(--primary-bg-color)",
                            colorBorder: "var(--primary-bg-color)"
                        },
                        Input: {
                            colorText: "var(--secondary-text-color)",
                            borderRadius: 4,
                            borderRadiusLG: 4
                        }
                    }
                }}>
                <Form
                    form={form}
                    onFinish={onFinish}
                    layout="vertical"
                    requiredMark={false}
                    style={{ display: "flex", flexDirection: "column", gap: 10 }}>

                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <Title style={{ fontSize: 20 }}>Написание отзыва</Title>
                        <Close style={{ cursor: "pointer" }} alt="close" onClick={closeHandler} />
                    </div>
                    <Form.Item style={{ marginBottom: 0 }}>
                        <p style={{ display: "flex", alignItems: "center", gap: 10, fontFamily: "Inter", fontWeight: 500, fontSize: 15, color: "var(--text-modal)" }}>Оценка товара: <Rate style={{ color: "var(--primary-bg-color)" }} onChange={(e) => setRating(e)} /></p>
                    </Form.Item>
                    <div style={{ display: "flex", gap: 15 }}>
                        <Form.Item style={{ marginBottom: 0, flexGrow: 1 }} initialValue={user !== null ? user.firstname : ""} label="Ваше имя" name="name" rules={[
                            { required: true, message: "Введите имя" },
                        ]}>
                            <Input size="large" placeholder="Ваше имя" />
                        </Form.Item>

                        <Form.Item style={{ marginBottom: 0, flexGrow: 1 }} label="Номер телефона (не будет виден в отзыве)" initialValue={user !== null ? user.phone : ""} name="phone" rules={[{ required: true, message: "Введите номер телефона" }]}>
                            <PhoneInput
                                specialLabel=""
                                inputStyle={{
                                    fontFamily: "Inter",
                                    width: "100%",
                                    height: 40,
                                    border: "1px solid var(--primary-bg-color)",
                                    borderRadius: 4,
                                    padding: "0 11px",
                                    outline: "none"
                                }} placeholder="+7(XXX)XXX-XX-XX" onlyCountries={['ru']} />
                        </Form.Item>
                    </div>
                    <div style={{ display: "flex", gap: 15 }}>
                        <Form.Item label="Ваш комментарий" name="comment" style={{ marginBottom: 0, flexGrow: 3 }}>
                            <TextArea
                                style={{ height: 100 }}
                                showCount
                                maxLength={1000}
                                placeholder="Ваше впечатление о товаре" />
                        </Form.Item>
                        <Form.Item label="Вложения (не больше 3)" style={{ width: "fit-content", marginBottom: 0 }}>
                            {/* @ts-ignore */}
                            <LoaderPhoto maxFiles={3} fileList={fileList} handleChange={handleChange} />
                        </Form.Item>
                    </div>
                    <div style={{ width: 210 }}>
                        <Button buttonContent="Отправить" clickHandler={() => { }} />
                    </div>
                </Form>
            </ConfigProvider>
        </Container>
    )
}

export default AddReview;