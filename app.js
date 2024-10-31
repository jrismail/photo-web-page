const sign_in_btn =   document.querySelector("#sign-in-btn");
const sign_up_btn =  document.querySelector("#sign-up-btn");
const container =  document.querySelector(".container");

sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});

// Simulated user data storage
let users = [];

// Function to handle form submission
function handleSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);
  const userData = Object.fromEntries(formData.entries());

  if (form.classList.contains('sign-up-form')) {
    // Simulated sign-up process
    users.push(userData);
    alert('Account created successfully! Please sign in.');
    container.classList.remove("sign-up-mode");
  } else {
    // Simulated sign-in process
    const user = users.find(u => u.username === userData.username && u.password === userData.password);
    if (user) {
      alert('Signed in successfully!');
      // Redirect to user's account page (simulated)
      window.location.href = 'account.html';
    } else {
      alert('Invalid username or password.');
    }
  }
}

// Add event listeners to forms
document.querySelector('.sign-in-form').addEventListener('submit', handleSubmit);
document.querySelector('.sign-up-form').addEventListener('submit', handleSubmit);

// Function to handle Google Sign-In
function handleCredentialResponse(response) {
  // Decode the credential response
  const responsePayload = jwt_decode(response.credential);

  // Simulated sign-up/sign-in with Google
  const googleUser = {
    username: responsePayload.name,
    email: responsePayload.email,
    // You might want to generate a random password here for security
    password: 'google_auth_' + Math.random().toString(36).substr(2, 9)
  };

  // Check if user already exists
  const existingUser = users.find(u => u.email === googleUser.email);
  if (existingUser) {
    alert('Signed in successfully with Google!');
  } else {
    users.push(googleUser);
    alert('Account created successfully with Google! You are now signed in.');
  }

  // Redirect to user's account page (simulated)
  window.location.href = 'account.html';
}

// Note: In a real application, you would need to implement proper server-side authentication and data storage.v