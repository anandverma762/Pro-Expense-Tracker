async function sendForgotPasswordRequest() {
  const email = document.querySelector("#email").value;
  const data = { email: email };

  try {
    const response = await axios.post("/password/forgotpassword", data);
    event.target.reset();

    const message = response.data.message;

    const messageElement = document.getElementById("message");
    messageElement.textContent = message;
  } catch (error) {
    if (error.response) {
      const errorMessage = error.response.data.message;

      const messageElement = document.getElementById("message");
      messageElement.textContent = errorMessage;
    } else {
      console.error("Error submitting forgot form:", error);
    }
  }
}


async function resetfpr() {

  const password = document.getElementById('pwd').value;
  const confirmPassword = document.getElementById('pwd1').value;

  if (password !== confirmPassword) {
    document.getElementById('message').textContent = 'Passwords do not match';
    return;
  }

  const resetUrl = window.location.href; // Get the current URL
  const requestId = resetUrl.substring(resetUrl.lastIndexOf('/') + 1);
  // Get the reset password link URL
  const resetPasswordLink = 'http://localhost:9000/resetpassword.html?uuid=82f332cb-2f75-433a-9aaf-730b2ccc92cc';

const url = new URL(resetUrl);
const uuid = url.searchParams.get('uuid');



  

//   console.log(requestId);
  try {
    const response = await axios.post('/password/updatepass', {
        uuid,
      password
    });
    if (response.status === 200) {
        const url = response.data.redirect;
      document.getElementById('message').textContent = 'Password updated successfully';
      window.location.href = url;
    } else {
      document.getElementById('message').textContent = 'Failed to update password';
    }
  } catch (error) {
    console.error(error);
    document.getElementById('message').textContent = 'An error occurred. Please try again later';
  }

}

document.addEventListener('submit', async (event) => {
    event.preventDefault();
    
    if (event.target.matches('.reset-form')) {
      // Signup form submitted
      resetfpr();
      event.target.reset();
    } else if (event.target.matches('.forgot-form')) {
      // Login form submitted
      sendForgotPasswordRequest();
      event.target.reset();
  
    }
})