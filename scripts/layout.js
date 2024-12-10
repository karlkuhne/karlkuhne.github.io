//PARALLAX

document.addEventListener('scroll', function () {
  var scrolled = window.scrollY;
  var parallax = document.querySelector('.parallax');
  var offset = scrolled * 0.2;
  parallax.style.backgroundPositionY = offset + 'px';
});


// BURGER MENU

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
}

document.addEventListener('DOMContentLoaded', () => {
  setInitialMainWidth();
  adjustLayout();
});


// RESPONSIVE

function adjustLayout() {
  const remInPixels = getRemInPixels();
  const responsiveThreshold = InitialMainWidth + 4 * remInPixels;

  if (window.innerWidth < responsiveThreshold) {
    document.body.classList.add('responsive');

    var iframes = document.querySelectorAll('.container-waagerecht iframe');

    iframes.forEach(function (iframe) {
      var width = iframe.offsetWidth; // Breite jedes Iframes ermitteln
      var height = width * 9 / 16;    // Höhe basierend auf der Breite und der Formel 9:16 berechnen
      iframe.style.height = height + 'px'; // Höhe setzen
    });

  } else {
    document.body.classList.remove('responsive');
  }
}

window.addEventListener('resize', adjustLayout);

