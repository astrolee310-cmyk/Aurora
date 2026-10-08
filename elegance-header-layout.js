function updateEleganceSectionTitles() {
  const sections = [
    ['#el-origin','01 / INSPIRATION','寻意'],
    ['#el-looks','02 / COLLECTION','观衣'],
    ['#el-craft','03 / DETAILS','入微'],
    ['.el-finale','04 / AFTERGLOW','留韵']
  ];
  for (const [selector, en, cn] of sections) {
    const section = document.querySelector(`.el-page ${selector}`);
    const caption = section?.querySelector(':scope>.el-caption');
    const labels = caption?.querySelectorAll(':scope>span');
    if (!labels || labels.length !== 2) continue;
    if (labels[0].textContent !== en) labels[0].textContent = en;
    if (labels[1].textContent !== cn) labels[1].textContent = cn;
  }
}
function updateEleganceHeader() {
  updateEleganceSectionTitles();
  const header = document.querySelector('.el-page .el-nav');
  const content = header?.querySelector('.glass-surface__content');
  if (!content || content.querySelector('.el-header-links')) return;
  const page = header.closest('.el-page');
  content.querySelector('nav')?.remove();
  page.querySelector('.el-side-nav')?.remove();
  content.querySelector('.el-series-title')?.remove();
  content.querySelector('.el-brand>span')?.remove();
  const makeNav = (items, className, label) => {
    const nav = document.createElement('nav');
    nav.className = `el-header-links ${className}`;
    nav.setAttribute('aria-label', label);
    for (const [selector, cn, en] of items) {
      const button = document.createElement('button');
      const text = document.createElement('span');
      text.textContent = cn;
      const slash = document.createElement('span');
      slash.className = 'el-nav-slash';
      slash.setAttribute('aria-hidden', 'true');
      slash.textContent = ' / ';
      const english = document.createElement('small');
      english.lang = 'en';
      english.textContent = en;
      button.append(text, slash, english);
      button.addEventListener('click', () => page.querySelector(selector)?.scrollIntoView({
        behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
      }));
      nav.append(button);
    }
    return nav;
  };
  const title = document.createElement('button');
  title.className = 'el-series-title';
  title.textContent = '闲来弄风雅';
  title.addEventListener('click', () => page.querySelector('#el-home')?.scrollIntoView({
    behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
  }));
  const space = content.querySelector('.el-menu-space');
  content.insertBefore(makeNav([['#el-origin','寻意','Inspiration'],['#el-looks','观衣','Collection']], 'el-header-left', '系列起点与成衣'), space);
  content.insertBefore(title, space);
  content.insertBefore(makeNav([['#el-craft','入微','Details'],['.el-finale','留韵','Afterglow']], 'el-header-right', '制作过程与结语'), space);
}
new MutationObserver(updateEleganceHeader).observe(document.getElementById('root'), {
  childList: true, subtree: true
});
updateEleganceHeader();
