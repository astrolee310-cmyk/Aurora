function updateFinalePhoto() {
  const photo = document.querySelector('.el-page .el-finale>img');
  if (photo && !photo.getAttribute('src')?.includes('campaign-finale-retouched')) {
    photo.src = '/Aurora/elegance/campaign-finale-retouched.webp';
  }
  const contact = document.querySelector('.el-page .el-ending-contact>small');
  if (contact && !contact.querySelector('.el-contact-phone')) {
    const phone = document.createElement('a');
    phone.className = 'el-contact-phone';
    phone.href = 'tel:17829650431';
    phone.textContent = '17829650431';
    contact.append(phone);
  }
}
new MutationObserver(updateFinalePhoto).observe(document.getElementById('root'), {
  childList:true,subtree:true,attributes:true,attributeFilter:['src']
});
updateFinalePhoto();
