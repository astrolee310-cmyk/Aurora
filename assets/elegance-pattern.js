function updatePattern() {
  const image = document.querySelector('.el-origin-art img');
  const link = document.querySelector('.el-origin-art a');
  if (image && link) {
    const mask = document.createElement('span');
    mask.className = 'el-pattern-image';
    mask.setAttribute('role', 'img');
    mask.setAttribute('aria-label', '完整原创纹样：对称云纹、水波与下垂纹饰');
    mask.style.setProperty('--pattern-color', '#9b5a32');
    image.replaceWith(mask);
    link.href = '/Aurora/elegance/pattern-psd.png';
  }
  document.querySelectorAll('.el-palette > div').forEach((item, index) => {
    const color = item.querySelector('i')?.style.backgroundColor;
    const name = item.querySelector('span')?.textContent || '';
    const button = document.createElement('button');
    button.type = 'button';
    button.className = index === 3 ? 'is-selected' : '';
    button.setAttribute('aria-label', `纹样颜色：${name}`);
    button.setAttribute('aria-pressed', index === 3 ? 'true' : 'false');
    button.innerHTML = item.innerHTML;
    button.addEventListener('click', () => {
      const target = document.querySelector('.el-pattern-image');
      if (!target) return;
      target.style.setProperty('--pattern-color', color);
      document.querySelectorAll('.el-palette button').forEach(other => {
        other.classList.remove('is-selected');
        other.setAttribute('aria-pressed', 'false');
      });
      button.classList.add('is-selected');
      button.setAttribute('aria-pressed', 'true');
    });
    item.replaceWith(button);
  });
}
updatePattern();
new MutationObserver(updatePattern).observe(document.getElementById('root'), {childList:true, subtree:true});
