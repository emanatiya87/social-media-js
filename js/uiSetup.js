let logoutBox = document.getElementById("logoutBox");
let logoutBoxBody = document.getElementById("logoutBoxBody");
let loginBox = document.getElementById("loginBox");
let addPostBtn = document.getElementById("addPostBtn");
let addPostCardUserData = document.getElementById("addPostCardUserData");
// function to appear user data after login and remove it when log out
function setupUI() {
  if (localStorage.getItem("currentUserData")) {
    let data = JSON.parse(localStorage.getItem("currentUserData"));
    loginBox.classList.remove("d-flex");
    loginBox.classList.add("d-none");
    logoutBox.style.display = "flex";
    logoutBoxBody.innerHTML = `
                <img
                  src="${
                    typeof data.profile_image == "string"
                      ? data.profile_image
                      : "images/face.jpg"
                  }"
                  class=" rounded-circle border smallProfilePic"
                  alt="profile pic"
                 
                />
                <h5 class="px-3">${data.name}</h5>       
`;
    addPostCardUserData.innerHTML = `
              <img
                src="${
                  typeof data.profile_image == "string"
                    ? data.profile_image
                    : "images/face.jpg"
                }"
                alt="prodile Pic"
                class="smallProfilePic rounded-circle border"
              />
              <div
                data-bs-toggle="modal"
                data-bs-target="#addPostModal"
                class="border col-10 rounded-5 px-2 text-secondary bg-secondary-subtle d-flex align-items-center"
              >
                <p class="m-0">What's on your Mind ,${data.name} ?</p>
              </div>
`;
    addPostBtn.style.display = "block";
  } else {
    loginBox.classList.add("d-flex");
    loginBox.classList.remove("d-none");
    logoutBox.style.display = "none";
    addPostBtn.style.display = "none";
  }
}
setupUI();
export { setupUI };
