import { useEffect } from "react";
import { logoutThunk } from "../../entities/credential/redux/asyncThunk";
import { selectIsRemember, selectUser } from "../../entities/credential/redux/selectors";
import useTabActivity from "../../shared/utils/hooks/useTabActivity";
import { useAppDispatch, useAppSelector } from "../../store/store";

const LogoutOnClose: React.FC = () => {
    const isTableActivity = useTabActivity();
    const dispatch = useAppDispatch();
    const user = useAppSelector(selectUser);
    const isRemember = useAppSelector(selectIsRemember);

    useEffect(() => {
        if(!isTableActivity && !isRemember){
            dispatch(logoutThunk);
        }
    }, [isTableActivity, user, isRemember]);

    return null;
}

export default LogoutOnClose;