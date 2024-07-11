import { Navigate, Outlet, useLocation } from "react-router"
import { AUTH_PATH, HOME_PATH } from "../../shared/utils/constants";

type AuthGuardProps = {
    children: React.ReactElement;
}

export const AuthGuard: React.FC<AuthGuardProps> = ({children}) => {
    const isAuth = true;
    const location = useLocation();
    // const isAuth = useAppSelector(selectIsAuth)
    console.warn(location);

    return isAuth
        ? children
        : <Navigate to={AUTH_PATH} state={{previousLocation: HOME_PATH}}/>
}