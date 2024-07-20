import { useEffect } from "react";


export const useOutsideClick = (ref: React.RefObject<HTMLElement>, clickHandler: (e: any) => void) => {
    useEffect(() => {
        const handleClickOutside = (e: any /*React.SyntheticEvent*/ ) => {
            if(ref.current && !ref.current.contains(e.target)) clickHandler(e);
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    }, [ref]);
}