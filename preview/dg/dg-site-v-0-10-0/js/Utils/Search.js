export class Search {
    constructor(onSearch) {
        this.onSearch = onSearch;
    }

    render() {
        const searchBar = document.getElementById('searchBar');
        const searchIcon = document.getElementById('searchIcon');

        if (searchIcon) {
            searchIcon.addEventListener('click', () => {
                const query = searchBar.value.trim();
                this.onSearch(query);
            });
        }
    }
}
