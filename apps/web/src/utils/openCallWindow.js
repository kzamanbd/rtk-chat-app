const CALL_WINDOW_WIDTH = 960;
const CALL_WINDOW_HEIGHT = 640;

/**
 * Open a room in a compact popup instead of a full-size window, positioned
 * over the middle of the window that started the call.
 */
export default function openCallWindow(path) {
    const width = Math.min(CALL_WINDOW_WIDTH, window.screen.availWidth - 80);
    const height = Math.min(CALL_WINDOW_HEIGHT, window.screen.availHeight - 80);
    const left = Math.round(window.screenX + Math.max(0, (window.outerWidth - width) / 2));
    const top = Math.round(window.screenY + Math.max(0, (window.outerHeight - height) / 2));

    const features = `popup=yes,width=${width},height=${height},left=${left},top=${top},resizable=yes`;

    return window.open(path, '_blank', features);
}
