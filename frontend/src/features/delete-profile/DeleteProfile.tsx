import { logoutThunk } from "../../entities/credential/redux/asyncThunk";
import { ButtonStyle } from "../../shared/ui/button/Button";
import SecondaryButton from "../../shared/ui/button/SecondaryButton";
import { Title } from "../../shared/ui/forAdditionalPages/Title";
import { useAppDispatch } from "../../store/store";
import { useUsersControllerDeleteMutation } from "../../store/user";

type DeleteProfileProps = {
    cancelHandler: () => void;
}

const DeleteProfile: React.FC<DeleteProfileProps> = ({cancelHandler}) => {
    const [ deleteProfile, {} ] = useUsersControllerDeleteMutation();
    const dispatch = useAppDispatch();

    const deleteHandler = () => {
        deleteProfile();
        dispatch(logoutThunk());
    }
    return(
        <div style={{display: "flex", flexDirection: "column", gap: 20, padding: "10px 0"}}>
            <Title style={{fontSize: 24}}>Вы действительно хотите удалить профиль?</Title>
            <div style={{display: "flex", justifyContent: "space-between", gap: 15}}>
                <div style={{flexGrow: 1}}>
                    <ButtonStyle style={{backgroundColor: "var(--error)"}} onClick={deleteHandler}>Удалить</ButtonStyle>
                </div>
                <div style={{flexGrow: 1}}>
                    <SecondaryButton buttonContent="Отмена" clickHandler={cancelHandler}/>
                </div>
            </div>
        </div>
    )
}

export default DeleteProfile;