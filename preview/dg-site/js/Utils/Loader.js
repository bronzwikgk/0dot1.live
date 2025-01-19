// Loader.js
class Loader {
    constructor() {
        this.createLoader();
    }

    // Create the loader element
    createLoader() {
        this.loaderOverlay = document.createElement('div');
        this.loaderOverlay.classList.add('loader-overlay');

        const spinner = document.createElement('div');
        spinner.classList.add('loader');

        this.loaderOverlay.appendChild(spinner);
        document.body.appendChild(this.loaderOverlay);

        // Loader styles
        const style = document.createElement('style');
        style.textContent = `
            .loader-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.6);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 9999;
                visibility: hidden;
                opacity: 0;
                transition: opacity 0.3s ease;
            }
            .loader-overlay.visible {
                visibility: visible;
                opacity: 1;
            }
            .loader {
                border: 16px solid #f3f3f3;
                border-radius: 50%;
                border-top: 16px solid #3498db;
                width: 80px;
                height: 80px;
                animation: spin 1s linear infinite;
            }
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
    }

    // Show the loader
    show() {
        this.loaderOverlay.classList.add('visible');
    }

    // Hide the loader
    hide() {
        this.loaderOverlay.classList.remove('visible');
    }
}

const loader = new Loader();
export default loader;
