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
  
  
  // SLIDESHOW
  
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
  
  // CHARACTER DESIGN SHLIDESHOW CONTROLS
  function plusCharacterDesignSlides(n) {
    characterDesignSlideIndex = plusSlides(n, characterDesignSlideIndex, "character-design-slides", "dot");
  }
  
  function currentCharacterDesignSlide(n) {
    characterDesignSlideIndex = currentSlide(n, "character-design-slides", "dot");
  }
  
  // CUBISM SLIDESHOW CONTROLS
  function plusCubismSlides(n) {
    cubismSlideIndex = plusSlides(n, cubismSlideIndex, "cubism-slides", "dot1");
  }
  
  function currentCubismSlide(n) {
    cubismSlideIndex = currentSlide(n, "cubism-slides", "dot1");
  }