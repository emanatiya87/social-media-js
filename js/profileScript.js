let profilePostsContainer = document.getElementById("profilePostsContainer");
let currentUserData = JSON.parse(localStorage.getItem("currentUserData"));
let userProfileInfo = document.getElementById("userProfileInfo");
let token = JSON.parse(localStorage.getItem("token"));
let deletePostBtn = document.getElementById("deletePostBtn");
let editPostForm = document.getElementById("editPostForm");
let inputPostTitle = document.getElementById("PostTitleEdited");
let inputPostBody = document.getElementById("PostBodyEdited");
let selectedPostId = null;
import { showAlert } from "./alert.js";
window.addEventListener("DOMContentLoaded", function () {
  if (document.getElementById("profilePostsContainer")) {
    getProfilePosts();
    appearProfileData();
  }
});

// fetch posts from API
function getProfilePosts() {
  axios
    .get(`https://tarmeezacademy.com/api/v1/users/${currentUserData.id}/posts`)
    .then((data) => {
      console.log(data.data.data);
      displayPostsProfile(data.data.data);
    })
    .catch((error) => console.error(error));
}

//   function to display data of posts in cards
function displayPostsProfile(data) {
  profilePostsContainer.innerHTML = "";
  data.forEach((post) => {
    let innerPostText = `
        <div class="row mb-3 justify-content-center">
          <div class="card col-lg-6 col-md-8 shadow">
            <div class="card-header d-flex align-items-center justify-content-between">
             <div class=" d-flex">
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
                <h5 class="m-0 text-capitalize">${post.author.name}</h5>
                <p class="text-secondary m-0">@${post.author.username}</p>
              </div>
             </div>
                 <!-- Three Dots Dropdown -->
              <div class="dropdown text-end">
                <button
                  class="btn dropdownDotes"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  data-id="${post.id}"
                  data-title="${post.title}"
                  data-body="${post.body}"
                >
                  <i class="fa-solid fa-ellipsis-vertical"></i>
                </button>
                <ul class="dropdown-menu">
                  <li class="dropdown-item " data-bs-toggle="modal" data-bs-target="#editPostModal">
                  Edit</li>
                <li
                  class="dropdown-item  text-danger"
                  data-bs-toggle="modal"
                  data-bs-target="#deletePostModal">
                  Delete
                </li> 
                </ul>
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
            <div class="card-footer text-body-secondary " 
              onclick="appearComments(${post.id})">
              <i class="fa-solid fa-comment"></i> (<span>${
                post.comments_count
              }</span>) Comments
            </div>
          </div>
        </div>
    `;
    profilePostsContainer.innerHTML += innerPostText;
    document.querySelectorAll(".dropdownDotes").forEach((ele) => {
      ele.onclick = function () {
        selectedPostId = ele.dataset.id;
        inputPostBody.value = ele.dataset.body;
        inputPostTitle.value = ele.dataset.title;
      };
    });
  });
}
// profile data
function appearProfileData() {
  userProfileInfo.innerHTML = `
<img
              src="${
                typeof currentUserData.profile_image == "string"
                  ? currentUserData.profile_image
                  : "images/face.jpg"
              }"
              alt="profile pic"
              class="rounded-circle me-2 profilePic"
            />
            <div>
              <h2 class="m-0 text-uppercase">${currentUserData.name}</h2>
              <p class="text-secondary m-0">@${currentUserData.username}</p>
            </div>
`;
}

// delete Post
function deletePost(id) {
  axios
    .delete(`https://tarmeezacademy.com/api/v1/posts/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      showAlert("Post deleted successfully", "success");
      getProfilePosts();
    })
    .catch((error) => {
      console.log(error);
      showAlert("error deleting the post", "danger");
    });
}
// confirm deleting
deletePostBtn.onclick = function () {
  deletePost(selectedPostId);
  selectedPostId = null;
};
// edit post
function editPost(id) {
  axios
    .put(
      `https://tarmeezacademy.com/api/v1/posts/${id}`,
      {
        body: inputPostBody.value,
        title: inputPostTitle.value,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((res) => {
      showAlert("Post edited successfully", "success");
      getProfilePosts();
    })
    .catch((error) => {
      console.log(error);
      showAlert("error deleting the post", "danger");
    });
}
editPostForm.onsubmit = function (e) {
  e.preventDefault();
  editPost(selectedPostId);
};
export { getProfilePosts, appearProfileData };
