// notificationUtility.js

// Immediately add CSS styles for the notification utility

// Notification function
export default function showNotification(message, type = 'error') {
    const notificationStyles = `
  #notification-container {
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 9999;
    width: 300px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  
  .notification {
    padding: 15px;
    border-radius: 5px;
    color: #fff;
    font-size: 14px;
    display: flex;
    align-items: center;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
    opacity: 0;
    transform: translateY(-20px);
    animation: slideIn 0.4s forwards, fadeOut 0.4s 3s forwards;
  }

  .notification.error { background-color: #e74c3c; }
  .notification.warning { background-color: #f39c12; }
  .notification.success { background-color: #2ecc71; }

  @keyframes slideIn {
    from { opacity: 0; transform: translateY(-20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeOut {
    from { opacity: 1; }
    to { opacity: 0; }
  }

  .notification .close-btn {
    margin-left: auto;
    cursor: pointer;
    font-weight: bold;
    font-size: 16px;
  }
`;

    // Inject CSS into the document
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = notificationStyles;
    document.head.appendChild(styleSheet);

    // Create notification container if it doesn’t already exist
    let notificationContainer = document.getElementById('notification-container');
    if (!notificationContainer) {
        notificationContainer = document.createElement('div');
        notificationContainer.id = 'notification-container';
        document.body.appendChild(notificationContainer);
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.classList.add('notification', type);

    // Add message and close button
    notification.innerHTML = `
    <span>${message}</span>
    <span class="close-btn" onclick="this.parentElement.remove()">&times;</span>
  `;

    // Append notification to container
    notificationContainer.appendChild(notification);

    // Automatically remove notification after 4 seconds
    setTimeout(() => {
        notification.remove();
    }, 4000);
}

// Example usage:
// showNotification('This email is already registered.', 'error');
// showNotification('Form submitted successfully!', 'success');
