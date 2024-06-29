

// Select necessary elements
const aboutContent = document.querySelector(".navbar-2-cont nav .about-dd-cont");
const about = document.querySelector(".navbar-2-cont nav ul li.about");
const offeringContent = document.querySelector(".navbar-2-cont nav .offering-dd-cont");
const offering = document.querySelector(".navbar-2-cont nav ul li.offering");
const resourcesContent = document.querySelector(".navbar-2-cont nav .resources-dd-cont");
const resources = document.querySelector(".navbar-2-cont nav ul li.resources");

// Function to hide all dropdowns
function hideAllDropdowns() {
    aboutContent.style.display = "none";
    about.classList.remove("active");
    offeringContent.style.display = "none";
    offering.classList.remove("active");
    resourcesContent.style.display = "none";
    resources.classList.remove("active");
}

// Show and hide dropdown on mouseover
about.addEventListener("mouseover", () => {
    hideAllDropdowns();
    aboutContent.style.display = "block";
    about.classList.add("active");
});

offering.addEventListener("mouseover", () => {
    hideAllDropdowns();
    offeringContent.style.display = "block";
    offering.classList.add("active");
});

resources.addEventListener("mouseover", () => {
    hideAllDropdowns();
    resourcesContent.style.display = "block";
    resources.classList.add("active");
});

// Hide dropdowns on mouse leave
aboutContent.addEventListener("mouseleave", () => {
    aboutContent.style.display = "none";
    about.classList.remove("active");
});

offeringContent.addEventListener("mouseleave", () => {
    offeringContent.style.display = "none";
    offering.classList.remove("active");
});

resourcesContent.addEventListener("mouseleave", () => {
    resourcesContent.style.display = "none";
    resources.classList.remove("active");
});

// Hide dropdowns when clicking outside the nav items and dropdowns
document.addEventListener("mouseover", (event) => {
    if (!event.target.closest('.navbar-2-cont nav')) {
        hideAllDropdowns();
    }
});

// Prevent hiding when clicking inside the dropdown
aboutContent.addEventListener("click", (event) => {
    event.stopPropagation();
});
offeringContent.addEventListener("click", (event) => {
    event.stopPropagation();
});
resourcesContent.addEventListener("click", (event) => {
    event.stopPropagation();
});












































// const search = document.querySelector(".search");
// const btn = document.querySelector(".btn");
// const input = document.querySelector(".input");

// btn.addEventListener("click", () => {
// 	search.classList.toggle("active");
// 	input.focus();
// });

// // navbar DD popup
// const aboutContent = document.querySelector(
// 	".navbar-2-cont nav .about-dd-cont"
// );
// const about = document.querySelector(".navbar-2-cont nav ul li.about");
// const aboutWidth = document.querySelector(
// 	".navbar-2-cont nav .dd ul li.about::after"
// );

// about.addEventListener("mouseover", () => {
// 	if (offering.classList.contains("active")) {
// 		offering.classList.remove("active");
// 		offeringContent.style.display = "none";
// 	}
// 	aboutContent.style.display = "block";
// 	about.classList.add("active");
// });
// about.addEventListener("click", () => {
// 	aboutContent.style.display = "none";
// 	about.classList.remove("active");
// });

// const offeringContent = document.querySelector(
// 	".navbar-2-cont nav .offering-dd-cont"
// );
// const offering = document.querySelector(".navbar-2-cont nav ul li.offering");
// const offeringWidth = document.querySelector(
// 	".navbar-2-cont nav .dd ul li.offering::after"
// );

// offering.addEventListener("mouseover", () => {
// 	if (about.classList.contains("active")) {
// 		about.classList.remove("active");
// 		aboutContent.style.display = "none";
// 	}
// 	offeringContent.style.display = "block";
// 	offering.classList.add("active");
// });
// offering.addEventListener("click", () => {
// 	offeringContent.style.display = "none";
// 	offering.classList.remove("active");
// });







// // navbar DD popup
// const aboutContent = document.querySelector(
// 	".navbar-2-cont nav .about-dd-cont"
// );
// const about = document.querySelector(".navbar-2-cont nav ul li.about");
// const aboutWidth = document.querySelector(
// 	".navbar-2-cont nav .dd ul li.about::after"
// );

// about.addEventListener("mouseover", () => {
// 	if (offering.classList.contains("active")) {
// 		offering.classList.remove("active");
// 		offeringContent.style.display = "none";
// 	}
// 	if (resources.classList.contains("active")) {
// 		resources.classList.remove("active");
// 		resourcesContent.style.display = "none";
// 	}
// 	aboutContent.style.display = "block";
// 	about.classList.add("active");
// });

// about.addEventListener("click", () => {
// 	aboutContent.style.display = "none";
// 	about.classList.remove("active");
// });

// const offeringContent = document.querySelector(
// 	".navbar-2-cont nav .offering-dd-cont"
// );
// const offering = document.querySelector(".navbar-2-cont nav ul li.offering");
// const offeringWidth = document.querySelector(
// 	".navbar-2-cont nav .dd ul li.offering::after"
// );

// offering.addEventListener("mouseover", () => {
// 	if (about.classList.contains("active")) {
// 		about.classList.remove("active");
// 		aboutContent.style.display = "none";
// 	}
// 	if (resources.classList.contains("active")) {
// 		resources.classList.remove("active");
// 		resourcesContent.style.display = "none";
// 	}
// 	offeringContent.style.display = "block";
// 	offering.classList.add("active");
// });

// offering.addEventListener("click", () => {
// 	offeringContent.style.display = "none";
// 	offering.classList.remove("active");
// });

// const resourcesContent = document.querySelector(
// 	".navbar-2-cont nav .resources-dd-cont"
// );
// const resources = document.querySelector(".navbar-2-cont nav ul li.resources");
// const resourcesWidth = document.querySelector(
// 	".navbar-2-cont nav .dd ul li.resources::after"
// );

// resources.addEventListener("mouseover", () => {
// 	if (about.classList.contains("active")) {
// 		about.classList.remove("active");
// 		aboutContent.style.display = "none";
// 	}
// 	if (offering.classList.contains("active")) {
// 		offering.classList.remove("active");
// 		offeringContent.style.display = "none";
// 	}
// 	resourcesContent.style.display = "block";
// 	resources.classList.add("active");
// });

// resources.addEventListener("click", () => {
// 	resourcesContent.style.display = "none";
// 	resources.classList.remove("active");
// });




// // Select necessary elements
// const aboutContent = document.querySelector(".navbar-2-cont nav .about-dd-cont");
// const about = document.querySelector(".navbar-2-cont nav ul li.about");
// const offeringContent = document.querySelector(".navbar-2-cont nav .offering-dd-cont");
// const offering = document.querySelector(".navbar-2-cont nav ul li.offering");
// const resourcesContent = document.querySelector(".navbar-2-cont nav .resources-dd-cont");
// const resources = document.querySelector(".navbar-2-cont nav ul li.resources");

// // Function to hide all dropdowns
// function hideAllDropdowns() {
//     aboutContent.style.display = "none";
//     about.classList.remove("active");
//     offeringContent.style.display = "none";
//     offering.classList.remove("active");
//     resourcesContent.style.display = "none";
//     resources.classList.remove("active");
// }

// // Show and hide dropdown on mouseover
// about.addEventListener("mouseover", () => {
//     hideAllDropdowns();
//     aboutContent.style.display = "block";
//     about.classList.add("active");
// });

// offering.addEventListener("mouseover", () => {
//     hideAllDropdowns();
//     offeringContent.style.display = "block";
//     offering.classList.add("active");
// });

// resources.addEventListener("mouseover", () => {
//     hideAllDropdowns();
//     resourcesContent.style.display = "block";
//     resources.classList.add("active");
// });

// // Hide dropdowns on mouse leave
// aboutContent.addEventListener("mouseleave", () => {
//     aboutContent.style.display = "none";
//     about.classList.remove("active");
// });

// offeringContent.addEventListener("mouseleave", () => {
//     offeringContent.style.display = "none";
//     offering.classList.remove("active");
// });

// resourcesContent.addEventListener("mouseleave", () => {
//     resourcesContent.style.display = "none";
//     resources.classList.remove("active");
// });

// // Optional: Hide dropdowns when clicking outside the navbar
// document.addEventListener("click", (event) => {
//     if (!event.target.closest('.navbar-2')) {
//         hideAllDropdowns();
//     }
// });
















// // navbar DD popup
// const aboutContent = document.querySelector(
// 	".navbar-2-cont nav .about-dd-cont"
// );
// const about = document.querySelector(".navbar-2-cont nav ul li.about");
// const aboutWidth = document.querySelector(
// 	".navbar-2-cont nav .dd ul li.about::after"
// );

// about.addEventListener("mouseover", () => {
// 	if (offering.classList.contains("active")) {
// 		offering.classList.remove("active");
// 		offeringContent.style.display = "none";
// 	}
// 	if (resources.classList.contains("active")) {
// 		resources.classList.remove("active");
// 		resourcesContent.style.display = "none";
// 	}
// 	aboutContent.style.display = "block";
// 	about.classList.add("active");
// });

// about.addEventListener("click", () => {
// 	aboutContent.style.display = "none";
// 	about.classList.remove("active");
// });

// const offeringContent = document.querySelector(
// 	".navbar-2-cont nav .offering-dd-cont"
// );
// const offering = document.querySelector(".navbar-2-cont nav ul li.offering");
// const offeringWidth = document.querySelector(
// 	".navbar-2-cont nav .dd ul li.offering::after"
// );

// offering.addEventListener("mouseover", () => {
// 	if (about.classList.contains("active")) {
// 		about.classList.remove("active");
// 		aboutContent.style.display = "none";
// 	}
// 	if (resources.classList.contains("active")) {
// 		resources.classList.remove("active");
// 		resourcesContent.style.display = "none";
// 	}
// 	offeringContent.style.display = "block";
// 	offering.classList.add("active");
// });

// offering.addEventListener("click", () => {
// 	offeringContent.style.display = "none";
// 	offering.classList.remove("active");
// });

// const resourcesContent = document.querySelector(
// 	".navbar-2-cont nav .resources-dd-cont"
// );
// const resources = document.querySelector(".navbar-2-cont nav ul li.resources");
// const resourcesWidth = document.querySelector(
// 	".navbar-2-cont nav .dd ul li.resources::after"
// );

// resources.addEventListener("mouseover", () => {
// 	if (about.classList.contains("active")) {
// 		about.classList.remove("active");
// 		aboutContent.style.display = "none";
// 	}
// 	if (offering.classList.contains("active")) {
// 		offering.classList.remove("active");
// 		offeringContent.style.display = "none";
// 	}
// 	resourcesContent.style.display = "block";
// 	resources.classList.add("active");
// });

// resources.addEventListener("click", () => {
// 	resourcesContent.style.display = "none";
// 	resources.classList.remove("active");
// });

// // Add event listener to the document
// document.addEventListener("mouseover", (event) => {
// 	if (!about.contains(event.target) && !offering.contains(event.target) && !resources.contains(event.target)) {
// 		aboutContent.style.display = "none";
// 		offeringContent.style.display = "none";
// 		resourcesContent.style.display = "none";
// 		about.classList.remove("active");
// 		offering.classList.remove("active");
// 		resources.classList.remove("active");
// 	}
// });

































// // navbar DD popup
// const aboutContent = document.querySelector(
// 	".navbar-2-cont nav .about-dd-cont"
// );
// const about = document.querySelector(".navbar-2-cont nav ul li.about");
// const aboutWidth = document.querySelector(
// 	".navbar-2-cont nav .dd ul li.about::after"
// );

// about.addEventListener("mouseover", () => {
// 	if (offering.classList.contains("active")) {
// 		offering.classList.remove("active");
// 		offeringContent.style.display = "none";
// 	}
// 	aboutContent.style.display = "block";
// 	about.classList.add("active");
// });

// about.addEventListener("click", () => {
// 	aboutContent.style.display = "none";
// 	about.classList.remove("active");
// });

// const offeringContent = document.querySelector(
// 	".navbar-2-cont nav .offering-dd-cont"
// );
// const offering = document.querySelector(".navbar-2-cont nav ul li.offering");
// const offeringWidth = document.querySelector(
// 	".navbar-2-cont nav .dd ul li.offering::after"
// );

// offering.addEventListener("mouseover", () => {
// 	if (about.classList.contains("active")) {
// 		about.classList.remove("active");
// 		aboutContent.style.display = "none";
// 	}
// 	offeringContent.style.display = "block";
// 	offering.classList.add("active");
// });

// offering.addEventListener("click", () => {
// 	offeringContent.style.display = "none";
// 	offering.classList.remove("active");
// });

// // Add event listener to the document
// document.addEventListener("mouseover", (event) => {
// 	if (!about.contains(event.target) && !offering.contains(event.target)) {
// 		aboutContent.style.display = "none";
// 		offeringContent.style.display = "none";
// 		about.classList.remove("active");
// 		offering.classList.remove("active");
// 	}
// });
