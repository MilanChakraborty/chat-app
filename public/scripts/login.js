const readUsername = () => {
  const usernameInputBox = document.querySelector('#username-box');
  const username = usernameInputBox.value;
  usernameInputBox.value = '';

  return username;
};

const readPassword = () => {
  const passwordInputBox = document.querySelector('#password-box');
  const password = passwordInputBox.value;
  passwordInputBox.value = '';

  return password;
};

const alertAuthenticationFailed = ({ invalidPassword }) => {
  if (invalidPassword) {
    alert('Password Entered Was Incorrect');
    return;
  }
  alert('Username Doesnot Exist, Please Signup');
};

const sendLoginRequest = (event) => {
  event.preventDefault();
  const username = readUsername();
  const password = readPassword();

  fetch('/login', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ username, password }),
  })
    .then((res) => {
      if (res.redirected) {
        window.location.replace(res.url);
        return;
      }
      return res.json();
    })
    .then(alertAuthenticationFailed)
    .catch((err) => err);
};

const setupLoginForm = () => {
  const formElement = document.querySelector('#login-form');
  formElement.onsubmit = sendLoginRequest;
};

window.onload = setupLoginForm;
