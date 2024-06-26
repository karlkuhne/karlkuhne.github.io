document.addEventListener('scroll', function() {
    var scrolled = window.scrollY;
    var parallax = document.querySelector('.parallax');
    var offset = scrolled * 0.1;
    parallax.style.backgroundPositionY = offset + 'px';
});


document.addEventListener("DOMContentLoaded", () => {
    const header = document.getElementById("galery-header");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const rect = entry.boundingClientRect;

            if (rect.top < window.innerHeight && rect.bottom > 0) {
                // Element ist im Viewport
                header.classList.add("fade-in-text");
            } else {
                // Entferne die Klasse `fade-in-text`, wenn das Element den Viewport verlassen hat und vollständig unterhalb des Viewports ist
                if (rect.top >= window.innerHeight && rect.bottom > window.innerHeight) {
                    header.classList.remove("fade-in-text");
                }
            }
        });
    });

    observer.observe(header);
});


