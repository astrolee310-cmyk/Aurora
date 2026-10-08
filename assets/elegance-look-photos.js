import {eleganceEndingMarkup, bindEleganceEnding} from '/Aurora/elegance-ending.js';
import './elegance-border-glow.js';
// Adapt the existing static preview without replacing its shared React bundle.
function updateElegancePhotos() {
  const finale = document.querySelector('.el-finale');
  if (finale && !finale.parentElement.querySelector('.el-ending')) {
    const ending = document.createElement('div');
    ending.className = 'el-ending';
    ending.innerHTML = eleganceEndingMarkup;
    bindEleganceEnding(ending, () => finale.querySelector('footer button:last-child')?.click());
    finale.after(ending);
  }
  const toile = document.querySelector('.el-toile-silhouette > img[src="/Aurora/elegance/toile-2-cutout.png"]');
  if (toile) toile.src = '/Aurora/elegance/toile-2-front.webp';
  const lineup = document.querySelector('.el-lineup');
  if (lineup) {
    lineup.querySelectorAll('a[href="/Aurora/elegance/lineup-full.webp"]').forEach(a => {
      a.href = '/Aurora/elegance/lineup-clean.webp';
      if (!a.querySelector('img')) a.textContent = '查看原尺寸 · 7016 × 2367 ↗';
    });
    const artwork = lineup.querySelector('img[src="/Aurora/elegance/lineup-full.webp"]');
    if (artwork) { artwork.src = '/Aurora/elegance/lineup-clean.webp'; artwork.height = 2367; }
  }
  const paletteLabels = document.querySelector('#el-design-look-panel .el-design-palette + p');
  if (paletteLabels && !paletteLabels.classList.contains('el-design-palette-labels')) {
    paletteLabels.classList.add('el-design-palette-labels');
    paletteLabels.replaceChildren(...['米白', '浅茶', '深褐'].map(label => {
      const span = document.createElement('span');
      span.textContent = label;
      return span;
    }));
  }
  const photo = document.querySelector('#el-design-look-panel .el-design-look > img');
  if (!photo) return;
  const match = photo.getAttribute('src')?.match(/\/design-model-([1-4])-clean\.png$/);
  if (!match) return;
  const look = match[1];
  photo.src = `/Aurora/elegance/design-photo-${look}-jimeng.webp`;
  photo.width = 480;
  photo.height = 720;
  photo.alt = `闲来弄风雅 LOOK 0${look}，浅灰白背景的 AI 写实成衣演绎`;
  const caption = photo.parentElement.querySelector('p');
  if (caption && !caption.querySelector('.el-design-photo-credit')) {
    const credit = document.createElement('small');
    credit.className = 'el-design-photo-credit';
    credit.textContent = 'AI 写实演绎 · 即梦';
    caption.append(credit);
  }
}
new MutationObserver(updateElegancePhotos).observe(document.getElementById('root'), {
  childList: true,
  subtree: true,
  attributes: true,
  attributeFilter: ['src'],
});
updateElegancePhotos();
