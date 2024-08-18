let searchBtn = document.querySelector('.searchBtn');
let closeBtn = document.querySelector('.closeBtn');
let searchBox = document.querySelector('.searchBox');
let navigation = document.querySelector('.navigation');
let menuToggle = document.querySelector('.menuToggle');
let header = document.querySelector('header');

searchBtn.onclick = function(){
    searchBox.classList.add('active');
    closeBtn.classList.add('active');
    searchBtn.classList.add('active');
    menuToggle.classList.add('hide');
    header.classList.remove('open');
}
closeBtn.onclick = function(){
    searchBox.classList.remove('active');
    closeBtn.classList.remove('active');
    searchBtn.classList.remove('active');
    menuToggle.classList.remove('hide');
}
menuToggle.onclick = function(){
    header.classList.toggle('open');
    searchBox.classList.remove('active');
    closeBtn.classList.remove('active');
    searchBtn.classList.remove('active');
}

let navLinks = document.querySelectorAll('.navigation li a');
navLinks.forEach(link => {
    link.onclick = function() {
        header.classList.remove('open');
    };
});


document.addEventListener('DOMContentLoaded', () => {
    console.log('Cards are ready!');

    const cards = document.querySelectorAll('.card');
    const showMoreLink = document.getElementById('show-more-link');
    const visibleCount = 12; // Number of cards to show initially
    let currentCount = visibleCount;

    // Initially hide cards beyond the limit
    cards.forEach((card, index) => {
        if (index >= visibleCount) {
            card.style.display = 'none';
        }

        card.addEventListener('click', () => {
            // Toggle 'active' class on tap/click
            card.classList.toggle('active');
        });

        // Handle mouse enter for desktop
        card.addEventListener('mouseenter', () => {
            card.classList.add('active');
        });

        // Handle mouse leave for desktop
        card.addEventListener('mouseleave', () => {
            card.classList.remove('active');
        });
    });

    showMoreLink.addEventListener('click', () => {
        let nextCount = currentCount + visibleCount;
        cards.forEach((card, index) => {
            if (index >= currentCount && index < nextCount) {
                card.style.display = 'flex';
            }
        });

        currentCount = nextCount;

        // Hide the text if all cards are visible
        if (currentCount >= cards.length) {
            showMoreLink.style.display = 'none';
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll(".slides img");
    const dotsContainer = document.querySelector(".dots");
    let slideIndex = 0;
    let intervalId = null;

    // Create dots
    slides.forEach((_, index) => {
        const dot = document.createElement("span");
        dot.className = "dot";
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll(".dot");

    function showSlide(index) {
        if (index >= slides.length) {
            slideIndex = 0;
        } else if (index < 0) {
            slideIndex = slides.length - 1;
        }

        slides.forEach(slide => {
            slide.classList.remove("displaySlide");
        });
        slides[slideIndex].classList.add("displaySlide");

        // Update dots
        dots.forEach(dot => dot.classList.remove("active"));
        dots[slideIndex].classList.add("active");
    }

    function nextSlide() {
        clearInterval(intervalId);
        slideIndex++;
        showSlide(slideIndex);
        intervalId = setInterval(nextSlide, 5000);
    }

    function prevSlide() {
        clearInterval(intervalId);
        slideIndex--;
        showSlide(slideIndex);
        intervalId = setInterval(nextSlide, 5000);
    }

    function handleTouchStart(event) {
        startX = event.touches[0].clientX;
    }

    function handleTouchEnd(event) {
        const endX = event.changedTouches[0].clientX;
        handleSwipe(endX);
    }

    function handleMouseDown(event) {
        startX = event.clientX;
        isDragging = true;
    }

    function handleMouseUp(event) {
        if (isDragging) {
            const endX = event.clientX;
            handleSwipe(endX);
            isDragging = false;
        }
    }

    function handleMouseLeave() {
        if (isDragging) {
            isDragging = false;
        }
    }

    function handleMouseMove(event) {
        if (isDragging) {
            event.preventDefault(); // Prevent image drag
            const currentX = event.clientX;
            const diffX = startX - currentX;
            if (Math.abs(diffX) > 50) {
                handleSwipe(currentX);
                isDragging = false;
            }
        }
    }

    function handleSwipe(endX) {
        const diffX = startX - endX;

        if (Math.abs(diffX) > 50) { // Swipe threshold
            if (diffX > 0) {
                nextSlide(); // Swipe left / Drag left
            } else {
                prevSlide(); // Swipe right / Drag right
            }
        }
    }

    initializeSlider();

    function initializeSlider() {
        if (slides.length > 0) {
            slides[slideIndex].classList.add("displaySlide");
            dots[slideIndex].classList.add("active");
            intervalId = setInterval(nextSlide, 5000);
        }

        const slider = document.querySelector('.slider');

        // Prevent default drag behavior on images
        slides.forEach(slide => {
            slide.addEventListener('dragstart', (e) => e.preventDefault());
        });

        // Touch events
        slider.addEventListener('touchstart', handleTouchStart);
        slider.addEventListener('touchend', handleTouchEnd);

        // Mouse events
        slider.addEventListener('mousedown', handleMouseDown);
        slider.addEventListener('mouseup', handleMouseUp);
        slider.addEventListener('mouseleave', handleMouseLeave);
        slider.addEventListener('mousemove', handleMouseMove);
    }
});