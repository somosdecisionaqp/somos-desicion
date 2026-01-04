// Smooth scroll para enlaces de navegación con offset para header fijo
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        const headerHeight = 90; // Altura aproximada del header
        const offsetTop = target.offsetTop - headerHeight;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    });
});

// IntersectionObserver para revelar elementos al hacer scroll
const observerOptions = { root: null, rootMargin: '0px 0px -10% 0px', threshold: 0.1 };
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            // opcional: dejar de observar una vez visible
            revealObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// Actualizar clase active en nav según sección visible (simple)
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('nav a');
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const id = entry.target.getAttribute('id');
        const link = document.querySelector(`nav a[href="#${id}"]`);
        if (entry.isIntersecting) {
            navLinks.forEach(a => a.classList.remove('active'));
            if (link) link.classList.add('active');
        }
    });
}, { root: null, threshold: 0.45 });
sections.forEach(s => sectionObserver.observe(s));

// Slideshow de hero con transiciones fluidas
const slides = document.querySelectorAll('.slide');
let currentSlide = 0;

function nextSlide() {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
}

// Iniciar slideshow cada 4 segundos
setInterval(nextSlide, 4000);

// Slider infinito para todos los sliders
const sliders = document.querySelectorAll('.slider');
sliders.forEach(slider => {
    let position = 0;
    const speed = 0.5; // px por frame

    function animateSlider() {
        position -= speed;
        if (position <= -slider.offsetWidth / 2) {
            position = 0;
        }
        slider.style.transform = `translateX(${position}px)`;
        requestAnimationFrame(animateSlider);
    }
    animateSlider();
});