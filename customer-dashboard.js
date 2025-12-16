// Customer Dashboard JavaScript

// Sample products data
const products = [
    {
        id: 1,
        name: '9 PM Eau de Parfum',
        category: 'men',
        price: 7000,
        oldPrice: 8000,
        image: 'assets/9pm.jpg',
        description: 'A bold and sophisticated fragrance for the modern man'
    },
    {
        id: 2,
        name: 'Dior Sauvage',
        category: 'men',
        price: 19500,
        oldPrice: null,
        image: 'assets/Dior Sauvage Perfume _ Bold & Iconic Luxury Fragrance for Men.jpg',
        description: 'Bold & Iconic Luxury Fragrance'
    },
    {
        id: 3,
        name: 'House of Perfumes',
        category: 'unisex',
        price: 12000,
        oldPrice: 15000,
        image: 'assets/House of Perfumes.jpg',
        description: 'Versatile fragrance for everyone'
    },
    {
        id: 4,
        name: 'Luxury Fragrance Collection',
        category: 'women',
        price: 8500,
        oldPrice: null,
        image: 'assets/A fragrance that speaks before you do_ Dare to be_#ImposingPerfume #FragranceLovers #PerfumeAddict #ScentOfTheDay #FragranceCollection #PerfumeObsession #FragranceCommunity #LuxuryFragrance.jpg',
        description: 'Elegant and timeless fragrance'
    },
    {
        id: 5,
        name: 'Modern Minimalist',
        category: 'unisex',
        price: 9500,
        oldPrice: 11000,
        image: 'assets/YOU Perfume Bottle – Modern Minimalist Fragrance Design Inspiration.jpg',
        description: 'Modern minimalist design'
    },
    {
        id: 6,
        name: 'Men\'s Premium Collection',
        category: 'men',
        price: 11000,
        oldPrice: null,
        image: 'assets/Perfume for men.jpg',
        description: 'Premium collection for men'
    },
    {
        id: 7,
        name: 'Classic Perfume',
        category: 'women',
        price: 7500,
        oldPrice: 9000,
        image: 'assets/Perfume.jpg',
        description: 'Classic and elegant'
    },
    {
        id: 8,
        name: 'Zahrah Premium',
        category: 'women',
        price: 13000,
        oldPrice: null,
        image: 'assets/PHERFMONE ZAHRAH ADS.jpg',
        description: 'Premium fragrance for women'
    }
];

let cart = JSON.parse(localStorage.getItem('cart')) || [];
let currentFilter = 'all';

document.addEventListener('DOMContentLoaded', function() {
    // Check authentication
    checkAuth();
    
    // Load user data
    loadUserData();
    
    // Initialize products
    displayProducts(products);
    
    // Setup event listeners
    setupEventListeners();
    
    // Update cart count
    updateCartCount();
    
    // Load cart items
    displayCartItems();
});

function checkAuth() {
    const user = localStorage.getItem('user');
    if (!user) {
        window.location.href = 'index.html';
    }
}

function loadUserData() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
        const userNameEl = document.getElementById('userName');
        if (userNameEl) {
            userNameEl.textContent = user.name || 'User';
        }
    }
}

function setupEventListeners() {
    // Navigation links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            
            const category = link.getAttribute('href').substring(1);
            if (category !== 'home' && category !== 'about') {
                filterProducts(category);
            }
        });
    });

    // Category cards
    document.querySelectorAll('.category-card').forEach(card => {
        card.addEventListener('click', () => {
            const category = card.dataset.category;
            filterProducts(category);
        });
    });

    // Filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.dataset.filter;
            filterProducts(currentFilter);
        });
    });

    // Search functionality
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const filtered = products.filter(product => 
                product.name.toLowerCase().includes(searchTerm)
            );
            displayProducts(filtered);
        });
    }

    // Cart button
    const cartBtn = document.getElementById('cartBtn');
    const cartSidebar = document.getElementById('cartSidebar');
    const cartOverlay = document.getElementById('cartOverlay');
    const closeCart = document.getElementById('closeCart');

    if (cartBtn) {
        cartBtn.addEventListener('click', () => {
            cartSidebar.classList.add('active');
            cartOverlay.classList.add('active');
        });
    }

    if (closeCart) {
        closeCart.addEventListener('click', closeCartSidebar);
    }

    if (cartOverlay) {
        cartOverlay.addEventListener('click', closeCartSidebar);
    }

    // User menu
    const userMenuBtn = document.getElementById('userMenuBtn');
    const userDropdown = document.getElementById('userDropdown');

    if (userMenuBtn) {
        userMenuBtn.addEventListener('click', () => {
            userDropdown.classList.toggle('active');
        });
    }

    // Logout
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem('user');
            localStorage.removeItem('cart');
            window.location.href = 'index.html';
        });
    }

    // Checkout button
    const checkoutBtn = document.querySelector('.btn-checkout');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            if (cart.length === 0) {
                alert('Your cart is empty!');
                return;
            }
            alert('Checkout functionality would be implemented here!');
        });
    }
}

function displayProducts(productsToShow) {
    const productsGrid = document.getElementById('productsGrid');
    if (!productsGrid) return;

    if (productsToShow.length === 0) {
        productsGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 40px;">No products found</p>';
        return;
    }

    productsGrid.innerHTML = productsToShow.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}" class="product-image" onerror="this.src='assets/9pm.jpg'">
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-category">${product.category.charAt(0).toUpperCase() + product.category.slice(1)}'s</p>
                <div class="product-price">
                    <span class="price">KSH ${product.price.toLocaleString()}</span>
                    ${product.oldPrice ? `<span class="old-price">KSH ${product.oldPrice.toLocaleString()}</span>` : ''}
                </div>
                <button class="add-to-cart-btn" onclick="addToCart(${product.id})">
                    <i class="fas fa-shopping-cart"></i> Add to Cart
                </button>
            </div>
        </div>
    `).join('');
}

function filterProducts(category) {
    if (category === 'all' || category === 'home') {
        displayProducts(products);
    } else {
        const filtered = products.filter(product => product.category === category);
        displayProducts(filtered);
    }
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    displayCartItems();
    
    // Show feedback
    showCartFeedback('Product added to cart!');
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    displayCartItems();
}

function updateCartQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (!item) return;

    item.quantity += change;
    if (item.quantity <= 0) {
        removeFromCart(productId);
    } else {
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        displayCartItems();
    }
}

function updateCartCount() {
    const cartCount = document.getElementById('cartCount');
    if (cartCount) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
    }
}

function displayCartItems() {
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    
    if (!cartItems) return;

    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
        if (cartTotal) cartTotal.textContent = 'KSH 0.00';
        return;
    }

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}" class="cart-item-image" onerror="this.src='assets/9pm.jpg'">
            <div class="cart-item-info">
                <h4 class="cart-item-name">${item.name}</h4>
                <p class="cart-item-price">KSH ${item.price.toLocaleString()} x ${item.quantity}</p>
                <div class="quantity-controls">
                    <button onclick="updateCartQuantity(${item.id}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="updateCartQuantity(${item.id}, 1)">+</button>
                </div>
            </div>
            <button class="cart-item-remove" onclick="removeFromCart(${item.id})">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `).join('');

    if (cartTotal) {
        cartTotal.textContent = `KSH ${total.toLocaleString()}`;
    }
}

function closeCartSidebar() {
    const cartSidebar = document.getElementById('cartSidebar');
    const cartOverlay = document.getElementById('cartOverlay');
    cartSidebar.classList.remove('active');
    cartOverlay.classList.remove('active');
}

function showCartFeedback(message) {
    // Create a temporary notification
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--success);
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        box-shadow: var(--shadow-lg);
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 2000);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    .quantity-controls {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-top: 10px;
    }
    .quantity-controls button {
        width: 30px;
        height: 30px;
        border: 1px solid var(--border-color);
        background: var(--dark-bg);
        color: var(--text-primary);
        border-radius: 4px;
        cursor: pointer;
    }
    .quantity-controls span {
        min-width: 30px;
        text-align: center;
    }
`;
document.head.appendChild(style);

