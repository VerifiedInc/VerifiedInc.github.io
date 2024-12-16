import { useLocation } from "@docusaurus/router";
import { useEffect, useState } from "react";

const ScrollToHash = () => {
    const location = useLocation();
    const [firstRender, setFirstRender] = useState(false);

    useEffect(() => {
        if (location.hash && !firstRender) {
            console.log(location.hash);
            // Remove the '#' from the hash to get the element ID
            const hash = location.hash.substring(1);
            // Find the element with the corresponding ID
            setTimeout(() => {
                const element = document.getElementById(hash);
                // If the element exists, scroll to it
                if (element) element.scrollIntoView({ behavior: "smooth" });
            }, 100);
            setFirstRender(true);
        }
    }, [location.hash]); // Run this effect whenever the hash changes

    return null; // This component doesn't render anything
};

export default ScrollToHash;