import { useEffect, useState } from "react"
import { Postcard } from "../../store/order"
import { Input } from "antd"

interface PostcardBlockProps {
    value?: Postcard[];
    style?: React.CSSProperties;
}

const PostcardBlock: React.FC<PostcardBlockProps> = ({ value = [], style }) => {
    const transformPostcards = JSON.parse(JSON.stringify(value));
    const isArray = Array.isArray(value);
    console.log(isArray, 'isArray')
    console.log(transformPostcards, 'TRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR')
    const [postcards, setPostcards] = useState<Postcard[]>(transformPostcards);

    return (
        <div
            style={{
                border: "2px solid var(--primary-bg-color)",
                width: "100%",
                height: "fit-content",
                maxHeight: "200px",
                borderRadius: "8px",
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                ...style,
                overflowY: "auto",
                padding: "8px",
                boxSizing: "border-box"

            }}
        >
            {postcards.map((postcard, index) => (
                <div key={postcard.id}>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            width: "100%",
                            border: "1px solid var(--primary-bg-color)",
                            borderRadius: "8px",
                            padding: "10px",
                            gap: "10px",
                        }}
                    >
                        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                            <p
                                style={{
                                    fontFamily: "Inter",
                                    fontSize: "16px",
                                    fontWeight: 600,
                                    color: "var(--text-modal)",
                                }}
                            >
                                Открытка №{index + 1}
                            </p>
                        </div>
                        <Input.TextArea
                            style={{ resize: "none", maxHeight: "110px", height: "110px" }}
                            disabled={true}
                            value={postcard.text}
                            maxLength={200}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
};



export default PostcardBlock;