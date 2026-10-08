function retainToileBackgrounds() {
  const image = document.querySelector('#el-toile-board .el-toile-silhouette>img');
  const match = image?.getAttribute('src')?.match(/\/toile-([1-4])-cutout\.png$/);
  if (match) image.src = `/Aurora/elegance/toile-${match[1]}-front.webp`;
}
new MutationObserver(retainToileBackgrounds).observe(document.getElementById('root'), {
  childList:true,subtree:true,attributes:true,attributeFilter:['src']
});
retainToileBackgrounds();
