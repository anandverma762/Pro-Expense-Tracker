

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
    const response = await axios.post('http://localhost:9000/user/signup', signupData);

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
    const response = await axios.post('http://localhost:9000/user/login', loginData);

    const redirectUrl = response.data.redirect;
    btnhide = response.data.ispremium;
    const token = response.data.token;
    const value = response.data.isPremium;
    localStorage.setItem('token', token);
    // localStorage.setItem('ispremium',value);

    

    window.location.href = redirectUrl;

  } catch (error) {
    if (error.response) {
      const errorMessage = error.response.data.message;

      const messageElement = document.getElementById('message');
      messageElement.textContent = errorMessage;
    } else {
      console.error('Error submitting login form:', error);
    }
  }
}


document.addEventListener('submit', async (event) => {
  event.preventDefault();
  
  if (event.target.matches('.signup-form')) {
    // Signup form submitted
    add();
    event.target.reset();
  } else if (event.target.matches('.login-form')) {
    // Login form submitted
    login();
    event.target.reset();

  } else if (event.target.matches('.expense-form')) {
    //when expense added
    addExpense();
    event.target.reset();

  }
});


//function to add expenses
async function addExpense() {
  const amount = document.getElementById('amount').value;
  const description = document.getElementById('description').value;
  const category = document.getElementById('category').value;

  const expenseData = {
    amount: amount,
    description: description,
    category: category
  };

  try {
    const token = localStorage.getItem('token');
    const response = await axios.post('http://localhost:9000/expensedata', expenseData,{ headers: { "Authorization": token}});

  //  const ispremium = localStorage.getItem('ispremium');
    // Refresh expense list
    fetchExpenses();

  } catch (error) {
    if (error.response) {
      const errorMessage = error.response.data.message;

      const messageElement = document.getElementById('message');
      messageElement.textContent = errorMessage;
    } else {
      console.error('Error submitting expense form:', error);
    }
  }
}

// Function to fetch and display expenses
async function fetchExpenses() {
  try {

    
    const token = localStorage.getItem('token');
    const response = await axios.get('/expense',{ headers: { "Authorization": token}});
    const expenses = response.data.data;
    const isPremium = response.data.ispremium;
    if (isPremium) {
      const buyPremiumBtn = document.getElementById('rzr');
      if (buyPremiumBtn) {
        buyPremiumBtn.style.display = 'none';
      }
    }
    const expenseList = document.getElementById('exp');
    expenseList.innerHTML = '';

    expenses.forEach((expense) => {
      const listItem = document.createElement('li');
      listItem.textContent = `Amount: $${expense.amount} - Description: ${expense.description} - Category: ${expense.category}`;

      const deleteButton = document.createElement('button');
      deleteButton.type = 'button';
      deleteButton.className = 'delete-button';
      deleteButton.textContent = 'Delete';
      deleteButton.addEventListener('click', async () => {

        await axios.post(`/delete/${expense.id}`);
        expenseList.removeChild(listItem);
      });
      listItem.appendChild(deleteButton);

      const editButton = document.createElement('button');
      editButton.type = 'button';
      editButton.textContent = 'Edit';
      editButton.className = 'edit-button'
      editButton.addEventListener('click', () => {
        editExpense(expense.id); // Call a function to handle expense editing
      });
      listItem.appendChild(editButton);

      expenseList.appendChild(listItem);
    });
  } catch (error) {
    console.log(error);
  }
}

window.addEventListener('load', fetchExpenses);


//for buy premium

document.getElementById('rzr').onclick = async (e) => {
  e.preventDefault();
  const token = localStorage.getItem('token');

  const response = await axios.get('http://localhost:9000/purchase/buypremium', {
    headers: { "Authorization": token }
  });

  const options = {
    key: response.data.key_id,
    amount: response.data.order.amount, // Provide the order amount
    currency: "INR", // Provide the currency
    order_id: response.data.order.id,
    name: "ExpenseTracker",
    description: "Premium Subscription",
    handler: async (response) => {
      try {
        await axios.post('http://localhost:9000/purchase/updatestatus', {
          order_id: options.order_id,
          payment_id: response.razorpay_payment_id
        }, {
          headers: { "Authorization": token }
        });
        window.alert("You are now a Premium User");
      } catch (error) {
        window.alert("Failed to update purchase status");
      }
    },
   
    modal: {
      ondismiss: () => {
        window.alert("Payment failed or canceled");
      }
    }
  };

  const rzp = new Razorpay(options);
  rzp.open();

};

