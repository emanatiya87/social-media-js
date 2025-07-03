import { setupUI } from "./uiSetup.js";
import { showAlert } from "./alert.js";
let baseUrl = "https://tarmeezacademy.com/api/v1";
let token = JSON.parse(localStorage.getItem("token"));
let postId = JSON.parse(localStorage.getItem("postId"));
let commentsContainer = document.getElementById("commentsContainer");
let postContainer = document.getElementById("postContainer");
let moreComments = document.getElementById("moreComments");
let addComment = document.getElementById("addComment");
let commentInput = document.getElementById("commentInput");
let current_page = 1;
let last_page = 1;
setupUI();
getComments(current_page, true);
// fetch comments from API
function getComments(PageNum, reload) {
  axios
    .get(`${baseUrl}/posts/${postId}/comments?page=${PageNum}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((data) => {
      current_page = data.data.current_page;
      last_page = data.data.last_page;
      displayComments(data.data.data, reload);
    })
    .catch((error) => console.error(error));
}
// fetch post clicked from API
axios
  .get(`${baseUrl}/posts/${postId}`)
  .then((data) => {
    displayPost(data.data.data);
  })
  .catch((error) => console.log(error));
// function to diaplay comments and its users
function displayComments(comments, reload) {
  if (current_page < last_page) {
    moreComments.style.display = "block";
  } else {
    moreComments.style.display = "none";
  }
  if (reload) {
    commentsContainer.innerHTML = "";
  }
  comments.forEach((comment) => {
    axios
      .get(`${baseUrl}/users/${comment.author_id}`)
      .then((data) => {
        // html comments

        let innerCommentsText = "";
        innerCommentsText += `
        <div class="comment">
                <div class="comment-header d-flex align-items-center">
                  <img
                    src="${
                      typeof data.data.data.profile_image == "string"
                        ? data.data.data.profile_image
                        : "images/face.jpg"
                    }"
                    alt="profile pic"
                    class="img-thumbnail rounded-circle border me-2 smallProfilePic"
                  />
                  <div>
                    <h5 class="m-0">${data.data.data.name}</h5>
                  </div>
                </div>
                <p class="text-secondary ps-3">
                 ${comment.body}
                </p>
              </div>

`;
        commentsContainer.innerHTML += innerCommentsText;
      })
      .catch((error) => console.error(error));
  });
}
// function to display selected post
function displayPost(post) {
  postContainer.innerHTML = `
         <div class="card col-lg-6 col-md-8 shadow rounded-bottom-0">
            <div class="card-header d-flex align-items-center justify-content-between">
            <div class=" d-flex align-items-center">
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
              <p class="text-secondary mb-1">${post.created_at}</p>

            </div>
            <div class="card-body">
             <h5 class="card-title">${post.title}</h5>
              <p class="card-text">${post.body}</p>
              <img src="${
                post.image
              }" alt="" class="w-100" style="max-height: 300px" />
            </div>
            <div class="card-footer text-body-secondary">
              <i class="fa-solid fa-comment"></i> (<span
                >${post.comments_count}</span
              >) Comments
            </div>
          </div>
    `;
}
// add comment
addComment.onsubmit = function (e) {
  e.preventDefault();
  axios
    .post(
      `${baseUrl}/posts/${postId}/comments`,
      {
        body: `${commentInput.value}`,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((res) => {
      console.log("added");
      commentInput.value = "";
      getComments(current_page, true);
      showAlert("Comment added successfully", "success");
    })
    .catch((error) => {
      console.log(error);
      showAlert(
        "Comment not uploaded. Please check if you are logged in.",
        "danger"
      );
    });
};

// Pagination
moreComments.onclick = function () {
  current_page++;
  getComments(current_page, false);
};
