export const registerRules = {
    regUsername: {
        required: true,
        minLength: 3,
        maxLength: 20
    },
    regPassword: {
        required: true,
        minLength: 6
    },
    regEmail: {
        required: true,
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    }
};
