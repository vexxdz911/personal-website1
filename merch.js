// Shopping Cart Functionality
class ShoppingCart {
    constructor() {
        this.items = [];
        this.initializeCart();
        this.bindEvents();
    }

    initializeCart() {
        // Load cart from localStorage if available
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            this.items = JSON.parse(savedCart);
            this.updateCartBadge();
        }
    }

    bindEvents() {
        // Add to cart buttons
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', (e) => {
                const card = e.target.closest('.product-card');
                const product = {
                    id: Date.now(), // Temporary ID
                    name: card.querySelector('h3').textContent,
                    price: parseFloat(card.querySelector('.price').textContent.replace('$', '')),
                    image: card.querySelector('img').src
                };
                this.addItem(product);
                this.showNotification('Added to cart!');
            });
        });

        // Quick view buttons
        document.querySelectorAll('.quick-view').forEach(button => {
            button.addEventListener('click', (e) => {
                const card = e.target.closest('.product-card');
                this.showQuickView(card);
            });
        });
    }

    addItem(product) {
        this.items.push(product);
        this.saveCart();
        this.updateCartBadge();
    }

    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.saveCart();
        this.updateCartBadge();
    }

    saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.items));
    }

    updateCartBadge() {
        const badge = document.querySelector('.cart-badge');
        if (badge) {
            badge.setAttribute('data-count', this.items.length);
        }
    }

    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        document.body.appendChild(notification);

        // Trigger animation
        setTimeout(() => notification.classList.add('show'), 100);
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 2000);
    }

    showQuickView(productCard) {
        const modal = document.createElement('div');
        modal.className = 'quick-view-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <button class="close-modal">&times;</button>
                <div class="modal-body">
                    <div class="product-image">
                        <img src="${productCard.querySelector('img').src}" alt="Product">
                    </div>
                    <div class="product-details">
                        <h3>${productCard.querySelector('h3').textContent}</h3>
                        <p class="price">${productCard.querySelector('.price').textContent}</p>
                        <div class="product-meta">
                            ${productCard.querySelector('.product-meta').innerHTML}
                        </div>
                        <button class="btn-primary add-to-cart">Add to Cart</button>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        setTimeout(() => modal.classList.add('show'), 100);

        // Close modal functionality
        const closeBtn = modal.querySelector('.close-modal');
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('show');
            setTimeout(() => modal.remove(), 300);
        });

        // Add to cart from modal
        modal.querySelector('.add-to-cart').addEventListener('click', () => {
            const product = {
                id: Date.now(),
                name: productCard.querySelector('h3').textContent,
                price: parseFloat(productCard.querySelector('.price').textContent.replace('$', '')),
                image: productCard.querySelector('img').src
            };
            this.addItem(product);
            this.showNotification('Added to cart!');
            modal.classList.remove('show');
            setTimeout(() => modal.remove(), 300);
        });
    }
}

// Newsletter Form
function initializeNewsletterForm() {
    const form = document.querySelector('.newsletter-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = form.querySelector('input[type="email"]').value;
            // Add newsletter subscription logic here
            showNotification('Thanks for subscribing! Check your email for the discount code.');
            form.reset();
        });
    }
}

// Mobile Menu
function initializeMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileMenuBtn.querySelector('i').classList.toggle('fa-bars');
            mobileMenuBtn.querySelector('i').classList.toggle('fa-times');
        });
    }
}

// Initialize everything when the page loads
document.addEventListener('DOMContentLoaded', () => {
    const cart = new ShoppingCart();
    initializeNewsletterForm();
    initializeMobileMenu();
});
