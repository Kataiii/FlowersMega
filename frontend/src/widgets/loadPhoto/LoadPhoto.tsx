import { Image } from "antd";
import { Title } from "../../shared/ui/forAdditionalPages/Title";
import Error from "../../shared/assets/no-image.png";

const LoadPhoto: React.FC = () => {
    return(
        <div style={{display: "flex", flexDirection: "column", justifyContent:"center", gap: 15}}>
            <Title style={{fontSize: 24}}>Новый аватар</Title>
            <div
                style={{
                    display: "flex", flexDirection: "column",alignItems: "center", gap: 15
                }}>
                <Image
                    width={200}
                    height={200}
                    fallback={Error}/>
                <button>Сохранить</button>
            </div>
        </div>
    )
}

export default LoadPhoto;