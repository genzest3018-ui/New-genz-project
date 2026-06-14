document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.getElementById("menu-toggle");
    const navMenu = document.getElementById("nav-menu");
    const navLinks = document.querySelectorAll(".nav-menu a");

    // 1. Mobile Hamburger Menu Logic
    if (menuToggle && navMenu) {
        menuToggle.addEventListener("click", (e) => {
            e.stopPropagation(); // Prevents immediate closing
            navMenu.classList.toggle("active");
            
            // Toggle icon between Hamburger (bars) and Close (xmark)
            const icon = menuToggle.querySelector("i");
            if (navMenu.classList.contains("active")) {
                icon.className = "fa-solid fa-xmark";
            } else {
                icon.className = "fa-solid fa-bars";
            }
        });

        // Close mobile menu when clicking outside of it
        document.addEventListener("click", (e) => {
            if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
                if (navMenu.classList.contains("active")) {
                    navMenu.classList.remove("active");
                    menuToggle.querySelector("i").className = "fa-solid fa-bars";
                }
            }
        });

        // Close mobile menu automatically after clicking any link
        navLinks.forEach(link => {
            link.addEventListener("click", () => {
                if (window.innerWidth <= 1024) { // Only on mobile/tablet view
                    navMenu.classList.remove("active");
                    menuToggle.querySelector("i").className = "fa-solid fa-bars";
                }
            });
        });
    }

    // 2. Active Class Switcher on Scroll (Premium UX Feature)
    const sections = document.querySelectorAll("section, main > div");
    window.addEventListener("scroll", () => {
        let current = "";
        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop - 150) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach((link) => {
            link.classList.remove("active");
            // If we are at the top or on hero section, make home active
            if (current === "calculators" && link.getAttribute("href").includes("#calculators")) {
                link.classList.add("active");
            } else if (!current && link.getAttribute("href") === "/") {
                link.classList.add("active");
            }
        });
    });
});
