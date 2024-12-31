$(document).on('ready livewire:navigated', function() {
  toggleMobileMenuTabIndex();
  
});
$(window).resize(function() {
  toggleMobileMenuTabIndex();
});
function toggleMobileMenuTabIndex() {
  mediaQuerymobile = window.matchMedia("(max-width: 991px)");
  const menuLinks = document.querySelectorAll('.header-wrapper .logo-wrapper a');
  if (!mediaQuerymobile.matches) {
    menuLinks.forEach(link => {
        if(!link.classList.contains("main-logo-link")) {
            link.setAttribute('tabindex', "-1");
        }
    });
    var logoElement = document.getElementsByClassName("main-logo-link");
    if(logoElement.length > 0) {
      logoElement[0].setAttribute('tabindex', "13");
    }
  } else {
    menuLinks.forEach((link, index) => {
      if(link.getAttribute("href") != "javaScript:;" && !link.classList.contains("main-logo-link")) {
          link.setAttribute('tabindex', index + 1);
      } else {
        // link.setAttribute('tabindex', "-1");
      }
    });
    var logoElement = document.getElementsByClassName("main-logo-link");
    if(logoElement.length > 0) {
      logoElement[0].setAttribute('tabindex', "-1");
    }
  }
}