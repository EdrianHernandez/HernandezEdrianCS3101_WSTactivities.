const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    burger.addEventListener('click', () => {
        nav.classList.toggle('active');

        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });

        burger.classList.toggle('active');
    });
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.classList.remove('active');
        });
        this.classList.add('active');

        target.scrollIntoView({
            behavior: 'smooth'
        });
    });
});

const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');

            if (entry.target.classList.contains('skills-grid')) {
                const cards = entry.target.querySelectorAll('.skill-card');
                cards.forEach((card, index) => {
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, index * 100);
                });
            }

            if (entry.target.classList.contains('projects-grid')) {
                const cards = entry.target.querySelectorAll('.project-card');
                cards.forEach((card, index) => {
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, index * 100);
                });
            }
        }
    });
}, observerOptions);

document.querySelectorAll('section, .skill-card, .project-card').forEach((section) => {
    observer.observe(section);
});

window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    const scrolled = window.pageYOffset;
    hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
});

function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

const tagline = document.querySelector('.tagline');
if (tagline) {
    window.addEventListener('load', () => {
        typeWriter(tagline, tagline.textContent);
    });
}

navSlide();

const navbar = document.querySelector('.navbar');
const navLinks = document.querySelectorAll('.nav-links a');
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

navLinks.forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        const targetId = link.getAttribute('href').slice(1);
        const targetSection = document.getElementById(targetId);
        
        window.scrollTo({
            top: targetSection.offsetTop - navbar.offsetHeight,
            behavior: 'smooth'
        });

        if (nav.classList.contains('active')) {
            nav.classList.remove('active');
            burger.classList.remove('active');
        }
    });
});

burger.addEventListener('click', () => {
    nav.classList.toggle('active');
    burger.classList.toggle('active');

    navLinks.forEach((link, index) => {
        if (link.style.animation) {
            link.style.animation = '';
        } else {
            link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        }
    });
});

document.addEventListener('click', (e) => {
    if (nav.classList.contains('active') && 
        !nav.contains(e.target) && 
        !burger.contains(e.target)) {
        nav.classList.remove('active');
        burger.classList.remove('active');
    }
});

AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

function initializeProgressBars() {
    const progressBars = document.querySelectorAll('.progress-bar');
    progressBars.forEach(bar => {
        const level = bar.dataset.level;
        bar.style.setProperty('--progress', level / 100);
    });
}

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

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);

    setTimeout(() => notification.classList.add('show'), 100);
 
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

function initializeFloatingShapes() {
    const shapes = document.querySelectorAll('.floating-shape');
    shapes.forEach((shape, index) => {
        const delay = index * 2;
        shape.style.animation = `floatAnimation ${15 + delay}s infinite alternate`;
    });
}

function handleScroll() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - sectionHeight / 3) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === currentSection) {
            link.classList.add('active');
        }
    });
}

function initializeProjectHover() {
    const projects = document.querySelectorAll('.project-card');
    
    projects.forEach(project => {
        const image = project.querySelector('img');
        const overlay = project.querySelector('.project-overlay');
        
        project.addEventListener('mouseenter', () => {
            image.style.transform = 'scale(1.1)';
            overlay.style.opacity = '1';
        });
        
        project.addEventListener('mouseleave', () => {
            image.style.transform = 'scale(1)';
            overlay.style.opacity = '0';
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });
    
    initializeProgressBars();
    initializeFloatingShapes();
    initializeProjectHover();

    window.addEventListener('scroll', handleScroll);

    handleScroll();

    const cards = document.querySelectorAll('.project-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / card.clientWidth) * 100;
            const y = ((e.clientY - rect.top) / card.clientHeight) * 100;
            
            card.style.setProperty('--mouse-x', `${x}%`);
            card.style.setProperty('--mouse-y', `${y}%`);
        });

        card.addEventListener('click', e => {
            const ripple = document.createElement('div');
            ripple.classList.add('ripple');
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            card.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 1000);
        });
    });

    const projectsGrid = document.querySelector('.projects-grid');
    if (projectsGrid) {
        projectsGrid.addEventListener('mouseover', e => {
            const card = e.target.closest('.project-card');
            if (card) {
                const siblings = projectsGrid.querySelectorAll('.project-card');
                siblings.forEach(sibling => {
                    if (sibling !== card) {
                        sibling.style.transform = 'scale(0.98)';
                        sibling.style.opacity = '0.7';
                    }
                });
            }
        });

        projectsGrid.addEventListener('mouseout', e => {
            const siblings = projectsGrid.querySelectorAll('.project-card');
            siblings.forEach(sibling => {
                sibling.style.transform = '';
                sibling.style.opacity = '';
            });
        });
    }

    const handleMouseMove = (e) => {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    };

    cards.forEach(card => {
        card.addEventListener('mousemove', handleMouseMove);
    });
});

class Particle {
    constructor(canvas) {
        this.canvas = canvas;
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
        this.color = '#6366f1';
    }

    update(mouseX, mouseY) {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > this.canvas.width) {
            this.x = 0;
        } else if (this.x < 0) {
            this.x = this.canvas.width;
        }
        if (this.y > this.canvas.height) {
            this.y = 0;
        } else if (this.y < 0) {
            this.y = this.canvas.height;
        }

        if (mouseX !== undefined) {
            const dx = mouseX - this.x;
            const dy = mouseY - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < 100) {
                this.x -= dx * 0.02;
                this.y -= dy * 0.02;
            }
        }
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}

class ParticleSystem {
    constructor() {
        this.canvas = document.getElementById('particles-bg');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.mouseX = undefined;
        this.mouseY = undefined;
        this.mouseSpeed = 0;
        this.lastMouseX = undefined;
        this.lastMouseY = undefined;
        this.init();
    }

    init() {
        this.resize();
        window.addEventListener('resize', () => this.resize());

        const particleCount = 50;
        for (let i = 0; i < particleCount; i++) {
            this.particles.push(new Particle(this.canvas));
        }

        document.addEventListener('mousemove', (e) => {
            if (this.lastMouseX === undefined) {
                this.lastMouseX = e.clientX;
                this.lastMouseY = e.clientY;
            }
            
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;

            const dx = this.mouseX - this.lastMouseX;
            const dy = this.mouseY - this.lastMouseY;
            this.mouseSpeed = Math.sqrt(dx * dx + dy * dy);
            
            this.lastMouseX = this.mouseX;
            this.lastMouseY = this.mouseY;
        });

        this.animate();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    drawConnections(p1, p2, distance) {
        const maxDistance = 150;
        if (distance < maxDistance) {
            this.ctx.beginPath();
            this.ctx.strokeStyle = `rgba(99, 102, 241, ${1 - distance / maxDistance})`;
            this.ctx.lineWidth = 1;
            this.ctx.moveTo(p1.x, p1.y);
            this.ctx.lineTo(p2.x, p2.y);
            this.ctx.stroke();
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.particles.forEach(particle => {
            particle.update(this.mouseX, this.mouseY);
            particle.draw(this.ctx);
        });

        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const dx = this.particles[i].x - this.particles[j].x;
                const dy = this.particles[i].y - this.particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                this.drawConnections(this.particles[i], this.particles[j], distance);
            }
        }

        requestAnimationFrame(() => this.animate());
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new ParticleSystem();
});

document.querySelectorAll('.highlight-item').forEach(item => {
    item.addEventListener('mousemove', (e) => {
        const rect = item.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / item.clientWidth) * 100;
        const y = ((e.clientY - rect.top) / item.clientHeight) * 100;
        
        item.style.setProperty('--mouse-x', `${x}%`);
        item.style.setProperty('--mouse-y', `${y}%`);
    });
});

const aboutObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('reveal');
            aboutObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.2
});

document.querySelectorAll('.about-main, .highlight-item, .about-cta').forEach(el => {
    el.classList.add('reveal-hidden');
    aboutObserver.observe(el);
});

const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
formInputs.forEach(input => {
    input.addEventListener('focus', () => {
        input.parentElement.classList.add('focused');
    });

    input.addEventListener('blur', () => {
        if (!input.value) {
            input.parentElement.classList.remove('focused');
        }
    });

    if (input.value) {
        input.parentElement.classList.add('focused');
    }
});
