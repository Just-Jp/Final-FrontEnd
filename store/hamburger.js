document.addEventListener("DOMContentLoaded", function() {
    const hamburgerMenu = document.querySelector(".hamburger-menu");
    const navLinks = document.querySelector(".nav-links");
    const menuOverlay = document.querySelector(".menu-overlay");
    
    
    function toggleMenu() {
      hamburgerMenu.classList.toggle("active");
      navLinks.classList.toggle("active");
      menuOverlay.classList.toggle("active");
      
     
      if (navLinks.classList.contains("active")) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }
    }
    
    
    function closeMenu() {
      hamburgerMenu.classList.remove("active");
      navLinks.classList.remove("active");
      menuOverlay.classList.remove("active");
      document.body.style.overflow = "";
    }
    
    
    if (hamburgerMenu) {
      hamburgerMenu.addEventListener("click", toggleMenu);
    }
    
    if (menuOverlay) {
      menuOverlay.addEventListener("click", closeMenu);
    }
    
    
    const navItems = document.querySelectorAll(".nav-links a");
    navItems.forEach(item => {
      item.addEventListener("click", closeMenu);
    });
    
   
    window.addEventListener("resize", function() {
      if (window.innerWidth > 768 && navLinks.classList.contains("active")) {
        closeMenu();
      }
    });
  });