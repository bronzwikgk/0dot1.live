document.getElementById('adminLoginBtn').addEventListener('click', function() {
    document.getElementById('adminLoginForm').style.display = 'block';
    document.getElementById('userLoginForm').style.display = 'none';
});

document.getElementById('userLoginBtn').addEventListener('click', function() {
    document.getElementById('adminLoginForm').style.display = 'none';
    document.getElementById('userLoginForm').style.display = 'block';
});

document.getElementById('adminLogin').addEventListener('click', function() {
    const username = document.getElementById('adminUsername').value;
    const password = document.getElementById('adminPassword').value;

    fetch('admin.json')
        .then(response => response.json())
        .then(data => {
            const admin = data.admins.find(admin => admin.username === username && admin.password === password);
            if (admin) {
                storeAdminInIndexedDB(admin);
                window.location.href = 'dashboard.html';
            } else {
                alert('Invalid admin credentials');
            }
        })
        .catch(error => console.error('Error fetching admin data:', error));
});
document.getElementById('userLogin').addEventListener('click', function() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const dbName = 'userDatabase';
    const dbVersion = 1;

    const request = indexedDB.open(dbName, dbVersion);

    request.onsuccess = function(event) {
        const db = event.target.result;
        const transaction = db.transaction(['users'], 'readonly');
        const store = transaction.objectStore('users');

        // Since we are using an index on 'userName', we use 'getAll' with an index
        const index = store.index('userName');
        const getRequest = index.getAll(username);

        getRequest.onsuccess = function(event) {
            const users = event.target.result;
            if (users.length > 0) {
                const user = users.find(user => user.password === password);
                if (user) {
                    // Redirect to user dashboard or perform any other action
                    window.location.href = 'user_dashboard.html';
                } else {
                    alert('Invalid password');
                }
            } else {
                alert('User not found');
            }
        };

        getRequest.onerror = function(event) {
            console.error('Error getting user:', event.target.error);
        };
    };

    request.onerror = function(event) {
        console.error('Error opening database:', event.target.error);
    };
});

function storeAdminInIndexedDB(admin) {
    const dbName = 'WebToolDB';
    const dbVersion = 3;

    const request = indexedDB.open(dbName, dbVersion);

    request.onupgradeneeded = function(event) {
        const db = event.target.result;
        if (!db.objectStoreNames.contains('admins')) {
            db.createObjectStore('admins', { keyPath: 'username' });
        }
        if (!db.objectStoreNames.contains('users')) {
            db.createObjectStore('users', { keyPath: 'userName' });
        }
    };

    request.onsuccess = function(event) {
        const db = event.target.result;
        const transaction = db.transaction(['admins'], 'readwrite');
        const store = transaction.objectStore('admins');
        const addRequest = store.add(admin);

        addRequest.onsuccess = function() {
            console.log('Admin added to IndexedDB');
        };

        addRequest.onerror = function(event) {
            console.error('Error adding admin:', event.target.error);
        };
    };

    request.onerror = function(event) {
        console.error('Error opening database:', event.target.error);
    };
}
