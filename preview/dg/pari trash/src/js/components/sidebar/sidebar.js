document.addEventListener('DOMContentLoaded', function() {
    var sidebar = document.getElementById('sidebar');
    var sidebarToggle = document.getElementById('sidebar-toggle');

    sidebarToggle.onclick = function() {
        sidebar.classList.toggle('active');
    };

    // For nested menu toggle and arrow icon toggle
    var menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(function(item) {
        item.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent navigating to "#"
            var submenu = this.querySelector('.submenu');
            if (submenu) {
                submenu.style.display = submenu.style.display === 'block' ? 'none' : 'block';
                var arrowIcon = this.querySelector('.ri-arrow-right-s-fill') ||this.querySelector('.ri-arrow-down-s-fill');
                
                if (arrowIcon) {
                    arrowIcon.classList.toggle('ri-arrow-down-s-fill');
                    arrowIcon.classList.toggle('ri-arrow-right-s-fill');
                }
            }
        });
    });
});
