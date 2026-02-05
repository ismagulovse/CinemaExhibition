
// Header scroll effect
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('nav');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    nav.classList.toggle('active');
});

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('nav a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        nav.classList.remove('active');
    });
});

// Theme toggle functionality
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Check for saved theme preference or default to dark
const currentTheme = localStorage.getItem('theme') || 'dark';
if (currentTheme === 'light') {
    body.classList.add('light-theme');
    themeToggle.textContent = '☼';
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('light-theme');
    
    // Update button icon and save preference
    if (body.classList.contains('light-theme')) {
        themeToggle.textContent = '☼';
        localStorage.setItem('theme', 'light');
    } else {
        themeToggle.textContent = '☽';
        localStorage.setItem('theme', 'dark');
    }
});

// Exhibit card click handler
const exhibitCards = document.querySelectorAll('.exhibit-card');
const exhibitDetails = document.querySelectorAll('.exhibit-detail');

exhibitCards.forEach(card => {
    card.addEventListener('click', () => {
        const exhibitId = card.getAttribute('data-exhibit');
        const detailElement = document.getElementById(`detail-${exhibitId}`);
        
        if (!detailElement) {
            console.error('Detail element not found for exhibit:', exhibitId);
            return;
        }
        
        // Close all other details
        exhibitDetails.forEach(detail => {
            if (detail !== detailElement) {
                detail.classList.remove('active');
            }
        });
        
        // Toggle current detail
        const wasActive = detailElement.classList.contains('active');
        detailElement.classList.toggle('active');
        
        // Scroll to detail only if opening (not closing)
        if (!wasActive) {
            setTimeout(() => {
                const yOffset = -100; // Отступ сверху, чтобы не прятать под header
                const y = detailElement.getBoundingClientRect().top + window.pageYOffset + yOffset;
                window.scrollTo({ top: y, behavior: 'smooth' });
            }, 150);
        }
    });
});

// Close detail function
function closeDetail(id) {
    const detailElement = document.getElementById(`detail-${id}`);
    if (detailElement) {
        detailElement.classList.remove('active');
    }
}

// Form submission
const feedbackForm = document.getElementById('feedbackForm');
feedbackForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(feedbackForm);
    const name = formData.get('name');
    const contact = formData.get('contact');
    const message = formData.get('message');
    
    // Here you would normally send the data to a server
    // For demo purposes, we'll just show an alert
    alert(`Спасибо за ваш отзыв, ${name}! Мы свяжемся с вами в ближайшее время.`);
    
    // Reset form
    feedbackForm.reset();
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
