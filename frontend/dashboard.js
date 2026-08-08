// ==========================
// PAGE SWITCH
// ==========================


function showPage(page) {

  document.querySelectorAll(".page").forEach(p => {
    p.classList.remove("active");
  });

  document.getElementById(page).classList.add("active");

  // ✅ LOAD PLAYLISTS ONLY WHEN ADMIN OPENS PLAYLIST PAGE
  if (page === "adminPlaylists") {
    loadAdminPlaylists();
  }
}


// ==========================
// LOGOUT
// ==========================
function logout() {
  window.location.href = "adminLogin.html";
}

// ==========================
// USERS DATA
// ==========================
const users = {
  login: ["amit98", "rahul_dev", "sindhu_music"],
  signup: ["newuser1", "newuser2"],
  guest: ["guest01", "guest02"],
  blocked: ["spam123"]
};

// ==========================
// SHOW USERS
// ==========================
function showUsers(type) {
  const box = document.getElementById("userList");
  if (!box) return;

  box.innerHTML = "";
  users[type].forEach(u => {
    box.innerHTML += `<div class="user">${u}</div>`;
  });
}

// LOAD USERS IF SECTION EXISTS
if (document.getElementById("userList")) {
  showUsers("login");
}



// ==========================
// ✅ MOOD ANALYSIS (WORKING)
// ==========================
async function analyzeMood() {

  const input = document.getElementById("moodInput");
  const result = document.getElementById("result");
  const status = document.getElementById("status");
  const moodText = document.getElementById("detectedMood");

  if (!input || !result || !status) {
    alert("Dashboard HTML elements missing");
    return;
  }

  const text = input.value.trim();

  if (!text) {
    result.innerHTML = "<p style='color:red'>⚠️ Type your feeling first!</p>";
    return;
  }

  status.innerText = "Detecting mood...";
  result.innerHTML = "";
  if (moodText) moodText.innerText = "";

  try {

    const response = await fetch("http://localhost:5000/api/emotion", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ text })
    });

    const data = await response.json();

    status.innerText = "";

    // Show detected mood
    if (data.mood) {
      moodText.innerHTML = `Detected mood: <b>${data.mood}</b>`;
    }

    // FIXED PART: Playlist is a normal object
    if (data.playlist) {

      if (data.playlist.playlistUrl) {

        result.innerHTML = `
          <iframe 
            src="${data.playlist.playlistUrl}"
            width="100%" 
            height="380"
            frameborder="0"
            allow="encrypted-media">
          </iframe>
        `;

      } else {
        result.innerHTML = "<p>No songs found for your mood.</p>";
      }

    } else {

      result.innerHTML = "<p>No songs found for your mood.</p>";

    }

  } catch (err) {
    console.error(err);
    status.innerText = "";
    result.innerHTML = "<p style='color:red'>❌ Backend not responding. Start server.</p>";
  }
}



// ==========================
// CHART
// ==========================
const ctx = document.getElementById("chart");

if (ctx) {
  new Chart(ctx, {
    type: "line",
    data: {
      labels: ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],
      datasets: [{
        label: "Activity",
        data: [4,7,5,9,12,10,16],
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59,130,246,0.4)",
        fill: true,
        tension: 0.4,
        pointRadius: 6,
        pointBackgroundColor: "white"
      }]
    },
    options: {
      plugins:{legend:{labels:{color:"white"}}},
      scales:{
        x:{ticks:{color:"white"}},
        y:{ticks:{color:"white"}}
      }
    }
  });
}

async function loadAdminPlaylists() {

  const container = document.getElementById("adminPlaylistList");

  if (!container) {
    console.error("adminPlaylistList not found");
    return;
  }

  container.innerHTML = "<p>Loading playlists...</p>";

  try {

    const res = await fetch("http://localhost:5000/api/playlists");
    const playlists = await res.json();

    container.innerHTML = "";

    if (!playlists.length) {
      container.innerHTML = "<p>No playlists found in database</p>";
      return;
    }

    playlists.forEach(p => {

      const card = document.createElement("div");
      card.className = "song";

      card.innerHTML = `
        <strong>${p.mood || "Playlist"}</strong>
        <iframe 
          src="${p.playlistUrl}"
          width="100%"
          height="170"
          frameborder="0"
          allow="encrypted-media">
        </iframe>
      `;

      container.appendChild(card);

    });

  } catch (e) {
    console.log("Playlist fetch error:", e);
    container.innerHTML = "<p>Error loading playlists</p>";
  }

}


