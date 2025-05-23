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

// Utility function to detect device type
export function getDeviceType():
    | 'iphone'
    | 'ipad'
    | 'android-phone'
    | 'android-tablet'
    | 'tablet'
    | 'phone'
    | 'desktop' {
    const ua = navigator.userAgent || navigator.vendor || '';

    const isIPad =
        /iPad/.test(ua) ||
        (navigator.maxTouchPoints > 1 && /Macintosh/.test(ua)); // iPadOS
    const isIPhone = /iPhone/.test(ua);
    const isAndroid = /Android/.test(ua);
    const isMobile = /Mobi/.test(ua);

    if (isIPad) return 'ipad';
    if (isIPhone) return 'iphone';
    if (isAndroid && isMobile) return 'android-phone';
    if (isAndroid && !isMobile) return 'android-tablet';
    if (/Tablet|PlayBook/.test(ua) || (isAndroid && !isMobile)) return 'tablet';
    if (isIPhone || (isAndroid && isMobile)) return 'phone';
    return 'desktop';
}
