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
    const targetElements = document.querySelectorAll('.animate-on-scroll, .card, .section-title, .slide-in-left, .slide-in-right, .fade-scale-up, .reveal-rotate, .timeline-node, .float-up, .zoom-in-bounce, .blur-reveal, .split-reveal-left, .split-reveal-right');
    targetElements.forEach(el => observer.observe(el));
});

// Manual Infinite Loop Scrolling for Netflix Rows
document.addEventListener('DOMContentLoaded', () => {
    const netflixRows = document.querySelectorAll('.netflix-row');
    netflixRows.forEach(row => {
        const inner = row.querySelector('.netflix-row-inner');
        if (!inner) return;
        
        const cards = inner.querySelectorAll('.netflix-card');
        if (cards.length === 0) return;
        
        // Since the cards are exactly duplicated once, the first half is the original set.
        const halfCount = Math.floor(cards.length / 2);
        const midCard = cards[halfCount];
        const firstCard = cards[0];
        
        // Calculate the exact pixel width of one full original set (including gaps)
        // by measuring the distance from the first card to the first duplicate card.
        // We use setTimeout to ensure layout is calculated.
        setTimeout(() => {
            const jumpDist = midCard.offsetLeft - firstCard.offsetLeft;
            
            // Start the scroll slightly forward so the user can immediately scroll left
            if (row.scrollLeft === 0) {
                row.scrollLeft = 1;
            }

            row.addEventListener('scroll', () => {
                if (jumpDist <= 0) return;
                
                // If user scrolls past the first set, jump back to exactly the same relative position in the first set
                if (row.scrollLeft >= jumpDist) {
                    row.scrollLeft -= jumpDist;
                } 
                // If user scrolls all the way to the absolute left edge, jump forward to the duplicate set
                else if (row.scrollLeft <= 0) {
                    row.scrollLeft += jumpDist;
                }
            });
        }, 100);
    });
});

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', () => {
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileBtn && navLinks) {
        mobileBtn.addEventListener('click', () => {
            navLinks.classList.toggle('nav-active');
        });
    }
});
