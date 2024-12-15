const iframe = document.querySelector('iframe');

iframe.onload = () => {
    const iframeWidth = iframe.offsetWidth;
    const iframeHeight = iframeWidth * 9 / 16;
    iframe.style.height = iframeHeight + 'px';
};

window.addEventListener('resize', () => {
    const iframeWidth = iframe.offsetWidth;
    const iframeHeight = iframeWidth * 9 / 16;
    iframe.style.height = iframeHeight + 'px';
});