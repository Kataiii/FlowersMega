import { Form, Input, Select } from "antd"
import { StyledForm, ValueText } from "../../../pages/admin/ui/products/Product"
import TypeDropdown from "../dropdown/TypeDropdown"
import { CloseOutlined } from "@ant-design/icons"

const { Option } = Select;

interface VariationProps {
    variation: any;
    onRemove: () => void;
    onChange: (updatedVariation: any) => void;
}

const Variation: React.FC<VariationProps> = ({ variation, onRemove, onChange }) => {

    const handleSizeChange = (value: string) => {
        onChange({ ...variation, size: value });
    };

    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange({ ...variation, price: e.target.value });
    };

    const handleDetailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange({ ...variation, detail: e.target.value });
    };

    return (
        <div style={
            {
                width: "730px",
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
                    <TypeDropdown
                        value={variation.size}
                        onChange={handleSizeChange}
                        style={{ width: 150 }}
                    />
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
                    <Input onKeyPress={(event) => {
                        if (!/[0-9]/.test(event.key)) {
                            event.preventDefault();
                        }
                    }} value={variation.price}
                        placeholder="Введите стоимость товара в рублях..."
                        style={{ width: "490px" }} onChange={handlePriceChange}></Input>
                </Form.Item>
                <CloseOutlined onClick={() => onRemove()} style={{ margin: "5px 5px", backgroundColor: "var(--primary-bg-color)", borderRadius: "5px", padding: "2px", height: "15px", width: "15px" }} />
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
                <Input value={variation.detail} placeholder="Введите уточняющее описание размера..." style={{ width: "700px" }} onChange={handleDetailChange}  ></Input>
            </Form.Item>

        </div>
    )
}

export default Variation;