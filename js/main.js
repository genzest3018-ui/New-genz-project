// DARK / LIGHT THEME

const themeBtn = document.getElementById("theme-toggle");

if(localStorage.getItem("theme") === "light"){
    document.body.classList.add("light-mode");
}

themeBtn?.addEventListener("click", () => {

    document.body.classList.toggle("light-mode");

    if(document.body.classList.contains("light-mode")){
        localStorage.setItem("theme","light");
    }else{
        localStorage.setItem("theme","dark");
    }

});


// SEARCH FUNCTIONALITY

const searchInput = document.getElementById("searchInput");

if(searchInput){

    searchInput.addEventListener("keyup", () => {

        const value = searchInput.value.toLowerCase();

        const cards = document.querySelectorAll(".card");

        cards.forEach(card => {

            const text = card.innerText.toLowerCase();

            if(text.includes(value)){
                card.style.display = "block";
            }else{
                card.style.display = "none";
            }

        });

    });

}


// CURRENT YEAR FOOTER

const yearElement = document.getElementById("year");

if(yearElement){
    yearElement.textContent = new Date().getFullYear();
}


// SIMPLE ANIMATION

const cards = document.querySelectorAll(".card");

const observer = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if(entry.isIntersecting){

            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";

        }

    });

});

cards.forEach(card => {

    card.style.opacity = "0";
    card.style.transform = "translateY(30px)";
    card.style.transition = "0.5s ease";

    observer.observe(card);

});