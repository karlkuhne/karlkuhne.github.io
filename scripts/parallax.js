//PARALLAX

document.addEventListener('scroll', function () {
  var scrolled = window.scrollY;
  var parallax = document.querySelector('.parallax');
  var offset = scrolled * 0.2;
  parallax.style.backgroundPositionY = offset + 'px';
});


// BURHFER MENU

const hamburger = document.querySelector("#hamburger");
const mainNav = document.querySelector("#main-nav");
const mainNavItem = document.querySelectorAll(".main-nav-item");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  mainNav.classList.toggle("active");
})

mainNavItem.forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    mainNav.classList.remove("active");
  })
})


// MAIN WIDTH

function getCSSVariable(variableName) {
  return getComputedStyle(document.documentElement).getPropertyValue(variableName).trim();
}

function setInitialMainWidth() {
  const screenWidth = window.screen.width;

  const InitialMainWidthPercentage = parseInt(getCSSVariable('--main-width'));
  const InitialMainWidth = (screenWidth * InitialMainWidthPercentage) / 100;
  document.documentElement.style.setProperty('--main-width', `${InitialMainWidth}px`);

  console.log(`Initial main width set to ${InitialMainWidth}px`);
}

setInitialMainWidth();
window.addEventListener('body.load', setInitialMainWidth);
