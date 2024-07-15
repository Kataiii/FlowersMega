import { useState } from "react";
import { styled } from "styled-components";
import ChangePassword from "../../../features/change-password/ChangePassword";
import Button from "../../../shared/ui/button/Button";
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

    return (
        <div style={{ width: "100%" }}>
            <ProfileForm 
                buttonLoadPhoto={<ButtonPhoto onClick={() => setIsOpenPhoto(true)}>Изменить</ButtonPhoto>}
                buttonChangePassword={<Button buttonContent="Изменить пароль" clickHandler={() => setIsOpenPassword(true)}/>}/>
            <ModalEmpty isOpen={isOpenPhoto} setIsOpen={() => setIsOpenPhoto(false)}>
                <TryPhoto/>
            </ModalEmpty>

            <ModalEmpty isOpen={isOpenPassword} setIsOpen={() => setIsOpenPassword(false)}>
                <ChangePassword/>
            </ModalEmpty>
        </div>
    )
}

export default Profile;