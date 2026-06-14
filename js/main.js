document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.getElementById("menu-toggle");
    const navMenu = document.getElementById("nav-menu");
    const navLinks = document.querySelectorAll(".nav-menu a");
    
    const themeSelect = document.getElementById("theme-select");
    const searchInput = document.getElementById("calc-search");
    const tabButtons = document.querySelectorAll(".tab-btn");
    const calcCards = document.querySelectorAll(".calculator-card-premium, #calc-grid .card");
    const gridContainer = document.getElementById("calc-grid");

    // ==========================================================================
    // 1. MOBILE RESPONSIVE HAMBURGER MENU & AUTO-CLOSE ENGINE
    // ==========================================================================
    if (menuToggle && navMenu) {
        menuToggle.addEventListener("click", (e) => {
            e.stopPropagation();
            navMenu.classList.toggle("active");
            const icon = menuToggle.querySelector("i");
            if (icon) {
                icon.className = navMenu.classList.contains("active") ? "fa-solid fa-xmark" : "fa-solid fa-bars";
            }
        });

        // Outside click hone par navbar menu band karne ke liye
        document.addEventListener("click", (e) => {
            if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
                navMenu.classList.remove("active");
                const icon = menuToggle.querySelector("i");
                if (icon) icon.className = "fa-solid fa-bars";
            }
        });

        // 🔥 THE GLITCH FIX: Link par click hote hi mobile menu automatic close ho jaye!
        navLinks.forEach(link => {
            link.addEventListener("click", () => {
                if (navMenu.classList.contains("active")) {
                    navMenu.classList.remove("active");
                    const icon = menuToggle.querySelector("i");
                    if (icon) icon.className = "fa-solid fa-bars";
                }
            });
        });
    }

    // ==========================================================================
    // 2. PREMIUM 3-WAY MULTI-THEME CONTROLLER (Dark, Light, Eye-care)
    // ==========================================================================
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

    // ==========================================================================
    // 3. INSTANT SEARCH & FILTER TAB ENGINE
    // ==========================================================================
    if (searchInput) {
        searchInput.addEventListener("input", (e) => {
            const query = e.target.value.toLowerCase().trim();

            // Search filter chalne par grid wrap default breaks reset
            if (gridContainer) {
                if (query !== "") {
                    gridContainer.style.width = "100%";
                    gridContainer.style.flexWrap = "wrap";
                } else {
                    gridContainer.style.width = "max-content";
                    gridContainer.style.flexWrap = "nowrap";
                }
            }

            calcCards.forEach(card => {
                const searchKeywords = (card.getAttribute("data-title") || card.getAttribute("data-search-tag") || card.innerText).toLowerCase();
                if (searchKeywords.includes(query)) {
                    card.style.display = "flex";
                } else {
                    card.style.display = "none";
                }
            });
        });
    }

    // DYNAMIC CATEGORY TAB FILTER CONTROLLER
    if (tabButtons && tabButtons.length > 0) {
        tabButtons.forEach(btn => {
            btn.addEventListener("click", () => {
                // Remove visual active styling from all tabs
                tabButtons.forEach(b => {
                    b.style.background = "var(--bg-card)";
                    b.style.color = "var(--text-secondary-dark)";
                    b.style.borderColor = "var(--border-dark)";
                    b.classList.remove("active");
                });
                
                // Add active style state to clicked tab
                btn.style.background = "var(--accent)";
                btn.style.color = "#ffffff";
                btn.style.borderColor = "var(--accent)";
                btn.classList.add("active");

                const selectedCategory = btn.getAttribute("data-filter");
                if (searchInput) searchInput.value = ""; // Clear active search string

                if (gridContainer) {
                    if (selectedCategory === "all") {
                        gridContainer.style.width = "max-content";
                        gridContainer.style.flexWrap = "nowrap";
                        calcCards.forEach(card => card.style.display = "flex");
                    } else {
                        gridContainer.style.width = "100%";
                        gridContainer.style.flexWrap = "wrap";
                        calcCards.forEach(card => {
                            if (card.getAttribute("data-category") === selectedCategory) {
                                card.style.display = "flex";
                            } else {
                                card.style.display = "none";
                            }
                        });
                    }
                }
            });
        });
    }
});
