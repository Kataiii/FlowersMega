import { useEffect } from "react";
import { selectAdmin } from "../../entities/credential/redux/selectors";
import { checkPermissions } from "../../entities/credential/redux/slice";
import Forbidden from "../../pages/admin/ui/forbidden/Forbidden";
import CenteredSpin from "../../shared/ui/spinner/CenteredSpin";
import { useAuthControllerCheckPermissionsQuery } from "../../store/auth";
import { useAppDispatch, useAppSelector } from "../../store/store";

type RoleGuardProps = {
    children: JSX.Element;
}

export const RoleGuard: React.FC<RoleGuardProps> = ({ children }) => {
    const { data, isLoading, isError, error } = useAuthControllerCheckPermissionsQuery(null);

    const dispatch = useAppDispatch();
    console.log("ADMIN " + data + " ", error);

    useEffect(() => {
        if (!isLoading) {
            dispatch(checkPermissions(!isError));
        }
    }, [isLoading]);

    const isAdmin = useAppSelector(selectAdmin);

    if (isLoading) return <CenteredSpin />

    return isAdmin
        ? children
        : <Forbidden />
}