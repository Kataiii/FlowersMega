import { useEffect, useState } from "react";

const useTabActivity = () => {
    const [ active, setActive ] = useState<boolean>(true);

    useEffect(() => {
        const handleBeforeUnload = () => {
            setActive(false);
        }

        window.addEventListener("beforeunload", handleBeforeUnload);

        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
        }
    }, [])

    return active;
}

export default useTabActivity;