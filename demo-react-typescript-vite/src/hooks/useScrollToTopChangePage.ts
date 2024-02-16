import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * 
 * scroll top every change page
 * 
 */
const useScrollToTopChangePage = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
};

export default useScrollToTopChangePage;
