import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { ButtonText } from "../../pages/admin/ui/products/Products";
import Postcard from "./Postcard";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPostcard, removePostcard, updatePostcard } from "../../entities/postcard/redux/slice";
import { postcardsSelectors } from "../../entities/postcard/redux/selectors";

interface PostcardAddBlockProps {
    idProductSize: number;
}

const PostcardAddBlock: React.FC<PostcardAddBlockProps> = ({ idProductSize }) => {
    const dispatch = useDispatch();
    const postcards = useSelector((state: any) =>
        postcardsSelectors.selectAll(state).filter((p) => p.idProductSize === idProductSize)
    );
    const handleAddVariation = () => {

        dispatch(addPostcard({ idProductSize: idProductSize, text: "" }));
        console.log(postcards);
    };

    const handleRemoveVariation = (index: number) => {
        dispatch(removePostcard({ id: index }));
    }

    // const handleChangeVariation = (index: number, updatedText: string) => {
    //     setVariations(
    //         variations.map((v, i) => (i === index ? updatedText : v))
    //     );
    //     dispatch(
    //         updatePostcard({
    //             idProductSize: position,
    //             index,
    //             text: updatedText,
    //         })
    //     );
    // };

    // const handleRemoveVariation = (index: number) => {
    //     const updatedVariations = variations.filter((_, i) => i !== index);
    //     setVariations(updatedVariations);
    // };

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
                {postcards.map((variation, index) => (
                    <Postcard
                        key={index}
                        index={++index}
                        value={variation} onChange={function (updatedVariation: any): void {
                            throw new Error("Function not implemented.");
                        }}// onChange={(updateVariation) => handleChangeVariation(index, updateVariation)}
                        onRemove={() => handleRemoveVariation(index)}
                    />
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