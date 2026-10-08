function insertSilhouetteBoard() {
  const lineup = document.querySelector('.el-lineup-heading > span');
  if (lineup && lineup.textContent === 'FOUR LOOKS, ONE QUIET STORY') lineup.textContent = '01.4 / FOUR LOOKS, ONE QUIET STORY';
  const color = document.querySelector('#el-color');
  if (!color || document.getElementById('el-silhouette')) return;
  const section = document.createElement('section');
  section.id = 'el-silhouette';
  section.setAttribute('aria-labelledby', 'el-silhouette-title');
  section.innerHTML = `
    <header class="el-shape-heading"><div><span>01.3 / SILHOUETTE BOARD</span><h2 id="el-silhouette-title">FORM &amp;<br>FLOW</h2></div><div><h3>廓形版 · 松紧之间，自有风雅</h3><p>从宽松衣身、收束腰线与层叠衣片中，观察服装与身体之间的空间。将披覆、抽褶与不对称的造型关系，转化为本系列轻盈而舒展的轮廓。</p></div></header>
    <figure><a href="/Aurora/elegance/silhouette-board.jpg" target="_blank" rel="noreferrer" aria-label="查看廓形版完整原图"><img src="/Aurora/elegance/silhouette-board.webp" width="3517" height="2257" alt="闲来弄风雅廓形参考拼贴：宽松衣身、收束腰线、披覆与层叠造型" loading="lazy"></a><figcaption>系列前期造型研究 / SILHOUETTE REFERENCES</figcaption></figure>
    <div class="el-shape-notes"><div><span>01 / VOLUME</span><h3>廓形的松与紧</h3><p>以宽松衣身与腰部收束形成对照，在舒展的量感中保留身体的轮廓。</p></div><div><span>02 / LAYERING</span><h3>层次的轻与重</h3><p>借由披覆、叠穿与错落衣摆，让轻透面料与垂坠结构相互衬托。</p></div><div><span>03 / GATHERING</span><h3>细节的聚与散</h3><p>从抽褶、系带与不对称分割中提取节奏，让衣片随身体自然展开。</p></div></div>`;
  color.after(section);
}
insertSilhouetteBoard();
new MutationObserver(insertSilhouetteBoard).observe(document.getElementById('root'), {childList:true, subtree:true});
