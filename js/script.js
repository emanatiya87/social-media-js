let postsContainer = document.getElementById("postsContainer");
let addPostForm = document.getElementById("addPostForm");
let inputPostTitle = document.getElementById("inputPostTitle");
let inputPostBody = document.getElementById("inputPostBody");
let inputPostImg = document.getElementById("inputPostImg");
import { setupUI } from "./uiSetup.js";
import { showAlert } from "./alert.js";
// to setup UI at start relative to exist user or not
setupUI();
getPosts();
// fetch posts from API
function getPosts() {
  axios
    .get(`https://tarmeezacademy.com/api/v1/posts?limit=20`)
    .then((data) => {
      displayPosts(data.data.data);
    })
    .catch((error) => console.error(error));
}

//   function to display data of posts in cards
function displayPosts(data) {
  let innerPostText = "";
  data.forEach((post) => {
    innerPostText += `
        <div class="row mb-3 justify-content-center">
          <div class="card col-lg-6 col-md-8 shadow">
            <div class="card-header d-flex align-items-center">
              <img
                src="${
                  typeof post.author.profile_image == "string"
                    ? post.author.profile_image
                    : "images/face.jpg"
                }"
                alt="profile pic"
                class="img-thumbnail rounded-circle border me-2 smallProfilePic"
              />
              <div>
                <h5 class="m-0">${post.author.name}</h5>
                <p class="text-secondary m-0">@${post.author.username}</h5>
              </div>
            </div>
            <div class="card-body">
              <img src="${
                post.image
              }" alt="" class="w-100" style="max-height:300px" />
              <p class="text-secondary mb-1">${post.created_at}</p>
              <h5 class="card-title">${post.title}</h5>
              <p class="card-text">
                ${post.body}
              </p>
            </div>
            <div class="card-footer text-body-secondary">
              <i class="fa-solid fa-comment"></i> (<span>${
                post.comments_count
              }</span>) Comments
            </div>
          </div>
        </div>
    `;
  });
  postsContainer.innerHTML = innerPostText;
}
// user add post
addPostForm.onsubmit = function (e) {
  e.preventDefault();
  let token = JSON.parse(localStorage.getItem("token"));
  let formData = new FormData();
  formData.append("title", inputPostTitle.value);
  formData.append("body", inputPostBody.value);
  formData.append("image", inputPostImg.files[0]);
  axios
    .post(`https://tarmeezacademy.com/api/v1/posts`, formData, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      showAlert("post added successfully", "success");
      getPosts();
    })
    .catch((error) => {
      console.log(error);
      showAlert(error.response.data.message, "danger");
    });
};
