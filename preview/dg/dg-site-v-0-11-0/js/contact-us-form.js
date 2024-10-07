document.addEventListener('DOMContentLoaded', () => {
  const countrySelect = document.getElementById('country');
  const countryCodeSpan = document.getElementById('country-code');
  const phoneInput = document.getElementById('phone');

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
          option.value = country.idd.root + (country.idd.suffixes ? country.idd.suffixes[0] : '');
          option.textContent = country.name.common;
          countrySelect.appendChild(option);
        });
      })
      .catch(error => console.error('Error fetching country data:', error));

    // Update country code span based on selected country
    countrySelect.addEventListener('change', (event) => {
      const countryCode = event.target.value;
      countryCodeSpan.textContent = countryCode; // Display the country code in the span
      phoneInput.placeholder = countryCode; // Optional: set phone input placeholder to reflect country code
    });
  } else {
    console.error("Required form elements (country, country-code, phone) are missing from the DOM.");
  }

  // Handling form submission
  const contactForm = document.querySelector('form'); // Select the form
  if (contactForm) {
    contactForm.addEventListener('submit', async (event) => {
      event.preventDefault(); // Prevent the default form submission
      
      // Get form data
      const formData = new FormData(contactForm);
      const data = Object.fromEntries(formData.entries()); // Convert FormData to a plain object

      try {
          const response = await fetch('https://68.183.94.77/api/contact', {
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

          // Optionally, close the modal if needed
          const modal = bootstrap.Modal.getInstance(document.getElementById('contactModal'));
          if (modal) {
            modal.hide();
          }
      } catch (error) {
          console.error('Error:', error);
          alert('There was a problem submitting your form. Please try again.'); // Display error message
      }
    });
  } else {
    console.error("Contact form is missing from the DOM.");
  }
});


