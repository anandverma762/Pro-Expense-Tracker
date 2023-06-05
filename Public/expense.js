async function add() {
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const signupData = {
    name: name,
    email: email,
    password: password
  };

  try {
    const response = await axios.post('http://localhost:9000/signup', signupData);

    const message = response.data.message;

    const messageElement = document.getElementById('message');
    messageElement.textContent = message;

  } catch (error) {
    if (error.response) {
      const errorMessage = error.response.data.message;

      const messageElement = document.getElementById('message');
      messageElement.textContent = errorMessage;
    } else {
      console.error('Error submitting signup form:', error);
    }
  }
  signupForm.reset();
}

//login form

async function login() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const loginData = {
    email: email,
    password: password
  };

  try {
    const response = await axios.post('http://localhost:9000/login', loginData);

    const message = response.data.message;

    const messageElement = document.getElementById('message');
    messageElement.textContent = message;

  } catch (error) {
    if (error.response) {
      const errorMessage = error.response.data.message;

      const messageElement = document.getElementById('message');
      messageElement.textContent = errorMessage;
    } else {
      console.error('Error submitting login form:', error);
    }
  }
  loginForm.reset();
}


document.addEventListener('submit', async (event) => {
  event.preventDefault();
  
  if (event.target.matches('.signup-form')) {
    // Signup form submitted
    add();
  } else if (event.target.matches('.login-form')) {
    // Login form submitted
    login();
  }
});