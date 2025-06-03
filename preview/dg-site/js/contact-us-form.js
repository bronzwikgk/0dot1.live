import BASE_URL from './config.js';
import { LMS_BASE_URL } from './config.js';
import countries from './country_list.js';


document.addEventListener('DOMContentLoaded', () => {
  const countrySelect = document.getElementById('country');
  const countryCodeSpan = document.getElementById('country-code');
  const phoneInput = document.getElementById('phone');
  const contactForm = document.querySelector('#getInTouchForm');

  // Sort countries by name
  countries.sort((a, b) => a.name.localeCompare(b.name));
console.log(countries);

  // Populate the dropdown
  countries.forEach((country) => {
    const option = document.createElement('option');
    option.value = country.dial_code;
    option.textContent = country.name;
    countrySelect.appendChild(option);
  });

  // Update country code and placeholder on change
  countrySelect.addEventListener('change', (event) => {
    const selectedCountryCode = event.target.value;
    countryCodeSpan.textContent = selectedCountryCode || '00';
    phoneInput.placeholder = " ";
  });
  // Form submission handler
  contactForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    // Collect form data
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const country = document.getElementById('country').selectedOptions[0].textContent;
    const phone = document.getElementById('phone').value;
    const message = document.getElementById('message').value;

   // Construct the form data object with formType
  const formData = {
    formType: 'get-in-touch',  // ✅ Mandatory
    name,
    email,
    country,
    phone,
    message
  };

    try {
      const response = await fetch(`${LMS_BASE_URL}/api/leads`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      showMessage(result.message, 'lightgreen');
      contactForm.reset();

      // Optionally close the modal
      const modal = bootstrap.Modal.getInstance(document.getElementById('contactModal'));
      modal.hide();
    } catch (error) {
      console.error('Error submitting form:', error);
      showMessage('There was a problem submitting your form. Please try again.', 'tomato');
    }
  });
});


    // Function to create and display messages dynamically
    function showMessage(message, color) {
      const messageDiv = document.createElement('div');
      messageDiv.textContent = message;
      messageDiv.style.position = 'fixed';
      messageDiv.style.top = '10%';
      messageDiv.style.left = '50%';
      messageDiv.style.transform = 'translateX(-50%)';
      messageDiv.style.backgroundColor = color;
      messageDiv.style.color = 'white';
      messageDiv.style.padding = '15px 40px';
      messageDiv.style.borderRadius = '5px';
      messageDiv.style.zIndex = '1000';
      document.body.appendChild(messageDiv);
    
      setTimeout(() => {
        document.body.removeChild(messageDiv);
      }, 2000);
    }
  
    // showMessage('', 'lightgreen');
    // showMessage('', 'tomato');