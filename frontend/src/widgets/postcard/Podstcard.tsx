import { CloseOutlined } from "@ant-design/icons";
import { Input } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react"


interface PostcardProps {
    onChange?: (position: number) => void;
}

const Podstcard: React.FC = () => {
    const [position, setPosition] = useState();

    return (
        <div style={{ display: "flex", flexDirection: "column", width: "100%", border: "1px solid var(--primary-bg-color)", borderRadius: "8px", padding: "10px", gap: "10px" }}>
            <div style={{ display: 'flex', flexDirection: "row", justifyContent: "space-between" }}>
                <p style={{ fontFamily: "Inter", fontSize: "16px", fontWeight: 600, color: "var(--text-modal)" }}>
                    Открытка
                </p>
                <div style={{ width: "20px", height: "20px", padding: "2.5px", backgroundColor: "var(--primary-bg-color)", borderRadius: "4px" }}>
                    <CloseOutlined />
                </div>
            </div>
            <Input.TextArea maxLength={200} />
        </div>

    )
}
export default Podstcard;