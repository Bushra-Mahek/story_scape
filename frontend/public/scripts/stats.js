// ===============================
// CONFIG
// ===============================

const API_URL = "http://localhost:4000";
const token = localStorage.getItem("token");

if (!token) {
  console.error("No token found. User not authenticated.");
}


// ===============================
// FETCH STATS
// ===============================

axios.get(`${API_URL}/stats`, {
  headers: {
    Authorization: `Bearer ${token}`
  }
})
.then(res => {
  const { summary, users, monthly } = res.data;

  renderCards(summary);
  renderBars(users);
  renderMonthly(monthly);
})
.catch(err => {
  console.error("Stats fetch error:", err.response?.data || err.message);
});


// ===============================
// CARDS SECTION
// ===============================

function renderCards(summary) {
  const cards = document.getElementById("stats-cards");

  cards.innerHTML = `
    <div class="stats-card">
      <h3>Total Users</h3>
      <p>${summary.totalUsers}</p>
    </div>

    <div class="stats-card">
      <h3>Total Posts</h3>
      <p>${summary.totalPosts}</p>
    </div>

    <div class="stats-card">
      <h3>Most Active User</h3>
      <p>
        ${summary.mostActive?.username || "N/A"}
        (${summary.mostActive?.post_count || 0} posts)
      </p>
    </div>
  `;
}


// ===============================
// BARS SECTION
// ===============================

function renderBars(users) {

  const container = document.getElementById("bars");
  container.innerHTML = "";

  if (!users || users.length === 0) {
    container.innerHTML = "<p>No user data available.</p>";
    return;
  }

  const max = Math.max(...users.map(u => Number(u.post_count)));

  users.forEach(user => {
    const count = Number(user.post_count);
    const percent = max === 0 ? 0 : (count / max) * 100;

    container.innerHTML += `
      <div class="bar-row">
        <div class="bar-label">${user.username}</div>
        <div class="bar" style="width:${percent}%">
          ${count}
        </div>
      </div>
    `;
  });
}


// ===============================
// MONTHLY CHART
// ===============================

function renderMonthly(monthly) {

  const ctx = document.getElementById("monthlyChart");

  if (!monthly || monthly.length === 0) {
    return;
  }

  new Chart(ctx, {
    type: "line",
    data: {
      labels: monthly.map(m => m.month),
      datasets: [{
        label: "Posts per Month",
        data: monthly.map(m => Number(m.post_count)),
        borderColor: "#3F3244",
        backgroundColor: "rgba(63,50,68,0.2)",
        tension: 0.3,
        fill: true
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          labels: { color: "#3F3244" }
        }
      },
      scales: {
        x: { ticks: { color: "#3F3244" } },
        y: { ticks: { color: "#3F3244" } }
      }
    }
  });
}