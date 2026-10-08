const designs = [
  {
    "id": "ring",
    "name": "花语 · 绣纹戒指",
    "type": "rings",
    "label": "RING / 花卉纹样",
    "description": "蓝绿色花卉纹样与方形银色戒托相映，将绣纹的对称构图凝于指尖。"
  },
  {
    "id": "earrings",
    "name": "流光 · 垂坠耳饰",
    "type": "earrings",
    "label": "EARRINGS / 流苏银饰",
    "description": "螺旋纹圆盘与银色长片层叠相连，细链和彩珠延续轻盈的垂坠节奏。"
  },
  {
    "id": "necklace",
    "name": "山花 · 花纹项链",
    "type": "necklaces",
    "label": "NECKLACE / 绣意吊坠",
    "description": "橙蓝花卉圆形吊坠搭配银色链条与三枚垂饰，让绣意贴近日常。"
  },
  {
    "id": "sun",
    "name": "暖阳 · 方形吊坠",
    "type": "necklaces",
    "label": "PENDANT / 日光纹样",
    "description": "暖色日光图案置于银色方框内，以鲜明色彩形成颈间焦点。"
  },
  {
    "id": "flower-square-earrings",
    "name": "花语 · 方形耳饰",
    "type": "earrings",
    "label": "EARRINGS / 花卉与螺旋",
    "description": "方形花卉纹样连接螺旋圆片，与同系列戒指和项链呼应。"
  },
  {
    "id": "flower-square-necklace",
    "name": "花语 · 圆坠项链",
    "type": "necklaces",
    "label": "NECKLACE / 花卉与圆坠",
    "description": "蓝绿色方形花卉吊坠下接银色圆片，链间点缀几何小饰件。"
  },
  {
    "id": "sun-earrings",
    "name": "暖阳 · 日光耳饰",
    "type": "earrings",
    "label": "EARRINGS / 日光纹样",
    "description": "暖红底色与金黄色放射纹样相映，镂空银色边框勾勒方形轮廓。"
  },
  {
    "id": "flower-round-ring",
    "name": "山花 · 圆形戒指",
    "type": "rings",
    "label": "RING / 橙蓝花卉",
    "description": "橙蓝花卉图案嵌入圆形戒面，银色戒臂以曲线纹饰延续整体语言。"
  },
  {
    "id": "flower-round-earrings",
    "name": "山花 · 铃坠耳饰",
    "type": "earrings",
    "label": "EARRINGS / 橙蓝花卉",
    "description": "圆形花卉纹样下接小巧银色垂坠，与山花项链形成完整搭配。"
  },
  {
    "id": "spiral-set",
    "name": "回响 · 螺旋纹套饰",
    "type": "sets",
    "label": "SET / 项链与耳饰",
    "description": "彩色螺旋图案贯穿圆形项链与水滴形耳饰，形成呼应的成套设计。"
  },
  {
    "id": "sun-ring",
    "name": "暖阳 · 日光戒指",
    "type": "rings",
    "label": "RING / 日光纹样",
    "description": "方形日光纹样搭配雕纹银色戒托，与暖阳项链及耳饰共同构成系列。"
  },
  {
    "id": "sun-hair-square",
    "name": "暖阳 · 方巾发圈",
    "type": "hair",
    "label": "HAIR / 方巾造型",
    "description": "以方巾造型展开暖色太阳纹样，将柔软织物与发圈结构结合。"
  },
  {
    "id": "sun-scrunchie",
    "name": "暖阳 · 日光发圈",
    "type": "hair",
    "label": "HAIR / 日光纹样",
    "description": "浅色布面铺陈橙红日光图案，褶皱之间呈现丰富的纹样层次。"
  },
  {
    "id": "spiral-scrunchie",
    "name": "回响 · 螺旋纹发圈",
    "type": "hair",
    "label": "HAIR / 彩色螺旋",
    "description": "深色底布上的蓝、红、黄螺旋纹样随褶皱展开，呼应银饰的彩色图案。"
  },
  {
    "id": "spiral-necklace",
    "name": "回响 · 圆形项链",
    "type": "necklaces",
    "label": "NECKLACE / 彩色螺旋",
    "description": "圆形螺旋吊坠搭配细长银色链条，以流动的彩色线条表现回响。"
  },
  {
    "id": "spiral-bracelet",
    "name": "回响 · 银色手镯",
    "type": "bracelets",
    "label": "BRACELET / 螺旋纹饰",
    "description": "银色手镯以彩色螺旋纹饰作为中心，与回响系列的项链和戒指相映。"
  },
  {
    "id": "flower-small-pendant",
    "name": "花语 · 方形小吊坠",
    "type": "necklaces",
    "label": "PENDANT / 蓝绿花卉",
    "description": "小巧的蓝绿色方形吊坠搭配银色细链，保留花语系列清晰的几何轮廓。"
  },
  {
    "id": "spiral-ring",
    "name": "回响 · 螺旋纹戒指",
    "type": "rings",
    "label": "RING / 彩色螺旋",
    "description": "彩色螺旋图案占据圆形戒面，银色戒臂延伸几何纹饰，形成鲜明对比。"
  },
  {
    "id": "flower-disc-earrings",
    "name": "花语 · 圆盘耳饰",
    "type": "earrings",
    "label": "EARRINGS / 圆盘与花卉",
    "description": "银色圆盘、蓝绿色方形花卉与下方圆坠纵向排列，展现层叠的装饰节奏。"
  }
];
const rail=document.querySelector('#products'),dialog=document.querySelector('#detail');let lastOpener;
function openDetail(item,opener){lastOpener=opener;document.querySelector('#detail-image').src='square/'+item.id+'.webp?v=20261008';document.querySelector('#detail-image').alt=item.name;document.querySelector('#detail-title').textContent=item.name;document.querySelector('#detail-type').textContent=item.label;document.querySelector('#detail-description').textContent=item.description;dialog.showModal();document.body.classList.add('locked')}
function updateArrows(){document.querySelector('.prev').disabled=rail.scrollLeft<2;document.querySelector('.next').disabled=rail.scrollLeft+rail.clientWidth>=rail.scrollWidth-2}
function filterDesigns(type){rail.replaceChildren();const filtered=designs.filter(item=>type==='all'||item.type===type);filtered.forEach(item=>{const card=document.createElement('button');card.className='product-card';card.setAttribute('aria-label','查看'+item.name);card.innerHTML=`<div class="product-photo"><img src="square/${item.id}.webp?v=20261008" alt="${item.name}"><span class="product-index">${String(designs.indexOf(item)+1).padStart(2,'0')} / JIACAI</span><span class="product-plus" aria-hidden="true">＋</span></div><div class="product-info"><h3>${item.name}</h3><p>${item.label}</p></div>`;card.addEventListener('click',()=>openDetail(item,card));rail.append(card)});document.querySelectorAll('.filters button').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.filter===type)));document.querySelector('#result-count').textContent=String(filtered.length).padStart(2,'0')+' 件作品';rail.scrollLeft=0;requestAnimationFrame(updateArrows)}
document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>filterDesigns(button.dataset.filter)));
document.querySelector('.show-all').addEventListener('click',event=>{const button=event.currentTarget;const expanded=button.getAttribute('aria-expanded')!=='true';button.setAttribute('aria-expanded',String(expanded));button.innerHTML=expanded?'收起陈列 <span>↑</span>':'查看全部 <span>↗</span>';document.querySelector('.rail-wrap').classList.toggle('expanded',expanded);filterDesigns('all')});
document.querySelectorAll('[data-category]').forEach(link=>link.addEventListener('click',()=>filterDesigns(link.dataset.category)));
document.querySelector('.prev').addEventListener('click',()=>rail.scrollBy({left:-rail.clientWidth*.8,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'}));
document.querySelector('.next').addEventListener('click',()=>rail.scrollBy({left:rail.clientWidth*.8,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'}));
rail.addEventListener('scroll',updateArrows,{passive:true});window.addEventListener('resize',updateArrows);
document.querySelector('.close').addEventListener('click',()=>dialog.close());document.querySelector('.detail-back').addEventListener('click',()=>dialog.close());dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close()}});dialog.addEventListener('close',()=>{document.body.classList.remove('locked');lastOpener?.focus()});filterDesigns('all');
