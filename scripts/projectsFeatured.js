
import projectsData from './projectsData.js';
let currentProjectIndex = 0;
const featuredProjects = projectsData.projects.filter(project => project.featured);

function generateFeaturedProjects() {

    const featuredProjectsContainer = document.getElementById('featured-projects-container');

    const template = document.getElementById('project-template');

    projectsData.projects.forEach(project => {
        if (project.featured === true) {

            const clone = template.content.cloneNode(true);

            // Setze die Projektdaten aus der JSON
            const projectDiv = clone.querySelector('.project');
            const labelText = clone.querySelector('.label-text');
            const thumbnailImg = clone.querySelector('.thumbnail-img');

            const thumbnailContainer = clone.querySelector('.thumbnail');
            const label = clone.querySelector('.label');
            const minimizeIcon = clone.querySelector('.minimize-icon');
            const windowIcon = clone.querySelector('.window-icon');
            const closeIcon = clone.querySelector('.close-icon');

            projectDiv.setAttribute('data-project-id', project.label);
            labelText.textContent = project.label;
            thumbnailImg.src = project.thumbnail;
            thumbnailImg.alt = project.label;

            // Füge das Projekt in den Container ein
            featuredProjectsContainer.appendChild(clone);

            // Event Listener für das Öffnen der Lightbox
            thumbnailImg.addEventListener('click', () => {
                openLightbox(project);
            });

            windowIcon.addEventListener('click', () => {
                openLightbox(project);
            });

            minimizeIcon.addEventListener('click', () => {
                if (thumbnailContainer.style.display === 'none') {
                    thumbnailContainer.style.display = 'block';
                    label.style.borderBottom = '0.185rem solid rgb(82, 82, 82)';
                } else {
                    thumbnailContainer.style.display = 'none';
                    label.style.borderBottom = 'none';
                }
            });

            closeIcon.addEventListener('click', () => {
                projectDiv.classList.add('shrink');
                setTimeout(() => {
                    projectDiv.classList.remove('shrink');
                }, 500);
            });
        }

    });

}

function openLightbox(project) {
    currentProjectIndex = projectsData.projects.findIndex(p => p.label === project.label);
    const template = document.getElementById('lightbox-template');
    const clone = template.content.cloneNode(true);

    // Setze die Daten der Lightbox (Bilder, Titel, Beschreibung, etc.)
    const lightbox = clone.querySelector('.lightbox');
    const imagesContainer = clone.querySelector('.container-waagerecht');
    const dotsContainer = clone.querySelector('.dots-slideshow-waagerecht');
    const appIconsContainer = clone.querySelector('.app-icons');
    const projectName = clone.querySelector('.project-name');
    const lightboxDescription = clone.querySelector('.lightbox-description');
    const projectButton = clone.querySelector('.project-button');
    const websiteButton = clone.querySelector('.website-button');
    const steamContainer = clone.querySelector('.steam'); // Steam-Container

    // Neu: Steam-Link einfügen, falls vorhanden
    if (project.steam) {
        const iframe = document.createElement('iframe');
        iframe.src = project.steam;
        steamContainer.appendChild(iframe);
        steamContainer.style.display = 'block';

        projectName.style.display = 'none';
        lightboxDescription.style.display = 'none';
    } else {
        steamContainer.style.display = 'none';
    }

    // NEU: JE NACH PROJEKTTYP (SLIDESHOW ODER PDF) WIRD DER INHALT BESTIMMT
    if (project.type === "slideshow") { // SLIDESHOW
        project.images.forEach((image, index) => {
            const imgElement = document.createElement('img');
            imgElement.src = image;
            imgElement.alt = `Image ${index + 1}`;
            imgElement.classList.add('project-slide');
            imgElement.classList.add('selectDisable');
            imgElement.draggable = false;
            imgElement.oncontextmenu = () => false;
            imagesContainer.appendChild(imgElement);

            const dot = document.createElement('span');
            dot.classList.add('dot');
            dot.onclick = () => currentSlide(index + 1); // Wechselt zum entsprechenden Bild
            dotsContainer.appendChild(dot);
        });

        if (project.images.length === 1) {
            // Blende die Navigationspfeile und die Dots aus
            dotsContainer.style.display = 'none';
            const navigation = clone.querySelector('.navigation');
            if (navigation) {
                navigation.style.display = 'none';
            }
        }
    } else if (project.type === "iframe") { // PDF oder Video
        // Füge ein Iframe hinzu, das die PDF oder das Video anzeigt
        const iframe = document.createElement('iframe');
        iframe.src = project.src;
        iframe.classList.add('pdf-viewer');
        iframe.frameBorder = "0";
        iframe.setAttribute('allowfullscreen', '');
        iframe.style.width = "100%"; // Setze die Breite auf 100%

        // Füge den iFrame zum Container hinzu, bevor wir die Höhe berechnen
        imagesContainer.appendChild(iframe);

        // Warte, bis der iFrame vollständig geladen ist
        iframe.onload = () => {
            // Berechne die Höhe des iFrames (9:16 Verhältnis)
            const iframeWidth = iframe.offsetWidth; // Breite des iFrames
            const iframeHeight = iframeWidth * 9 / 16; // Höhe basierend auf 9:16
            iframe.style.height = iframeHeight + 'px'; // Setze die Höhe dynamisch
        };

        // Entferne die Dots und Navigations-Buttons, da sie nicht für PDFs benötigt werden
        dotsContainer.style.display = 'none';
        const navigation = clone.querySelector('.navigation');
        if (navigation) {
            navigation.style.display = 'none';
        }
    }

    // Textinhalt der Lightbox
    projectName.textContent = project.name;
    lightboxDescription.textContent = project.description;

    // Setze sicher, dass der Button im gleichen Tab öffnet
    projectButton.target = "_self"; // Ensures the project link opens in the same tab

    if (project.apps && project.apps.length > 0) {
        project.apps.forEach((app) => {
            const appIcon = document.createElement('img');
            appIcon.src = app;
            appIcon.alt = app.name;
            appIcon.classList.add('app-icon');
            appIconsContainer.appendChild(appIcon);
        });
    } else {
        appIconsContainer.style.display = 'none';
    }


    // Website Button anzeigen oder ausblenden, je nach Vorhandensein eines Links
    if (project.website) {
        websiteButton.href = project.website;
        websiteButton.style.display = 'inline-block'; // Button anzeigen
    } else {
        websiteButton.style.display = 'none'; // Button ausblenden
    }

    if (project.projectPage) {
        projectButton.href = project.projectPage;
        projectButton.style.display = 'inline-block';
    } else {
        projectButton.style.display = 'none';
    }

    // Füge die Lightbox zum Body hinzu und öffne sie
    document.body.appendChild(clone);
    lightbox.style.display = 'flex';
    document.body.classList.add('no-scroll');

    // Setze den aktuellen Index auf 1 (startet bei der ersten Folie, falls Slideshow)
    if (project.type === "slideshow") {
        currentIndex = 1;
        showSlides(currentIndex); // Zeigt das erste Bild und markiert den ersten Dot als aktiv
    }

    // Event Listener für das Schließen der Lightbox
    const closeBtn = lightbox.querySelector('.close');
    closeBtn.addEventListener('click', () => {
        closeLightbox(lightbox);
    });

    // Event Listener für Escape-Taste zum Schließen der Lightbox
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closeLightbox(lightbox);
        }
    });

    // Event Listener für das Klicken außerhalb der Lightbox (zum Schließen)
    lightbox.addEventListener('click', (event) => {
        // Wenn der Klick außerhalb des Inhaltsbereichs der Lightbox erfolgt
        if (!event.target.closest('.wrapper-waagerecht')) {
            closeLightbox(lightbox);
        }
    });
}


// Funktion zum Schließen der Lightbox
function closeLightbox(lightbox) {
    lightbox.style.display = 'none';
    document.body.classList.remove('no-scroll');
    lightbox.remove();

    // Entferne den Event Listener für Escape, wenn die Lightbox geschlossen wird
    document.removeEventListener('keydown', closeLightbox);
}

function handleKeyDown(event) {
    if (event.key === 'ArrowRight') {
        navigateToProject(1);
    } else if (event.key === 'ArrowLeft') {
        navigateToProject(-1);
    }
}

// In der navigateToProject Funktion
function navigateToProject(direction) {
    currentProjectIndex += direction;

    if (currentProjectIndex >= featuredProjects.length) {
        currentProjectIndex = 0; // Zurück zum ersten Projekt
    } else if (currentProjectIndex < 0) {
        currentProjectIndex = featuredProjects.length - 1; // Zum letzten Projekt
    }

    const nextProject = featuredProjects[currentProjectIndex];
    const lightbox = document.querySelector('.lightbox');
    closeLightbox(lightbox);
    openLightbox(nextProject);
}



let currentIndex = 1; // Standardmäßig auf das erste Bild setzen

window.plusSlides = function (n) {
    showSlides(currentIndex += n);
}

function currentSlide(n) {
    showSlides(currentIndex = n);
}

function showSlides(n) {
    const slides = document.querySelectorAll('.project-slide');
    const dots = document.querySelectorAll('.dot');

    // Überprüfen, ob der Index außerhalb der Grenzen liegt und zurücksetzen
    if (n > slides.length) { currentIndex = 1 }
    if (n < 1) { currentIndex = slides.length }

    // Alle Slides ausblenden und alle Dots zurücksetzen
    slides.forEach((slide) => {
        slide.style.display = 'none';
    });
    dots.forEach((dot) => {
        dot.classList.remove('dotactive');
    });

    // Zeige das aktuelle Bild an und setze den aktiven Dot
    slides[currentIndex - 1].style.display = 'block';
    dots[currentIndex - 1].classList.add('dotactive');
}


generateFeaturedProjects();
document.addEventListener('keydown', handleKeyDown);


// Dynamischer Wechsel zwischen Thumbnails basierend auf der Bildschirmgröße
function updateThumbnails() {
    const isLargeScreen = window.matchMedia('(max-width: 40.9rem)').matches;

    document.querySelectorAll('.thumbnail-img').forEach(img => {
        const projectId = img.closest('.project').getAttribute('data-project-id');
        const project = projectsData.projects.find(p => p.label === projectId);

        if (isLargeScreen) {
            img.src = project.square; // Square Thumbnails
        } else {
            img.src = project.thumbnail; // Normal Thumbnails
        }
    });
}

// Beim Laden und bei Fensteränderung aufrufen
window.addEventListener('resize', updateThumbnails);
updateThumbnails();
