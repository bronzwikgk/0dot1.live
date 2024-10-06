
document.addEventListener('DOMContentLoaded', function () {
    var registerButtons = document.querySelectorAll('.register-btn');
    var modalTitle = document.getElementById('webinarName');
    var modalDate = document.getElementById('webinarDate');
  
    registerButtons.forEach(function (button) {
      button.addEventListener('click', function () {
        var webinarTitle = this.getAttribute('data-title');
        var webinarDate = this.getAttribute('data-date') + " at " + this.getAttribute('data-time') + " for " + this.getAttribute('data-duration');
  
        modalTitle.value = webinarTitle;
        modalDate.value = webinarDate;
      });
    });
  });
  
  
  document.addEventListener('DOMContentLoaded', () => {
    const registerButtons = document.querySelectorAll('.register-btn');
  
    // Attach event listener to all "Register Now" buttons
    registerButtons.forEach(button => {
      button.addEventListener('click', function () {
        const webinarTitle = this.getAttribute('data-title');
        const webinarDate = this.getAttribute('data-date');
  
        // Set the modal's hidden input values
        document.getElementById('webinarTitle').value = webinarTitle;
        document.getElementById('webinarDate').value = webinarDate;
      });
    });
  
    // Handle the form submission
    document.getElementById('submitRegistration').addEventListener('click', function () {
      const form = document.getElementById('webinarForm');
      
      // Collect form data
      const formData = {
        webinarTitle: form.webinarTitle.value,
        webinarDate: form.webinarDate.value,
        name: form.name.value,
        email: form.email.value,
        country: form.country.value,
        phoneNumber: form.phoneNumber.value,
        company: form.company.value,
        designation: form.designation.value
      };
  
      // Send data to backend using fetch
      fetch('http://localhost:3007/webinars/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      .then(response => response.json())
      .then(data => {
        if (data.message) {
          alert(data.message);  // Show success message
          form.reset();  // Clear form
          const modalElement = document.querySelector('#registerModal');
          const modalInstance = bootstrap.Modal.getInstance(modalElement);
          modalInstance.hide();  // Close modal
        } else {
          alert('Registration failed: ' + data.error);
        }
      })
      .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while submitting the registration.');
      });
    });
  });
  
