// ek
export function getSessionIdentifier() {
    // First, check if user is logged in
    const userId = localStorage.getItem("userId");
    if (userId) {
        return { type: "userId", value: userId };
    }

    // Generate or retrieve guestId
    let guestId = localStorage.getItem("guestId");
    if (!guestId) {
        guestId = generateGuestId();
        localStorage.setItem("guestId", guestId);
    }

    return { type: "guestId", value: guestId };
}

function generateGuestId() {
    // Simple UUID generator (can use nanoid or any lib)
    return 'guest-' + Math.random().toString(36).substring(2, 12) + '-' + Date.now();
}
