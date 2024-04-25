import { Outlet } from "react-router-dom"

const ProfileMain: React.FC = () => {
    return(
        <>
            <h1>Профиль</h1>
            <Outlet></Outlet>
        </>
    )
}

export default ProfileMain;