let addPostForm = document.getElementById("addPostForm");
let inputPostTitle = document.getElementById("inputPostTitle");
let inputPostBody = document.getElementById("inputPostBody");
let inputPostImg = document.getElementById("inputPostImg");
import { showAlert } from "./alert.js";
import { getPosts } from "./script.js";
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
      getPosts(1, true);
    })
    .catch((error) => {
      console.log(error);
      showAlert(error.response.data.message, "danger");
    });
};
