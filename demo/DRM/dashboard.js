document.addEventListener('DOMContentLoaded', () => {
    let db;
    const dbRequest = indexedDB.open('WebToolDB', 3);

    dbRequest.onupgradeneeded = function(event) {
        db = event.target.result;
        if (!db.objectStoreNames.contains('records')) {
            db.createObjectStore('records', { keyPath: 'id', autoIncrement: true });
            console.log('Object store "records" created');
        }
        if (!db.objectStoreNames.contains('csvFiles')) {
            db.createObjectStore('csvFiles', { keyPath: 'id', autoIncrement: true });
            console.log('Object store "csvFiles" created');
        }
    };

    dbRequest.onsuccess = function(event) {
        db = event.target.result;
        console.log('Database opened successfully');

        // Verify the existence of object stores
        if (!db.objectStoreNames.contains('records') || !db.objectStoreNames.contains('csvFiles')) {
            console.error('One or more required object stores are missing.');
            return;
        }

        const username = sessionStorage.getItem('username');
        document.getElementById('username').textContent = username;

        document.getElementById('newRecordBtn').addEventListener('click', () => {
            toggleVisibility('recordFormContainer');
            resetForm();
        });

        document.getElementById('importRecordBtn').addEventListener('click', () => {
            toggleVisibility('importFormContainer');
        });

        document.getElementById('recordForm').addEventListener('submit', function(event) {
            event.preventDefault();
            const record = {
                customerName: document.getElementById('customerName').value,
                company: document.getElementById('company').value,
                registrationNo: document.getElementById('registrationNo').value,
                chassisNo: document.getElementById('chassisNo').value,
                engineNo: document.getElementById('engineNo').value,
                branch: document.getElementById('branch').value,
                segment: document.getElementById('segment').value
            };

            const transaction = db.transaction(['records'], 'readwrite');
            const store = transaction.objectStore('records');
            const addRequest = store.add(record);

            addRequest.onsuccess = function() {
                console.log('Record added successfully');
                alert('Record added');
                resetForm();
                toggleVisibility('recordFormContainer');
                displayRecords();
            };

            addRequest.onerror = function(event) {
                console.error('Error adding record:', event.target.error);
            };
        });

        document.getElementById('importCSV').addEventListener('click', function() {
            const input = document.getElementById('csvFileInput');
            const file = input.files[0];
            const reader = new FileReader();

            reader.onload = function(event) {
                const csvData = event.target.result;
                const rows = csvData.split('\n').map(row => row.split(','));

                const csvFile = {
                    name: file.name,
                    data: rows
                };

                const transaction = db.transaction(['csvFiles'], 'readwrite');
                const store = transaction.objectStore('csvFiles');
                const addRequest = store.add(csvFile);

                addRequest.onsuccess = function() {
                    console.log('CSV file added successfully');
                    displayCSVFiles();
                };

                addRequest.onerror = function(event) {
                    console.error('Error adding CSV file:', event.target.error);
                };
            };

            reader.readAsText(file);
        });

        document.getElementById('searchButton').addEventListener('click', function() {
            const query = document.getElementById('searchInput').value.toLowerCase();
            filterTable(query, 'recordsTable');
            filterTable(query, 'csvTable');
        });

        function displayCSVFiles() {
            const transaction = db.transaction(['csvFiles'], 'readonly');
            const store = transaction.objectStore('csvFiles');
            const request = store.getAll();

            request.onsuccess = function(event) {
                const csvFiles = event.target.result;
                const container = document.getElementById('csvFilesContainer');
                container.innerHTML = '';

                csvFiles.forEach(csvFile => {
                    const div = document.createElement('div');
                    div.className = 'csv-file';
                    div.innerHTML = `
                        <span>${csvFile.name}</span>
                        <button onclick="showCSVData(${csvFile.id})">Show</button>
                        <button onclick="deleteCSVFile(${csvFile.id})">Delete</button>
                    `;
                    container.appendChild(div);
                });
            };

            request.onerror = function(event) {
                console.error('Error retrieving CSV files:', event.target.error);
            };
        }

        window.showCSVData = function(id) {
            const transaction = db.transaction(['csvFiles'], 'readonly');
            const store = transaction.objectStore('csvFiles');
            const request = store.get(id);

            request.onsuccess = function(event) {
                const csvFile = event.target.result;
                displayCSV(csvFile.data, 'csvTable');
            };

            request.onerror = function(event) {
                console.error('Error retrieving CSV file:', event.target.error);
            };
        };

        window.deleteCSVFile = function(id) {
            const transaction = db.transaction(['csvFiles'], 'readwrite');
            const store = transaction.objectStore('csvFiles');
            const deleteRequest = store.delete(id);

            deleteRequest.onsuccess = function() {
                console.log('CSV file deleted successfully');
                displayCSVFiles();
            };

            deleteRequest.onerror = function(event) {
                console.error('Error deleting CSV file:', event.target.error);
            };
        };

        function displayCSV(data, tableId) {
            const table = document.getElementById(tableId);
            table.innerHTML = '';
            const thead = document.createElement('thead');
            const tbody = document.createElement('tbody');
            const headers = data[0];
            const headerRow = document.createElement('tr');
            headers.forEach(header => {
                const th = document.createElement('th');
                th.textContent = header;
                headerRow.appendChild(th);
            });
            thead.appendChild(headerRow);
            table.appendChild(thead);

            data.slice(1).forEach(row => {
                const tr = document.createElement('tr');
                row.forEach(cell => {
                    const td = document.createElement('td');
                    td.textContent = cell;
                    tr.appendChild(td);
                });
                tbody.appendChild(tr);
            });
            table.appendChild(tbody);
        }

        function displayRecords() {
            const transaction = db.transaction(['records'], 'readonly');
            const store = transaction.objectStore('records');
            const request = store.getAll();

            request.onsuccess = function(event) {
                const records = event.target.result;
                const tbody = document.querySelector('#recordsTable tbody');
                tbody.innerHTML = '';
                records.forEach(record => {
                    const tr = document.createElement('tr');
                    Object.keys(record).forEach(key => {
                        if (key !== 'id') {
                            const td = document.createElement('td');
                            td.textContent = record[key];
                            tr.appendChild(td);
                        }
                    });
                    const actionsTd = document.createElement('td');
                    const editButton = document.createElement('button');
                    editButton.textContent = 'Edit';
                    editButton.onclick = () => editRecord(record);
                    const deleteButton = document.createElement('button');
                    deleteButton.textContent = 'Delete';
                    deleteButton.onclick = () => deleteRecord(record.id);
                    actionsTd.appendChild(editButton);
                    actionsTd.appendChild(deleteButton);
                    tr.appendChild(actionsTd);
                    tbody.appendChild(tr);
                });
            };

            request.onerror = function(event) {
                console.error('Error retrieving records:', event.target.error);
            };
        }

        function editRecord(record) {
            document.getElementById('customerName').value = record.customerName;
            document.getElementById('company').value = record.company;
            document.getElementById('registrationNo').value = record.registrationNo;
            document.getElementById('chassisNo').value = record.chassisNo;
            document.getElementById('engineNo').value = record.engineNo;
            document.getElementById('branch').value = record.branch;
            document.getElementById('segment').value = record.segment;
            document.getElementById('recordForm').dataset.id = record.id;
            document.getElementById('updateRecord').style.display = 'block';
            document.getElementById('recordForm').querySelector('button[type="submit"]').style.display = 'none';
            toggleVisibility('recordFormContainer');
        }

        document.getElementById('updateRecord').addEventListener('click', function() {
            const id = parseInt(document.getElementById('recordForm').dataset.id);
            const record = {
                id: id,
                customerName: document.getElementById('customerName').value,
                company: document.getElementById('company').value,
                registrationNo: document.getElementById('registrationNo').value,
                chassisNo: document.getElementById('chassisNo').value,
                engineNo: document.getElementById('engineNo').value,
                branch: document.getElementById('branch').value,
                segment: document.getElementById('segment').value
            };

            const transaction = db.transaction(['records'], 'readwrite');
            const store = transaction.objectStore('records');
            const putRequest = store.put(record);

            putRequest.onsuccess = function() {
                console.log('Record updated successfully');
                alert('Record updated');
                resetForm();
                toggleVisibility('recordFormContainer');
                displayRecords();
            };

            putRequest.onerror = function(event) {
                console.error('Error updating record:', event.target.error);
            };
        });

        function deleteRecord(id) {
            const transaction = db.transaction(['records'], 'readwrite');
            const store = transaction.objectStore('records');
            const deleteRequest = store.delete(id);

            deleteRequest.onsuccess = function() {
                console.log('Record deleted successfully');
                alert('Record deleted');
                displayRecords();
            };

            deleteRequest.onerror = function(event) {
                console.error('Error deleting record:', event.target.error);
            };
        }

        function filterTable(query, tableId) {
            const table = document.getElementById(tableId);
            const rows = table.querySelectorAll('tbody tr');
            rows.forEach(row => {
                const cells = row.querySelectorAll('td');
                let match = false;
                cells.forEach(cell => {
                    if (cell.textContent.toLowerCase().includes(query)) {
                        match = true;
                    }
                });
                if (match) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });
        }

        function toggleVisibility(elementId) {
            const element = document.getElementById(elementId);
            if (element.style.display === 'none' || element.style.display === '') {
                element.style.display = 'block';
            } else {
                element.style.display = 'none';
            }
        }

        function resetForm() {
            document.getElementById('recordForm').reset();
            document.getElementById('recordForm').dataset.id = '';
            document.getElementById('updateRecord').style.display = 'none';
            document.getElementById('recordForm').querySelector('button[type="submit"]').style.display = 'block';
        }

        displayRecords();
        displayCSVFiles();
    };

    dbRequest.onerror = function(event) {
        console.error('Error opening database:', event.target.error);
    };

    document.getElementById('profileLogo').addEventListener('click', function() {
        window.location.href = 'profile.html';
    });
});
