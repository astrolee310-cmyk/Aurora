const designs = [
  {
    "id": "look1",
    "name": "素绣 · 轻纱",
    "label": "LOOK 01 / IVORY & BLACK",
    "type": "ivory",
    "description": "浅色轻纱与黑色长裙形成层次，肩部与腰间的几何绣纹呼应，以柔和色彩托起清晰廓形。"
  },
  {
    "id": "look2",
    "name": "墨绣 · 银影",
    "label": "LOOK 02 / BLACK & SILVER",
    "type": "silver",
    "description": "黑色长裙与半透袖片相接，宽肩绣纹强调上身轮廓，多层银色腰链为整体加入流动的光泽。"
  },
  {
    "id": "look3",
    "name": "绛红 · 流苏",
    "label": "LOOK 03 / BURGUNDY & SILVER",
    "type": "silver",
    "description": "绛红流苏与银色长片沿领口垂落，黑色挂脖长裙搭配多层腰链，让装饰随身体产生节奏。"
  },
  {
    "id": "look4",
    "name": "藏蓝 · 花语",
    "label": "LOOK 04 / INDIGO & SILVER",
    "type": "embroidery",
    "description": "以藏蓝与黑色构成主体，银色花卉及几何纹样沿肩部展开，串联衣身、领口与佩饰。"
  },
  {
    "id": "look5",
    "name": "彩绣 · 山花",
    "label": "LOOK 05 / COLOR & IVORY",
    "type": "embroidery",
    "description": "彩色绣纹铺陈于立领和肩部，浅色轻纱袖片衬托黑色长裙，呈现丰富而有秩序的色彩层次。"
  },
  {
    "id": "look6",
    "name": "素锦 · 银链",
    "label": "LOOK 06 / IVORY & SILVER",
    "type": "ivory",
    "description": "米白几何绣肩与轻纱袖片衬托修长黑裙，多层银色腰链串联衣身，将柔和织物与金属光泽相映。"
  }
];
designs.push({id:'look7',name:'山野 · 彩绣',label:'LOOK 07 / THE MOUNTAIN ECHOES',type:'embroidery',description:'首页彩绣上衣造型，立领与宽肩花卉几何纹样连接轻纱袖片，与黑色长裙和银饰相映。'});
const restoredImages={
 look1:{back:'look1-back-jimeng-20261006.webp',technical:'look1-technical-spaced.webp'},
 look5:{back:'look5-back-jimeng-20261006.webp',technical:'look5-technical-jimeng-spaced-20261006.webp'},
 look6:{front:'look6-front-jimeng-20261006.webp',back:'look6-back-natural-20261006.webp',technical:'look6-technical-jimeng-20261006.webp'},
 look7:{front:'look7-front-studio-20261006.webp',back:'look7-back-studio-matched-20261007.webp',technical:'look7-technical-top-only-20261006.webp'}
};
function designImage(item,view){return (restoredImages[item.id]?.[view]||item.id+(view==='front'?'':'-'+view)+'.webp')+'?v=restored-20261007';}
document.querySelector('.hero .line-link').innerHTML='探索七款造型 <span>↗</span>';
document.querySelector('[data-filter="all"]').textContent='全部造型 / 07';
document.querySelector('.hero>img').src='preview/mountain-fashion-clean.webp';
const rail=document.querySelector('#products'),dialog=document.querySelector('#detail');let lastOpener;
let activeDesign;
const image=document.querySelector('#detail-image');
const viewNote=document.querySelector('#view-note');
function setView(view){
 const available=true;
 image.src=designImage(activeDesign,view);
 image.alt=activeDesign.name+' · '+(view==='back'?'背面造型':'正面造型');
 document.querySelectorAll('[data-view]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.view===view)));
 viewNote.textContent=available?(view==='back'?'BACK VIEW / 背面造型':'FRONT VIEW / 正面造型'):'第六款背面造型待补充';
}
document.querySelectorAll('[data-view]').forEach(button=>button.addEventListener('click',()=>setView(button.dataset.view)));
function openDetail(item,opener){
 lastOpener=opener;activeDesign=item;
 document.querySelector('[data-view="back"]').disabled=false;setView('front');
 document.querySelector('#detail-title').textContent=item.name;
 document.querySelector('#detail-type').textContent=item.label;
 document.querySelector('#detail-description').textContent=item.description;
 const technical=document.querySelector('#technical-image');technical.hidden=false;
 technical.src=designImage(item,'technical');technical.alt=item.name+'正面与背面款式线稿';
 document.querySelector('#technical-note').textContent='正面 / 背面 · 上装结构';
 dialog.showModal();dialog.scrollTop=0;document.body.classList.add('locked');
}
function updateArrows(){
 rail.querySelectorAll('.product-card').forEach(card=>{
  const item=designs.find(design=>'查看'+design.name===card.getAttribute('aria-label'));
  if(item&&restoredImages[item.id]?.front){const photo=card.querySelector('img');const originalSrc=designImage(item,'front');const src=originalSrc.split('?')[0].endsWith('.webp')?'preview/'+originalSrc:originalSrc;if(photo.getAttribute('src')!==src)photo.src=src;}
 });
 document.querySelector('.prev').disabled=rail.scrollLeft<2;document.querySelector('.next').disabled=rail.scrollLeft+rail.clientWidth>=rail.scrollWidth-2;
}
function filterDesigns(type){rail.replaceChildren();const filtered=designs.filter(item=>type==='all'||item.type===type);filtered.forEach(item=>{const card=document.createElement('button');card.className='product-card';card.setAttribute('aria-label','查看'+item.name);card.innerHTML=`<div class="product-photo"><img src="preview/${item.id==='look3'?'look3-card':item.id}.webp?v=couture-20261002" alt="${item.name}"><span class="product-index">${String(designs.indexOf(item)+1).padStart(2,'0')} / JIACAI</span><span class="product-plus" aria-hidden="true">＋</span></div><div class="product-info"><h3>${item.name}</h3><p>${item.label}</p></div>`;card.addEventListener('click',()=>openDetail(item,card));rail.append(card)});document.querySelectorAll('.filters button').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.filter===type)));document.querySelector('#result-count').textContent=String(filtered.length).padStart(2,'0')+' 件作品';rail.scrollLeft=0;requestAnimationFrame(updateArrows)}
document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>filterDesigns(button.dataset.filter)));
document.querySelector('.show-all').addEventListener('click',event=>{const button=event.currentTarget;const expanded=button.getAttribute('aria-expanded')!=='true';button.setAttribute('aria-expanded',String(expanded));button.innerHTML=expanded?'收起陈列 <span>↑</span>':'查看全部 <span>↗</span>';document.querySelector('.rail-wrap').classList.toggle('expanded',expanded);filterDesigns('all')});
document.querySelectorAll('[data-category]').forEach(link=>link.addEventListener('click',()=>filterDesigns(link.dataset.category)));
document.querySelector('.prev').addEventListener('click',()=>rail.scrollBy({left:-rail.clientWidth*.8,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'}));
document.querySelector('.next').addEventListener('click',()=>rail.scrollBy({left:rail.clientWidth*.8,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'}));
rail.addEventListener('scroll',updateArrows,{passive:true});window.addEventListener('resize',updateArrows);
document.querySelector('.close').addEventListener('click',()=>dialog.close());document.querySelector('.detail-back').addEventListener('click',()=>dialog.close());dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close()}});dialog.addEventListener('close',()=>{document.body.classList.remove('locked');lastOpener?.focus()});filterDesigns('all');
