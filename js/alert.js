// alert when action is done
function showAlert(mess, type) {
  let alertPlaceholder = document.getElementById("liveAlertPlaceholder");
  alertPlaceholder.innerHTML = `
    <div class="alert alert-${type} alert-dismissible fade show" role="alert">
       ${mess}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
  `;
  setTimeout(function () {
    alertPlaceholder.innerHTML = "";
  }, 3000);
}

export { showAlert };
