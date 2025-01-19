export const registerRules = {
    regName: {
        required: true,
        minLength: 2
    },
    regEmail: {
        required: true,
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    },
    regCountry: {
        required: true,
    },
    regPhone: {
        required: true,
        pattern: /^\+?\d{1,3}[-.\s]?\(?\d{1,4}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/
    },
    regPassword: {
        required: true,
        minLength: 6
    },
    confirmPassword: {
        required: true,
        validateMatch: 'regPassword' // Custom validation to match regPassword
    },
    termsAccepted: {  // Update the name to match the backend model
        required: true
    }
};
