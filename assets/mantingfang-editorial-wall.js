const frames = [
  ['photo5.jpg', '牡丹入衣', 'DETAIL / LOOK 01', 'wide'],
  ['photo1.jpg', '短衫叠穿', 'LOOK 01', 'portrait'],
  ['jimeng-look02.jpg', '大袖晴蓝', 'LOOK 02', 'portrait'],
  ['jimeng-look03.jpg', '藕色长背心', 'LOOK 03', 'portrait'],
  ['editorial-look04-clean-4k.png', '长衫与褙子', 'LOOK 04', 'portrait'],
  ['photo6.jpg', '裙间纹样', 'DETAIL / LOOK 01', 'wide'],
  ['editorial-look01-motion.webp', '短衫叠穿 · 行走', 'IN MOTION / LOOK 01', 'portrait'],
];

function installWall(page) {
  const section = page.querySelector('.mfe-flower');
  if (!section || section.querySelector('.mfe-editorial-wall')) return;
  const wall = document.createElement('section');
  wall.className = 'mfe-editorial-wall';
  wall.setAttribute('aria-label', '满庭芳成衣呈现');
  const heading = document.createElement('header');
  heading.className = 'mfe-editorial-heading';
  const title = document.createElement('h3');
  title.textContent = '芳华入镜';
  const english = document.createElement('span');
  english.textContent = '成衣影像 / FASHION EDITORIAL';
  heading.append(english, title);
  const grid = document.createElement('div');
  grid.className = 'mfe-editorial-grid';
  const dialog = document.createElement('dialog');
  dialog.className = 'mfe-editorial-lightbox';
  dialog.setAttribute('aria-label', '成衣照片大图');
  const photo = document.createElement('img');
  const caption = document.createElement('p');
  let selected = 0, opener;
  const show = index => {
    selected = (index + frames.length) % frames.length;
    photo.src = `/Aurora/mantingfang/${frames[selected][0]}`;
    photo.alt = `${frames[selected][2]} ${frames[selected][1]}`;
    caption.textContent = `${frames[selected][1]}　${selected + 1} / ${frames.length}`;
  };
  const close = () => { dialog.close(); opener?.focus(); };
  const tool = (label, symbol, className, action) => {
    const button = document.createElement('button');
    button.textContent = symbol;
    button.className = className;
    button.title = label;
    button.setAttribute('aria-label', label);
    button.addEventListener('click', action);
    return button;
  };
  const closeButton = tool('关闭大图', '×', 'mfe-editorial-close', close);
  dialog.append(closeButton, tool('上一张', '←', 'mfe-editorial-prev', () => show(selected - 1)), photo, caption,
    tool('下一张', '→', 'mfe-editorial-next', () => show(selected + 1)));
  dialog.addEventListener('cancel', event => { event.preventDefault(); close(); });
  dialog.addEventListener('click', event => { if (event.target === dialog) close(); });
  dialog.addEventListener('keydown', event => {
    event.stopPropagation();
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
      event.preventDefault();
      show(selected + (event.key === 'ArrowRight' ? 1 : -1));
    }
  });
  frames.forEach(([file, label, look, format], index) => {
    const figure = document.createElement('figure');
    figure.className = `mfe-editorial-frame mfe-editorial-${format}`;
    const button = document.createElement('button');
    button.setAttribute('aria-label', `放大查看 ${look} ${label}`);
    const image = document.createElement('img');
    image.src = `/Aurora/mantingfang/${file}`;
    image.alt = `${look} ${label}`;
    image.loading = 'lazy';
    const expand = document.createElement('span');
    expand.className = 'mfe-editorial-expand';
    expand.textContent = '↗';
    expand.setAttribute('aria-hidden', 'true');
    button.append(image, expand);
    button.addEventListener('click', () => {
      opener = button;
      show(index);
      dialog.showModal();
      closeButton.focus();
    });
    const caption = document.createElement('figcaption');
    const text = document.createElement('span');
    const number = document.createElement('small');
    number.textContent = look;
    text.append(number, document.createTextNode(label));
    const credit = document.createElement('small');
    credit.textContent = 'AI 视觉演绎';
    caption.append(text, credit);
    figure.append(button, caption);
    grid.append(figure);
  });
  wall.append(heading, grid);
  const original = section.querySelector(':scope > img');
  if (original) { original.before(wall); original.hidden = true; }
  else section.append(wall);
  page.append(dialog);
}
const root = document.getElementById('root');
const update = () => document.querySelectorAll('.mfe-editorial-layout').forEach(installWall);
if (root) {
  new MutationObserver(update).observe(root, { childList: true, subtree: true });
  update();
}
