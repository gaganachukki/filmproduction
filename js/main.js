document.addEventListener('DOMContentLoaded', () => {
    // Intersection Observer for Scroll Animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Optional: Stop observing once animated if you only want it to animate once
                // observer.unobserve(entry.target); 
            } else {
                // If you want them to animate out when scrolling past, keep this. Otherwise remove the else block.
                // We'll let them replay for a more dynamic feel
                entry.target.classList.remove('is-visible');
            }
        });
    }, observerOptions);

    // Target elements to animate
    const targetElements = document.querySelectorAll('.animate-on-scroll, .card, .section-title');
    targetElements.forEach(el => observer.observe(el));
});
