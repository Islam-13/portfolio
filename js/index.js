const menuBtnElm = document.querySelector(".menu-btn");
const closeMenuElm = document.querySelector(".close-menu-btn");
const sideMenuElm = document.querySelector(".side-menu");
const overlayElm = document.querySelector(".overlay");
const scrollersElms = document.querySelectorAll(".scroller-logo");
const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("section");
const modeBtnElm = document.querySelector(".mode-btn");
const cardsElm = document.querySelectorAll(".card");

function addAnimation() {
  const innerScroller = document.querySelector(".inner-scroller");
  const innerScrollerContent = Array.from(innerScroller.children);

  innerScrollerContent.forEach((item) => {
    const duplicate = item.cloneNode(true);

    duplicate.setAttribute("aria-hidden", true);
    innerScroller.appendChild(duplicate);
  });
}

addAnimation();

menuBtnElm.addEventListener("click", () => {
  sideMenuElm.style.left = "0";
  overlayElm.style.display = "block";
});

closeMenuElm.addEventListener("click", closeMenu);

document.addEventListener(
  "click",
  (e) => {
    if (!sideMenuElm.contains(e.target)) {
      closeMenu();
    }
  },
  true
);

function closeMenu() {
  sideMenuElm.style.left = "-281px";
  overlayElm.style.display = "none";
}

function updateActiveClass() {
  sections.forEach((sec) => {
    const secTop = sec.offsetTop;
    const secHeight = sec.offsetHeight;
    const secBottom = secTop + secHeight;

    const offset = 60; // navbar height

    if (window.scrollY + offset >= secTop && scrollY < secBottom) {
      navLinks.forEach((link) => {
        link.classList.remove("active");
        closeMenu();
      });
      const matchingLink = document.querySelector(`a[href="#${sec.id}"]`);
      matchingLink.classList.add("active");
    }
  });
}

function checkCards() {
  cardsElm.forEach((card) => {
    const cardTop = card.getBoundingClientRect().top;
    const triggerBottom = (window.innerHeight / 5) * 4;

    if (cardTop < triggerBottom) {
      card.classList.add("show");
    } else {
      card.classList.remove("show");
    }
  });
}

updateActiveClass();
checkCards();

window.addEventListener("scroll", () => {
  updateActiveClass();
  checkCards();
});

// mode theme
if (localStorage.getItem("theme")) {
  localStorage.getItem("theme") == "dark" ? setDark() : setLight();
} else {
  window.matchMedia("(prefers-color-scheme: dark)").matches
    ? setDark()
    : setLight();
}

modeBtnElm.addEventListener("click", function () {
  localStorage.getItem("theme") == "dark" ? setLight() : setDark();
});

function setDark() {
  document.documentElement.classList.remove("light-mode");
  document.documentElement.classList.add("dark-mode");
  localStorage.setItem("theme", "dark");
  modeBtnElm.classList.add("show-btn");
}

function setLight() {
  document.documentElement.classList.remove("dark-mode");
  document.documentElement.classList.add("light-mode");
  localStorage.setItem("theme", "light");
  modeBtnElm.classList.remove("show-btn");
}
