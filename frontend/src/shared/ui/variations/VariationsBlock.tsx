import { PlusCircleOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useState } from "react";
import Variation from "./Variation";

interface Props {
    onVariationsChange: (variations: any[]) => void,
    disabled?: boolean
}

const VariationsBlock: React.FC<Props> = ({ onVariationsChange, disabled }) => {

    const [variations, setVariations] = useState<any[]>([]);

    const handleAddVariation = () => {
        const newVariation = { size: '', price: '', detail: '' };
        const updatedVariations = [...variations, newVariation];
        setVariations(updatedVariations);
        onVariationsChange(updatedVariations);
    };

    const handleChangeVariation = (index: number, updatedVariation: any) => {
        const updatedVariations = variations.map((v, i) =>
            i === index ? updatedVariation : v
        );
        setVariations(updatedVariations);
        onVariationsChange(updatedVariations);
    };

    const handleRemoveVariation = (index: number) => {
        const updatedVariations = variations.filter((_, i) => i !== index);
        setVariations(updatedVariations);
        onVariationsChange(updatedVariations);
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div style={{ height: "180px", overflowX: "hidden", overflowY: "auto", marginBottom: "10px", scrollbarWidth: "thin", scrollbarColor: "var(--primary-bg-color) var(--block-bg-color)" }}>
                {variations.map((variation, index) => (
                    <Variation
                        key={index}
                        variation={variation}
                        onChange={(updatedVariation) => handleChangeVariation(index, updatedVariation)}
                        onRemove={() => handleRemoveVariation(index)}
                    />
                ))}
            </div>
            <Button disabled={disabled} onClick={handleAddVariation}>
                Добавить вариацию <PlusCircleOutlined style={{ color: "var(--primary-bg)" }} />
            </Button>
        </div>
    );
};

export default VariationsBlock;
