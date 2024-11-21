// FILTER

const filterButtons = document.querySelectorAll('.filter-button');

function SetupFilters() {
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = button.getAttribute('data-category');
            filterButtons.forEach(btn => btn.classList.remove('filter-active'));
            this.classList.add('filter-active');
            filterProjects(filter);
        });
    });
}

let previusCategory = 'alle';

function filterProjects(category) {
    const allProjects = document.querySelectorAll('.project');

    if (category === previusCategory) {
      return;
  }
    
    allProjects.forEach(project => project.classList.remove('fade-in'));
    
    allProjects.forEach(project => {
        const projectCategory = project.getAttribute('data-category');
        if (category === 'alle' || projectCategory === category) {
            project.style.display = 'block';
        } else {
            project.style.display = 'none';
        }
    });

    const visibleProjects = Array.from(allProjects).filter(project => project.style.display === 'block');
    visibleProjects.slice(0, 2).forEach(project => {
        setTimeout(() => project.classList.add('fade-in'), 50);
    });

    previusCategory = category;
}



SetupFilters();

// ANIMATIONS

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


