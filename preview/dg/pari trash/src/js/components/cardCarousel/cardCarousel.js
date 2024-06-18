document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelector('.carousel-slide');
    const totalCards = slides.children.length;
    let currentIndex = 0;

    function updateSlidePosition() {
        const cardWidth = slides.children[0].offsetWidth;
        const newLeft = -(cardWidth * currentIndex);
        slides.style.transform = `translateX(${newLeft}px)`;
    }

    document.querySelector('.carousel-control-next').addEventListener('click', function() {
        if (currentIndex < totalCards - 1) {
            currentIndex++;
            updateSlidePosition();
        }
    });

    document.querySelector('.carousel-control-prev').addEventListener('click', function() {
        if (currentIndex > 0) {
            currentIndex--;
            updateSlidePosition();
        }
    });
});
