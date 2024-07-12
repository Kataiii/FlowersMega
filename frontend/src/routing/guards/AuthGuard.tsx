import { Navigate, Outlet, useLocation } from "react-router"
import { selectAuth } from "../../entities/credential/redux/selectors";
import { AUTH_PATH, HOME_PATH } from "../../shared/utils/constants";
import { useAppSelector } from "../../store/store";

type AuthGuardProps = {
    children: React.ReactElement;
}

export const AuthGuard: React.FC<AuthGuardProps> = ({children}) => {
    const isAuth = useAppSelector(selectAuth);

    return isAuth
        ? children
        : <Navigate to={AUTH_PATH} state={{previousLocation: HOME_PATH}}/>
}