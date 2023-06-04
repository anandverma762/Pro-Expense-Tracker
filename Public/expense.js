// Get the signup form element
const signupForm = document.querySelector('.signup-form');

// Event listener for form submission
signupForm.addEventListener('submit', (e) => {
  e.preventDefault(); // Prevent form submission

  // Get the input field values
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  // Create an object to store the signup data
  const signupData = {
    name: name,
    email: email,
    password: password
  };

  // Perform any desired actions with the signup data
  console.log(signupData);

  // Reset the form
  signupForm.reset();
});
