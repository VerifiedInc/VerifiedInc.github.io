import { useLocation } from "@docusaurus/router";
import { useEffect, useState } from "react";

const ScrollToHash = () => {
    const location = useLocation();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // When the component mounts, check if there's a hash in the URL
        // If there is, set the mounted state to true so we can scroll to it
        if (!mounted && location.hash) {
            setMounted(true);
        }
    }, [location.hash]);

    useEffect(() => {
        if (!mounted) return;

        // Remove the '#' from the hash to get the element ID
        const hash = location.hash.substring(1);
        const element = document.getElementById(hash);
        // If the element exists, scroll to it
        if (element) element.scrollIntoView({ behavior: "smooth" });
    }, [mounted]); // Run this effect whenever the component is mounted

    return null; // This component doesn't render anything
};

export default ScrollToHash;