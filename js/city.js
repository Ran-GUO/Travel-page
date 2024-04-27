    
fix_footer();


// fixed footer
function fix_footer(){
  var siteFooter = document.getElementById('site-footer');
  if ((siteFooter.offsetTop + siteFooter.offsetHeight) < window.innerHeight) {
      siteFooter.classList.add('fixed-bottom', 'bottom-0', 'left-0', 'w-full');
  }
}