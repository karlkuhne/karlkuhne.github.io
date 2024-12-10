
  // LIGHTBOX CLOSE
  
  const lightboxes = document.querySelectorAll('.lightbox');
  
  lightboxes.forEach(lightbox => {
    lightbox.querySelector('.close').onclick = () => {
      closeLightbox(lightbox);
    };
  });

  
