/*
  Anchal's Digital Space — JavaScript
  Handles: Scroll reveals, Floating petals, Parallax hero,
           Scroll progress bar, Story watermark parallax,
           Timeline line animation
*/

document.addEventListener('DOMContentLoaded', () => {

    // ========================================
    // 1. SCROLL REVEAL (IntersectionObserver)
    // ========================================
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach((el) => revealObserver.observe(el));


    // ========================================
    // 2. FLOATING LOTUS PETALS
    // ========================================
    const petalsContainer = document.getElementById('petals-container');
    const PETAL_COUNT = 15;

    function createPetal() {
        const petal = document.createElement('div');
        petal.classList.add('petal');

        petal.style.left = Math.random() * 100 + '%';

        const size = 8 + Math.random() * 14;
        petal.style.width = size + 'px';
        petal.style.height = size * 1.4 + 'px';

        const duration = 12 + Math.random() * 18;
        const delay = Math.random() * 15;
        petal.style.animationDuration = duration + 's';
        petal.style.animationDelay = delay + 's';

        petalsContainer.appendChild(petal);
    }

    for (let i = 0; i < PETAL_COUNT; i++) {
        createPetal();
    }


    // ========================================
    // 3. SCROLL-DRIVEN EFFECTS
    // ========================================
    const heroBg = document.querySelector('.hero-bg-image');
    const heroContent = document.querySelector('.hero-content');
    const scrollCue = document.querySelector('.scroll-cue');
    const scrollProgress = document.getElementById('scroll-progress');
    const bgName = document.getElementById('bg-name');
    const timelineContainer = document.querySelector('.timeline');
    const lineFill = document.getElementById('timeline-line-fill');

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        const heroHeight = window.innerHeight;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;

        // --- Scroll Progress Bar ---
        if (scrollProgress) {
            const progress = (scrollY / docHeight) * 100;
            scrollProgress.style.width = progress + '%';
        }

        // --- Hero Parallax ---
        if (heroBg && scrollY < heroHeight) {
            const bgOffset = scrollY * 0.3;
            heroBg.style.transform = `scale(${1 + scrollY * 0.0001}) translateY(${bgOffset}px)`;

            if (heroContent) {
                const fadeRatio = 1 - (scrollY / (heroHeight * 0.6));
                heroContent.style.opacity = Math.max(0, fadeRatio);
                heroContent.style.transform = `translateY(${scrollY * 0.15}px)`;
            }

            if (scrollCue) {
                scrollCue.style.opacity = Math.max(0, 1 - (scrollY / (heroHeight * 0.25)));
            }
        }

        // --- Background Name is always visible (opacity:1 set in HTML) ---

        // --- Timeline Line Fill Animation ---
        if (timelineContainer && lineFill) {
            const rect = timelineContainer.getBoundingClientRect();
            const containerTop = rect.top + scrollY;
            const containerHeight = rect.height;
            const scrollTrigger = scrollY + window.innerHeight * 0.6;
            let progress = (scrollTrigger - containerTop) / containerHeight;
            progress = Math.max(0, Math.min(1, progress));
            lineFill.style.height = (progress * 100) + '%';
        }

    }, { passive: true });


    // ========================================
    // 4. SMOOTH SCROLL for scroll-cue click
    // ========================================
    if (scrollCue) {
        scrollCue.style.cursor = 'pointer';
        scrollCue.addEventListener('click', () => {
            const aboutSection = document.getElementById('about');
            if (aboutSection) {
                aboutSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

});
