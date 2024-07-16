const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);

function scrollToTarget(event) {
  event.preventDefault();
  const targetId = event.target.getAttribute('href');
  const targetElement = document.querySelector(targetId);
  const targetPosition = targetElement.offsetTop /* - 0 * rootFontSize */;
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
  console.log(karlPercentage);
  const karlFontSize = (screenWidth * karlPercentage) / 100;
  document.documentElement.style.setProperty('--karl-font-size', `${karlFontSize}px`); // fontSize zu karlFontSize geändert
}

setFontSize();
window.addEventListener('body.load', setFontSize);





document.addEventListener("DOMContentLoaded", function () {
  const fadeInOnScroll = (elementSelector, offsetRem = 0) => {
    const elements = document.querySelectorAll(elementSelector);

    elements.forEach(element => {
      const rect = element.getBoundingClientRect();
      const offsetPx = offsetRem * rootFontSize; // Umrechnung von rem in px
      if (rect.top < window.innerHeight - offsetPx && rect.bottom > offsetPx) {
        element.classList.add('fade-in');
      } else {
        // Entferne die Klasse `fade-in`, wenn das Element den Viewport verlassen hat und vollständig unterhalb des Viewports ist
        if (rect.top >= window.innerHeight  && rect.bottom > window.innerHeight) {
          element.classList.remove('fade-in');
        }
      }

    });
  };

  fadeInOnScroll('.project', 0);
  fadeInOnScroll('#contact-form', 7.5);
  fadeInOnScroll('.aboutBox', 7.5);
  fadeInOnScroll('#about-header', 20);
  fadeInOnScroll('#contact-header', 20);
  fadeInOnScroll('#galery-header', 20);

  window.addEventListener('scroll', () => {
    fadeInOnScroll('.project', 0);
    fadeInOnScroll('#contact-form', 7.5);
    fadeInOnScroll('.aboutBox', 7.5);
    fadeInOnScroll('#about-header', 20);
    fadeInOnScroll('#contact-header', 20);
    fadeInOnScroll('#galery-header', 20);
  });
});










/* var prevScrollpos = window.scrollY;
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
} */


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





var player;

function onYouTubeIframeAPIReady() {
  player = new YT.Player('playerOpeningCredits', {
    height: '100%',
    width: '100%',
    videoId: 'e4t05vSzYPg',
    playerVars: {
      'rel': 0, // Keine relativen Videos anzeigen
      'controls': 1 // Zeige Video-Steuerelemente an
    },
    events: {
      'onReady': onPlayerReady
    }
  });
}

function onPlayerReady(event) {

}

/* LIGHTBOX CLOSE */
const lightboxes = document.querySelectorAll('.lightbox');

lightboxes.forEach(lightbox => {
  lightbox.querySelector('.close').onclick = () => {
    closeLightbox(lightbox);
  };

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && lightbox.style.display !== 'none') {
      closeLightbox(lightbox);
    }
  });
});

function closeLightbox(lightbox) {
  lightbox.style.display = 'none';
  document.body.classList.remove('no-scroll');
  if (lightbox.classList.contains('youtube-lightbox') && player) {
    player.pauseVideo(); // Das Video wird gestoppt, wenn die Lightbox geschlossen wird
  }
}







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