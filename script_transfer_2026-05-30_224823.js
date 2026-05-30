// ===== Navigation Mobile =====
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

document.addEventListener('click', (e) => {
    if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('active');
    }
});

// ===== Navbar Active Link on Scroll =====
const sections = document.querySelectorAll('section[id]');

function setActiveLink() {
    let scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector(`.nav-link[href="#${sectionId}"]`)?.classList.add('active');
        } else {
            document.querySelector(`.nav-link[href="#${sectionId}"]`)?.classList.remove('active');
        }
    });
}

window.addEventListener('scroll', setActiveLink);

// ===== Skill Bars Animation =====
const skillBars = document.querySelectorAll('.skill-progress');
let skillsAnimated = false;

function animateSkills() {
    if (skillsAnimated) return;
    
    const skillsSection = document.querySelector('#skills');
    if (!skillsSection) return;
    
    const sectionTop = skillsSection.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    
    if (sectionTop < windowHeight * 0.8) {
        skillBars.forEach(bar => {
            const targetWidth = bar.getAttribute('data-width');
            if (targetWidth) {
                bar.style.width = targetWidth;
            }
        });
        skillsAnimated = true;
    }
}

window.addEventListener('scroll', animateSkills);
window.addEventListener('load', animateSkills);

// ===== Scroll Animations =====
const observerOptions = {
    threshold: 0.15,
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

const animatedElements = document.querySelectorAll(
    '.skill-card, .interest-card, .education-card, .about-info-item, .project-card, .contact-content, .hero-stat'
);

animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    observer.observe(el);
});

// ===== Stat Counter Animation =====
const statNumbers = document.querySelectorAll('.stat-number');
let statsAnimated = false;

function animateStats() {
    if (statsAnimated) return;
    
    const statsSection = document.querySelector('.hero-stats');
    if (!statsSection) return;
    
    const sectionTop = statsSection.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    
    if (sectionTop < windowHeight * 0.9) {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.textContent);
            if (isNaN(target)) return;
            
            let current = 0;
            const increment = target / 30;
            const duration = 1000;
            const stepTime = duration / 30;
            
            const counter = setInterval(() => {
                current += increment;
                if (current >= target) {
                    stat.textContent = target;
                    clearInterval(counter);
                } else {
                    stat.textContent = Math.floor(current);
                }
            }, stepTime);
        });
        statsAnimated = true;
    }
}

window.addEventListener('scroll', animateStats);
window.addEventListener('load', animateStats);

// ===== Contact Form =====
const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = {
            name: document.getElementById('name').value.trim(),
            email: document.getElementById('email').value.trim(),
            subject: document.getElementById('subject').value.trim(),
            message: document.getElementById('message').value.trim()
        };
        
        // Validation
        if (!formData.name || !formData.email || !formData.subject || !formData.message) {
            showToast('Veuillez remplir tous les champs.', 'error');
            return;
        }
        
        if (!isValidEmail(formData.email)) {
            showToast('Veuillez entrer une adresse email valide.', 'error');
            return;
        }
        
        // Simulation d'envoi
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalHTML = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            console.log('Formulaire soumis :', formData);
            showToast('Message envoyé avec succès !', 'success');
            contactForm.reset();
            submitBtn.innerHTML = originalHTML;
            submitBtn.disabled = false;
        }, 1500);
    });
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// ===== Toast Notification =====
function showToast(message, type = 'success') {
    // Supprimer les toasts existants
    const existingToast = document.querySelector('.toast');
    if (existingToast) existingToast.remove();
    
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Ajouter le style du toast
const toastStyle = document.createElement('style');
toastStyle.textContent = `
    .toast {
        position: fixed;
        bottom: 30px;
        right: 30px;
        background: var(--bg-card);
        border: 1px solid var(--border-color);
        padding: 16px 24px;
        border-radius: var(--radius);
        display: flex;
        align-items: center;
        gap: 12px;
        color: var(--text-white);
        font-size: 0.95rem;
        z-index: 9999;
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.3s ease;
        box-shadow: var(--shadow-lg);
    }
    
    .toast.show {
        opacity: 1;
        transform: translateY(0);
    }
    
    .toast-success i {
        color: #10b981;
    }
    
    .toast-error i {
        color: #ef4444;
    }
`;
document.head.appendChild(toastStyle);

// ===== Smooth Scroll for Anchor Links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===== Handle profile photo error =====
const profilePhoto = document.querySelector('.profile-photo');
if (profilePhoto) {
    profilePhoto.addEventListener('error', function() {
        this.style.display = 'none';
        const placeholder = this.parentElement.querySelector('.image-placeholder');
        if (placeholder) {
            placeholder.style.display = 'flex';
        }
    });
}

// ===== Init on Load =====
document.addEventListener('DOMContentLoaded', () => {
    animateSkills();
    animateStats();
    setActiveLink();
    console.log('Portfolio Evarice Adam - Prêt !');
});