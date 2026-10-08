// Keep the recovered static preview aligned with the editable series source.
function updateShapeStudy() {
  const title = document.querySelector('#yy-home h1 > span');
  if (title && title.textContent !== '瑶语·暗纹') title.textContent = '瑶语·暗纹';
  for (const paragraph of document.querySelectorAll('#yy-origin .yy-origin-copy article p')) {
    if (paragraph.textContent.startsWith('色彩运用上使用瑶族经典的黑白搭配')) paragraph.remove();
  }
  const section = document.querySelector('#yy-shape');
  const original = section?.querySelector('.yy-editorial');
  if (!original) return;
  const board = original.querySelector('.yy-board');
  if (!board) return;
  const study = document.createElement('div');
  study.className = 'yy-shape-study';
  const heading = document.createElement('div');
  heading.className = 'yy-shape-heading';
  heading.innerHTML = '<h2>FORM &amp;<br>VOLUME</h2><div><h3>廓形研究 · 让纹样遇见立体的形</h3><p>从参考造型中观察宽肩、披覆、长衣与层叠关系，再通过轮廓线提炼服装的体积和比例。将扩张、包裹与流动的造型语言，转化为瑶语系列的当代轮廓。</p></div>';
  const figure = document.createElement('figure');
  figure.className = 'yy-shape-board';
  const imageLink = board.cloneNode(true);
  imageLink.className = '';
  imageLink.querySelector('span')?.remove();
  imageLink.setAttribute('aria-label', '查看廓形研究完整设计版');
  const caption = document.createElement('figcaption');
  const label = document.createElement('span');
  label.textContent = '系列前期造型研究 / SILHOUETTE REFERENCES';
  const link = board.cloneNode(false);
  link.className = '';
  link.textContent = '查看完整设计版 ↗';
  caption.append(label, link);
  figure.append(imageLink, caption);
  const notes = document.createElement('div');
  notes.className = 'yy-shape-notes';
  for (const [index, title, copy] of [
    ['01 / SHOULDER', '肩部 · 扩张与包裹', '以宽肩、披肩领与兜帽建立上身体积，在向外扩张与向内包裹之间，形成鲜明的肩部轮廓。'],
    ['02 / STRUCTURE', '衣身 · 分割与长线条', '通过斜向衣片、不对称开合与腰部收束组织衣身，让长衣和长裤延续利落的纵向比例。'],
    ['03 / LAYERING', '下摆 · 层叠与流动', '将披覆、长短叠合与拖尾延伸至下摆，以不同长度和松量，让静态轮廓拥有流动的层次。'],
  ]) {
    const article = document.createElement('article');
    for (const [tag, text] of [['span', index], ['h3', title], ['p', copy]]) {
      const element = document.createElement(tag);
      element.textContent = text;
      article.append(element);
    }
    notes.append(article);
  }
  study.append(heading, figure, notes);
  original.replaceWith(study);
}
new MutationObserver(updateShapeStudy).observe(document.getElementById('root'), {childList:true, subtree:true});
updateShapeStudy();
