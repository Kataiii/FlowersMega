import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { ButtonText } from "../../pages/admin/ui/products/Products";
import Podstcard from "./Podstcard";

const PostcardAddBlock: React.FC = () => {
    return (
        <div style={{ border: "2px solid var(--primary-bg-color)", width: "35%", height: "520px", borderRadius: "16px", display: "flex", flexDirection: "column", padding: "8px", gap: "8px" }}>
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
            }}>
                <Podstcard />
            </div>
            <Button type="dashed" style={{ width: "100%", height: "8%" }}><ButtonText style={{ display: "inline" }}>Добавить открытку</ButtonText> <PlusOutlined /> </Button>
        </div>

    )
}

export default PostcardAddBlock;    