const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);


// SCROLL TO TARGET

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


// FADE IN ANIMATION

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


