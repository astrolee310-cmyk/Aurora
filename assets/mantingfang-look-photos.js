const photos = ['photo1.jpg', 'jimeng-look02.jpg', 'jimeng-look03.jpg', 'jimeng-look04.jpg'];

function updateLookPhotos() {
  document.querySelectorAll('#mfe-looks .mfe-look-grid img').forEach((image, index) => {
    if (!photos[index]) return;
    const source = `/Aurora/mantingfang/${photos[index]}`;
    if (image.getAttribute('src') !== source) {
      image.src = source;
      image.alt = image.alt.replace(/ · AI 真人效果图$/, '') + ' · AI 真人效果图';
    }
  });
}

updateLookPhotos();
new MutationObserver(updateLookPhotos).observe(document.getElementById('root'), {
  childList: true,
  subtree: true,
});
