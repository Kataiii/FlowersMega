import { createPortal } from "react-dom";

interface PortalProps{
    children: JSX.Element;
}

const Portal: React.FC<PortalProps> = ({children}) => {
    return(
        <>
            {
                createPortal(
                    <div>
                        {children}
                    </div>, 
                    document.body
                )
            }
        </>
    )
}

export default Portal;