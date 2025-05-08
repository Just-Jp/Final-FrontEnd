document.addEventListener("DOMContentLoaded", function() {
    const hamburgerMenu = document.querySelector(".hamburger-menu");
    const navCollapse = document.querySelector(".navbar-collapse");
    const menuOverlay = document.querySelector(".menu-overlay");
    

    function toggleMenu() {
        hamburgerMenu.classList.toggle("active");
        navCollapse.classList.toggle("show");
        menuOverlay.classList.toggle("active");
        
        if (navCollapse.classList.contains("show")) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
    }
    

    function closeMenu() {
        hamburgerMenu.classList.remove("active");
        navCollapse.classList.remove("show");
        menuOverlay.classList.remove("active");
        document.body.style.overflow = "";
    }
    
   
    if (hamburgerMenu) {
        hamburgerMenu.addEventListener("click", function(e) {
            e.preventDefault(); // Impede o comportamento padrão do botão bootstrap
            toggleMenu();
        });
    }
    

    if (menuOverlay) {
        menuOverlay.addEventListener("click", closeMenu);
    }
    

    const navLinks = document.querySelectorAll(".nav-links .nav-link");
    navLinks.forEach(link => {
        link.addEventListener("click", closeMenu);
    });
    

    window.addEventListener("resize", function() {
        if (window.innerWidth > 991 && navCollapse.classList.contains("show")) {
            closeMenu();
        }
    });
});