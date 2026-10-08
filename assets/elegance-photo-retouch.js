const selector = '.el-photo-wall img, .el-wall-lightbox img';
function updateRetouchedPhotos() {
  document.querySelectorAll(selector).forEach(image => {
    const source = image.getAttribute('src');
    if (/^\/elegance\/look-1(?:-retouched)?\.webp$/.test(source || '')) {
      image.src = '/Aurora/elegance/look-1-editorial-jimeng.webp';
    } else if (source === '/Aurora/elegance/look-2.webp') {
      image.src = source.replace('.webp', '-retouched.webp');
    }
    if (image.getAttribute('src') === '/Aurora/elegance/look-1-editorial-jimeng.webp') {
      const caption = image.closest('.el-wall-tile')?.querySelector('figcaption > small');
      if (caption && caption.textContent !== 'AI 视觉演绎 / 03') caption.textContent = 'AI 视觉演绎 / 03';
    }
  });
}
updateRetouchedPhotos();
new MutationObserver(updateRetouchedPhotos).observe(document.getElementById('root'), {
  childList: true, subtree: true, attributes: true, attributeFilter: ['src'],
});
