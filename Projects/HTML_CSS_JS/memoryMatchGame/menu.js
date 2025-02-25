document.addEventListener("DOMContentLoaded", function () {
  let username = localStorage.getItem("username");

  if (username) {
    document.querySelector(".user").innerText = username;
  } else {
    document.querySelector(".user").innerText = "Guest";
  }
});