document.addEventListener('DOMContentLoaded', function() {
    var toggler = document.querySelector('.navbar-toggler');
    var navbarCollapse = document.querySelector('.navbar-collapse');

    // Toggle navbar on click
    toggler.addEventListener('click', function() {
        console.log("iran");
        this.classList.toggle('active');
        navbarCollapse.classList.toggle('active');
    });

    // Clicking outside the navbar to close it
    document.addEventListener('click', function(event) {
        console.log("run");
        var isClickInsideNavbar = toggler.contains(event.target) || navbarCollapse.contains(event.target);
console.log(isClickInsideNavbar);
        if (!isClickInsideNavbar && navbarCollapse.classList.contains('active')) {
            toggler.classList.remove('active');
            navbarCollapse.classList.remove('active');
        }
    });
});
