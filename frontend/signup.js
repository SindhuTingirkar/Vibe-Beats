document.getElementById("signupForm").addEventListener("submit", async (e) => {
  e.preventDefault(); // stop HTML form refresh

  const username = document.getElementById("signupUsername").value;
  const email = document.getElementById("signupEmail").value;
  const password = document.getElementById("signupPassword").value;

  try {
    const res = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password })
    });

    const data = await res.json();
    alert(data.msg);

    if (data.msg === "User registered") {
      window.location.href = "login.html"; // redirect to login
    }
  } catch (err) {
    console.error("Signup error:", err);
    alert("Something went wrong.");
  }
});
