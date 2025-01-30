import { SetStateAction, useEffect, useState } from "react";
import ModalEmpty from "../modalEmpty/ModalEmpty";
import { ProductCatalogCard, ProductSize, Size } from "../../../store/product";
import { ConfigProvider, Form, Input, Image, TimePicker, CheckboxProps, Checkbox, Segmented, DatePicker } from "antd";
import PhoneInput from "react-phone-input-2";
import locale from 'antd/locale/ru_RU';
import { errorMessageCity, errorMessageEmail, errorMessageName, errorMessageStreet, regExEmail, regExName } from "../../utils/validationConstants";
import { API_URL } from "../../utils/constants";
import { ButtonText } from "../../../pages/admin/ui/products/Products";
import SizeSelectionModal from "./SizeSelectionModal";
import { styled } from "styled-components";
import { useAppSelector } from "../../../store/store";
import { selectUser } from "../../../entities/credential/redux/selectors";
import { selectActiveCity } from "../../../entities/city/redux/selectors";
import dayjs from "dayjs";
import TextArea from "antd/es/input/TextArea";
import Button from "../../../shared/ui/button/Button";
// import styles from "../../formOrder/FormOrder.module.css";
import styles from "../../../widgets/formOrder/FormOrder.module.css";
import Transforms from "../../utils/transforms";
import { OrdersControllerCreateApiArg, Postcard, useOrdersControllerCreateMutation } from "../../../store/order";

type FormValues = {
    addressArea: string;
    addressCorpus?: string;
    addressEntrance?: string;
    addressFlat?: string;
    addressFloor?: string;
    addressHouse: string;
    addressStreet: string;
    comment?: string;
    dateDelivery: any;
    emailCustomer: string;
    endTimeDelivery: any;
    nameCustomer: string;
    nameRecipient?: string;
    notCall: boolean;
    phoneCustomer: string;
    phoneRecipient?: string;
    recipientCustomer: boolean;
    startTimeDelivery: any;
}

const TitleForm = styled.h4`
    font-family: "Inter";
    font-weight: 600;
    font-size: 20px;
    color: var(--secondary-text-color);
`;

interface FastClickOrderProps {
    isOpen: boolean;
    setIsOpen: (value: SetStateAction<boolean>) => void;
    product: ProductCatalogCard;
    hoveredIndex: number | null;
    setHoveredIndex: (index: number | null) => void;
}

const FastClickOrder: React.FC<FastClickOrderProps> = ({
    isOpen,
    setIsOpen,
    product,
    hoveredIndex,
    setHoveredIndex,
}) => {
    const [isRecipientCustomer, setIsRecipientCustomer] = useState<boolean>(false);
    const [isPrivateHouse, setIsPrivateHouse] = useState<boolean>(false);
    const [isExsistingCity, setIsExsistingCity] = useState<boolean>(true);
    const [form] = Form.useForm();
    const [selectedSize, setSelectedSize] = useState<string>("");
    const [fullSizeInfo, setFullSizeInfo] = useState<{
        productSize: ProductSize;
        size: Size;
    }>();
    const [postcards] = useState<Postcard[]>([]);
    const [fullProductInfo, setFullProductInfo] = useState<ProductCatalogCard>();
    const changeRecepientCustomer: CheckboxProps['onChange'] = (e) => {
        setIsRecipientCustomer(e.target.checked);
    };
    const [isSizeModalOpen, setSizeModalOpen] = useState(false);
    const user = useAppSelector(selectUser);
    const city = useAppSelector(selectActiveCity);
    const [createOrder, { isSuccess }] = useOrdersControllerCreateMutation();

    useEffect(() => {
        if (isSuccess) setIsOpen(false);
    }, [isSuccess]);

    const onFinish = async (values: FormValues) => {
        const tryValues = {
            ...values,
            'dateDelivery': values['dateDelivery'].format('DD.MM.YYYY'),
            'startTimeDelivery': values['startTimeDelivery'].format('HH:mm'),
            'endTimeDelivery': values['endTimeDelivery'].format('HH:mm')
        }

        const dto: OrdersControllerCreateApiArg = {
            body: {
                name: '',
                dateOrder: new Date().toLocaleString(),
                dateDelivery: tryValues.dateDelivery,
                cost: fullSizeInfo?.productSize.extraPrice ?? -1,
                nameCustomer: tryValues.nameCustomer,
                emailCustomer: tryValues.emailCustomer,
                phoneCustomer: tryValues.phoneCustomer,
                nameRecipient: tryValues.recipientCustomer ? tryValues.nameCustomer : (tryValues.nameRecipient ?? ''),
                phoneRecipient: tryValues.recipientCustomer ? tryValues.phoneCustomer : (tryValues.phoneRecipient ?? ''),
                canCall: tryValues.notCall,
                idCity: isExsistingCity ? (city?.id ?? -1) : -1,
                addressDelivery: Transforms.transformAddress(
                    values.addressArea,
                    values.addressStreet,
                    values.addressHouse,
                    values.addressCorpus,
                    values.addressEntrance,
                    values.addressFloor,
                    values.addressFlat
                ),
                startTimeDelivery: tryValues.startTimeDelivery,
                endTimeDelivery: tryValues.endTimeDelivery,
                comment: tryValues.comment,
                itemsOrder: [
                    {
                        count: 1,
                        product: {
                            id: fullSizeInfo?.productSize.id ?? -1,
                            idProduct: fullProductInfo?.id ?? -1,
                            idSize: fullSizeInfo?.size.id ?? -1,
                            paramsSize: fullSizeInfo?.productSize.paramsSize ?? '',
                            count: 1,
                            prise: fullSizeInfo?.productSize.prise ?? -1,
                            extraPrice: fullSizeInfo?.productSize.extraPrice ?? -1,
                        }
                    }
                ],
                postcards: postcards.map(postcard => {
                    return {
                        id: postcard.id,
                        text: postcard.text,
                        updatedId: postcard.updatedId
                    } as Postcard
                })

            }
        }

        createOrder(dto);
    };

    const changePrivateHouse: CheckboxProps['onChange'] = (e) => {
        setIsPrivateHouse(e.target.checked);
    };

    const handleSizeSelection = (size: {
        productSize: ProductSize;
        size: Size;
    }, product: ProductCatalogCard) => {
        setSelectedSize(size.size.name);
        form.setFieldsValue({ size });
        setFullSizeInfo(size);
        setFullProductInfo(product);
        setSizeModalOpen(false);
    };

    const disabledDate = (date: dayjs.Dayjs) => {
        if (date.toDate() < new Date(new Date().setDate(new Date().getDate() - 1))) return true;
        return false;
    }

    useEffect(() => {
        if(product.productSizes.length === 1) handleSizeSelection(product.productSizes[0], product);
    }, [product, product.productSizes])

    useEffect(() => {
        if(!isSizeModalOpen && selectedSize === ""){
            form.validateFields(['size']);
        }
    }, [isSizeModalOpen, selectedSize])

    return (
        <ModalEmpty isOpen={isOpen} setIsOpen={setIsOpen}>
            <ConfigProvider
            locale={locale}
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
                initialValues={{
                    nameCustomer: "",
                    phoneCustomer: "",
                    emailCustomer: "",
                    size: '',
                }}

                labelCol={{
                    span: 24,
                }}

                style={{
                    backgroundColor: "var(--block-bg-color)",
                    borderRadius: 8,
                    padding: 16,
                    display: "flex",
                    flexDirection: "column",
                    gap: 15,
                    width: "100%",
                    textAlign: "start"
                }}
            >
                <div style={{ padding: "32px" }}>
                    <p style={{ fontFamily: "Inter", fontSize: "24px", fontWeight: "600", color: "var(--secondary-text-color)" }}>Быстрый заказ</p>
                    <p style={{ fontFamily: "Inter", fontSize: "14px", fontWeight: "400", color: "var(--text-modal)", marginBottom: "8px" }}>
                        для позиции
                    </p>

                    <Form.Item
                        name="size"
                        rules={[
                            {
                                required: true,
                                message: "Выберите размер",
                            },
                        ]}
                        style={{ marginBottom: 0 }}
                    >
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "16px",
                                border: "1px solid var(--primary-bg-color)",
                                borderRadius: "4px",
                                padding: "8px",
                                // marginBottom: "24px",
                                justifyContent: "space-between",
                            }}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "center",
                                    width: "55%",
                                    gap: "24px",
                                    flexGrow: 1
                                    // justifyContent: "space-around",
                                }}
                            >
                                <Image
                                    src={`${API_URL}/products/images/${product.id}/${product.image.url}`}
                                    alt={product.name}
                                    width={30}
                                    height={30}
                                    style={{ objectFit: "cover", borderRadius: "4px" }}
                                />
                                <p
                                    style={{
                                        fontFamily: "Inter",
                                        fontWeight: "700",
                                        fontSize: "16px",
                                        color: "var(--primary-bg-color)",
                                    }}
                                >
                                    {product.name}
                                </p>
                            </div>

                            <button
                                onClick={() => {
                                    if(product.productSizes.length > 1) { 
                                        setSizeModalOpen(true);
                                        console.log("PRODUCT ", "CLICK")
                                    }
                                }}
                                type="button"
                                style={{
                                    fontFamily: "Inter",
                                    fontSize: "16px",
                                    fontWeight: "600",
                                    color: selectedSize
                                        ? "var(--primary-bg-color)"
                                        : "var(--text-modal)",
                                    background: "none",
                                    border: "none",
                                    padding: "4px 0",
                                    cursor: product.productSizes.length > 1 ? "pointer" : "default",
                                }}
                                disabled={product.productSizes.length === 1}
                            >
                                {selectedSize !== "-" ? selectedSize || "Не выбран размер" : ""}
                            </button>
                        </div>
                    </Form.Item>
                        <div>
                            <TitleForm>Отправитель</TitleForm>
                            <Form.Item style={{ marginBottom: 8, color: "var(--text-modal)" }} initialValue={user !== null ? user.firstname : ""} label="Ваше ФИО" name="nameCustomer" rules={[{ required: true, message: "Введите ФИО" }]}>
                                <Input size="large" placeholder="Иванов Иван Иванович" />
                            </Form.Item>
                            <div style={{ display: "flex", gap: 15 }}>
                                <Form.Item style={{ marginBottom: 8, flexGrow: 1 }} initialValue={user !== null ? user.email : ""} label="Ваш E-mail" name="emailCustomer" rules={[
                                    { required: true, message: "Введите почту" },
                                    { pattern: regExEmail, message: errorMessageEmail }
                                ]}>
                                    <Input size="large" placeholder="mail@mail.ru" />
                                </Form.Item>

                                <Form.Item style={{ marginBottom: 8, flexGrow: 1 }} label="Номер телефона" initialValue={user !== null ? user.phone : ""} name="phoneCustomer" rules={[{ required: true, message: "Введите номер телефона" }]}>
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

                            <Form.Item initialValue={false} style={{ marginBottom: 0, color: "var(--secondary-text-color)" }} label="" name="recipientCustomer" valuePropName="checked">
                                <Checkbox onChange={changeRecepientCustomer}>Отправитель является получателем</Checkbox>
                            </Form.Item>
                        </div>


                        <div>
                            <TitleForm>Получатель</TitleForm>
                            {

                                isRecipientCustomer
                                    ? <p style={{ fontSize: 16 }}>Данные возьмутся автоматически из полей об отправителе</p>
                                    : <Form.Item style={{ marginBottom: 8 }} label="ФИО получателя" name="nameRecipient" rules={[{ required: true, message: "Введите ФИО" },
                                    { pattern: regExName, message: errorMessageName }
                                    ]}>
                                        <Input size="large" value={isRecipientCustomer ? user?.firstname : ""} placeholder="Иванов Иван Иванович" />
                                    </Form.Item>
                            }

                            <div style={{ display: "flex", gap: 15, alignItems: "flex-end" }}>
                                {
                                    isRecipientCustomer
                                        ? null
                                        : <Form.Item style={{ flexGrow: 1, marginBottom: 8 }} label="Номер телефона" name="phoneRecipient" rules={[{ required: true, message: "Введите номер телефона" }]}>
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
                                }

                                <Form.Item initialValue={false} style={{ flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "flex-end", height: "100%", marginBottom: 8 }} label="" name="notCall" valuePropName="checked">
                                    <Checkbox>Не звонить получателю перед доставкой</Checkbox>
                                </Form.Item>
                            </div>
                            <p>Мы повезём букет без звонка получателю в указанное Вами время.</p>
                        </div>

                        <div>
                            <TitleForm>Адрес доставки</TitleForm>
                            <Segmented
                                style={{ margin: "10px 0", border: "1px solid var(--primary-bg-color)", padding: 0 }}
                                options={['Город из списка', 'Другой населённый пункт']}
                                onChange={(value) => {
                                    setIsExsistingCity(value === 'Город из списка');
                                }}
                                block
                            />
                            <Form.Item style={{ marginBottom: 8 }} label="Область, населенный пункт" initialValue={isExsistingCity && city ? city.name : ""} name="addressArea" rules={[
                                { required: true, message: "Введите населенный пункт" },
                                { pattern: regExName, message: errorMessageCity }]}>
                                {
                                    isExsistingCity
                                        ? <Input size="large" placeholder="Населенный пункт" />
                                        : <Input size="large" placeholder="Область, населенный пункт" />
                                }
                            </Form.Item>

                            <div style={{ display: "flex", gap: 15 }}>
                                <Form.Item style={{ flexGrow: 4, marginBottom: 8 }} label="Улица" name="addressStreet" rules={[
                                    { required: true, message: "Введите улицу" },
                                    { pattern: regExName, message: errorMessageStreet }]}>
                                    <Input size="large" placeholder="Улица" />
                                </Form.Item>

                            </div>
                            <div style={{ display: "flex", gap: 15, alignItems: "flex-end" }}>
                                <Form.Item style={{ flexGrow: 1, marginBottom: 8 }} label="Дом" name="addressHouse" rules={[{ required: true, message: "Введите номер дома" }]}>
                                    <Input size="large" placeholder="Дом" />
                                </Form.Item>
                                <Form.Item initialValue={false} style={{ flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "flex-end", height: "100%", marginBottom: 8 }} label="" name="privateHouse" valuePropName="checked">
                                    <Checkbox onChange={changePrivateHouse}>Частный дом</Checkbox>
                                </Form.Item>
                            </div>
                            <div style={{ display: "flex", gap: 15 }}>
                                {
                                    isPrivateHouse ? null
                                        : <>
                                            <Form.Item style={{ flexGrow: 1, marginBottom: 8 }} label="Корпус" name="addressCorpus">
                                                <Input size="large" placeholder="Корпус" onKeyPress={(event) => {
                                                    if (!/[0-9]/.test(event.key)) {
                                                        event.preventDefault();
                                                    }
                                                }} />
                                            </Form.Item>
                                            <Form.Item style={{ flexGrow: 1, marginBottom: 8 }} label="Подъезд" name="addressEntrance">
                                                <Input size="large" placeholder="Подьезд" onKeyPress={(event) => {
                                                    if (!/[0-9]/.test(event.key)) {
                                                        event.preventDefault();
                                                    }
                                                }} />
                                            </Form.Item>
                                            <Form.Item style={{ flexGrow: 1, marginBottom: 8 }} label="Этаж" name="addressFloor">
                                                <Input size="large" placeholder="Этаж" onKeyPress={(event) => {
                                                    if (!/[0-9]/.test(event.key)) {
                                                        event.preventDefault();
                                                    }
                                                }} />
                                            </Form.Item>
                                            <Form.Item style={{ flexGrow: 1, marginBottom: 8 }} label="Квартира" name="addressFlat" rules={[
                                                { required: false, message: "Введите номер квартиры" }]}>
                                                <Input size="large" placeholder="Квартира" onKeyPress={(event) => {
                                                    if (!/[0-9]/.test(event.key)) {
                                                        event.preventDefault();
                                                    }
                                                }} />
                                            </Form.Item>
                                        </>
                                }

                            </div>
                        </div>

                        <div>
                            <TitleForm>Дата и время доставки</TitleForm>
                            <div style={{ display: "flex", gap: 15 }}>
                                <Form.Item
                                    className={styles.WrapDate}
                                    label="Дата доставки"
                                    name="dateDelivery"
                                    style={{ flexGrow: 1 }}
                                    rules={[{ type: 'object' as const, required: true, message: 'Выберите дату доставки' }]}>
                                    <DatePicker style={{ width: "100%" }} size="large" disabledDate={disabledDate} format={"DD.MM.YYYY"} />
                                </Form.Item>
                                <div style={{ width: 250, display: "flex", flexDirection: "column", gap: 8 }}>
                                    <p>Время доставки</p>
                                    <div style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 10,
                                        border: "1px solid var(--primary-bg-color)",
                                        borderRadius: 4,
                                        padding: "0 8px"
                                    }}>
                                        <p style={{
                                            fontFamily: "Inter",
                                            fontWeight: 400,
                                            fontSize: 20,
                                            color: "var(--primary-bg-color)"
                                        }}>с</p>
                                        <Form.Item
                                            style={{ marginBottom: 0 }}
                                            name="startTimeDelivery"
                                            rules={[{ type: 'object' as const, required: true, message: 'Выберите время доставки' }]}>
                                            <TimePicker style={{ border: "none" }} placeholder="00:00" size="large" format={'HH:mm'} />
                                        </Form.Item>
                                        <p style={{
                                            fontFamily: "Inter",
                                            fontWeight: 400,
                                            fontSize: 20,
                                            color: "var(--primary-bg-color)"
                                        }}>до</p>
                                        <Form.Item
                                            style={{ marginBottom: 0 }}
                                            name="endTimeDelivery"
                                            rules={[{ type: 'object' as const, required: true, message: 'Выберите время доставки' }]}>
                                            <TimePicker style={{ border: "none" }} placeholder="00:00" size="large" format={'HH:mm'} />
                                        </Form.Item>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <TitleForm>Комментарий к заказу</TitleForm>
                            <Form.Item label="Комментарий" name="comment">
                                <TextArea
                                    showCount
                                    maxLength={1000}
                                    placeholder="Введите ваши пожелания к заказу" />
                            </Form.Item>
                        </div>

                        <div style={{ width: "50%", margin: "0 auto", paddingTop: 20, paddingBottom: 30 }}>
                            <Button type="submit" buttonContent="Оформить заказ" clickHandler={() => { }} />
                        </div>
                </div>

                {isSizeModalOpen && (
                    <SizeSelectionModal
                        isOpen={isSizeModalOpen}
                        setIsOpen={setSizeModalOpen}
                        product={product}
                        hoveredIndex={hoveredIndex}
                        setHoveredIndex={setHoveredIndex}
                        onSizeClick={(selectedProduct) => {
                            const selectedProductSize = selectedProduct.productSizes[hoveredIndex || 0];
                            handleSizeSelection(selectedProductSize, product);

                        }}
                    />
                )}
            </Form>
            </ConfigProvider>
        </ModalEmpty>
    );
};

export default FastClickOrder;
