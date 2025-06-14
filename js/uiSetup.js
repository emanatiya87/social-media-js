let logoutBox = document.getElementById("logoutBox");
let logoutBoxBody = document.getElementById("logoutBoxBody");
let loginBox = document.getElementById("loginBox");
let addPostBtn = document.getElementById("addPostBtn");

// function to appear user data after login and remove it when log out
function setupUI() {
  if (localStorage.getItem("currentUserData")) {
    let data = JSON.parse(localStorage.getItem("currentUserData"));
    loginBox.classList.remove("d-flex");
    loginBox.classList.add("d-none");
    logoutBox.style.display = "flex";
    logoutBoxBody.innerHTML = `
                <img
                  src="${data.profile_image}"
                  class=" rounded-circle border smallProfilePic"
                  alt="profile pic"
                 
                />
                <h5 class="px-3">${data.name}</h5>       
`;
    addPostBtn.style.display = "block";
  } else {
    loginBox.classList.add("d-flex");
    loginBox.classList.remove("d-none");
    logoutBox.style.display = "none";
    addPostBtn.style.display = "none";
  }
}
export { setupUI };
