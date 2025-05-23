// Function to detect if the user is on an iPad
export function isDeviceIPad(): boolean {
    const ua = navigator.userAgent || navigator.vendor;

    // Newer iPads (iPadOS 13+) report as "Macintosh" but have touch support
    const isModernIPad =
        navigator.maxTouchPoints &&
        navigator.maxTouchPoints > 1 &&
        /Macintosh/.test(ua);

    const isClassicIPad = /iPad/.test(ua);

    return isModernIPad || isClassicIPad;
}
