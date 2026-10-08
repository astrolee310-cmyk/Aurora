// Enhance the recovered static preview without replacing its React bundle.
function updateFashionFinale() {
  const section = document.querySelector('.yy-finale:not(.yy-fashion-finale)');
  if (!section) return;
  section.classList.add('yy-fashion-finale');
  section.id = 'yy-editorial';
  section.innerHTML = '<header class="yy-fashion-masthead"><h2>瑶语 · 暗纹</h2><span>THE MOTION ISSUE<br>FASHION EDITORIAL / 04 FRAMES</span><b>YAOYU</b></header><div class="yy-fashion-grid"></div><footer class="yy-fashion-colophon"><span>原创服装设计 / 即梦 AI 时装影像</span><a href="/Aurora/yaoyu/collection.webp" target="_blank" rel="noreferrer">完整系列设计 ↗</a></footer>';
  const shots = [
    ['editorial-look2-full', '01', 'STRIDE', '行走之间', '斜襟裤装迈步全身时装影像'],
    ['editorial-turn', '02', 'TURN', '转身一瞬', '黑纱层叠裙装转身动态时装影像'],
    ['editorial-seated-natural', '03', 'PAUSE', '静中有势', '黑纱长裙自然坐姿，双脚分别落地的时装影像'],
    ['editorial-look5-dynamic', '04', 'UNFOLD', '衣随身动', '披覆裤装拉开衣片的动态时装影像'],
  ];
  shots.forEach(([file, number, title, caption, alt], i) => {
    const article = document.createElement('article');
    article.className = `yy-fashion-pair${i % 2 ? ' is-reversed' : ''}`;
    article.innerHTML = `<div class="yy-fashion-copy"><span>FRAME / ${number}</span><div><h3>${title}</h3><p>${caption}</p><small>HIDDEN PATTERNS</small></div></div><a class="yy-fashion-photo yy-fashion-photo-${number}" href="/Aurora/yaoyu/${file}.webp" target="_blank" rel="noreferrer" aria-label="查看${caption}大片"><img src="/Aurora/yaoyu/${file}.webp" alt="${alt}" loading="lazy"></a>`;
    section.querySelector('.yy-fashion-grid').append(article);
  });
}
new MutationObserver(updateFashionFinale).observe(document.getElementById('root'), {childList:true, subtree:true});
updateFashionFinale();

function updateDetailGallery() {
  const grid = document.querySelector('.yy-archive-grid:not(.yy-detail-gallery)');
  if (!grid) return;
  grid.classList.add('yy-detail-gallery');
  const details = [
    ['editorial-detail', '肩领刺绣', '50% 50%', 1],
    ['editorial-look1-detail', '几何纹与腰结', '65% 65%', 1.2],
    ['editorial-look5-dynamic', '斜向衣片与紫色纹样', '45% 65%', 1.6],
    ['editorial-motion', '黑纱层叠与褶裥', '50% 85%', 1.8],
  ];
  grid.replaceChildren(...details.map(([file, label, position, zoom]) => {
    const link = document.createElement('a');
    link.href = `/Aurora/yaoyu/${file}.webp?v=five-looks`;
    link.target = '_blank';
    link.rel = 'noreferrer';
    link.title = label;
    link.setAttribute('aria-label', `查看${label}大图`);
    link.style.setProperty('--detail-position', position);
    link.style.setProperty('--detail-zoom', zoom);
    const img = document.createElement('img');
    img.src = link.href;
    img.alt = `${label}时装摄影特写`;
    img.loading = 'lazy';
    link.append(img);
    return link;
  }));
}
new MutationObserver(updateDetailGallery).observe(document.getElementById('root'), {childList:true, subtree:true});
updateDetailGallery();
