// Die JSON-Daten mit den Projektinformationen
const projectsData = {
    "projects": [
        {
            "label": "unity-spiel",
            "thumbnail": "Ressources/Caveman_hits_Giraffe_in_a_Car/Thumbnail.png",
            "type": "slideshow",
            "images": [
                "Ressources/Caveman_hits_Giraffe_in_a_Car/1.png",
                "Ressources/Caveman_hits_Giraffe_in_a_Car/2.png",
                "Ressources/Caveman_hits_Giraffe_in_a_Car/3.png",
                "Ressources/Caveman_hits_Giraffe_in_a_Car/4.png",
                "Ressources/Caveman_hits_Giraffe_in_a_Car/5.png"
            ],
            "name": "Caveman hits Giraffe in a Car",
            "description": "„Caveman Hits Giraffe in a Car“ ist ein rasantes Actionspiel, das während eines 5-tägigen Game Jams entstanden ist. In diesem handgezeichneten Roguelite kämpfst du gegen immer schwierigere Gegnerwellen, die aus den unterschiedlichsten Gegnertypen bestehen. Nach jeder Welle kannst du eine von drei Fähigkeiten verbessern: Gesundheit, Schaden oder Geschwindigkeit. Sammle zwischen den Spielen Punkte um einzigartige Fähigkeiten freizuspielen und miss dich mit unserer Spielerschaft auf der öffentlichen Bestenliste.",
            "projectPage": "game.html"

        },
        {
            "label": "character-design",
            "thumbnail": "Ressources/Character_Design/Thumbnail.png",
            "type": "slideshow",
            "images": [
                "Ressources/Character_Design/Thumbnail1.png",
                "Ressources/Character_Design/Posen.png",
                "Ressources/Character_Design/Emotions.png"
            ],
            "name": "Character Design",
            "description": "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
            "projectPage": "character-design.html"
        },
        {
            "label": "hausarbeit",
            "thumbnail": "Ressources/Term_Paper/Thumbnail.png",
            "type": "iframe",
            "src": "Ressources/Term_Paper/Term_Paper.pdf",
            "name": "Designing for immersion: The influence of diegetic player guidance on the gaming experience",
            "description": "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
            "projectPage": "diegesis.html"
        },
        {
            "label": "vorspann",
            "thumbnail": "Ressources/Opening_Credits/Thumbnail.png",
            "type": "iframe",
            "src": "https://www.youtube.com/embed/e4t05vSzYPg",
            "name": "Opening Credits",
            "description": "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
            "projectPage": "openingcredits.html"
        },

        
        {
            "label": "kubistische-portraits",
            "thumbnail": "Ressources/Experimentelles_Projekt/Thumbnail.png",
            "type": "slideshow",
            "images": [
                "Ressources/Experimentelles_Projekt/3.png",
                "Ressources/Experimentelles_Projekt/1.png",
                "Ressources/Experimentelles_Projekt/2.png"
            ],
            "name": "Cubism",
            "description": "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
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

// Funktion zum Öffnen der Lightbox und Laden der Inhalte
// Funktion zum Öffnen der Lightbox und Laden der Inhalte
function openLightbox(project) {
    const template = document.getElementById('lightbox-template');
    const clone = template.content.cloneNode(true);

    // Setze die Daten der Lightbox (Bilder, Titel, Beschreibung, etc.)
    const lightbox = clone.querySelector('.lightbox');
    const imagesContainer = clone.querySelector('.container-waagerecht');
    const dotsContainer = clone.querySelector('.dots-slideshow-waagerecht');
    const projectName = clone.querySelector('.project-name');
    const projectDescription = clone.querySelector('.project-description');
    const projectButton = clone.querySelector('.project-button');

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
        iframe.style.width = "100%";
        iframe.style.height = "100%";
        iframe.frameBorder = "0";
        iframe.allow = "fullscreen";
        imagesContainer.appendChild(iframe);

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
    projectButton.href = project.projectPage;

    // Setze sicher, dass der Button im gleichen Tab öffnet
    projectButton.target = "_self"; // Ensures the project link opens in the same tab

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
        dot.classList.remove('active');
    });

    // Zeige das aktuelle Bild an und setze den aktiven Dot
    slides[currentIndex - 1].style.display = 'block';
    dots[currentIndex - 1].classList.add('active');
}

// Rufe die Funktion auf, um die Projekte zu generieren
generateProjects();
