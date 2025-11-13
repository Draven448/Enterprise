// Horizontal scrolling images based on page scroll
let lastScrollY = window.scrollY;
let scrollOffset = 0;
const scrollingImages = document.getElementById('scrolling-images');

// Start position - images start from center/slightly left
const startPosition = -200;
scrollOffset = startPosition;
scrollingImages.style.transform = `translateX(${scrollOffset}px)`;

window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    const scrollDelta = currentScrollY - lastScrollY;
    
    // Scroll UP = images move RIGHT (positive direction)
    // Scroll DOWN = images move LEFT (negative direction)
    scrollOffset -= scrollDelta * 0.8;
    
    // Apply transform
    scrollingImages.style.transform = `translateX(${scrollOffset}px)`;
    
    // Calculate the width of one set of images
    const imageSetWidth = scrollingImages.scrollWidth / 2;
    
    // Reset for seamless loop
    if (scrollOffset < -imageSetWidth) {
        scrollOffset = scrollOffset + imageSetWidth;
    } else if (scrollOffset > 0) {
        scrollOffset = scrollOffset - imageSetWidth;
    }
    
    lastScrollY = currentScrollY;
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all feature cards and pricing cards
document.querySelectorAll('.feature-card, .pricing-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});
