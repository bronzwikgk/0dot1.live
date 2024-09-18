export const registerRules = {
   
    regPassword: {
        required: true,
        minLength: 6
    },
    regEmail: {
        required: true,
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    }
};
