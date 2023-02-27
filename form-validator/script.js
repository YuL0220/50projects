const form = document.getElementById('form');
const password1El = document.getElementById('password1');
const password2El = document.getElementById('password2');
const submitBtn = document.querySelector('button');
const messageContainer = document.querySelector('.message-container');
const message = document.getElementById('message');

let isValid = false
// by default, we don't have a valided form when first enter the website
let passwordsMatch = false;

function validateForm() {
    // Using Contraint API
    isValid = form.checkValidity();
    // Style main message for an error
    if (!isValid) {
        message.textContent = 'Please fill out all fileds.';
        message.style.color = '#ff9966';
        messageContainer.style.backgroundColor = 'white';
        messageContainer.style.borderRadius = '5px';
        return;
    }
    // Check to see if passwords match
    if (password1El.value === password2El.value) {
        passwordsMatch = true;
        password1El.style.borderColor = '#99cc33';
        password2El.style.borderColor = '#99cc33';
    } else {
        passwordsMatch = false;
        message.textContent = 'Make sure passwords match.'
        password1El.style.borderColor = '#ff9966';
        password2El.style.borderColor = '#ff9966';
        message.style.color = '#ff9966';
        messageContainer.style.backgroundColor = 'white';
        messageContainer.style.borderRadius = '5px';
        return;
    }
    // If form is valid and passwords match

    if (isValid && passwordsMatch) {
        message.textContent = 'Successfully Resgitered!';
        message.style.color = '#99cc33';
        messageContainer.style.backgroundColor = 'white';
        messageContainer.style.borderRadius = '5px';
    }
}

function storeFormData() {
    const user = {
        name: form.name.value,
        phone: form.phone.value,
        email: form.email.value,
        website: form.website.value,
        password: form.password.value
    };
    // do something with user data
    console.log(user);
}

function processFormData(e) {
    e.preventDefault();
    // Validate Form
    validateForm();
    // submit data if valid
    if (isValid && passwordsMatch) {
        storeFormData();
    }

}

// Event Lister 
form.addEventListener('submit', processFormData);
