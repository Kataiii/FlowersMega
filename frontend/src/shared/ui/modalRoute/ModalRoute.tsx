import { PropsWithChildren } from "react"
import { ConfigProvider, Modal } from "antd"
import { useNavigate } from "react-router-dom"
import Portal from "../portal/Portal";
import { ReactComponent as CloseIcon } from "../../../shared/assets/closeModal.svg";

type ModalRouteProps = {
    prevLocation: string,
    width?: string,
} & PropsWithChildren

const ModalRoute: React.FC<ModalRouteProps> = ({ prevLocation, children, width }) => {
    const navigate = useNavigate();

    return (
        <Portal>
            <ConfigProvider>
                <Modal
                    title=""
                    open={true}
                    width={width}
                    onCancel={() => navigate(prevLocation)}
                    footer={null}
                    closeIcon={<CloseIcon />}
                >
                    {children}
                </Modal>
            </ConfigProvider>
        </Portal>
    )
}

export default ModalRoute;