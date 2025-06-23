let profilePostsContainer = document.getElementById("profilePostsContainer");
let currentUserData = JSON.parse(localStorage.getItem("currentUserData"));
let userProfileInfo = document.getElementById("userProfileInfo");
getPosts();
// fetch posts from API
function getPosts() {
  axios
    .get(`https://tarmeezacademy.com/api/v1/users/${currentUserData.id}/posts`)
    .then((data) => {
      console.log(data.data.data);
      displayPosts(data.data.data);
    })
    .catch((error) => console.error(error));
}

//   function to display data of posts in cards
function displayPosts(data) {
  profilePostsContainer.innerHTML = "";
  data.forEach((post) => {
    let innerPostText = `
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
                <h5 class="m-0 text-capitalize">${post.author.name}</h5>
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
    profilePostsContainer.innerHTML += innerPostText;
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
appearProfileData();
export { getPosts, appearProfileData };
