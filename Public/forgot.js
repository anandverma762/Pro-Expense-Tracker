async function sendForgotPasswordRequest(event) {
    event.preventDefault(); // Prevent the default form submission

    const email = document.querySelector('#email').value;
    console.log(email);
    const data = {email:email}
    
    try {
        const response = await axios.post('/password/forgotpassword', data);
        
        const message = response.data.message;
    
        const messageElement = document.getElementById('message');
        messageElement.textContent = message;
    
      } catch (error) {
        if (error.response) {
          const errorMessage = error.response.data.message;
    
          const messageElement = document.getElementById('message');
          messageElement.textContent = errorMessage;
        } else {
          console.error('Error submitting forgot form:', error);
        }
      }
  }

  // Attach event listener to the form's submit button
  const sendButton = document.querySelector('.forgot-form');
  sendButton.addEventListener('click', sendForgotPasswordRequest);








