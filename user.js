app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/views/login.html');
});

app.get('/register', (req, res) => {
  res.sendFile(__dirname + '/views/register.html');
});
const profileIcon = document.getElementById("profile-icon");
const registerModal = document.getElementById("register-modal");

profileIcon.addEventListener("click", () => {
  registerModal.classList.toggle("hidden");
});
