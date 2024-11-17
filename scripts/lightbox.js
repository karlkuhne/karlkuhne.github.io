// LIGHTBOX OPEN

  
  document.querySelector('#project-opening-credits').onclick = () => {
    document.querySelector('#lightbox-opening-credits').style.display = 'flex';
    document.body.classList.add('no-scroll');
  };
  
  document.querySelector('#project-term-paper').onclick = () => {
    document.querySelector('#lightbox-term-paper').style.display = 'flex';
    document.body.classList.add('no-scroll');
  };
  
  
  
  
  // YOUTUBE PLAYER
  
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
  
  
  // LIGHTBOX CLOSE
  
  const lightboxes = document.querySelectorAll('.lightbox');
  
  lightboxes.forEach(lightbox => {
    lightbox.querySelector('.close').onclick = () => {
      closeLightbox(lightbox);
    };
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === "Escape") {
        // Finde die aktuell sichtbare Lightbox
        const openLightbox = document.querySelector('.lightbox[style*="display: flex"]');
        
        if (openLightbox) {
            // Schließe die Lightbox
            openLightbox.style.display = 'none';
            document.body.classList.remove('no-scroll');
            openLightbox.remove(); // Entfernt die Lightbox aus dem DOM
        }
    }
});

  
