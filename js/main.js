// 스무스 스크롤
const headerMenuItems = document.querySelectorAll(".header__menu__item");

headerMenuItems.forEach((item) => {
  item.addEventListener("click", (e) => {
    e.preventDefault();
    const targetId = item.getAttribute("href");
    document.querySelector(targetId).scrollIntoView({ behavior: "smooth" });
  });
});

// 현재 섹션 메뉴 하이라이트
const sections = document.querySelectorAll("section");
const menuMap = {};

headerMenuItems.forEach((item) => {
  menuMap[item.getAttribute("href")] = item;
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        headerMenuItems.forEach((item) => item.classList.remove("active"));

        const id = "#" + entry.target.id;
        menuMap[id].classList.add("active");
      }
    });
  },
  { threshold: 0.5 }
);

sections.forEach((section) => observer.observe(section));

// 섹션 등장 시 페이드 인 / 슬라이드 인 애니메이션
const fadeSections = document.querySelectorAll(".section");

const fadeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  { threshold: 0.2 }
);

fadeSections.forEach((sec) => fadeObserver.observe(sec));

// 스크롤 최상단 이동 (부드럽게)
const scrollUpBtn = document.querySelector(".arrow-up");

scrollUpBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// 프로젝트 카드 클릭
const projects = document.querySelectorAll(".project");
const modal = document.getElementById("projectModal");
const modalClose = document.querySelector(".modal-close");

projects.forEach((item) => {
  item.addEventListener("click", () => {
    modal.style.display = "flex"; // 모달 표시
  });
});

// 모달 닫기 버튼
modalClose.addEventListener("click", () => {
  modal.style.display = "none";
});

// 모달 바깥 클릭 시 닫기
modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});

// 현재 시간에 따른 인삿말 변경
const greetingMent = document.querySelector(".home__description");

function updateGreeting() {
  const hour = new Date().getHours();
  let message = "";

  if (hour < 12) message = "☀️ 좋은 아침입니다 ☀️";
  else if (hour < 18) message = "🌤️ 좋은 오후입니다 🌤️";
  else message = "🌙 좋은 저녁입니다 🌙";

  greetingMent.textContent = message;
}

updateGreeting();

// 다크 모드 / 라이트 모드 전환 버튼
const toggleBtn = document.createElement("button");
toggleBtn.className = "darkmode-btn";
toggleBtn.innerText = "🌙";

document.body.appendChild(toggleBtn);

toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    toggleBtn.innerText = "☀️";
  } else {
    toggleBtn.innerText = "🌙";
  }
});

// 프로젝트 필터링
const categoryButtons = document.querySelectorAll(".category");

categoryButtons.forEach((button) => {
  button.addEventListener("click", () => {
    categoryButtons.forEach((btn) =>
      btn.classList.remove("category--selected")
    );
    button.classList.add("category--selected");

    const filter = button.dataset.filter;

    projects.forEach((project) => {
      const category = project.dataset.category;
      if (filter === "all" || category === filter) {
        project.style.display = "block";
      } else {
        project.style.display = "none";
      }
    });
  });
});
