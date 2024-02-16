import { useEffect, useState } from "react";

export const useDetectScrolledToBottom = (node: Element | null | undefined) => {
    const [isBottom, setIsBottom] = useState(false);

    useEffect(() => {
        // console.log('init, ', node)
        if (node) {
            const handleScroll = () => {
                const { scrollTop, scrollHeight, clientHeight } = node;
                if (scrollHeight - Math.round(scrollTop + clientHeight) <= 5) {
                    // console.log("reached bottom hook");
                    setIsBottom(true);
                } else {
                    setIsBottom(false);
                }
            };
            node.addEventListener("scroll", handleScroll);
            
            return () => node.removeEventListener("scroll", handleScroll);
        }
    }, [node]);

    return { isBottom };
};
