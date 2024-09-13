document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('.carousel');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    const items = document.querySelectorAll('.carousel-item');
    let counter = 0;
    const size = items[0].clientWidth;

    function updateCarousel() {
        carousel.style.transform = `translateX(${-size * counter}px)`;
        updateButtonVisibility();
    }

    function updateButtonVisibility() {
        prevBtn.classList.toggle('hidden', counter <= 0);
        nextBtn.classList.toggle('hidden', counter >= items.length - 1);
    }

    nextBtn.addEventListener('click', () => {
        if (counter >= items.length - 1) return;
        carousel.style.transition = "transform 0.5s ease-in-out";
        counter++;
        updateCarousel();
    });

    prevBtn.addEventListener('click', () => {
        if (counter <= 0) return;
        carousel.style.transition = "transform 0.5s ease-in-out";
        counter--;
        updateCarousel();
    });

    carousel.addEventListener('transitionend', () => {
        if (items[counter].id === 'lastClone') {
            carousel.style.transition = "none";
            counter = items.length - 2;
            updateCarousel();
        }
        if (items[counter].id === 'firstClone') {
            carousel.style.transition = "none";
            counter = items.length - counter;
            updateCarousel();
        }
    });

    updateCarousel();

    window.addEventListener('resize', () => {
        const newSize = items[0].clientWidth;
        if (newSize !== size) {
            location.reload(); // Refresh the page to recalculate sizes
        }
    });

    const navSlide = () => {
        const burger = document.querySelector('.burger');
        const nav = document.querySelector('.nav-links');
        const navLinks = document.querySelectorAll('.nav-links li');

        burger.addEventListener('click', () => {
            nav.classList.toggle('nav-active');

            navLinks.forEach((link, index) => {
                if (link.style.animation) {
                    link.style.animation = '';
                } else {
                    link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
                }
            });

            burger.classList.toggle('toggle');
        });
    }

    navSlide();
});