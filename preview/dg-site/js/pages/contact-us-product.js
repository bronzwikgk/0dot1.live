import countries from "../country_list.js";

document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.querySelector('#contact-us-product');
  const countrySelect = document.querySelector('#contact-us-country');
  const countryCodeSpan = document.querySelector('#contact-us-country-code');
  const phoneInput = document.querySelector('#contact-us-phone');

  // Sort countries by name
  countries.sort((a, b) => a.name.localeCompare(b.name));

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

  // Handle form submission
  contactForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    // Collect form data
    const name = document.querySelector('#contact-us-name').value.trim();
    const email = document.querySelector('#contact-us-email').value.trim();
    const country = countrySelect.value;
    const phone = phoneInput.value.trim();
    const course = document.querySelector('#contact-us-courses').value;
    const organization = document.querySelector('#contact-us-organization').value.trim();
    const message = document.querySelector('#contact-us-message').value.trim();
    const page = window.location.pathname; // Captures the page URL for backend tracking

    // Validation
    if (!name || !email || !country || !phone || !course || !organization || !message) {
      showMessage('Please fill out all required fields.', 'tomato'); // Use showMessage for validation error
      return;
    }

    // Prepare data for submission
    const formData = {
      name,
      email,
      country,
      phone,
      course,
      organization,
      message,
      page,
    };

    try {
      // Send data to the backend
      const response = await fetch('https://unbelong.in/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        showMessage('Thank you for contacting us! Your message has been submitted.', 'lightgreen');
        contactForm.reset(); // Clear the form fields
      } else {
        showMessage(`Error: ${result.message}`, 'tomato');
      }
    } catch (error) {
      console.error('Error submitting the form:', error);
      showMessage('There was an error submitting your message. Please try again later.', 'tomato');
    }
  });
});

// Function to create and display messages dynamically
function showMessage(message, color) {
  const messageDiv = document.createElement('div');
  messageDiv.textContent = message;
  messageDiv.style.position = 'fixed';
  messageDiv.style.top = '20%';
  messageDiv.style.left = '50%';
  messageDiv.style.transform = 'translateX(-50%)';
  messageDiv.style.backgroundColor = color;
  messageDiv.style.color = 'white';
  messageDiv.style.padding = '15px 30px';
  messageDiv.style.borderRadius = '5px';
  messageDiv.style.zIndex = '1000';
  document.body.appendChild(messageDiv);

  setTimeout(() => {
    document.body.removeChild(messageDiv);
  }, 2000);
}
