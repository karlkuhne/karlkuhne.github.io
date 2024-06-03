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





function setFontSize() {
  const screenWidth = window.screen.width;

  // Hier kannst du den Prozentsatz festlegen
  const percentage = 10; // Beispiel: 2% der Bildschirmbreite
  const fontSize = (screenWidth * percentage) / 100;

  // Setze die CSS-Variable --font-size
  document.documentElement.style.setProperty('--font-size', `${fontSize}px`);
}

// Initiale Schriftgrößenberechnung
setFontSize();

// Schriftgröße neu berechnen bei Änderung der Bildschirmgröße
window.addEventListener('resize', setFontSize);





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


/* Lightbox */


document.querySelector('#project-character-design').onclick = () => {
    document.querySelector('#lightbox-character-design').style.display = 'flex';
  } ;

document.querySelector('#galery > article .close').onclick = () => {
  document.querySelector('#galery > article').style.display = 'none';
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
