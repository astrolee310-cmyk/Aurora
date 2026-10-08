const compact=matchMedia('(max-width:900px), (pointer:coarse)');
let scheduled=false;
function updateDevice(){scheduled=false;updateMobileNavigation();updateCompactSeriesTitles();const hint=document.querySelector('.invitation-caption');if(hint){const value=compact.matches?'轻触，认识设计师与作品':'双击，让隐约成为可见';if(hint.textContent!==value)hint.textContent=value;}const entry=document.querySelector('.enter-word');if(entry)entry.setAttribute('aria-label',compact.matches?'轻触 AURORA LEE 进入':'双击 AURORA LEE 进入');const footer=document.querySelector('.experience.is-entered .experience-footer>div');if(footer&&compact.matches&&footer.firstChild?.nodeType===3)footer.firstChild.textContent='滑动浏览照片，轻触进入作品页';for(const tile of document.querySelectorAll('.series-hit')){if(!tile.querySelector('figcaption')){const c=document.createElement('figcaption');c.className='device-photo-label';c.textContent=tile.getAttribute('aria-label')?.replace(/系列$/,'')||'查看作品';tile.append(c);}}}
function schedule(){if(!scheduled){scheduled=true;requestAnimationFrame(updateDevice)}}
new MutationObserver(schedule).observe(document.body,{childList:true,subtree:true});compact.addEventListener('change',schedule);schedule();

function updateMobileNavigation(){
 const header=document.querySelector('.portfolio-about .pa-header');
 if(!header)return;
 let nav=header.querySelector('.device-series-nav');
 if(!compact.matches){nav?.remove();return;}
 if(nav)return;
 nav=document.createElement('nav');nav.className='device-series-nav';nav.setAttribute('aria-label','作品集顶部导航');
 const items=[['About Me','/Aurora/?series=about'],['规则人生','/Aurora/?series=rules'],['闲来弄风雅','/Aurora/?series=elegance'],['野蛮生长','/Aurora/?series=wild'],['瑶语·暗纹','/Aurora/?series=yaoyu'],['满庭芳','/Aurora/?series=mantingfang'],['家彩彝绣','/Aurora/jiacai/index.html']];
 for(const [label,href] of items){const a=document.createElement('a');a.textContent=label;a.setAttribute('href',href);if(label==='About Me')a.setAttribute('aria-current','page');nav.append(a);}
 header.append(nav);
}

function updateCompactSeriesTitles(){
 if(!compact.matches)return;
 for(const header of document.querySelectorAll('.re-nav')){
  const content=header.querySelector('.glass-surface__content');
  if(!content||content.querySelector('.device-compact-title'))continue;
  const jiacai=!!header.closest('.jiacai-navigation');
  const title=document.createElement('span');title.className='device-compact-title';title.textContent=jiacai?'家彩彝绣':'规则人生';
  const heading=jiacai?document.querySelector('.hero h1'):header.closest('.re-page')?.querySelector('.re-cover h1');
  if(heading){const style=getComputedStyle(heading);title.style.fontFamily=style.fontFamily;title.style.fontWeight=style.fontWeight;title.style.fontStyle=style.fontStyle;}
  content.append(title);
 }
}
