let logout = document.getElementById("logout");
let loginForm = document.getElementById("loginForm");
let loginUserName = document.getElementById("loginUserName");
let loginPassword = document.getElementById("loginPassword");

let registerForm = document.getElementById("registerForm");
let registerUserName = document.getElementById("registerUserName");
let registerPassword = document.getElementById("registerPassword");
let registerImg = document.getElementById("registerImg");
let registerEmail = document.getElementById("registerEmail");
let registerName = document.getElementById("registerName");
import { setupUI } from "./uiSetup.js";
import { showAlert } from "./alert.js";
// login and appear nav data and "+"" for new posts(handel ui with user data)
loginForm.addEventListener("submit", function (e) {
  e.preventDefault();
  axios
    .post(`https://tarmeezacademy.com/api/v1/login`, {
      username: loginUserName.value,
      password: loginPassword.value,
    })
    .then((res) => {
      localStorage.setItem("currentUserData", JSON.stringify(res.data.user));
      localStorage.setItem("token", JSON.stringify(res.data.token));
      showAlert("you logged in successfully", "success");
      setupUI();
    })
    .catch((error) => {
      showAlert(error.response.data.message, "danger");
    });
});
// handel logout :remove data , change ui
logout.addEventListener("click", function () {
  localStorage.removeItem("currentUserData");
  localStorage.removeItem("token");
  showAlert("you logged out successfully", "success");
  setupUI();
});
// Register form
registerForm.addEventListener("submit", function (e) {
  e.preventDefault();
  let formData = new FormData();
  formData.append("username", registerUserName.value);
  formData.append("password", registerPassword.value);
  formData.append("image", registerImg.files[0]);
  formData.append("email", registerEmail.value);
  formData.append("name", registerName.value);
  axios
    .post(`https://tarmeezacademy.com/api/v1/register`, formData)
    .then((res) => {
      localStorage.setItem("currentUserData", JSON.stringify(res.data.user));
      localStorage.setItem("token", JSON.stringify(res.data.token));
      showAlert("New register successfully", "success");
      setupUI();
    })
    .catch((error) => {
      showAlert(error.response.data.message, "danger");
    });
});
