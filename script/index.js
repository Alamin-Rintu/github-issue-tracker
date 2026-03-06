document.getElementById("sign-in-btn").addEventListener("click", function () {
  const userName = document.getElementById("user-name").value;
  const password = document.getElementById("password").value;
  if (userName == "admin" && password == "admin123") {
    window.location.assign("home.html");
  }
   else {
    return alert("Invalid userName or Password");
  }
});
