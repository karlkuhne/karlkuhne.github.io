// Die JSON-Daten mit den Projektinformationen
const projectsData = {
    "projects": [
        {
            "label": "cubistic-portraits",
            "thumbnail": "Ressources/Experimentelles_Projekt/Thumbnail.png",
            "images": [
                "Ressources/Experimentelles_Projekt/3.png",
                "Ressources/Experimentelles_Projekt/1.png",
                "Ressources/Experimentelles_Projekt/2.png"
            ],
            "title": "Cubism",
            "description": "Lorem ipsum dolor sit amet, consetetur sadipscing elitr...",
            "projectPage": "cubism.html"
        },
        {
            "label": "character-design",
            "thumbnail": "Ressources/Character_Design/Thumbnail.png",
            "images": [
                "Ressources/Character_Design/Thumbnail1.png",
                "Ressources/Character_Design/Posen.png",
                "Ressources/Character_Design/Emotions.png"
            ],
            "title": "Character Design",
            "description": "Lorem ipsum dolor sit amet, consetetur sadipscing elitr...",
            "projectPage": "character-design.html"
        }
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
function openLightbox(project) {
    const template = document.getElementById('lightbox-template');
    const clone = template.content.cloneNode(true);

    // Setze die Daten der Lightbox (Bilder, Titel, Beschreibung, etc.)
    const lightbox = clone.querySelector('.lightbox');
    const imagesContainer = clone.querySelector('.container-waagerecht');
    const dotsContainer = clone.querySelector('.dots-slideshow-waagerecht');
    const projectTitle = clone.querySelector('.project-title');
    const projectDescription = clone.querySelector('.project-description');
    const projectButton = clone.querySelector('.project-button');

    // Bilder und Dots generieren
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

    // Textinhalt der Lightbox
    projectTitle.textContent = project.title;
    projectDescription.textContent = project.description;
    projectButton.href = project.projectPage;

    // Füge die Lightbox zum Body hinzu und öffne sie
    document.body.appendChild(clone);
    lightbox.style.display = 'flex';
    document.body.classList.add('no-scroll');

    // Setze den aktuellen Index auf 1 (startet bei der ersten Folie)
    currentIndex = 1;
    showSlides(currentIndex); // Zeigt das erste Bild und markiert den ersten Dot als aktiv

    // Event Listener für das Schließen der Lightbox
    const closeBtn = lightbox.querySelector('.close');
    closeBtn.addEventListener('click', () => {
        lightbox.style.display = 'none';
        document.body.classList.remove('no-scroll');
        lightbox.remove();
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
        dot.classList.remove('active');
    });

    // Zeige das aktuelle Bild an und setze den aktiven Dot
    slides[currentIndex - 1].style.display = 'block';
    dots[currentIndex - 1].classList.add('active');
}



// Rufe die Funktion auf, um die Projekte zu generieren
generateProjects();
