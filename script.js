function scrollToTarget(event) {
  event.preventDefault();
  const targetId = event.target.getAttribute('href');
  const targetElement = document.querySelector(targetId);
  const targetPosition = targetElement.offsetTop;
  window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
  });
}



function getCSSVariable(variableName) {
return getComputedStyle(document.documentElement).getPropertyValue(variableName).trim();
}

function setFontSize() {
const screenWidth = window.screen.width;

const karlPercentage = parseInt(getCSSVariable('--karl-font-size')); // ParseInt hinzugefügt
console.log (karlPercentage);
const karlFontSize = (screenWidth * karlPercentage) / 100;
document.documentElement.style.setProperty('--karl-font-size', `${karlFontSize}px`); // fontSize zu karlFontSize geändert
}

setFontSize();
window.addEventListener('body.load', setFontSize);









var prevScrollpos = window.scrollY;
window.onscroll = function () {
  var currentScrollPos = window.scrollY;

  if (currentScrollPos > 1210) {
      document.getElementById("header").style.visibility = "visible";
  }

  if (currentScrollPos < 1210) {
      document.getElementById("header").style.visibility = "hidden";
  }

  if (prevScrollpos < currentScrollPos) {
      document.getElementById("header").style.top = "-3.9rem";
  }

  else if (currentScrollPos > 1260) {
      document.getElementById("header").style.top = "0";
  }

  prevScrollpos = currentScrollPos;
}


/* LIGHTBOX OPEN */
document.querySelector('#project-character-design').onclick = () => {
  document.querySelector('#lightbox-character-design').style.display = 'flex';
  document.body.classList.add('no-scroll');
};

document.querySelector('#project-opening-credits').onclick = () => {
  document.querySelector('#lightbox-opening-credits').style.display = 'flex';
  document.body.classList.add('no-scroll');
};

document.querySelector('#project-term-paper').onclick = () => {
  document.querySelector('#lightbox-term-paper').style.display = 'flex';
  document.body.classList.add('no-scroll');
};

document.querySelector('#project-cubism').onclick = () => {
  document.querySelector('#lightbox-cubism').style.display = 'flex';
  document.body.classList.add('no-scroll');
};

/* LIGHTBOX CLOSE */
const lightboxes = document.querySelectorAll('.lightbox');

lightboxes.forEach(lightbox => {
  lightbox.querySelector('.close').onclick = () => {
    lightbox.style.display = 'none';
    document.body.classList.remove('no-scroll');
  };

  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && lightbox.style.display !== 'none') {
      lightbox.style.display = 'none';
      document.body.classList.remove('no-scroll');
    }
  });
});







/* GENERAL SLIDESHOW FUNCTIONALITY */
function showSlides(slideIndex, slideClass, dotClass) {
  let i;
  let slides = document.getElementsByClassName(slideClass);
  let dots = document.getElementsByClassName(dotClass);
  if (slideIndex > slides.length) { slideIndex = 1; }
  if (slideIndex < 1) { slideIndex = slides.length; }
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
  return slideIndex;
}

let characterDesignSlideIndex = 1;
let cubismSlideIndex = 1;

showSlides(characterDesignSlideIndex, "character-design-slides", "dot");
showSlides(cubismSlideIndex, "cubism-slides", "dot1");

function plusSlides(n, slideIndex, slideClass, dotClass) {
  slideIndex += n;
  return showSlides(slideIndex, slideClass, dotClass);
}

function currentSlide(n, slideClass, dotClass) {
  return showSlides(n, slideClass, dotClass);
}

// Character Design Slideshow controls
function plusCharacterDesignSlides(n) {
  characterDesignSlideIndex = plusSlides(n, characterDesignSlideIndex, "character-design-slides", "dot");
}

function currentCharacterDesignSlide(n) {
  characterDesignSlideIndex = currentSlide(n, "character-design-slides", "dot");
}

// Cubism Slideshow controls
function plusCubismSlides(n) {
  cubismSlideIndex = plusSlides(n, cubismSlideIndex, "cubism-slides", "dot1");
}

function currentCubismSlide(n) {
  cubismSlideIndex = currentSlide(n, "cubism-slides", "dot1");
}







/* About Section */

// Get all the .box elements
const boxes = document.querySelectorAll('.box');

// Variables to store the current dragged box and its initial position
let draggedBox = null;
let initialX = 0;
let initialY = 0;

// Function to handle the mousedown event
function startDrag(event) {
// Set the draggedBox to the current box being dragged
draggedBox = event.target;

// Store the initial position of the dragged box
initialX = event.clientX - parseInt(draggedBox.offsetLeft);
initialY = event.clientY - parseInt(draggedBox.offsetTop);

// Add a mousemove event listener to handle the dragging
document.addEventListener('mousemove', drag);

// Add a mouseup event listener to handle the drag end
document.addEventListener('mouseup', endDrag);
}

// Function to handle the dragging
function drag(event) {
// Calculate the new position of the dragged box
const x = event.clientX - initialX;
const y = event.clientY - initialY;

// Update the position of the dragged box
draggedBox.style.left = `${x}px`;
draggedBox.style.top = `${y}px`;
}

// Function to handle the drag end
function endDrag() {
// Remove the mousemove and mouseup event listeners
document.removeEventListener('mousemove', drag);
document.removeEventListener('mouseup', endDrag);

// Reset the draggedBox variable
draggedBox = null;
}

// Add the mousedown event listener to each .box element
boxes.forEach(box => {
box.addEventListener('mousedown', startDrag);
});