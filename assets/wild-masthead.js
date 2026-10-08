// Preserve the existing React button handlers in this static preview.
const ornamentMarkup = await fetch('/Aurora/wild-growth/liquid-flourish.svg').then(response => {
  if (!response.ok) throw new Error('Closing ornament could not be loaded');
  return response.text();
});
const bottomOrnamentMarkup = await fetch('/Aurora/wild-growth/liquid-flourish-bottom.svg').then(response => {
  if (!response.ok) throw new Error('Bottom closing ornament could not be loaded');
  return response.text();
});
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
function updateMasthead() {
  const page = document.querySelector('.wg-page');
  const header = page?.querySelector('.wg-nav');
  if (!header || header.classList.contains('wg-nav-chapters')) return;
  const buttons = [...page.querySelectorAll('.wg-side-nav button')];
  if (buttons.length !== 4) return;
  const originals = [...page.querySelectorAll('.wg-side-nav')];
  for (const [index, side] of ['left', 'right'].entries()) {
    const nav = document.createElement('nav');
    nav.className = 'wg-header-chapters wg-header-chapters-' + side;
    nav.setAttribute('aria-label', side === 'left' ? '作品章节导航左组' : '作品章节导航右组');
    nav.append(...buttons.slice(index * 2, index * 2 + 2));
    header.append(nav);
  }
  originals.forEach(nav => nav.remove());
  header.classList.add('wg-nav-chapters');
}
function updateClosingOrnament() {
  const page = document.querySelector('.wg-page');
  const original = page?.querySelector('.wg-closing > .wg-flourish:not(.wg-liquid-flourish)');
  if (original) {
    const ornament = document.createElement('div');
    ornament.className = 'wg-flourish wg-liquid-flourish';
    ornament.setAttribute('aria-hidden', 'true');
    ornament.innerHTML = ornamentMarkup;
    original.replaceWith(ornament);
  }
  const backButton = page?.querySelector('.wg-closing > button');
  if (backButton && !page.querySelector('.wg-liquid-flourish-bottom')) {
    const ornament = document.createElement('div');
    ornament.className = 'wg-flourish wg-liquid-flourish wg-liquid-flourish-bottom';
    ornament.setAttribute('aria-hidden', 'true');
    ornament.innerHTML = bottomOrnamentMarkup;
    backButton.after(ornament);
  }
  if (!page) return;
  const moving = !reducedMotion.matches && page.querySelector('.wg-motion-toggle')?.getAttribute('aria-pressed') === 'true';
  for (const svg of page.querySelectorAll('.wg-liquid-ornament')) {
    if (svg.dataset.moving === String(moving)) continue;
    svg.dataset.moving = String(moving);
    if (moving) svg.unpauseAnimations();
    else svg.pauseAnimations();
  }
}
function updatePage() {
  const journalTitle = document.querySelector('.wg-page #wg-journal-title');
  if (journalTitle && journalTitle.textContent !== '把野性，带进日常') journalTitle.textContent = '把野性，带进日常';
  document.querySelector('.wg-page > .wg-discover')?.remove();
  updateMasthead();
  updatePortfolioMenu();
  updateClosingOrnament();
  document.querySelector('.wg-page .wg-closing > button')?.remove();
  updateInspirationBoard();
  const note = document.querySelector('.wg-story-heading .wg-story-note');
  const board = document.querySelector('#wg-story .wg-reference-board');
  if (note && board) board.append(note);
  updateChapterOrder();
}
function updatePortfolioMenu() {
  const page = document.querySelector('.wg-page');
  if (!page) { document.querySelector('.wg-preview-menu')?.remove(); return; }
  const original = page.querySelector('.wg-back');
  if (!original || page.querySelector('.wg-menu-toggle')) return;
  const button = document.createElement('button');
  button.className = 'wg-menu-toggle';
  button.type = 'button';
  button.setAttribute('aria-label', '打开作品集菜单');
  button.setAttribute('aria-expanded', 'false');
  button.setAttribute('aria-controls', 'wg-portfolio-menu');
  button.title = '作品集菜单';
  button.innerHTML = '<span class="sm-icon" aria-hidden="true"><span class="sm-icon-line"></span><span class="sm-icon-line sm-icon-line-v"></span></span>';
  original.parentElement.classList.add('wg-preview-menu-actions');
  original.replaceWith(button);
  const wrapper = document.createElement('div');
  wrapper.className = 'staggered-menu-wrapper fixed-wrapper portfolio-menu wg-preview-menu';
  const panel = document.createElement('nav');
  panel.className = 'staggered-menu-panel';
  panel.id = 'wg-portfolio-menu';
  panel.setAttribute('aria-label', '作品集导航');
  const list = document.createElement('ul');
  list.className = 'sm-panel-list';
  list.setAttribute('data-numbering', 'true');
  const items = [['首页','/Aurora/'],['规则人生','/Aurora/?series=rules'],['闲来弄风雅','/Aurora/?series=elegance'],['野蛮生长','/Aurora/?series=wild'],['瑶语·暗纹','/Aurora/?series=yaoyu'],['满庭芳·谷雨茶韵','/Aurora/?series=mantingfang'],['家彩彝绣','/Aurora/jiacai/index.html'],['关于','/Aurora/?series=about']];
  for (const [index, [label, href]] of items.entries()) {
    const item = document.createElement('li');
    item.className = 'sm-panel-itemWrap';
    const link = document.createElement('a');
    link.className = 'sm-panel-item';
    link.href = href;
    link.textContent = label;
    link.setAttribute('data-index', String(index + 1).padStart(2, '0'));
    item.append(link);
    list.append(item);
  }
  panel.append(list);
  wrapper.append(panel);
  document.body.append(wrapper);
  panel.inert = true;
  const setOpen = open => {
    wrapper.toggleAttribute('data-open', open);
    panel.inert = !open;
    button.setAttribute('aria-expanded', String(open));
    button.setAttribute('aria-label', open ? '关闭作品集菜单' : '打开作品集菜单');
  };
  button.addEventListener('click', () => setOpen(button.getAttribute('aria-expanded') !== 'true'));
  const abort = new AbortController();
  document.addEventListener('keydown', event => {
    if (!button.isConnected) { abort.abort(); wrapper.remove(); return; }
    if (event.key === 'Escape' && button.getAttribute('aria-expanded') === 'true') { setOpen(false); button.focus(); }
  }, {signal:abort.signal});
  document.addEventListener('pointerdown', event => {
    if (!button.isConnected) { abort.abort(); wrapper.remove(); return; }
    if (!panel.contains(event.target) && !button.contains(event.target)) setOpen(false);
  }, {signal:abort.signal});
}
function updateChapterOrder() {
  const page = document.querySelector('.wg-page');
  const story = page?.querySelector('#wg-story');
  const collection = page?.querySelector('#wg-collection');
  if (!story || !collection) return;
  if (story.nextElementSibling !== collection) collection.before(story);
  for (const [section, label] of [[story, '01 / THE INSPIRATION ARCHIVE'], [collection, '02 / THE COLLECTION']]) {
    const kicker = section.querySelector('.wg-kicker');
    if (kicker && kicker.textContent !== label) kicker.textContent = label;
  }
  const nav = page.querySelector('.wg-header-chapters-left');
  const inspiration = nav?.querySelector('button:last-child');
  if (inspiration?.textContent.includes('Inspiration')) nav.prepend(inspiration);
}
function updateInspirationBoard() {
  const board = document.querySelector('#wg-story .wg-editorial-grid');
  if (!board || board.classList.contains('wg-reference-board')) return;
  const photo = document.createElement('img');
  photo.src = '/Aurora/wild-growth/inspiration-board.webp';
  photo.alt = '系列灵感拼贴：蝶翼、解剖结构、黑色服装与包袋';
  photo.loading = 'lazy';
  const button = document.createElement('button');
  button.className = 'wg-image';
  button.setAttribute('aria-label', '放大：' + photo.alt);
  button.append(photo);
  const dialog = document.createElement('dialog');
  dialog.className = 'wg-lightbox';
  const close = document.createElement('button');
  close.className = 'wg-lightbox-close';
  close.textContent = '\u00d7';
  close.setAttribute('aria-label', '关闭大图');
  close.addEventListener('click', () => dialog.close());
  const enlarged = photo.cloneNode();
  enlarged.loading = 'eager';
  dialog.append(close, enlarged);
  button.addEventListener('click', () => dialog.showModal());
  dialog.addEventListener('click', event => {
    if (event.target === dialog) dialog.close();
  });
  board.classList.remove('wg-inspiration-board');
  board.classList.add('wg-reference-board');
  board.replaceChildren(button, dialog);
}
new MutationObserver(updatePage).observe(document.getElementById('root'), {childList:true, subtree:true, attributes:true, attributeFilter:['aria-pressed']});
reducedMotion.addEventListener('change', updateClosingOrnament);
updatePage();
