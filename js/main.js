document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.getElementById("menu-toggle");
    const navMenu = document.getElementById("nav-menu");
    const navLinks = document.querySelectorAll(".nav-menu a");
    
    const themeSelect = document.getElementById("theme-select");
    const searchInput = document.getElementById("calc-search");
    const calcCards = document.querySelectorAll("#calc-grid .card");

    // 1. MOBILE RESPONSIVE HAMBURGER MENU
    if (menuToggle && navMenu) {
        menuToggle.addEventListener("click", (e) => {
            e.stopPropagation();
            navMenu.classList.toggle("active");
            const icon = menuToggle.querySelector("i");
            icon.className = navMenu.classList.contains("active") ? "fa-solid fa-xmark" : "fa-solid fa-bars";
        });

        document.addEventListener("click", (e) => {
            if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
                navMenu.classList.remove("active");
                menuToggle.querySelector("i").className = "fa-solid fa-bars";
            }
        });
    }

    // 2. PREMIUM 3-WAY MULTI-THEME CONTROLLER (Dark, Light, Eye-care)
    if (themeSelect) {
        // LocalStorage check taaki page refresh par theme save rahe
        const savedTheme = localStorage.getItem("genzest-theme") || "dark";
        themeSelect.value = savedTheme;
        applyTheme(savedTheme);

        themeSelect.addEventListener("change", (e) => {
            const selectedTheme = e.target.value;
            applyTheme(selectedTheme);
            localStorage.setItem("genzest-theme", selectedTheme);
        });
    }

    function applyTheme(theme) {
        document.body.classList.remove("dark-theme", "light-theme", "eyecare-theme");
        if (theme === "light") {
            document.body.classList.add("light-theme");
        } else if (theme === "eyecare") {
            document.body.classList.add("eyecare-theme");
        } else {
            document.body.classList.add("dark-theme");
        }
    }

    // 3. INSTANT SEARCH FILTER ENGINE
    if (searchInput) {
        searchInput.addEventListener("input", (e) => {
            const query = e.target.value.toLowerCase().trim();

            calcCards.forEach(card => {
                const searchKeywords = card.getAttribute("data-title").toLowerCase();
                if (searchKeywords.includes(query)) {
                    card.style.display = "flex";
                } else {
                    card.style.display = "none";
                }
            });
        });
    }
});
