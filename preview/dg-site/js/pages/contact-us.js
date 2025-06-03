import countries from '../country_list.js';
import { LMS_BASE_URL } from '../config.js';

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
    // Sort countries by name
    const sortedCountries = countries.sort((a, b) => a.name.localeCompare(b.name));

    // Populate the country dropdown
    sortedCountries.forEach((country) => {
      const option = document.createElement('option');
      option.value = country.dial_code;
      option.textContent = country.name;
      countrySelect.appendChild(option);
    });

    // Update country code span based on selected country
    countrySelect.addEventListener('change', (event) => {
      const selectedCountryCode = event.target.value;
      countryCodeSpan.textContent = selectedCountryCode || '00'; // Display the country code in the span
      phoneInput.placeholder = ' '; // Set phone input placeholder
    });
  } else {
    console.error("Required form elements (countrys, country-codes, phones) are missing from the DOM.");
  }

  // ek
  const contactForm = document.getElementById('contactForm');
  console.log("contactForm found: ", !!contactForm);

  if (contactForm) {
    contactForm.addEventListener('submit', async (event) => {
      event.preventDefault();

      const formData = new FormData(contactForm);
      const data = Object.fromEntries(formData.entries());

      // ✅ Inject required `formType`
      const payload = {
        ...data,
        formType: 'contact-us'
      };

      try {
        const response = await fetch(`${LMS_BASE_URL}/api/leads`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });

        const result = await response.json();

        showMessage(result.message || 'Your inquiry has been sent successfully.', response.ok ? 'lightgreen' : 'tomato');

        if (response.ok) {
          contactForm.reset();
        }
      } catch (error) {
        console.error('Error:', error);
        showMessage('There was a problem submitting your form. Please try again.', 'tomato');
      }
    });
  } else {
    console.error("Contact form is missing from the DOM.");
  }

});

// Function to create and display messages dynamically
function showMessage(message, color = 'lightgreen') {
  const messageDiv = document.createElement('div');
  messageDiv.textContent = message;
  messageDiv.style.position = 'fixed';
  messageDiv.style.top = '20%';  // Adjusted for better visibility
  messageDiv.style.left = '50%';
  messageDiv.style.transform = 'translateX(-50%)';
  messageDiv.style.backgroundColor = color;
  messageDiv.style.color = 'white';
  messageDiv.style.padding = '15px 30px';
  messageDiv.style.borderRadius = '5px';
  messageDiv.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
  messageDiv.style.zIndex = '1000';
  document.body.appendChild(messageDiv);

  setTimeout(() => {
    document.body.removeChild(messageDiv);
  }, 2000);
}
