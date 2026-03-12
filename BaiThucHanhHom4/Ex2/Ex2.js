// ==========================================
// HÀM TIỆN ÍCH HIỂN THỊ LỖI DÙNG CHUNG
// ==========================================
function validateInput(inputElement, errorId, isValid) {
  const errorSpan = document.getElementById(errorId);
  if (!isValid) {
    inputElement.classList.add("input-error");
    inputElement.classList.remove("input-success");
    errorSpan.style.display = "block";
    return false;
  } else {
    inputElement.classList.remove("input-error");
    inputElement.classList.add("input-success");
    errorSpan.style.display = "none";
    return true;
  }
}

function clearErrorOnInput(inputElement, errorId) {
  inputElement.addEventListener("input", () => {
    inputElement.classList.remove("input-error");
    document.getElementById(errorId).style.display = "none";
  });
}

// ==========================================
// BÀI 2.1: LOGIC FORM ĐĂNG KÝ
// ==========================================
const regForm = document.getElementById("registerForm");
const elName = document.getElementById("fullname");
const elEmail = document.getElementById("email");
const elPhone = document.getElementById("phone");
const elPass = document.getElementById("password");
const elConfirm = document.getElementById("confirmPass");
const elTerms = document.getElementById("terms");
const genderRadios = document.getElementsByName("gender");

const regexName = /^[a-zA-ZÀ-ỹ\s]{3,}$/;
const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const regexPhone = /^0[0-9]{9}$/;
const regexPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

const checkName = () =>
  validateInput(elName, "err-fullname", regexName.test(elName.value.trim()));
const checkEmail = () =>
  validateInput(elEmail, "err-email", regexEmail.test(elEmail.value.trim()));
const checkPhone = () =>
  validateInput(elPhone, "err-phone", regexPhone.test(elPhone.value.trim()));
const checkPass = () =>
  validateInput(elPass, "err-password", regexPass.test(elPass.value.trim()));
const checkConfirm = () =>
  validateInput(
    elConfirm,
    "err-confirmPass",
    elConfirm.value.trim() !== "" && elConfirm.value === elPass.value,
  );

const checkGender = () => {
  const isChecked = Array.from(genderRadios).some((r) => r.checked);
  document.getElementById("err-gender").style.display = isChecked
    ? "none"
    : "block";
  return isChecked;
};

const checkTerms = () => {
  const isValid = elTerms.checked;
  document.getElementById("err-terms").style.display = isValid
    ? "none"
    : "block";
  return isValid;
};

elName.addEventListener("blur", checkName);
elEmail.addEventListener("blur", checkEmail);
elPhone.addEventListener("blur", checkPhone);
elPass.addEventListener("blur", checkPass);
elConfirm.addEventListener("blur", checkConfirm);
Array.from(genderRadios).forEach((r) =>
  r.addEventListener("change", checkGender),
);
elTerms.addEventListener("change", checkTerms);

clearErrorOnInput(elName, "err-fullname");
clearErrorOnInput(elEmail, "err-email");
clearErrorOnInput(elPhone, "err-phone");
clearErrorOnInput(elPass, "err-password");
clearErrorOnInput(elConfirm, "err-confirmPass");

// ---- XỬ LÝ KHI BẤM "HOÀN TẤT ĐĂNG KÝ" ----
regForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const isValid =
    checkName() &
    checkEmail() &
    checkPhone() &
    checkPass() &
    checkConfirm() &
    checkGender() &
    checkTerms();

  if (isValid) {
    // 1. Ẩn form đăng ký
    document.getElementById("registerWrapper").classList.add("hidden");

    // 2. Hiện form đặt hàng
    document.getElementById("orderWrapper").classList.remove("hidden");

    // 3. Đổi tiêu đề trang
    document.getElementById("mainTitle").innerText =
      "BƯỚC 2: ĐẶT HÀNG TRỰC TUYẾN";

    // 4. In câu chào cá nhân hóa
    document.getElementById("welcomeUser").innerText =
      `🎉 Đăng ký thành công! Chào mừng ${elName.value} đến với cửa hàng.`;
  }
});

// ==========================================
// BÀI 2.2: LOGIC FORM ĐẶT HÀNG
// ==========================================
const prices = { ao_thun: 150000, quan_jean: 200000, giay_the_thao: 500000 };

const orderForm = document.getElementById("orderForm");
const elProduct = document.getElementById("productSelect");
const elQty = document.getElementById("quantity");
const elDate = document.getElementById("deliveryDate");
const elAddress = document.getElementById("address");
const elNotes = document.getElementById("notes");
const noteCounter = document.getElementById("noteCounter");
const paymentRadios = document.getElementsByName("payment");
const displayTotal = document.getElementById("totalPriceDisplay");

function calculateTotal() {
  const qty = parseInt(elQty.value) || 0;
  if (elProduct.value && qty > 0) {
    const total = prices[elProduct.value] * qty;
    displayTotal.textContent = total.toLocaleString("vi-VN") + " đ";
  } else {
    displayTotal.textContent = "0 đ";
  }
}
elProduct.addEventListener("change", calculateTotal);
elQty.addEventListener("input", calculateTotal);

elNotes.addEventListener("input", () => {
  const len = elNotes.value.length;
  noteCounter.textContent = `${len}/200`;
  if (len > 200) {
    noteCounter.classList.add("text-danger");
    validateInput(elNotes, "err-notes", false);
  } else {
    noteCounter.classList.remove("text-danger");
    validateInput(elNotes, "err-notes", true);
  }
});

const checkProduct = () =>
  validateInput(elProduct, "err-product", elProduct.value !== "");
const checkQty = () =>
  validateInput(elQty, "err-quantity", elQty.value >= 1 && elQty.value <= 99);
const checkAddress = () =>
  validateInput(elAddress, "err-address", elAddress.value.trim().length >= 10);

const checkDate = () => {
  const val = elDate.value;
  if (!val) return validateInput(elDate, "err-date", false);
  const selected = new Date(val).setHours(0, 0, 0, 0);
  const today = new Date().setHours(0, 0, 0, 0);
  const maxDate = new Date();
  maxDate.setDate(new Date().getDate() + 30);
  const isValid = selected >= today && selected <= maxDate.setHours(0, 0, 0, 0);
  return validateInput(elDate, "err-date", isValid);
};

const checkPayment = () => {
  const isChecked = Array.from(paymentRadios).some((r) => r.checked);
  document.getElementById("err-payment").style.display = isChecked
    ? "none"
    : "block";
  return isChecked;
};

elProduct.addEventListener("blur", checkProduct);
elQty.addEventListener("blur", checkQty);
elDate.addEventListener("blur", checkDate);
elAddress.addEventListener("blur", checkAddress);
Array.from(paymentRadios).forEach((r) =>
  r.addEventListener("change", checkPayment),
);

clearErrorOnInput(elProduct, "err-product");
clearErrorOnInput(elQty, "err-quantity");
clearErrorOnInput(elDate, "err-date");
clearErrorOnInput(elAddress, "err-address");

orderForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const isValid =
    checkProduct() &
    checkQty() &
    checkDate() &
    checkAddress() &
    checkPayment() &
    (elNotes.value.length <= 200);

  if (isValid) {
    const productName = elProduct.options[elProduct.selectedIndex].text;
    const paymentMethod = Array.from(paymentRadios).find(
      (r) => r.checked,
    ).value;

    document.getElementById("orderSummary").innerHTML = `
            <strong>Sản phẩm:</strong> ${productName}<br>
            <strong>Số lượng:</strong> ${elQty.value}<br>
            <strong>Tổng tiền:</strong> <span style="color:#e74c3c; font-size:1.1rem; font-weight:bold;">${displayTotal.textContent}</span><br>
            <strong>Ngày giao:</strong> ${elDate.value}<br>
            <strong>Thanh toán:</strong> ${paymentMethod}
        `;
    document.getElementById("confirmModal").style.display = "flex";
  }
});

document.getElementById("btnCancel").addEventListener("click", () => {
  document.getElementById("confirmModal").style.display = "none";
});

document.getElementById("btnConfirmFinal").addEventListener("click", () => {
  document.getElementById("orderWrapper").innerHTML = `
        <div style="text-align: center; padding: 40px 10px;">
            <h2 style="color: #2ecc71; border: none;">🎉 Đặt hàng thành công!</h2>
            <p>Đơn hàng sẽ được giao đến bạn vào ngày <strong>${elDate.value}</strong>.</p>
        </div>
    `;
  document.getElementById("confirmModal").style.display = "none";
});
