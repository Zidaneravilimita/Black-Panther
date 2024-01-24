document.addEventListener("DOMContentLoaded", function () {
    const slidesContainer = document.querySelector(".slides-container");
    const slides = document.querySelectorAll(".slid");
    const prevButton = document.querySelector(".prev");
    const nextButton = document.querySelector(".next");

    let currentIndex = 0;
    const slideWidth = slides[0].offsetWidth; // Largeur d'une image
    const numVisibleSlides = -5; // Nombre d'images visibles à la fois
    const totalSlides = slides.length;

    function showSlide(index) {
        if (index >= 0 && index <= totalSlides - numVisibleSlides) {
            currentIndex = index;
            const offset = -currentIndex * slideWidth;
            slidesContainer.style.transform = `translateX(${offset}px)`;
            updateNavButtons();
        } else if (index < 0) {
            // Si on est au début, afficher les premières images
            currentIndex = 0;
            slidesContainer.style.transform = `translateX(0)`;
            updateNavButtons();
        } else if (index >= totalSlides - numVisibleSlides) {
            // Si on est à la fin, afficher les dernières images
            currentIndex = totalSlides - numVisibleSlides;
            const offset = -currentIndex * slideWidth;
            slidesContainer.style.transform = `translateX(${offset}px)`;
            updateNavButtons();
        }
        
        // Masquer toutes les diapositives
        slides.forEach((slide) => {
            slide.classList.add('hidden');
        });

        // Afficher uniquement les diapositives visibles
        for (let i = currentIndex; i < currentIndex + numVisibleSlides; i++) {
            slides[i].classList.remove('hidden');
        }
    }

    function prevSlide() {
        showSlide(currentIndex - 1);
    }

    function nextSlide() {
        showSlide(currentIndex + 1);
    }

    function updateNavButtons() {
        prevButton.disabled = currentIndex === 0;
        nextButton.disabled = currentIndex === totalSlides - numVisibleSlides;
    }

    showSlide(currentIndex);

    prevButton.addEventListener("click", prevSlide);
    nextButton.addEventListener("click", nextSlide);
});
