import ButtonIcon from "../../../shared/ui/buttonIcon/ButtonIcon";
import { ReactComponent as ProfileIcon} from "../../../shared/assets/profile.svg";
import { PROFILE_PATH } from "../../../shared/utils/constants";
import { Link, useLocation, useNavigate } from "react-router-dom";

const ProfileButton: React.FC = () => {
    const navigate = useNavigate();

    return(
        <ButtonIcon
            icon={<ProfileIcon fill="#FF749F" />}
            activeIcon={<ProfileIcon fill="#fff" />}
            typeEqual={PROFILE_PATH}
            clickHandler={() => navigate(PROFILE_PATH)} />
    )
}

export default ProfileButton;