import { Button } from "antd";
import { useState } from "react";
import { Outlet } from "react-router-dom"
import Container from "../../../shared/ui/containerMain/ContainerMain";

const ProfileMain: React.FC = () => {
    const [isActive, setIsActive] = useState<boolean>(false);

    return(
        <div style={{ display: "flex", justifyContent: "center", padding: "25px 0" }}>
            <Container>
                <h1>Профиль</h1>
                {/* <Button onClick={() => setIsActive(true)}>Профиль</Button> */}
                <Outlet></Outlet>
            </Container>
        </div>
    )
}

export default ProfileMain;