// 저장 함수
function saveToLocalStorage(data) {
  localStorage.setItem("emailSignatureData", JSON.stringify(data));
}

// 로드 함수
function loadFromLocalStorage() {
  const saved = localStorage.getItem("emailSignatureData");
  return saved ? JSON.parse(saved) : null;
}

// 서명 카드 반영 함수
function applySignatureData(data) {
  document.getElementById("sig-name").textContent = data.name;
  document.getElementById("sig-title-dept").textContent = data.title;
  document.getElementById("sig-phone").textContent = data.phone;
  document.getElementById("sig-email").textContent = data.email;

  const degreeEl = document.getElementById("sig-degree");
  if (data.degree === "") {
    degreeEl.textContent = "";
    degreeEl.style.display = "none";
  } else {
    degreeEl.textContent = data.degree;
    degreeEl.style.display = "block";
  }

  // 서명란 너비 적용
  const signatureCard = document.querySelector(".signature-card");
  signatureCard.style.maxWidth = `${data.width}px`;
}

// 폼 제출 이벤트
document.querySelector("form").addEventListener("submit", function (e) {
  e.preventDefault(); // 폼 제출 방지

  const name = document.getElementById("input-name").value.trim();
  const title = document.getElementById("input-title-dept").value.trim();
  const phone = document.getElementById("input-phone").value.trim();
  const email = document.getElementById("input-email").value.trim();
  const degree = document.getElementById("input-degree").value.trim();
  const width = document.getElementById("input-width").value;

  // 필수값 검증
  if (!name || !title || !phone || !email) {
    alert("모든 필수 항목을 입력해주세요.");
    return;
  }

  const data = { name, title, phone, email, degree, width };

  saveToLocalStorage(data); // 저장
  applySignatureData(data); // 서명 카드 업데이트
});

// 페이지 로딩 시 자동 적용
window.addEventListener("DOMContentLoaded", () => {
  const savedData = loadFromLocalStorage();
  if (savedData) {
    // 입력 필드에 채우기
    document.getElementById("input-name").value = savedData.name;
    document.getElementById("input-title-dept").value = savedData.title;
    document.getElementById("input-phone").value = savedData.phone;
    document.getElementById("input-email").value = savedData.email;
    document.getElementById("input-degree").value = savedData.degree;
    document.getElementById("input-width").value = savedData.width || 400;
    document.getElementById("width-value").textContent = `${
      savedData.width || 400
    }px`;

    applySignatureData(savedData);
  }

  // 너비 슬라이더 이벤트 리스너
  const widthInput = document.getElementById("input-width");
  const widthValue = document.getElementById("width-value");

  widthInput.addEventListener("input", function () {
    const value = this.value;
    widthValue.textContent = `${value}px`;

    // 서명란 너비 실시간 업데이트
    const signatureCard = document.querySelector(".signature-card");
    signatureCard.style.maxWidth = `${value}px`;
  });
});

document.getElementById("reset-button").addEventListener("click", function () {
  // localStorage 삭제
  localStorage.removeItem("emailSignatureData");

  // 입력 필드 초기화
  document.getElementById("input-name").value = "";
  document.getElementById("input-title-dept").value = "";
  document.getElementById("input-phone").value = "";
  document.getElementById("input-email").value = "";
  document.getElementById("input-degree").value = "";
  document.getElementById("input-width").value = "400";

  // 서명 카드 초기값으로 복원
  document.getElementById("sig-name").textContent = "Name";
  document.getElementById("sig-title-dept").textContent = "Title | Department";
  document.getElementById("sig-phone").textContent = "82.10.0000.0000";
  document.getElementById("sig-email").textContent = "abcdefg.hijk@sonco.kr";
  const degreeEl = document.getElementById("sig-degree");
  degreeEl.textContent = "Degree";
  degreeEl.style.display = "block";

  // 서명란 너비 초기화
  const signatureCard = document.querySelector(".signature-card");
  signatureCard.style.maxWidth = "400px";
});
