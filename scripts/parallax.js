document.addEventListener('scroll', function () {
    var scrolled = window.scrollY;
    var parallax = document.querySelector('.parallax');
    var offset = scrolled * 0.2;
    parallax.style.backgroundPositionY = offset + 'px';
  });