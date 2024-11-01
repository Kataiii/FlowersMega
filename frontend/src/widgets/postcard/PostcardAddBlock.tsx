import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { ButtonText } from "../../pages/admin/ui/products/Products";
import Podstcard from "./Podstcard";
import { useState } from "react";

const PostcardAddBlock: React.FC = () => {
    const [variations, setVariations] = useState<any[]>([]);
    const [position, setPosition] = useState<number>(0);

    const handleAddVariation = () => {
        const newVariation = {};
        const updatedVariations = [...variations, newVariation];
        setVariations(updatedVariations);
    };

    const handleChangeVariation = (index: number, updatedVariation: any) => {
        const updatedVariations = variations.map((v, i) =>
            i === index ? updatedVariation : v
        );
        setVariations(updatedVariations);
    };

    const handleRemoveVariation = (index: number) => {
        const updatedVariations = variations.filter((_, i) => i !== index);
        setVariations(updatedVariations);
    };

    return (
        <div style={{ border: "2px solid var(--primary-bg-color)", width: "100%", height: "60vh", borderRadius: "16px", display: "flex", flexDirection: "column", padding: "8px", gap: "8px" }}>
            <p style={{ fontFamily: "Inter", fontSize: "16px", fontWeight: 600, height: "5%", color: "var(--primary-review-text)", padding: "8px" }}>
                Добавление в корзину
            </p>
            <div style={{
                maxHeight: "90%",
                height: "100%",
                overflowY: "auto",
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                scrollbarColor: "var(--primary-bg-color) var(--main-bg-color)",
                scrollbarWidth: "thin",
            }}>
                {variations.map((variation, index) => (
                    <Podstcard
                        key={index}
                        index={++index}
                        value={variation}
                        onChange={(updateVariation) => handleChangeVariation(index, updateVariation)}
                        onRemove={() => handleRemoveVariation(index)} />
                ))}
            </div>
            <Button type="dashed"
                style={{ width: "100%", height: "8%" }}>
                <ButtonText style={{ display: "inline" }}
                    onClick={handleAddVariation}
                >Добавить открытку</ButtonText> <PlusOutlined /> </Button>
        </div >

    )
}

export default PostcardAddBlock;    