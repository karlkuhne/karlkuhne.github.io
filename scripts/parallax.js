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

let InitialMainWidth;

function getCSSVariable(variableName) {
  return getComputedStyle(document.documentElement).getPropertyValue(variableName).trim();
}

function getRemInPixels() {
  return parseFloat(getComputedStyle(document.documentElement).fontSize);
}

function setInitialMainWidth() {
  const screenWidth = window.screen.width;
  const InitialMainWidthPercentage = parseInt(getCSSVariable('--main-width'), 10);
  InitialMainWidth = (screenWidth * InitialMainWidthPercentage) / 100;
  document.documentElement.style.setProperty('--main-width', `${InitialMainWidth}px`);

  console.log(InitialMainWidth);
}

document.addEventListener('DOMContentLoaded', () => {
  setInitialMainWidth();
  adjustLayout();
});

// RESPONSIVE

function adjustLayout() {
  const remInPixels = getRemInPixels();
  const responsiveThreshold = InitialMainWidth + 2.5 * remInPixels; // InitialMainWidth + 1rem in px

  if (window.innerWidth < responsiveThreshold) {
    document.body.classList.add('responsive');
  } else {
    document.body.classList.remove('responsive');
  }
}

window.addEventListener('resize', adjustLayout);

