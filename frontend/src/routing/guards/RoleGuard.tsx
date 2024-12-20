import { selectAdmin } from "../../entities/credential/redux/selectors";
import { checkPermissions } from "../../entities/credential/redux/slice";
import Forbidden from "../../pages/admin/ui/forbidden/Forbidden";
import { useAuthControllerCheckPermissionsQuery } from "../../store/auth";
import { useAppDispatch, useAppSelector } from "../../store/store";

type RoleGuardProps = {
    children: JSX.Element;
}

export const RoleGuard: React.FC<RoleGuardProps> = ({children}) => {
    const {data, isLoading, isError, error} = useAuthControllerCheckPermissionsQuery(null);

    const dispatch = useAppDispatch();
    dispatch(checkPermissions(!isError));
    console.log("ADMIN " + data + " " , error);

    const isAdmin = useAppSelector(selectAdmin);

    if(isLoading) return <p>Загрузка...</p>

    return isAdmin
    ? children
    : <Forbidden/>
}