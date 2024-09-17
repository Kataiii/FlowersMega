import { Button, Form, Input, Select } from "antd";
import { StyledForm, ValueText } from "../../../pages/admin/ui/products/Product";
import TypeDropdown from "../dropdown/SizeDropdown";
import { CloseOutlined } from "@ant-design/icons";
import { ProductSize, Size } from "../../../store/product";
import SizeDropdown from "../dropdown/SizeDropdown";

const { Option } = Select;

interface VariationProps {
    variation: ProductSize;
    data?: Size[];
    onRemove: () => void;
    onChange: (updatedVariation: ProductSize) => void;
    disabled?: boolean;
}


const Variation: React.FC<VariationProps> = ({ variation, onRemove, onChange, disabled }) => {

    const handleSizeChange = (value: string) => {
        onChange({ ...variation, idSize: Number(value) });
    };

    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange({ ...variation, prise: Number(e.target.value) });
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
                    <SizeDropdown
                        value={variation.idSize?.toString()}
                        onChange={handleSizeChange}
                        disabled={disabled}
                        style={{ width: 150 }} />
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
                    <Input
                        type="number"
                        disabled={disabled}
                        value={variation.prise}
                        placeholder="Введите стоимость товара в рублях..."
                        style={{ width: "480px" }}
                        onChange={handlePriceChange}
                        onKeyPress={(event) => {
                            if (!/[0-9]/.test(event.key)) {
                                event.preventDefault();
                            }
                        }}
                    />
                </Form.Item>
                <Button icon={<CloseOutlined />} iconPosition="end" onClick={onRemove} disabled={disabled} style={{ marginTop: "5px", marginRight: "5px", backgroundColor: "var(--primary-bg-color)", borderRadius: "5px", padding: "10px", height: "15px", width: "15px" }}>
                    {/* <CloseOutlined style={{ padding: "0", marginRight: "10" }} onClick={onRemove} /> */}

                </Button>

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
