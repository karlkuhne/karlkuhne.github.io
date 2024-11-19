// Die JSON-Daten mit den Projektinformationen
const projectsData = {
    "projects": [
        {
            "label": "unity-spiel",
            "thumbnail": "Ressources/Caveman_hits_Giraffe_in_a_Car/Thumbnail.png",
            "square": "Ressources/Caveman_hits_Giraffe_in_a_Car/Thumbnail_Square.png",
            "type": "slideshow",
            "images": [
                "Ressources/Caveman_hits_Giraffe_in_a_Car/1.png",
                "Ressources/Caveman_hits_Giraffe_in_a_Car/2.png",
                "Ressources/Caveman_hits_Giraffe_in_a_Car/3.png",
                "Ressources/Caveman_hits_Giraffe_in_a_Car/4.png",
                "Ressources/Caveman_hits_Giraffe_in_a_Car/5.png"
            ],
            "apps": [
                "Ressources/Icons/Unity.png",
                "Ressources/Icons/Rider.png",
                "Ressources/Icons/Procreate.png",
                "Ressources/Icons/GitHub.png"
            ],
            "name": "Caveman hits Giraffe in a Car",
            "description": "Ein rasantes Action-Roguelike, das aus einem 5-tägigen Game Jam entstanden ist. Kämpfe gegen abwechslungsreiche Gegnerwellen, verbessere deine Fähigkeiten und verewige dich auf der Bestenliste.",
            "website": "https://cavemanhitsgiraffeinacar.github.io/",
        },
        {
            "label": "character-design",
            "thumbnail": "Ressources/Character_Design/Thumbnail.png",
            "square": "Ressources/Character_Design/Thumbnail_Square.png",
            "type": "slideshow",
            "images": [
                "Ressources/Character_Design/1.png",
                "Ressources/Character_Design/2.png",
                "Ressources/Character_Design/3.png"
            ],
            "apps": [
                "Ressources/Icons/Procreate.png"
            ],
            "name": "Character Design",
            "description": "Mein erstes Character Design „Hosbol Pogronop“, inspiriert von der Myconid-Rasse aus Dungeons and Dragons.",
            "projectPage": "character-design.html"
        },
        {
            "label": "hausarbeit",
            "thumbnail": "Ressources/Term_Paper/Thumbnail.png",
            "square": "Ressources/Term_Paper/Thumbnail_Square.png",
            "type": "iframe",
            "apps": [
                "Ressources/Icons/Word.png"
            ],
            "src": "Ressources/Term_Paper/Term_Paper.pdf",
            "name": "Designing for immersion: The influence of diegetic player guidance on the gaming experience",
            "description": "Gemäß des Grundsatzes „Designing for immersion“ ergründet diese Hausarbeit, ob Spielerführungsmechaniken in Videospielen besser Teil der erzählten Welt oder externes Spielelement sein sollten.",
            "website": "Ressources/Term_Paper/Term_Paper.pdf",
        },
        {
            "label": "vorspann",
            "thumbnail": "Ressources/Opening_Credits/Thumbnail.png",
            "square": "Ressources/Opening_Credits/Thumbnail_Square.png",
            "type": "iframe",
            "src": "https://www.youtube.com/embed/e4t05vSzYPg",
            "apps": [
                "Ressources/Icons/Premiere.png"
            ],
            "name": "Opening Credits",
            "description": "Ein Vorspann für eine fiktive Serie, welcher die einzigartige Stimmung einer nächtlichen Stadt einfangen soll.",

        },


        {
            "label": "kubistische-portraits",
            "thumbnail": "Ressources/Experimentelles_Projekt/Thumbnail.png",
            "square": "Ressources/Experimentelles_Projekt/Thumbnail_Square.png",
            "type": "slideshow",
            "images": [
                "Ressources/Experimentelles_Projekt/3.png",
                "Ressources/Experimentelles_Projekt/1.png",
                "Ressources/Experimentelles_Projekt/2.png"
            ],
            "apps": [
                "Ressources/Icons/Hand.png"
            ],
            "name": "Cubism",
            "description": "Eine Reihe von kubistischen Portraits, fiktive Personen, Pastellkreide auf Papier.",
            "projectPage": "cubism.html"
        },



    ]
};

// Funktion zum Erstellen der Projekte
function generateProjects() {
    const projectsContainer = document.getElementById('projects-container');
    const template = document.getElementById('project-template');

    projectsData.projects.forEach(project => {
        const clone = template.content.cloneNode(true);

        // Setze die Projektdaten aus der JSON
        const projectDiv = clone.querySelector('.project');
        const labelText = clone.querySelector('.label-text');
        const thumbnailImg = clone.querySelector('.thumbnail-img');

        projectDiv.setAttribute('data-project-id', project.label);
        labelText.textContent = project.label;
        thumbnailImg.src = project.thumbnail;
        thumbnailImg.alt = project.label;

        // Füge das Projekt in den Container ein
        projectsContainer.appendChild(clone);

        // Event Listener für das Öffnen der Lightbox
        projectDiv.addEventListener('click', () => {
            openLightbox(project);
        });
    });
}


function openLightbox(project) {
    const template = document.getElementById('lightbox-template');
    const clone = template.content.cloneNode(true);

    // Setze die Daten der Lightbox (Bilder, Titel, Beschreibung, etc.)
    const lightbox = clone.querySelector('.lightbox');
    const imagesContainer = clone.querySelector('.container-waagerecht');
    const dotsContainer = clone.querySelector('.dots-slideshow-waagerecht');
    const appIconsContainer = clone.querySelector('.app-icons');
    const projectName = clone.querySelector('.project-name');
    const projectDescription = clone.querySelector('.project-description');
    const projectButton = clone.querySelector('.project-button');
    const websiteButton = clone.querySelector('.website-button');

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
    } else if (project.type === "iframe") { // PDF oder Video
        // Füge ein Iframe hinzu, das die PDF oder das Video anzeigt
        const iframe = document.createElement('iframe');
        iframe.src = project.src;
        iframe.classList.add('pdf-viewer');
        iframe.frameBorder = "0";
        iframe.allow = "fullscreen";
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
    projectDescription.textContent = project.description;

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

    // Funktion zum Schließen der Lightbox
    function closeLightbox(lightbox) {
        lightbox.style.display = 'none';
        document.body.classList.remove('no-scroll');
        lightbox.remove();

        // Entferne den Event Listener für Escape, wenn die Lightbox geschlossen wird
        document.removeEventListener('keydown', closeOnEscape);
    }

    // Event Listener für das Klicken außerhalb der Lightbox (zum Schließen)
    lightbox.addEventListener('click', (event) => {
        // Wenn der Klick außerhalb des Inhaltsbereichs der Lightbox erfolgt
        if (!event.target.closest('.wrapper-waagerecht')) {
            closeLightbox(lightbox);
        }
    });
}




let currentIndex = 1; // Standardmäßig auf das erste Bild setzen

function plusSlides(n) {
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

// Rufe die Funktion auf, um die Projekte zu generieren
generateProjects();

// Dynamischer Wechsel zwischen Thumbnails basierend auf der Bildschirmgröße
function updateThumbnails() {
    const isLargeScreen = window.matchMedia('(max-width: 48rem)').matches;

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
