import { Outlet } from "react-router-dom";

const Main:React.FC = () => {
    return(
        <div>
            <p>Боковая панель</p>
            <Outlet></Outlet>
        </div>
    )
}

export default Main;