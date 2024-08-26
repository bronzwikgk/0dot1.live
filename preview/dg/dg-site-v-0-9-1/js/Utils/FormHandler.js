export class FormHandler {
    constructor(formId, submitCallback, validationRules = {}) {
        this.form = document.getElementById(formId);
        this.submitCallback = submitCallback;
        this.validationRules = validationRules;
        this.errors = {};

        if (this.form) {
            this.initialize();
        } else {
            console.error(`Form with ID ${formId} not found.`);
        }
    }

    initialize() {
        this.form.addEventListener('submit', (event) => {
            event.preventDefault();
            this.handleSubmit();
        });
    }

    async handleSubmit() {
        if (this.validateForm()) {
            const formData = new FormData(this.form);
            const data = Object.fromEntries(formData.entries());
            console.log(data);

            try {
                await this.submitCallback(data);
                this.clearErrors();
                console.log('Form submitted successfully!');
            } catch (error) {
                console.error('Error submitting form:', error);
            }
        } else {
            this.displayErrors();
        }
    }

    validateForm() {
        this.errors = {};

        Object.keys(this.validationRules).forEach((field) => {
            
            
            const value = this.form.elements[field]?.value;
            
            const rules = this.validationRules[field];
            
            const fieldErrors = [];

            // Required field check
            if (rules.required && !value.trim()) {
                fieldErrors.push('This field is required.');
            }

            if (rules.minLength && value.length < rules.minLength) {
                fieldErrors.push(`Minimum length is ${rules.minLength}.`);
            }

            if (rules.maxLength && value.length > rules.maxLength) {
                fieldErrors.push(`Maximum length is ${rules.maxLength}.`);
            }

            if (rules.pattern && !rules.pattern.test(value)) {
                fieldErrors.push('Invalid format.');
            }

            if (fieldErrors.length) {
                this.errors[field] = fieldErrors;
            }
        });

        return Object.keys(this.errors).length === 0;
    }

    displayErrors() {
        this.clearErrors();
        Object.keys(this.errors).forEach((field) => {
            const input = this.form.elements[field];
            const errorMessages = this.errors[field].join(' ');
            if (input) {
                const errorContainer = document.createElement('div');
                errorContainer.className = 'error-message';
                errorContainer.textContent = errorMessages;
                input.parentElement.appendChild(errorContainer);
            }
        });
    }

    clearErrors() {
        const errorMessages = this.form.querySelectorAll('.error-message');
        errorMessages.forEach((message) => message.remove());
    }
}
