let postsContainer = document.getElementById("postsContainer");

let currentPage = 1;
let last_page = 1;
import { setupUI } from "./uiSetup.js";
import { showAlert } from "./alert.js";
// to setup UI at start relative to exist user or not
setupUI();
getPosts(currentPage, true);
// fetch posts from API
function getPosts(pageNum, reload) {
  axios
    .get(`https://tarmeezacademy.com/api/v1/posts?limit=4&page=${pageNum}`)
    .then((data) => {
      last_page = data.data.meta.last_page;
      currentPage = data.data.meta.current_page;
      displayPosts(data.data.data, reload);
    })
    .catch((error) => console.error(error));
}
//   function to display data of posts in cards
function displayPosts(data, reload) {
  if (reload) {
    postsContainer.innerHTML = "";
  }

  data.forEach((post) => {
    let innerPostText = `
        <div class="row mb-3 justify-content-center">
          <div class="card col-lg-6 col-md-8 shadow">
            <div class="card-header d-flex align-items-center" 
            data-id=${post.author.id}>
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
                <p class="text-secondary m-0">@${post.author.username}</p>
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
    postsContainer.innerHTML += innerPostText;
    document.querySelectorAll(".card-header").forEach((ele) => {
      ele.onclick = function () {
        localStorage.setItem("visitedUserId", ele.dataset.id);
        window.location.href = "generalProfile.html";
      };
    });
  });
}

// Pagination
window.onscroll = function () {
  let endPage =
    window.innerHeight + window.pageYOffset >= document.body.offsetHeight;
  if (endPage && currentPage < last_page) {
    currentPage++;
    getPosts(currentPage, false);
  }
};
// appear comments
window.appearComments = function (id) {
  localStorage.setItem("postId", id);
  window.location.href = "postDetails.html";
};
export { getPosts };
