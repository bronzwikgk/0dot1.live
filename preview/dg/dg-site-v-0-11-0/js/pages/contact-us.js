document.addEventListener('DOMContentLoaded', () => {
    const countrySelect = document.getElementById('countrys'); // Ensure these IDs match your HTML
    const countryCodeSpan = document.getElementById('country-codes'); // Ensure these IDs match your HTML
    const phoneInput = document.getElementById('phones'); // Ensure these IDs match your HTML
  
    // Log whether the elements were found to help with debugging
    console.log("countrySelect found: ", !!countrySelect);
    console.log("countryCodeSpan found: ", !!countryCodeSpan);
    console.log("phoneInput found: ", !!phoneInput);
  
    // Ensure elements exist before proceeding
    if (countrySelect && countryCodeSpan && phoneInput) {
      // Fetch country data from Restcountries API
      fetch('https://restcountries.com/v3.1/all')
        .then(response => response.json())
        .then(data => {
          // Sort countries by name
          const sortedCountries = data.sort((a, b) => a.name.common.localeCompare(b.name.common));
          
          // Populate the country dropdown
          sortedCountries.forEach(country => {
            const option = document.createElement('option');
            const countryCode = country.idd.root + (country.idd.suffixes ? country.idd.suffixes[0] : '');
            option.value = countryCode;
            option.textContent = country.name.common;
            countrySelect.appendChild(option);
          });
        })
        .catch(error => console.error('Error fetching country data:', error));
  
      // Update country code span based on selected country
      countrySelect.addEventListener('change', (event) => {
        const selectedCountryCode = event.target.value;
        countryCodeSpan.textContent = selectedCountryCode || '00'; // Display the country code in the span next to the phone input
        phoneInput.placeholder = selectedCountryCode; // Optional: set phone input placeholder to reflect country code
      });
    } else {
      console.error("Required form elements (countrys, country-codes, phones) are missing from the DOM.");
    }
  
    // Handling form submission
    const contactForm = document.getElementById('contactForm');
    
    // Log whether the contact form was found
    console.log("contactForm found: ", !!contactForm);
  
    if (contactForm) {
      contactForm.addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevent the default form submission
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData.entries()); // Convert FormData to a plain object
  
        try {
            const response = await fetch('http://localhost:3007/api/get-in-touch', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data), // Send the data as JSON
            });
  
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
  
            const result = await response.json();
            alert(result.message); // Display success message
            contactForm.reset(); // Reset the form after submission
        } catch (error) {
            console.error('Error:', error);
            alert('There was a problem submitting your form. Please try again.'); // Display error message
        }
      });
    } else {
      console.error("Contact form is missing from the DOM.");
    }
  });
  