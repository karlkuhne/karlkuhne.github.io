document.addEventListener('scroll', function() {
    var scrolled = window.scrollY;
    var parallax = document.querySelector('.parallax');
    var offset = scrolled * 0.1;
    parallax.style.backgroundPositionY = offset + 'px';
});


document.addEventListener("DOMContentLoaded", () => {
    const headers = document.querySelectorAll("#galery-header, #about-header, #contact-header");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const rect = entry.boundingClientRect;
            const element = entry.target;

            if (rect.top < window.innerHeight && rect.bottom > 0) {
                // Element ist im Viewport
                element.classList.add("fade-in-text");
            } else {
                // Entferne die Klasse `fade-in-text`, wenn das Element den Viewport verlassen hat und vollständig unterhalb des Viewports ist
                if (rect.top >= window.innerHeight && rect.bottom > window.innerHeight) {
                    element.classList.remove("fade-in-text");
                }
            }
        });
    });

    headers.forEach(header => observer.observe(header));
});



