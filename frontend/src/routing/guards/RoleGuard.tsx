import Forbidden from "../../pages/admin/ui/forbidden/Forbidden";

type RoleGuardProps = {
    children: JSX.Element;
}

export const RoleGuard: React.FC<RoleGuardProps> = ({children}) => {
    const isAdmin = true;

    return isAdmin
    ? children
    : <Forbidden/>
}