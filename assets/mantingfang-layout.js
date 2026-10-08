const chapters = [
  ['#mfe-origin', '01 / INSPIRATION', '溯春', 'Inspiration'],
  ['#mfe-looks', '02 / COLLECTION', '叠衣', 'Collection'],
  ['#mfe-research', '03 / PATTERNS', '绘纹', 'Patterns'],
  ['.mfe-flower', '04 / EDITORIAL', '芳映', 'Editorial'],
];
const subheadings = [
  ['.mfe-origin-copy > span', '谷雨寻意 / TEA & BLOSSOM'],
  ['.mfe-palette .mfe-eyebrow', '春色入衣 / COLOUR STORY'],
  ['#mfe-looks > .mfe-heading .mfe-eyebrow', '宋韵叠衣 / COLLECTION'],
  ['#mfe-research .mfe-heading .mfe-eyebrow', '牡丹入纹 / PATTERN STUDY'],
  ['.mfe-flower > div > .mfe-eyebrow', '春日余芳 / A MOMENT IN BLOOM'],
];
const names = ['短衫叠穿', '大袖晴蓝', '藕色长背心', '长衫与褙子'];
const photos = ['photo1.jpg', 'jimeng-look02.jpg', 'jimeng-look03.jpg', 'editorial-look04-clean-4k.png'];
const patternBoards = [
  [['look01-01', '牡丹、四合如意与几何纹样']],
  [['look02-01', '牡丹与落花流水纹'], ['look02-02', '四合如意与几何纹样']],
  [['look03-01', '牡丹缠枝、牡丹卷草与落花流水纹']],
  [['look04-01', '牡丹缠枝、散点与几何纹样'], ['look04-02', '团窠牡丹纹的拆分与重组']],
];

function installFooter(page) {
  const footer = page.querySelector('.mfe-footer');
  if (!footer || footer.querySelector('.mfe-footer-layout')) return;
  const originalTitle = footer.querySelector(':scope > span');
  const originalEnglish = footer.querySelector(':scope > p');
  const originalActions = footer.querySelector(':scope > div');
  const originalBack = originalActions?.querySelector('button');
  const originalCredit = originalActions?.querySelector('small');
  const originalTop = originalActions?.querySelector('button:last-child');
  const text = (tag, content, className) => {
    const node = document.createElement(tag);
    node.textContent = content;
    if (className) node.className = className;
    return node;
  };
  const scroll = selector => page.querySelector(selector)?.scrollIntoView({
    behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
  });
  const command = (label, action) => {
    const button = text('button', label);
    button.addEventListener('click', action);
    return button;
  };
  const layout = document.createElement('div');
  layout.className = 'mfe-footer-layout';
  const columns = document.createElement('div');
  columns.className = 'mfe-footer-columns';
  const identity = document.createElement('div');
  identity.className = 'mfe-footer-identity';
  identity.append(text('p', originalTitle?.textContent || '满庭芳 · 谷雨茶韵'));
  identity.append(text('small', originalEnglish?.textContent || 'The art of a quiet spring.'));
  const copy = page.querySelector('.mfe-story-copy > p');
  if (copy) identity.append(copy.cloneNode(true));
  const series = document.createElement('nav');
  series.setAttribute('aria-label', '页尾系列导航');
  series.append(text('h3', '探索系列'));
  const descriptions = ['谷雨寻意', '四套设计', '纹样研究', '成衣影像'];
  chapters.forEach(([selector, , cn], index) => {
    series.append(command(`${cn} · ${descriptions[index]}`, () => scroll(selector)));
  });
  const design = document.createElement('nav');
  design.setAttribute('aria-label', '页尾设计导航');
  design.append(text('h3', '关于设计'),
    command('灵感研究', () => scroll('#mfe-origin')),
    command('设计师作品集 ↗', () => originalBack?.click()),
    command('返回顶部 ↑', () => originalTop?.click()));
  const contact = document.createElement('div');
  contact.className = 'mfe-footer-contact';
  const link = text('a', '联系设计师 ↗');
  link.href = 'mailto:17829650431@163.com';
  const email = text('a', '17829650431@163.com', 'mfe-contact-detail');
  email.href = link.href;
  const phone = text('a', '17829650431', 'mfe-contact-detail');
  phone.href = 'tel:17829650431';
  contact.append(text('h3', '从一份心意开始'), text('p', '欢迎交流服装、影像与设计合作。'), link, email, phone);
  columns.append(identity, series, design, contact);
  const bottom = document.createElement('div');
  bottom.className = 'mfe-footer-bottom';
  bottom.append(text('span', originalTitle?.textContent || '满庭芳 · 谷雨茶韵'),
    text('span', originalCredit?.textContent || '主视觉 / 即梦生成 · 服装设计以原稿为准'),
    text('span', 'AURORA LEE / PORTFOLIO'));
  layout.append(columns, bottom);
  footer.append(layout);
  for (const node of [originalTitle, originalEnglish, originalActions]) if (node) node.hidden = true;
}

function installPatternStudy(page, research) {
  if (!research || research.querySelector('.mfe-pattern-study')) return;
  const fallback = research.querySelector('.mfe-research-grid');
  if (fallback) fallback.hidden = true;
  const study = document.createElement('div');
  study.className = 'mfe-pattern-study';
  const tabs = document.createElement('div');
  tabs.className = 'mfe-pattern-tabs';
  tabs.setAttribute('role', 'tablist');
  tabs.setAttribute('aria-label', '四套服装纹样版');
  const dialog = document.createElement('dialog');
  dialog.className = 'mfe-modal mfe-pattern-modal';
  dialog.setAttribute('aria-label', '纹样原稿放大查看');
  const dialogHeader = document.createElement('header');
  const dialogTitle = document.createElement('span');
  const closeButton = document.createElement('button');
  closeButton.textContent = '关闭 ×';
  const original = document.createElement('img');
  let trigger;
  const close = () => { dialog.close(); original.removeAttribute('src'); trigger?.focus(); };
  closeButton.addEventListener('click', close);
  dialog.addEventListener('cancel', event => { event.preventDefault(); close(); });
  dialog.addEventListener('keydown', event => event.stopPropagation());
  dialog.addEventListener('click', event => { if (event.target === dialog) close(); });
  dialogHeader.append(dialogTitle, closeButton);
  dialog.append(dialogHeader, original);
  const buttons = [], panels = [];
  const select = index => {
    buttons.forEach((button, i) => {
      button.setAttribute('aria-selected', String(i === index));
      button.tabIndex = i === index ? 0 : -1;
      panels[i].hidden = i !== index;
    });
  };
  patternBoards.forEach((boards, index) => {
    const look = `LOOK 0${index + 1}`;
    const tab = document.createElement('button');
    tab.id = `mfe-pattern-tab-${index + 1}`;
    tab.setAttribute('role', 'tab');
    tab.setAttribute('aria-controls', `mfe-pattern-panel-${index + 1}`);
    const number = document.createElement('small');
    number.textContent = look;
    const name = document.createElement('span');
    name.textContent = names[index];
    tab.append(number, name);
    const panel = document.createElement('div');
    panel.id = `mfe-pattern-panel-${index + 1}`;
    panel.className = 'mfe-pattern-panel';
    panel.setAttribute('role', 'tabpanel');
    panel.setAttribute('aria-labelledby', tab.id);
    panel.tabIndex = 0;
    boards.forEach(([file, title], boardIndex) => {
      const board = document.createElement('button');
      board.className = 'mfe-board mfe-pattern-board';
      board.setAttribute('aria-label', `放大查看 ${look} ${title}`);
      const image = document.createElement('img');
      image.src = `/Aurora/mantingfang/patterns/${file}.webp`;
      image.alt = `${look} ${names[index]}：${title} 原始纹样版`;
      image.loading = 'lazy';
      image.width = 2800;
      image.height = 1980;
      const label = document.createElement('span');
      label.textContent = `${look} / ${String(boardIndex + 1).padStart(2, '0')}　${title}`;
      const arrow = document.createElement('b');
      arrow.textContent = '↗';
      label.append(arrow);
      board.append(image, label);
      board.addEventListener('click', () => {
        trigger = board;
        dialogTitle.textContent = `${look} / ${title}`;
        original.src = `/Aurora/mantingfang/patterns/${file}-original.jpg`;
        original.alt = image.alt;
        dialog.showModal();
        closeButton.focus();
      });
      panel.append(board);
    });
    tab.addEventListener('click', () => select(index));
    tab.addEventListener('keydown', event => {
      const targets = { ArrowRight: (index + 1) % 4, ArrowLeft: (index + 3) % 4, Home: 0, End: 3 };
      if (!(event.key in targets)) return;
      event.preventDefault();
      select(targets[event.key]);
      buttons[targets[event.key]].focus();
    });
    buttons.push(tab);
    panels.push(panel);
    tabs.append(tab);
  });
  study.append(tabs, ...panels);
  research.append(study);
  page.append(dialog);
  select(0);
}

function caption(en, cn) {
  const node = document.createElement('header');
  node.className = 'mfe-chapter-caption';
  const number = document.createElement('span');
  number.textContent = en;
  const title = document.createElement('span');
  title.textContent = cn;
  node.append(number, title);
  return node;
}

function enhance(page) {
  installFooter(page);
  const research = page.querySelector('#mfe-research');
  const fabric = research?.querySelector('img[src="/Aurora/mantingfang/fabric.jpg"]')?.closest('.mfe-board');
  if (fabric) fabric.hidden = true;
  installPatternStudy(page, research);
  page.querySelectorAll('.mfe-look-grid > button > img').forEach((image, index) => {
    const src = `/Aurora/mantingfang/${photos[index]}`;
    if (photos[index] && image.getAttribute('src') !== src) image.src = src;
  });
  if (!page.classList.contains('mfe-editorial-layout')) {
    page.classList.add('mfe-editorial-layout');
    const header = page.querySelector('.mfe-nav');
    const originalNav = header.querySelector('nav');
    const originalHome = header.querySelector('.mfe-logo');
    const originalBack = originalNav.lastElementChild;
    originalNav.hidden = true;
    originalHome.hidden = true;
    const scroll = selector => page.querySelector(selector)?.scrollIntoView({
      behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
    });
    const brand = document.createElement('button');
    brand.className = 'mfe-portfolio-brand';
    brand.textContent = 'AURORA LEE';
    brand.title = '返回作品集';
    brand.addEventListener('click', () => originalBack.click());
    const title = document.createElement('button');
    title.className = 'mfe-series-title';
    title.textContent = '满庭芳';
    title.addEventListener('click', () => originalHome.click());
    const back = document.createElement('button');
    back.className = 'mfe-return';
    back.textContent = '↗';
    back.title = '返回作品集';
    back.setAttribute('aria-label', '返回作品集');
    back.addEventListener('click', () => originalBack.click());
    const makeNav = (items, side) => {
      const nav = document.createElement('nav');
      nav.className = `mfe-chapter-nav mfe-chapter-${side}`;
      nav.setAttribute('aria-label', side === 'left' ? '溯春与叠衣' : '绘纹与芳映');
      for (const [selector, , cn, en] of items) {
        const button = document.createElement('button');
        const label = document.createElement('span');
        label.textContent = cn;
        const english = document.createElement('small');
        english.textContent = en;
        english.lang = 'en';
        const slash = document.createElement('span');
        slash.className = 'mfe-nav-slash';
        slash.textContent = ' / ';
        slash.setAttribute('aria-hidden', 'true');
        button.append(label, slash, english);
        button.addEventListener('click', () => scroll(selector));
        nav.append(button);
      }
      return nav;
    };
    header.append(brand, makeNav(chapters.slice(0, 2), 'left'), title, makeNav(chapters.slice(2), 'right'), back);

    const origin = document.createElement('section');
    origin.id = 'mfe-origin';
    origin.className = 'mfe-origin';
    origin.append(caption(chapters[0][1], chapters[0][2]));
    const spread = document.createElement('div');
    spread.className = 'mfe-origin-spread';
    const board = document.createElement('button');
    board.className = 'mfe-origin-art';
    board.setAttribute('aria-label', '放大查看原始灵感板');
    const image = document.createElement('img');
    image.src = '/Aurora/mantingfang/inspiration.jpg';
    image.alt = '满庭芳原始灵感板：谷雨、点茶、牡丹与宋韵衣裳';
    image.loading = 'lazy';
    board.append(image);
    board.addEventListener('click', () => page.querySelector('.mfe-story .mfe-link')?.click());
    const copy = document.createElement('div');
    copy.className = 'mfe-origin-copy';
    const kicker = document.createElement('span');
    kicker.textContent = subheadings[0][1];
    const heading = document.createElement('h2');
    heading.textContent = '谷雨茶韵';
    const paragraph = document.createElement('p');
    paragraph.textContent = '从谷雨时节的春茶与花事出发，将宋代点茶的雅趣融入衣裳。取牡丹的盛放、青瓷的温润与古画中的层叠轮廓，让一季春色成为衣着的气度。';
    const note = document.createElement('p');
    note.className = 'mfe-origin-note';
    note.textContent = '谷雨 · 点茶 · 牡丹 · 宋韵';
    copy.append(kicker, heading, paragraph, note);
    spread.append(board, copy);
    origin.append(spread);
    page.querySelector('.mfe-cover').after(origin);
    for (const [selector, en, cn] of chapters.slice(1)) {
      page.querySelector(selector)?.prepend(caption(en, cn));
    }
    page.querySelector('.mfe-cover-scroll')?.addEventListener('click', event => {
      event.stopPropagation();
      scroll('#mfe-origin');
    });

    const detail = page.querySelector('.mfe-detail');
    const figure = document.createElement('figure');
    figure.className = 'mfe-selected-look';
    const photo = document.createElement('img');
    photo.loading = 'lazy';
    const credit = document.createElement('figcaption');
    figure.append(photo, credit);
    detail?.append(figure);
  }

  for (const [selector, label] of subheadings) {
    const node = page.querySelector(selector);
    if (node && node.textContent !== label) node.textContent = label;
  }

  // Keep the added photo in sync with React's existing look selector.
  const detail = page.querySelector('.mfe-detail');
  const active = [...(detail?.querySelectorAll('.mfe-tabs button') || [])].findIndex(button => button.getAttribute('aria-pressed') === 'true');
  const figure = detail?.querySelector('.mfe-selected-look');
  if (figure && active >= 0 && figure.dataset.look !== String(active)) {
    figure.dataset.look = String(active);
    figure.querySelector('img').src = `/Aurora/mantingfang/${photos[active]}`;
    figure.querySelector('img').alt = `LOOK 0${active + 1} ${names[active]} 已确认成衣效果`;
    figure.querySelector('figcaption').textContent = `LOOK 0${active + 1} / ${names[active]}`;
  }
}

function update() {
  document.querySelectorAll('.mfe').forEach(enhance);
}
const root = document.getElementById('root');
if (root) {
  new MutationObserver(update).observe(root, { childList: true, subtree: true, attributes: true, attributeFilter: ['aria-pressed'] });
  update();
}
