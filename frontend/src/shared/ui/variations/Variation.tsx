import { Button, Form, Input } from "antd";
import { StyledForm, ValueText } from "../../../pages/admin/ui/products/Product";
import SizeDropdown from "../dropdown/SizeDropdown";
import { CloseOutlined } from "@ant-design/icons";
import { ProductSize, Size } from "../../../store/product";
import { useState } from "react";

interface VariationProps {
    variation: ProductSize;
    onRemove: () => void;
    onChange: (updatedVariation: ProductSize) => void;
    disabled?: boolean;
}

const Variation: React.FC<VariationProps> = ({ variation, onRemove, onChange, disabled }) => {
    const [price, setPrice] = useState(variation.extraPrice);
    const handleSizeChange = (value: number | undefined) => {

        onChange({
            ...variation,
            idSize: value !== undefined ? value : 0,
        });
    };

    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let newPrice = Number(e.target.value);
        if (newPrice <= 0 || e.target.value === '') {
            newPrice = 0;
        }
        onChange({ ...variation, prise: newPrice });
        setPrice(newPrice);
    };

    const handleDetailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange({ ...variation, paramsSize: e.target.value });
    };

    return (
        <div style={{
            width: "730px",
            height: "140px",
            display: "flex",
            flexDirection: "column",
            border: "1px solid var(--main-bg-color)",
            borderRadius: "4px",
            marginBottom: "8px"
        }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <StyledForm.Item
                    label={<ValueText>Размер</ValueText>}
                    style={{ margin: "0 0 5px 8px", padding: "0" }}
                >
                    <SizeDropdown
                        value={variation.idSize}
                        onChange={handleSizeChange}
                        disabled={disabled}
                        style={{ width: 150 }}
                    />
                </StyledForm.Item>
                <Form.Item
                    label={<ValueText>Цена</ValueText>}
                    style={{ margin: "0 0 5px 8px" }}
                >
                    <Input
                        type="number"
                        disabled={disabled}
                        value={price}
                        placeholder="Введите стоимость товара в рублях..."
                        style={{ width: "480px" }}
                        onChange={handlePriceChange}
                        onKeyPress={(event) => {
                            // Разрешаем ввод только цифр
                            if (!/[0-9]/.test(event.key)) {
                                event.preventDefault();
                            }
                        }}
                        min="0"
                    />
                </Form.Item>
                <Button
                    icon={<CloseOutlined />}
                    onClick={onRemove}
                    disabled={disabled}
                    style={{ marginTop: "5px", marginRight: "5px", backgroundColor: "var(--primary-bg-color)", borderRadius: "5px", padding: "10px", height: "15px", width: "15px" }}
                />
            </div>
            <Form.Item
                label={<ValueText>Уточнение для размера</ValueText>}
                style={{ margin: "0 0 5px 8px" }}
            >
                <Input
                    value={variation.paramsSize}
                    disabled={disabled}
                    placeholder="Введите уточняющее описание размера..."
                    style={{ width: "700px" }}
                    onChange={handleDetailChange}
                />
            </Form.Item>
        </div>
    );
};

export default Variation;
