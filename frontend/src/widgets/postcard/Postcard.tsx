import { CloseOutlined } from "@ant-design/icons";
import { Input } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react"

interface PostcardProps {
    value: { postcard: { id: string; text: string }, pos: number }
    onChange: (updatedText: string) => void;
    onRemove: () => void;
}

const Postcard: React.FC<PostcardProps> = ({ value, onChange, onRemove }) => {
    const [position, setPosition] = useState();

    return (
        <div style={{ display: "flex", flexDirection: "column", width: "100%", border: "1px solid var(--primary-bg-color)", borderRadius: "8px", padding: "10px", gap: "10px" }}>
            <div style={{ display: 'flex', flexDirection: "row", justifyContent: "space-between" }}>
                <p style={{ fontFamily: "Inter", fontSize: "16px", fontWeight: 600, color: "var(--text-modal)" }}>
                    Открытка №{++value.pos}
                </p>
                <div
                    style={{ width: "20px", height: "20px", padding: "2px", backgroundColor: "var(--primary-bg-color)", borderRadius: "4px" }}
                    onClick={onRemove}
                >
                    <CloseOutlined />
                </div>
            </div>
            <Input.TextArea
                style={{ resize: "none", maxHeight: "110px", height: "110px" }}
                onChange={(e) => onChange(e.target.value)}
                value={value.postcard.text}
                maxLength={200} />
        </div>

    )
}
export default Postcard;