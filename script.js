// Sample gallery items - replace with actual artwork data
const galleryItems = [
    {
        id: 1,
        imageUrl: 'https://www.instagram.com/p/C3JUvPrLGxO/media/?size=l',
        title: 'Digital Portrait',
        description: 'Vibrant digital portrait artwork'
    },
    {
        id: 2,
        imageUrl: 'https://www.instagram.com/p/C2IQIuJL4Aq/media/?size=l',
        title: 'Character Design',
        description: 'Original character design'
    },
    {
        id: 3,
        imageUrl: 'https://www.instagram.com/p/C1mDEUeLXSx/media/?size=l',
        title: 'Digital Illustration',
        description: 'Detailed digital illustration'
    },
    {
        id: 4,
        imageUrl: 'https://www.instagram.com/p/C0_NbXeLXDc/media/?size=l',
        title: 'Fantasy Art',
        description: 'Fantasy-themed digital artwork'
    },
    {
        id: 5,
        imageUrl: 'https://www.instagram.com/p/C0nI5QKrqEt/media/?size=l',
        title: 'Portrait Study',
        description: 'Digital portrait study'
    },
    {
        id: 6,
        imageUrl: 'https://www.instagram.com/p/Cz0Qn8_L1Vw/media/?size=l',
        title: 'Character Illustration',
        description: 'Original character illustration'
    }
];

// Sample podcast episodes - replace with actual episode data
const podcastEpisodes = [
    {
        id: 1,
        title: 'The Future of Digital Art',
        description: 'Exploring emerging trends and technologies in digital art creation',
        duration: '35:42',
        date: 'Feb 20, 2024',
        image: 'images/episode1.jpg',
        category: 'Discussion'
    },
    {
        id: 2,
        title: 'Interview with a Digital Artist',
        description: 'A conversation with award-winning digital artist Sarah Chen',
        duration: '42:15',
        date: 'Feb 13, 2024',
        image: 'images/episode2.jpg',
        category: 'Interviews'
    },
    {
        id: 3,
        title: 'Digital Art Tools Masterclass',
        description: 'Learn the essential tools and techniques for digital art',
        duration: '38:50',
        date: 'Feb 6, 2024',
        image: 'images/episode3.jpg',
        category: 'Tutorials'
    }
];

// Function to create gallery items
function createGalleryItems() {
    const galleryGrid = document.querySelector('.gallery-grid');
    
    galleryItems.forEach(item => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        
        const img = document.createElement('img');
        img.src = item.imageUrl;
        img.alt = item.title;
        
        // Add loading animation
        img.classList.add('loading');
        img.onload = () => {
            img.classList.remove('loading');
            img.classList.add('loaded');
        };
        
        // Add title and description overlay
        const overlay = document.createElement('div');
        overlay.className = 'gallery-overlay';
        overlay.innerHTML = `
            <h3>${item.title}</h3>
            <p>${item.description}</p>
        `;
        
        galleryItem.appendChild(img);
        galleryItem.appendChild(overlay);
        galleryGrid.appendChild(galleryItem);
    });
}

// Function to create episode items
function createEpisodeItems() {
    const episodeList = document.querySelector('.episode-list');
    
    podcastEpisodes.forEach(episode => {
        const episodeItem = document.createElement('div');
        episodeItem.className = 'episode-item';
        
        const img = document.createElement('img');
        img.src = episode.imageUrl;
        img.alt = episode.title;
        
        const content = document.createElement('div');
        content.className = 'episode-content';
        content.innerHTML = `
            <h3 class="episode-title">${episode.title}</h3>
            <p class="episode-description">${episode.description}</p>
        `;
        
        episodeItem.appendChild(img);
        episodeItem.appendChild(content);
        episodeList.appendChild(episodeItem);
    });
}

// Audio player functionality
class AudioPlayer {
    constructor() {
        this.isPlaying = false;
        this.currentTime = 0;
        this.duration = 0;
        this.volume = 1;
        
        this.initializePlayer();
    }

    initializePlayer() {
        // Play/Pause button functionality
        document.querySelectorAll('.play-pause, .play-button').forEach(button => {
            button.addEventListener('click', () => {
                this.togglePlay();
            });
        });

        // Volume control
        const volumeBtn = document.querySelector('.fa-volume-up').parentElement;
        volumeBtn.addEventListener('click', () => {
            this.toggleMute();
        });

        // Progress bar interaction
        const progressBar = document.querySelector('.progress-bar');
        progressBar.addEventListener('click', (e) => {
            const rect = progressBar.getBoundingClientRect();
            const percent = (e.clientX - rect.left) / rect.width;
            this.seekTo(percent);
        });
    }

    togglePlay() {
        this.isPlaying = !this.isPlaying;
        const playButtons = document.querySelectorAll('.play-pause i, .play-button i');
        playButtons.forEach(button => {
            button.className = this.isPlaying ? 'fas fa-pause' : 'fas fa-play';
        });
    }

    toggleMute() {
        this.volume = this.volume === 1 ? 0 : 1;
        const volumeIcon = document.querySelector('.fa-volume-up');
        volumeIcon.className = this.volume === 1 ? 'fas fa-volume-up' : 'fas fa-volume-mute';
    }

    seekTo(percent) {
        const progressBar = document.querySelector('.progress');
        progressBar.style.width = `${percent * 100}%`;
        // Update current time display
        const currentTimeDisplay = document.querySelector('.current-time');
        const totalDuration = 2700; // 45:00 in seconds
        const newTime = Math.floor(percent * totalDuration);
        currentTimeDisplay.textContent = this.formatTime(newTime);
    }

    formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    }
}

// Episode grid functionality
function createEpisodeGrid() {
    const episodeGrid = document.querySelector('.episode-grid');
    
    podcastEpisodes.forEach(episode => {
        const episodeCard = document.createElement('div');
        episodeCard.className = 'episode-card';
        episodeCard.innerHTML = `
            <div class="episode-image">
                <img src="${episode.image}" alt="${episode.title}">
                <button class="play-button">
                    <i class="fas fa-play"></i>
                </button>
            </div>
            <div class="episode-content">
                <span class="episode-category">${episode.category}</span>
                <h3>${episode.title}</h3>
                <p>${episode.description}</p>
                <div class="episode-meta">
                    <span><i class="far fa-calendar"></i> ${episode.date}</span>
                    <span><i class="far fa-clock"></i> ${episode.duration}</span>
                </div>
            </div>
        `;
        episodeGrid.appendChild(episodeCard);
    });
}

// Mobile menu functionality
function initializeMobileMenu() {
    const mobileMenuButton = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    
    mobileMenuButton.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenuButton.querySelector('i').classList.toggle('fa-bars');
        mobileMenuButton.querySelector('i').classList.toggle('fa-times');
    });
}

// Subscribe form functionality
function initializeSubscribeForm() {
    const subscribeForm = document.querySelector('.subscribe-form');
    
    subscribeForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = subscribeForm.querySelector('input[type="email"]').value;
        // Add your subscription logic here
        alert(`Thank you for subscribing with ${email}! We'll keep you updated.`);
        subscribeForm.reset();
    });
}

// Scroll animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                if (entry.target.classList.contains('episode-card')) {
                    entry.target.style.transitionDelay = '${index * 0.1}s';
                }
            }
        });
    }, observerOptions);

    document.querySelectorAll('section, .episode-card').forEach(element => {
        element.classList.add('fade-in');
        observer.observe(element);
    });
}

// Smooth scrolling for navigation links
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

// Initialize the gallery and episodes when the page loads
document.addEventListener('DOMContentLoaded', () => {
    createGalleryItems();
    createEpisodeItems();
    const audioPlayer = new AudioPlayer();
    createEpisodeGrid();
    initializeMobileMenu();
    initializeSubscribeForm();
    initializeScrollAnimations();

    // Dynamic gallery loading with actual Eso Arts images
    const galleryImages = [
        {
            src: 'https://images.squarespace-cdn.com/content/v1/63e27390fb26ad6ddf47e647/947a2ae5-d67d-4ea8-b126-59f4aeda0c39/IMG_9755.jpeg',
            alt: 'Eso Arts Gallery Space'
        },
        {
            src: 'https://images.squarespace-cdn.com/content/v1/63e27390fb26ad6ddf47e647/fda82f5c-8be0-42a0-ac57-bfac8240ed96/IMG_9726.jpeg',
            alt: 'Artist Exhibition at Eso Arts'
        },
        {
            src: 'https://images.squarespace-cdn.com/content/v1/63e27390fb26ad6ddf47e647/e6c73a58-3505-4d96-80bd-93f629b34a29/38532004-F427-4249-8237-C31CF6A30C64.JPG',
            alt: 'Local Art Display'
        }
    ];

    // Create gallery items with loading animation
    galleryImages.forEach(image => {
        const imgContainer = document.createElement('div');
        imgContainer.className = 'gallery-item';
        
        const img = document.createElement('img');
        img.src = image.src;
        img.alt = image.alt;
        img.loading = 'lazy'; // Enable lazy loading
        
        // Add loading animation
        img.classList.add('loading');
        img.addEventListener('load', () => {
            img.classList.remove('loading');
            img.classList.add('loaded');
        });
        
        imgContainer.appendChild(img);
        galleryGrid.appendChild(imgContainer);
    });

    // Form submission handling
    const contactForm = document.querySelector('.contact-form');
    const newsletterForm = document.querySelector('.newsletter-form');
    
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Basic form validation
        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const inquiry = contactForm.querySelector('select').value;
        const message = contactForm.querySelector('textarea').value;
        
        if (name.trim() === '' || email.trim() === '' || inquiry === '' || message.trim() === '') {
            alert('Please fill out all fields');
            return;
        }
        
        // Here you would typically send the form data to a server
        alert('Thank you for your message! We will get back to you soon.');
        contactForm.reset();
    });

    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = newsletterForm.querySelector('input[type="email"]').value;
        
        if (email.trim() === '') {
            alert('Please enter your email address');
            return;
        }
        
        // Here you would typically send the email to a newsletter service
        alert('Thank you for subscribing to our newsletter!');
        newsletterForm.reset();
    });

    // Navbar scroll effect
    let lastScroll = 0;
    const header = document.querySelector('header');

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            header.classList.remove('scroll-up');
            return;
        }
        
        if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
            // Scrolling down
            header.classList.remove('scroll-up');
            header.classList.add('scroll-down');
        } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
            // Scrolling up
            header.classList.remove('scroll-down');
            header.classList.add('scroll-up');
        }
        
        lastScroll = currentScroll;
    });

    // Add loading animation for all images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        if (!img.complete) {
            img.classList.add('loading');
        }
        img.addEventListener('load', () => {
            img.classList.remove('loading');
            img.classList.add('loaded');
        });
    });

    // Initialize map if available
    const mapContainer = document.querySelector('.map');
    if (mapContainer) {
        // You would add your map initialization code here
        // Example using Google Maps or OpenStreetMap
    }

    // Add scroll animation for sections
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('section').forEach(section => {
        section.classList.add('fade-in');
        observer.observe(section);
    });
});
