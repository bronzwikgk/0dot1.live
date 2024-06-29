// Sorting functionality
function sortTable(columnIndex) {
    const table = document.getElementById("dataTable");
    let rows, switching, i, x, y, shouldSwitch, direction, switchCount = 0;
    switching = true;
    // Set the sorting direction to ascending:
    direction = "asc";
    // Make a loop that will continue until no switching has been done:
    while (switching) {
        // Start by saying: no switching is done:
        switching = false;
        rows = table.rows;
        // Loop through all table rows (except the first, which contains table headers):
        for (i = 1; i < (rows.length - 1); i++) {
            // Start by saying there should be no switching:
            shouldSwitch = false;
            // Get the two elements you want to compare, one from current row and one from the next:
            x = rows[i].getElementsByTagName("TD")[columnIndex];
            y = rows[i + 1].getElementsByTagName("TD")[columnIndex];
            // Check if the two rows should switch place, based on the direction, asc or desc:
            if (direction == "asc") {
                if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                    // If so, mark as a switch and break the loop:
                    shouldSwitch = true;
                    break;
                }
            } else if (direction == "desc") {
                if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                }
            }
        }
        if (shouldSwitch) {
            // If a switch has been marked, make the switch and mark that a switch has been done:
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            // Each time a switch is done, increase this count by 1:
            switchCount++;
        } else {
            // If no switching has been done AND the direction is "asc", set the direction to "desc" and run the while loop again.
            if (switchCount == 0 && direction == "asc") {
                direction = "desc";
                switching = true;
            }
        }
    }
}

// Filtering functionality
document.getElementById('filterInput').addEventListener('keyup', function() {
    let filter = this.value.toUpperCase();
    let tableBody = document.getElementById("tableBody");
    let tr = tableBody.getElementsByTagName("tr");

    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
        let td = tr[i].getElementsByTagName("td")[0]; // Column 0 is 'Name'
        if (td) {
            let txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
});
