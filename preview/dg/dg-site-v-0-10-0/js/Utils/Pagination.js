export class Pagination {
    constructor(totalPages, currentPage, onPageChange) {
        this.totalPages = totalPages;
        this.currentPage = currentPage;
        this.onPageChange = onPageChange;
    }

    render() {
        const paginationContainer = document.querySelector('.pagination');
        paginationContainer.innerHTML = '';

        if (this.totalPages <= 1) return;

        const createButton = (text, pageNumber, isDisabled = false) => {
            return `
                <button class="btn ${isDisabled ? 'btn-secondary' : 'btn-primary'} mx-1" ${isDisabled ? 'disabled' : ''} data-page="${pageNumber}">
                    ${text}
                </button>`;
        };

        // Create Previous button
        paginationContainer.innerHTML += createButton('Previous', this.currentPage - 1, this.currentPage === 1);

        // Create page number buttons
        for (let i = 1; i <= this.totalPages; i++) {
            paginationContainer.innerHTML += createButton(i, i, i === this.currentPage);
        }

        // Create Next button
        paginationContainer.innerHTML += createButton('Next', this.currentPage + 1, this.currentPage === this.totalPages);

        // Event Delegation for handling clicks
        paginationContainer.addEventListener('click', (event) => {
            const button = event.target.closest('button');
            if (button) {
                const page = Number(button.dataset.page);
                if (!isNaN(page)) {
                    this.onPageChange(page);
                }
            }
        });
        const categoryCheckboxes = document.querySelectorAll('input[type="checkbox"][id^="category"]');
        const getSelectedCategories = () => {
            return Array.from(categoryCheckboxes)
                .filter(checkbox => checkbox.checked)
                .map(checkbox => checkbox.value);
        };
    }
}
