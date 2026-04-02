// Khai báo các phần tử DOM
const staffTableBody = document.querySelector("#staffTable tbody");
const modal = document.getElementById("modal");
const addForm = document.getElementById("addForm");
const btnOpen = document.getElementById("openModal");
const btnClose = document.getElementById("closeModal");
const btnCloseX = document.getElementById("closeX");

// 1. Hiển thị danh sách nhân sự [cite: 35, 38]
function renderTable(data) {
  staffTableBody.innerHTML = "";
  data.forEach((item, index) => {
    const row = `
            <tr>
                <td>${item.name}</td>
                <td>${item.email}</td>
                <td>${item.Speaker}</td>
                <td>${item.Date}</td>
                <td>${item.Location}</td>
                
            </tr>
        `;
    staffTableBody.innerHTML += row;
  });
}

// 2. Xử lý Thêm mới và Validation [cite: 14, 44]
addForm.addEventListener("submit", function (e) {
  e.preventDefault(); // Ngăn trang web load lại [cite: 47]

  // Lấy giá trị từ form [cite: 45]
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const Speaker = document.getElementById("phone").value.trim();
  const Date = document.getElementById("position").value;
  const Location = document.getElementById("Location").value.trim();

  // --- BẮT ĐẦU VALIDATE [cite: 15] ---
  if (!name || !email || !Location || !Date || !Speaker) {
    alert("Vui lòng không để trống các trường!");
    return;
  }

  // Họ tên tối đa 30 ký tự [cite: 18]
  if (name.length > 60) {
    alert("Họ tên không được vượt quá 60 ký tự!");
    return;
  }

  // Kiểm tra định dạng Email (Regex chuẩn) [cite: 20]
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert("Email không đúng định dạng chuẩn!");
    return;
  }

  // --- KẾT THÚC VALIDATE ---

  // Nếu hợp lệ: Thêm vào mảng và render lại [cite: 51, 52]
  const newStaff = {
    name,
    email,
    Speaker,
    Date,
    Location,
  };

  initialData.push(newStaff);
  renderTable(initialData);

  // Đóng form và xóa trắng dữ liệu
  modal.style.display = "none";
  addForm.reset();
});

// 3. Điều khiển đóng/mở Pop-up
btnOpen.onclick = () => (modal.style.display = "flex");
btnClose.onclick = () => (modal.style.display = "none");
btnCloseX.onclick = () => (modal.style.display = "none");

// Đóng modal khi click ra ngoài vùng chứa
window.onclick = (event) => {
  if (event.target == modal) modal.style.display = "none";
};

// Khởi chạy hiển thị ban đầu
renderTable(initialData);
