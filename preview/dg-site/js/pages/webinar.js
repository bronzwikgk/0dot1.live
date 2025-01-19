import BASE_URL from '../config.js';

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
  const submitButton = document.getElementById('submitBooking');
  if (submitButton) {
    submitButton.addEventListener('click', async function (event) {
      event.preventDefault();

      const form = document.getElementById('bookingForm');
      if (!form) {
        console.error('Form not found.');
        return;
      }

      // Collect form data
      const formData = {
        webinarTitle: form['training-name'].value || '',
        webinarDate: form['start-date'].value || '',
        name: form.name?.value || '',
        email: form.email?.value || '',
        country: form.country?.value || '',
        phoneNumber: form.phone?.value || '',
        company: form.company?.value || '',
        designation: form.designation?.value || ''
      };

      try {
        // Send POST request to the backend
        const response = await fetch(`${BASE_URL}/webinars/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });

        const data = await response.json();

        // Function to create and configure a message div automatically
function createMessageDiv() {
  var messageDiv = document.createElement('div');
  messageDiv.id = 'success-message'; // Assign ID
  messageDiv.style.position = 'fixed';
  messageDiv.style.top = '50%';
  messageDiv.style.left = '50%';
  messageDiv.style.transform = 'translate(-50%, -50%)';
  messageDiv.style.backgroundColor = 'lightgreen';
  messageDiv.style.padding = '30px';
  messageDiv.style.borderRadius = '10px';
  messageDiv.style.zIndex = '1000'; // Ensure it's on top
  return messageDiv;
}

// Example usage in a response handler
if (response.ok) {
  form.reset(); // Clear the form first

  // Optionally close the modal before displaying the message
  const closeButton = document.getElementById('close-booking-modal');
  if (closeButton) {
      closeButton.click();
  } else {
      console.warn('Close button not found.');
  }

  // Delay displaying the message until after the form has closed
  setTimeout(() => {
      var messageDiv = createMessageDiv();
      messageDiv.textContent = data.message || 'Registration successful';
      document.body.appendChild(messageDiv);

      // Remove the message after 2 seconds
      setTimeout(() => {
          document.body.removeChild(messageDiv);
      }, 2000);
  }, 500); // Short delay before showing the message, adjust as needed
}
else {
  // Display error using a message div instead of an alert
  var errorMessage = data.error || 'Unknown error';
  var errorDiv = createMessageDiv(errorMessage, 'tomato');
  setTimeout(() => {
    document.body.removeChild(errorDiv);
  }, 2000);
}
} catch (error) {
console.error('Error during form submission:', error);
// Display network or processing errors
var networkErrorDiv = createMessageDiv('An error occurred while submitting the registration.', 'tomato');
setTimeout(() => {
  document.body.removeChild(networkErrorDiv);
}, 2000);
}
});
} else {
console.error('Submit button not found.');
}
});
