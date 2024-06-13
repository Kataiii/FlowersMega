import { Button } from "antd";
import { useState } from "react";
import { Outlet } from "react-router-dom"

const ProfileMain: React.FC = () => {
    const [isActive, setIsActive] = useState<boolean>(false);

    return(
        <>
            <h1>Профиль</h1>
            <Button onClick={() => setIsActive(true)}>Профиль</Button>
            <Outlet></Outlet>
        </>
    )
}

export default ProfileMain;