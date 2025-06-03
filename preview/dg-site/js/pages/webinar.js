import BASE_URL from '../config.js';
import { LMS_BASE_URL } from '../config.js';

document.addEventListener('DOMContentLoaded', () => {
  // Attach event listener to all "Book Now" buttons
  const bookNowButtons = document.querySelectorAll('.btn-outline-success');

  bookNowButtons.forEach(button => {
    button.addEventListener('click', function () {
      // Find the closest table row to extract data
      const row = this.closest('tr');
      const trainingName = row.cells[0]?.textContent.trim();
      const fullDate = row.cells[2]?.textContent.trim();
      const timing = row.cells[3]?.textContent.trim();

      // Set the modal's input values
      document.getElementById('training-name').value = trainingName;
      document.getElementById('start-date').value = fullDate;
      document.getElementById('end-date').value = endDate;
      document.getElementById('timing').value = timing;
    });
  });


  // Handle the form submission
  // ek
  const submitButton = document.getElementById('submitBooking');

  if (submitButton) {
    submitButton.addEventListener('click', async function (event) {
      event.preventDefault();

      const form = document.getElementById('bookingForm');
      if (!form) return console.error('Form not found.');

      // Prepare data
      const formData = {
        formType: 'webinar-booking', // ✅ required
        openBatchTitle: form['training-name'].value || '',
        openBatchDate: form['start-date'].value || '',
        name: form.name?.value || '',
        email: form.email?.value || '',
        country: form.country?.value || '',
        phone: form.phone?.value || '',
        company: form.company?.value || '',
        designation: form.designation?.value || ''
      };

      try {
        const response = await fetch(`${LMS_BASE_URL}/api/leads`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });

        const data = await response.json();

        const createMessageDiv = (text = '', bg = 'lightgreen') => {
          const div = document.createElement('div');
          div.id = 'success-message';
          div.style.cssText = `
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background-color: ${bg};
          padding: 30px;
          border-radius: 10px;
          z-index: 1000;
        `;
          div.textContent = text;
          return div;
        };

        if (response.ok) {
          form.reset();

          const closeButton = document.getElementById('close-booking-modal');
          if (closeButton) closeButton.click();

          setTimeout(() => {
            const messageDiv = createMessageDiv(data.message || 'Registration successful');
            document.body.appendChild(messageDiv);
            setTimeout(() => document.body.removeChild(messageDiv), 2000);
          }, 500);
        } else {
          const errorDiv = createMessageDiv(data.error || 'Unknown error', 'tomato');
          document.body.appendChild(errorDiv);
          setTimeout(() => document.body.removeChild(errorDiv), 2000);
        }
      } catch (error) {
        console.error('Error during form submission:', error);
        const networkErrorDiv = createMessageDiv('An error occurred while submitting the registration.', 'tomato');
        document.body.appendChild(networkErrorDiv);
        setTimeout(() => document.body.removeChild(networkErrorDiv), 2000);
      }
    });
  }
  else {
    console.error('Submit button not found.');
  }
});
