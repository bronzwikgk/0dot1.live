export class Navbar {
    constructor(user = null) {
        this.authToken = localStorage.getItem('token');
        this.user = user; // Store user information if available
    }

    render() {
        return `
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <div class="container px-5">
                    <a href="https://ducisgroup.com/">
                        <img style="width: 100px" 
                             src="../assets/assets_dg-site/logo/dg logo/ducis group logo v 0-0-2 trans dark.webp" 
                             alt="Company Logo" class="me-3"/>
                    </a>
                    
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle" id="navbarDropdown0" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">About</a>
                                <ul class="dropdown-menu dropdown-menu-end m-0 p-0" aria-labelledby="navbarDropdown0">
                                    <li><a class="dropdown-item" href="#wu">Why Us</a></li>
                                    <li><a class="dropdown-item" href="#wwa">Who We Are</a></li>
                                    <li><a class="dropdown-item" href="#wwo">What We Offer</a></li>
                                    <li><a class="dropdown-item" href="#oa">Our Accreditations</a></li>
                                    <li><a class="dropdown-item" href="#st">Stats</a></li>
                                    <li><a class="dropdown-item" href="#mot">Meet Our Team</a></li>
                                    <li><a class="dropdown-item" href="#cu">Contact Us</a></li>
                                </ul>
                            </li>
                            <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle" id="navbarDropdown1" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Offering</a>
                                <ul class="dropdown-menu dropdown-menu-end m-0 p-0" aria-labelledby="navbarDropdown1">
                                    <li><a class="dropdown-item" href="./offering.html#t&c">Training & Certifications</a></li>
                                    <li><a class="dropdown-item" href="./offering.html#cons">Consultancy</a></li>
                                    <li><a class="dropdown-item" href="./offering.html#atva">ATVA</a></li>
                                </ul>
                            </li>
                            <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle" id="navbarDropdown2" href="./page-dg-site-empty-page.html" role="button" data-bs-toggle="dropdown" aria-expanded="false">Resources</a>
                                <ul class="dropdown-menu dropdown-menu-end m-0 p-0" aria-labelledby="navbarDropdown2">
                                    <li><a class="dropdown-item" href="./resource.html#webinar">Webinar</a></li>
                                    <li><a class="dropdown-item" href="./resource.html#comm">Community Forum</a></li>
                                    <li><a class="dropdown-item" href="./resource.html#mock">Mock Test</a></li>
                                    <li><a class="dropdown-item" href="./resource.html#cf">Case Studies</a></li>
                                    <li><a class="dropdown-item" href="./resource.html#blog">Blog</a></li>
                                    <li><a class="dropdown-item" href="./resource.html#faq">FAQ</a></li>
                                </ul>
                            </li>
                        </ul>
                        
                        <!-- Conditional Rendering for Login/Logout -->
                        <div class="d-flex align-items-center">
                            ${this.user ?
                `<span>Welcome, ${this.user.name}</span>
                                <a id="logoutNav" class="btn btn-secondary mx-3" href="javascript:void(0);" onclick="logout()">Logout</a>`
                :
                `<a id="loginNav" class="btn btn-primary mx-3" href="./auth.html">Login</a>`
            }
                        </div>
                    </div>
                </div>
            </nav>
        `;
    }
}

// Logout function (global)
function logout() {
    localStorage.removeItem('token');

    // Optionally, redirect to the login page after logout
    window.location.href = './auth.html';
}
