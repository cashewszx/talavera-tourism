
// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// Smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu
            if (navMenu) navMenu.classList.remove('active');
        }
    });
});

const filterBtns = document.querySelectorAll('.filter-btn');
const cards = document.querySelectorAll('.destination-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const filterValue = btn.getAttribute('data-filter');
        
        cards.forEach((card, index) => {
            if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.classList.add('visible');
                }, 50);
            } else {
                card.classList.remove('visible');
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});

cards.forEach((card, index) => {
    card.style.cursor = 'pointer';
    
    card.addEventListener('click', (e) => {
        // Prevent modal if clicking View More button (it has its own onclick)
        if (!e.target.closest('.view-more')) {
            openModal(index + 1); // +1 because index starts at 0
        }
    });
});

// Modal functionality
const modal = document.getElementById('destinationModal');
const modalBody = document.getElementById('modalBody');

const destinations = {
    1: {
        image: 'sanisidroparishchurch.jpg',
        title: 'San Isidro Parish Church',
        description: 'Historic Spanish-era church at the heart of Talavera. Beautiful architecture and peaceful atmosphere.',
        location: 'Poblacion, Talavera, Nueva Ecija',
        category: 'historical',
        features: ['Free Entrance', 'Open 6AM-6PM', 'Photo Spot'],
        rating: 4.9,
        contact: '044-940-1001'
    },
    2:{
        image: 'municipality.jpg',
        title: '🏛️ Talavera Municipal Hall',
        description: 'Modern government center with tourism office.',
        location: 'Poblacion',
        category: 'historical',
        features: ['Tourism Office', 'Free WiFi'],
        rating: 4.4,
        contact: '044-940-1000'
    },
    3: {
        image: 'mariahcali.jpg',
        title: 'Mariah Cali Farm & Resort-Events, Hotel & Restaurant',
        description: 'Mariah Cali Farm & Resort is a guest house located in Talavera, Nueva Ecija, Philippines. It is situated near the sports venue Cabubulaonan Gym and the town Llanera. The resort offers a serene environment with greenery and a homey vibe, making it an ideal place for a vacation with family, friends, or loved ones. The resort is known for its affordable and convenient attractions, ensuring a memorable experience for guests.',
        location: 'Cabubulaunan, Talavera, Nueva Ecija',
        category: 'adventure',
        features: ['restaurant', 'event place', 'swimming'],
        rating: 4.5,
        contact: ''
    },
    4: {
        image: 'crystalwaves.jpg',
         title: '🏖️ Crystal Waves Hotel & Resort',
        description: 'Luxurious beachfront resort with infinity pools, private beach, spa & modern accommodations.',
        location: 'Dinarayat, Talavera, Nueva Ecija',
        category: 'resort',
        features: ['Infinity Pool', 'Private Beach', 'Spa', 'Restaurant'],
        rating: 4.8,
        contact: '(044) 806-1234'
    },
    5: {
        image: 'dvfmilk.jpg',
        title: 'DVF Dairy Farm',
        description: 'The farm is situated in a region known for its abundant forage, ensuring that the carabaos are well-fed, which contributes to the high quality of the milk produced.',
        location: 'Poblacion Sur',
        category: 'historical',
        features: ['Dairy Products', 'Fresh Milks'],
        rating: 4.6,
        contact: ''
    },
    6: {
        image: 'rmresort.webp',
        title: 'RM Farm House Resort',
        description: 'Charming chapel dedicated to farmers. Very peaceful.',
        location: 'Homestaed I',
        category: 'adventure',
        features: ['Nice Garden', 'Peaceful', 'Clean rooms'],
        rating: 4.7,
        contact: ''
    },
    7: {
        image: 'jabscafe.jpg',
        title: '☕ Jab\'s Cafe',
        description: 'Cozy cafe with delicious coffee, pastries & local delicacies. Perfect hangout spot!',
        location: 'San Pascual, Talavera, Nueva Ecija',
        category: 'nature',
        features: ['Coffee', 'Pastries', 'WiFi', 'Instagram Worthy'],
        rating: 4.7,
        contact: '0917-xxx-xxxx'
    }
};

// ✅ FIXED MODAL - FULL PICTURE DISPLAY!
function openModal(id) {
    const dest = destinations[id];
    if (dest && modalBody) {
        modalBody.innerHTML = `
            <div class="modal-image-container">
                <img src="${dest.image}" alt="${dest.title}" class="modal-image" loading="lazy">
                <div class="modal-category">${dest.category.toUpperCase()}</div>
            </div>
            <div class="modal-body">
                <div class="modal-header">
                    <h2 class="modal-title">${dest.title}</h2>
                    <div class="modal-rating">⭐ ${dest.rating} (128 reviews)</div>
                </div>
                <p class="modal-description">${dest.description}</p>
                <div class="modal-location">
                    <i class="fas fa-map-marker-alt"></i> ${dest.location}
                </div>
                <div class="modal-features">
                    ${dest.features.map(feat => `<span class="feature-tag">${feat}</span>`).join('')}
                </div>
                <div class="modal-actions">
                    <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(dest.title + ', Talavera, Nueva Ecija')}" target="_blank" class="btn btn-primary">
                        <i class="fas fa-directions"></i> Get Directions
                    </a>
                    ${dest.contact ? `<a href="tel:${dest.contact.replace(/\D/g, '')}" class="btn btn-secondary"><i class="fas fa-phone"></i> Call Now</a>` : ''}
                    <button onclick="sharePlace(${id})" class="btn btn-outline">
                        <i class="fas fa-share-alt"></i> Share
                    </button>
                </div>
            </div>
        `;
        
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function sharePlace(id) {
    const dest = destinations[id];
    const shareText = `Check out ${dest.title} in Talavera, Nueva Ecija! ${window.location.origin}`;
    
    if (navigator.share) {
        navigator.share({
            title: dest.title,
            text: shareText,
            url: window.location.href
        });
    } else {
        navigator.clipboard.writeText(shareText).then(() => {
            alert('✅ Link copied to clipboard!');
        });
    }
}

// Close modal events
if (modal) {
    window.onclick = function(event) {
        if (event.target === modal) closeModal();
    };
    
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') closeModal();
    });
}

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 5px 30px rgba(0,0,0,0.15)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
        }
    }
});

// Animate cards on scroll
function animateCards() {
    cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.8) {
            card.classList.add('visible');
        }
    });
}

window.addEventListener('scroll', animateCards);
window.addEventListener('load', animateCards);

// Preload all images for smooth experience
Object.values(destinations).forEach(dest => {
    const img = new Image();
    img.src = dest.image;
});
