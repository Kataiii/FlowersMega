import { useState } from "react";
import { styled } from "styled-components";
import ChangePassword from "../../../features/change-password/ChangePassword";
import DeleteProfile from "../../../features/delete-profile/DeleteProfile";
import Button from "../../../shared/ui/button/Button";
import SecondaryButton from "../../../shared/ui/button/SecondaryButton";
import { Title } from "../../../shared/ui/forAdditionalPages/Title";
import ModalEmpty from "../../../shared/ui/modalEmpty/ModalEmpty";
import TryPhoto from "../../../widgets/loadPhoto/TryPhoto";
import ProfileForm from "../../../widgets/profileForm/ProfileForm";

const ButtonPhoto = styled.h5`
    cursor: pointer;
    font-family: "Inter";
    font-weight: 400;
    font-size: 16px;
    color: var(--primary-bg-color);
`;

const Profile: React.FC = () => {
    const [isOpenPhoto, setIsOpenPhoto] = useState<boolean>(false);
    const [isOpenPassword, setIsOpenPassword] = useState<boolean>(false);
    const [isOpenDeleteProfile, setIsOpenDeleteProfile] = useState<boolean>(false);

    return (
        <div style={{ width: "100%" }}>
            <ProfileForm 
                buttonLoadPhoto={<ButtonPhoto onClick={() => setIsOpenPhoto(true)}>Изменить</ButtonPhoto>}
                buttonChangePassword={<Button buttonContent="Изменить пароль" clickHandler={() => setIsOpenPassword(true)}/>}
                buttonDeleteProfile={<SecondaryButton buttonContent="Удалить профиль" clickHandler={() => setIsOpenDeleteProfile(true)} />}/>
            <ModalEmpty isOpen={isOpenPhoto} setIsOpen={() => setIsOpenPhoto(false)}>
                <>
                    <Title style={{fontSize: 24}}>Загрузите аватар</Title>
                    <TryPhoto/>
                </>
            </ModalEmpty>

            <ModalEmpty isOpen={isOpenPassword} setIsOpen={() => setIsOpenPassword(false)}>
                <ChangePassword closeHandler={() => setIsOpenPassword(false)}/>
            </ModalEmpty>

            <ModalEmpty isOpen={isOpenDeleteProfile} setIsOpen={() => setIsOpenDeleteProfile(false)}>
                <DeleteProfile cancelHandler={() => setIsOpenDeleteProfile(false)}/>
            </ModalEmpty>
        </div>
    )
}

export default Profile;