export const eleganceEndingMarkup = `
<section class="el-closing" aria-label="系列结语">
  <span class="el-closing-credit">A COLLECTION BY AURORA LEE</span>
  <h2>留一份从容，<span>与风雅同行。</span></h2>
  <p class="el-closing-word">Elegance in the everyday.</p>
  <button data-el-go="el-home">重读此卷 ↑</button>
</section>
<footer class="el-ending-footer">
  <div class="el-ending-columns">
    <div class="el-ending-identity"><p>闲来弄风雅</p><small>A MOMENT OF ELEGANCE / AURORA LEE</small><span>将一盏茶的从容，裁入衣间。<br>在轻纱、纹样与层叠之间，拾一份日常风雅。</span></div>
    <nav aria-label="页尾系列导航"><h3>探索系列</h3><button data-el-go="el-origin">寻意 · 系列起点</button><button data-el-go="el-looks">观衣 · 四种风雅</button><button data-el-go="el-craft">入微 · 制作过程</button></nav>
    <nav aria-label="页尾作品导航"><h3>关于设计</h3><button data-el-go="el-inspiration">灵感研究</button><button data-el-back>设计师作品集 ↗</button><button data-el-go="el-home">返回顶部 ↑</button></nav>
    <div class="el-ending-contact"><h3>从一份心意开始</h3><p>欢迎交流服装、影像与设计合作。</p><a href="mailto:17829650431@163.com">联系设计师 ↗</a><small>17829650431@163.com</small></div>
  </div>
  <div class="el-ending-bottom"><span>闲来弄风雅 · 服装设计作品</span><span>部分造型影像由即梦 AI 辅助生成</span><span>AURORA LEE / PORTFOLIO</span></div>
</footer>`;

export function bindEleganceEnding(host, onBack) {
  const handleClick = event => {
    const button = event.target.closest('button');
    if (!button || !host.contains(button)) return;
    if (button.hasAttribute('data-el-back')) onBack();
    const target = button.dataset.elGo;
    if (target) document.getElementById(target)?.scrollIntoView({
      behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
    });
  };
  host.addEventListener('click', handleClick);
  return () => host.removeEventListener('click', handleClick);
}
