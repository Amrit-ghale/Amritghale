// API Configuration
const API_BASE = 'http://localhost:3000';

// Contact Form Submission
document.getElementById('contactForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = {
        name: e.target.name.value,
        email: e.target.email.value,
        subject: e.target.subject.value,
        message: e.target.message.value
    };

    try {
        const response = await fetch(`${API_BASE}/api/contact`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            const result = await response.json();
            alert(result.message); // Show success message from server
            e.target.reset();
        } else {
            const result = await response.json();
            throw new Error(result.message || 'Failed to send message');
        }
    } catch (error) {
        alert('Error: ' + error.message);
        console.error('Error:', error);
    }
});

// Visitor Tracking
window.addEventListener('load', () => {
    fetch(`${API_BASE}/api/analytics/visitor`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            path: window.location.pathname
        })
    }).catch(() => {}); // Silently fail if analytics fails
});

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        menuToggle.querySelector('i').classList.toggle('fa-times');
    });

    // Smooth Scrolling for Navigation Links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            // Close mobile menu if open
            navLinks.classList.remove('active');
            menuToggle.querySelector('i').classList.remove('fa-times');
            
            // Scroll to section
            window.scrollTo({
                top: targetSection.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Update active link
            document.querySelectorAll('.nav-link').forEach(navLink => {
                navLink.classList.remove('active');
            });
            this.classList.add('active');
        });
    });

    // Sticky Navigation on Scroll
    window.addEventListener('scroll', function() {
        const nav = document.querySelector('.glass-nav');
        if (window.scrollY > 100) {
            nav.style.padding = '15px 0';
            nav.style.background = 'rgba(15, 23, 42, 0.8)';
        } else {
            nav.style.padding = '20px 0';
            nav.style.background = 'var(--glass-color)';
        }
    });

    // Animate Stats Counter
    const statNumbers = document.querySelectorAll('.stat-number');
    
    function animateStats() {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-count'));
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;
            
            const counter = setInterval(() => {
                current += step;
                if (current >= target) {
                    clearInterval(counter);
                    stat.textContent = target;
                } else {
                    stat.textContent = Math.floor(current);
                }
            }, 16);
        });
    }

    // Intersection Observer for Animations
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate skill bars
                if (entry.target.id === 'about') {
                    document.querySelectorAll('.progress').forEach(progress => {
                        const width = progress.style.width;
                        progress.style.width = '0';
                        setTimeout(() => {
                            progress.style.width = width;
                        }, 100);
                    });
                    
                    // Animate stats
                    animateStats();
                }
                
                // Animate skills cards
                if (entry.target.id === 'skills') {
                    const skillCards = document.querySelectorAll('.skill-card');
                    skillCards.forEach((card, index) => {
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, index * 100);
                    });
                }
                
                // Animate project cards
                if (entry.target.id === 'projects') {
                    const projectCards = document.querySelectorAll('.project-card');
                    projectCards.forEach((card, index) => {
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, index * 100);
                    });
                }
                
                // Update active nav link
                const id = entry.target.getAttribute('id');
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });

    // Initialize skill cards with opacity 0 for animation
    document.querySelectorAll('.skill-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.5s ease';
    });

    // Initialize project cards with opacity 0 for animation
    document.querySelectorAll('.project-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.5s ease';
    });

    // Projects Filter
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active filter button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            // Filter projects
            projectCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Populate Skills Section
    const skillsContainer = document.querySelector('.skills-container');
    const skillsData = [
        { name: 'HTML5', icon: 'fab fa-html5' },
        { name: 'CSS3', icon: 'fab fa-css3-alt' },
        { name: 'JavaScript', icon: 'fab fa-js' },
        { name: 'React', icon: 'fab fa-react' },
        { name: 'Node.js', icon: 'fab fa-node-js' },
        { name: 'Git', icon: 'fab fa-git-alt' },
        { name: 'Sass', icon: 'fab fa-sass' },
        { name: 'Figma', icon: 'fab fa-figma' },
        { name: 'Python', icon: 'fab fa-python' },
        { name: 'Database', icon: 'fas fa-database' },
        { name: 'Responsive Design', icon: 'fas fa-mobile-alt' },
        { name: 'UI/UX', icon: 'fas fa-paint-brush' }
    ];
    
    skillsData.forEach(skill => {
        const skillCard = document.createElement('div');
        skillCard.className = 'skill-card';
        skillCard.innerHTML = `
            <i class="${skill.icon} skill-icon"></i>
            <h3 class="skill-name">${skill.name}</h3>
        `;
        skillsContainer.appendChild(skillCard);
    });

    // Populate Projects Section
    const projectsGrid = document.querySelector('.projects-grid');
    const projectsData = [
        { 
            title: 'E-commerce Website', 
            category: 'web',
            image: '../images/project1.jpg',
            description: 'A fully responsive e-commerce platform with product filtering and cart functionality.'
        },
        { 
            title: 'Task Management App', 
            category: 'app',
            image: '../images/project2.jpg',
            description: 'A productivity app for managing tasks with drag-and-drop interface and team collaboration.'
        },
        { 
            title: 'Portfolio Design', 
            category: 'design',
            image: '../images/project3.jpg',
            description: 'Modern portfolio design with animated elements and dark/light mode toggle.'
        },
        { 
            title: 'Weather Dashboard', 
            category: 'web',
            image: '../images/project4.png',
            description: 'Real-time weather information with 5-day forecast using weather API.'
        },
        { 
            title: 'Fitness Tracker', 
            category: 'app',
            image: '../images/project5.webp',
            description: 'Mobile app for tracking workouts, nutrition, and progress with data visualization.'
        },
        { 
            title: 'Brand Identity', 
            category: 'design',
            image: '../images/project6.jpg',
            description: 'Complete brand identity package including logo, color palette, and typography.'
        }
    ];
    
    projectsData.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        projectCard.setAttribute('data-category', project.category);
        projectCard.innerHTML = `
            <div class="project-img-container">
                <img src="${project.image}" alt="${project.title}" class="project-img">
            </div>
            <div class="project-info">
                <h3 class="project-title">${project.title}</h3>
                <span class="project-category">${project.category}</span>
                <p>${project.description}</p>
                <div class="project-links">
                    <a href="#" class="project-link"><i class="fas fa-eye"></i> View</a>
                    <a href="https://github.com/Amrit-ghale" class="project-link"><i class="fab fa-github"></i> Code</a>
                </div>
            </div>
        `;
        projectsGrid.appendChild(projectCard);
    });

    // Track visitor
    async function trackVisitor() {
        try {
            await fetch('/api/analytics/visitor', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    path: window.location.pathname
                })
            });
        } catch (err) {
            // Fail silently for analytics
        }
    }

    // Call on page load
    document.addEventListener('DOMContentLoaded', trackVisitor);

    // Initialize animations
    animateStats();
});
