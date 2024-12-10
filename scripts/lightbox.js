// LIGHTBOX OPEN
  
  document.querySelector('#project-opening-credits').onclick = () => {
    document.querySelector('#lightbox-opening-credits').style.display = 'flex';
    document.body.classList.add('no-scroll');
  };
  
  document.querySelector('#project-term-paper').onclick = () => {
    document.querySelector('#lightbox-term-paper').style.display = 'flex';
    document.body.classList.add('no-scroll');
  };
  
  
  // LIGHTBOX CLOSE
  
  const lightboxes = document.querySelectorAll('.lightbox');
  
  lightboxes.forEach(lightbox => {
    lightbox.querySelector('.close').onclick = () => {
      closeLightbox(lightbox);
    };
  });

  
