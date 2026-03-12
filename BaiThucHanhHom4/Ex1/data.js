let students = [];
let sortAsc = true;

const nameInput = document.getElementById("nameInput");
const scoreInput = document.getElementById("scoreInput");
const addBtn = document.getElementById("addBtn");
const searchInput = document.getElementById("searchInput");
const filterSelect = document.getElementById("filterSelect");
const tbody = document.getElementById("studentTableBody");
const statsDisplay = document.getElementById("statsDisplay");
const sortScoreBtn = document.getElementById("sortScore");

// Hàm phân loại học lực
function getRank(score) {
  if (score >= 8.5) return "Giỏi";
  if (score >= 7.0) return "Khá";
  if (score >= 5.0) return "Trung bình";
  return "Yếu";
}

// Lọc, tìm kiếm và sắp xếp kết hợp
function applyFilters() {
  const keyword = searchInput.value.toLowerCase();
  const filterRank = filterSelect.value;

  let filtered = students.filter((s) => {
    const matchName = s.name.toLowerCase().includes(keyword);
    const matchRank = filterRank === "All" || s.rank === filterRank;
    return matchName && matchRank;
  });

  // Sắp xếp
  filtered.sort((a, b) => (sortAsc ? a.score - b.score : b.score - a.score));
  renderTable(filtered);
}

// Render bảng dữ liệu
function renderTable(dataToRender) {
  tbody.innerHTML = "";
  let totalScore = 0;

  if (dataToRender.length === 0) {
    tbody.innerHTML =
      '<tr><td colspan="5" style="text-align:center">Không có kết quả</td></tr>';
  } else {
    dataToRender.forEach((s, index) => {
      totalScore += s.score;
      const row = document.createElement("tr");
      // Tô nền vàng nếu điểm < 5.0
      if (s.score < 5.0) row.classList.add("bg-warning");

      row.innerHTML = `
                        <td>${index + 1}</td>
                        <td>${s.name}</td>
                        <td>${s.score}</td>
                        <td>${s.rank}</td>
                        <td><button data-id="${s.id}" class="delete-btn">Xóa</button></td>
                    `;
      tbody.appendChild(row);
    });
  }

  // Cập nhật thống kê
  const avg = dataToRender.length
    ? (totalScore / dataToRender.length).toFixed(2)
    : 0;
  statsDisplay.textContent = `Tổng số: ${dataToRender.length} | Điểm TB: ${avg}`;
}

// Thêm sinh viên
function addStudent() {
  const name = nameInput.value.trim();
  const score = parseFloat(scoreInput.value);

  if (!name || isNaN(score) || score < 0 || score > 10) {
    alert("Vui lòng nhập tên hợp lệ và điểm từ 0-10!");
    return;
  }

  students.push({
    id: Date.now(),
    name: name,
    score: score,
    rank: getRank(score),
  });

  nameInput.value = "";
  scoreInput.value = "";
  nameInput.focus();
  applyFilters();
}

// --- GẮN SỰ KIỆN ---

addBtn.addEventListener("click", addStudent);

// Nhấn Enter ở ô Điểm để thêm
scoreInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter") addStudent();
});

// Event Delegation để Xóa
tbody.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-btn")) {
    const idToDelete = parseInt(e.target.getAttribute("data-id"));
    students = students.filter((s) => s.id !== idToDelete);
    applyFilters();
  }
});

// Lắng nghe thay đổi Tìm kiếm & Lọc
searchInput.addEventListener("input", applyFilters);
filterSelect.addEventListener("change", applyFilters);

// Click tiêu đề cột Điểm để sắp xếp
sortScoreBtn.addEventListener("click", () => {
  sortAsc = !sortAsc;
  sortScoreBtn.textContent = sortAsc ? "Điểm ▲" : "Điểm ▼";
  applyFilters();
});
