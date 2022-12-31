function signup() {
  console.log("hello!");
  var userName = document.getElementById("userName").value;
  var password = document.getElementById("pw").value;
  // fetch Api
  fetch("https://dummyjson.com/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: `${userName}`,
      password: `${password}`,
    }),
  })
    .then((res) => res.json())
    .then((json) => {
      if (json.message == "Invalid credentials") {
        alert("invalid input");
      } else {
        // Store data inside local storage
        localStorage.setItem("firstName", json.firstName);
        localStorage.setItem("lastName", json.lastName);
        localStorage.setItem("image", json.image);
        localStorage.setItem("token", json.token);
        localStorage.setItem("email", json.email);
        localStorage.setItem("status", true);

        window.location.href = "index.html";
      }
    });
}
