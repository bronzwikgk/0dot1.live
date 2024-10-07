const countrySelect = document.getElementById('country');
const countryCodeSpan = document.getElementById('country-code');
const phoneInput = document.getElementById('phone');

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
  countryCodeSpan.textContent = countryCode; // This line displays the country code in the span

  // Also, set the value of the country select
  countrySelect.value = countryCode; // Ensure the country select reflects the chosen value
});


document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.querySelector('form'); // Select the form

  contactForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent the default form submission

    // Get form data
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData.entries()); // Convert FormData to a plain object

    console.log('Form Data:', data); // Log the data being sent

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
        modal.hide();
    } catch (error) {
        console.error('Error:', error);
        alert('There was a problem submitting your form. Please try again.'); // Display error message
    }
});

});


document.addEventListener('DOMContentLoaded', () => {
  const countrySelect = document.getElementById('countrys');
  const countryCodeSpan = document.getElementById('country-codes');
  const phoneInput = document.getElementById('phones');

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
});


document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('contactForm');

  contactForm.addEventListener('submit', async (event) => {
      event.preventDefault(); // Prevent the default form submission

      // Get form data
      const formData = new FormData(contactForm);
      const data = Object.fromEntries(formData.entries()); // Convert FormData to a plain object

      try {
<<<<<<< HEAD
          const response = await fetch('http://68.183.94.77:4000/api/contact', {
=======
          const response = await fetch('http://localhost:3007/api/get-in-touch', {
>>>>>>> b2eed0a27df998ad5d498346afb47e34f2589846
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
});
