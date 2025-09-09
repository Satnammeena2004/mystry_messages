export const BASE_URL = process.env.BASE_URL || "http://localhost:3000";

export function isMobileDevice() {
        return window.matchMedia("only screen and (max-width: 768px)").matches;
    }

    if (isMobileDevice()) {
        console.log("Detected device is a mobile.");
    } else {
        console.log("Detected device is not a mobile.");
    }