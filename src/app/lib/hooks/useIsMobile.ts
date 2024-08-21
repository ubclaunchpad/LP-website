import { useEffect, useState } from "react";

const useIsMobile = (breakpoint: number): boolean => {
    const [width, setWidth] = useState<number>(0);
    const handleWindowSizeChange = (): void => {
        if (typeof window !== "undefined") {
            setWidth(window.innerWidth);
        }
    };

    useEffect(() => {
        if (typeof window !== "undefined") {
            handleWindowSizeChange();
            window.addEventListener("resize", handleWindowSizeChange);

            return () => {
                window.removeEventListener("resize", handleWindowSizeChange);
            };
        }
    }, []);

    return width <= breakpoint;
};

export default useIsMobile;
