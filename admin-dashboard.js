// Admin Dashboard JavaScript

// Sample data
const sampleOrders = [
    { id: 'ORD001', customer: 'John Doe', product: '9 PM Eau de Parfum', amount: 7000, status: 'pending', date: '2024-01-15' },
    { id: 'ORD002', customer: 'Jane Smith', product: 'Dior Sauvage', amount: 19500, status: 'processing', date: '2024-01-14' },
    { id: 'ORD003', customer: 'Mike Johnson', product: 'House of Perfumes', amount: 12000, status: 'shipped', date: '2024-01-13' },
    { id: 'ORD004', customer: 'Sarah Williams', product: 'Luxury Fragrance', amount: 8500, status: 'delivered', date: '2024-01-12' },
    { id: 'ORD005', customer: 'David Brown', product: 'Modern Minimalist', amount: 9500, status: 'pending', date: '2024-01-11' }
];

const sampleProducts = [
    { id: 1, name: '9 PM Eau de Parfum', category: 'men', price: 7000, stock: 45, status: 'active', image: 'assets/9pm.jpg' },
    { id: 2, name: 'Dior Sauvage', category: 'men', price: 19500, stock: 23, status: 'active', image: 'assets/Dior Sauvage Perfume _ Bold & Iconic Luxury Fragrance for Men.jpg' },
    { id: 3, name: 'House of Perfumes', category: 'unisex', price: 12000, stock: 30, status: 'active', image: 'assets/House of Perfumes.jpg' },
    { id: 4, name: 'Luxury Fragrance Collection', category: 'women', price: 8500, stock: 18, status: 'active', image: 'assets/A fragrance that speaks before you do_ Dare to be_#ImposingPerfume #FragranceLovers #PerfumeAddict #ScentOfTheDay #FragranceCollection #PerfumeObsession #FragranceCommunity #LuxuryFragrance.jpg' },
    { id: 5, name: 'Modern Minimalist', category: 'unisex', price: 9500, stock: 25, status: 'active', image: 'assets/YOU Perfume Bottle – Modern Minimalist Fragrance Design Inspiration.jpg' }
];

const sampleCustomers = [
    { name: 'John Doe', email: 'john@example.com', phone: '+254712345678', orders: 5, total: 35000, joined: '2023-12-01' },
    { name: 'Jane Smith', email: 'jane@example.com', phone: '+254723456789', orders: 3, total: 28000, joined: '2023-12-15' },
    { name: 'Mike Johnson', email: 'mike@example.com', phone: '+254734567890', orders: 8, total: 56000, joined: '2023-11-20' }
];

document.addEventListener('DOMContentLoaded', function() {
    // Check authentication
    checkAuth();
    
    // Setup navigation
    setupNavigation();
    
    // Load dashboard data
    loadDashboardData();
    
    // Setup event listeners
    setupEventListeners();
});

function checkAuth() {
    const user = localStorage.getItem('user');
    if (!user) {
        window.location.href = 'index.html';
        return;
    }
    
    const userData = JSON.parse(user);
    if (userData.role !== 'admin') {
        window.location.href = 'customer-dashboard.html';
    }
}

function setupNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    const pageContents = document.querySelectorAll('.page-content');
    
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const page = item.dataset.page;
            
            // Update active nav item
            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');
            
            // Show corresponding page
            pageContents.forEach(content => content.classList.remove('active'));
            const targetPage = document.getElementById(`${page}-page`);
            if (targetPage) {
                targetPage.classList.add('active');
            }
            
            // Update page title
            const pageTitle = document.getElementById('pageTitle');
            if (pageTitle) {
                pageTitle.textContent = page.charAt(0).toUpperCase() + page.slice(1);
            }
            
            // Load page-specific data
            loadPageData(page);
        });
    });
}

function loadDashboardData() {
    loadRecentOrders();
    loadTopProducts();
}

function loadRecentOrders() {
    const tableBody = document.getElementById('recentOrdersTable');
    if (!tableBody) return;
    
    tableBody.innerHTML = sampleOrders.slice(0, 5).map(order => `
        <tr>
            <td>${order.id}</td>
            <td>${order.customer}</td>
            <td>${order.product}</td>
            <td>KSH ${order.amount.toLocaleString()}</td>
            <td><span class="status-badge ${order.status}">${order.status}</span></td>
            <td>${order.date}</td>
        </tr>
    `).join('');
}

function loadTopProducts() {
    const topProductsList = document.getElementById('topProductsList');
    if (!topProductsList) return;
    
    topProductsList.innerHTML = sampleProducts.slice(0, 5).map(product => `
        <div class="top-product-item">
            <img src="${product.image}" alt="${product.name}" onerror="this.src='assets/9pm.jpg'">
            <div class="top-product-info">
                <div class="top-product-name">${product.name}</div>
                <div class="top-product-sales">${product.stock} in stock</div>
            </div>
        </div>
    `).join('');
}

function loadPageData(page) {
    switch(page) {
        case 'products':
            loadProductsTable();
            break;
        case 'orders':
            loadOrdersTable();
            break;
        case 'customers':
            loadCustomersTable();
            break;
    }
}

function loadProductsTable() {
    const tableBody = document.getElementById('adminProductsTable');
    if (!tableBody) return;
    
    tableBody.innerHTML = sampleProducts.map(product => `
        <tr>
            <td><img src="${product.image}" alt="${product.name}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 4px;" onerror="this.src='assets/9pm.jpg'"></td>
            <td>${product.name}</td>
            <td>${product.category.charAt(0).toUpperCase() + product.category.slice(1)}'s</td>
            <td>KSH ${product.price.toLocaleString()}</td>
            <td>${product.stock}</td>
            <td><span class="status-badge ${product.status}">${product.status}</span></td>
            <td>
                <button class="action-btn btn-edit" onclick="editProduct(${product.id})">
                    <i class="fas fa-edit"></i> Edit
                </button>
                <button class="action-btn btn-delete" onclick="deleteProduct(${product.id})">
                    <i class="fas fa-trash"></i> Delete
                </button>
            </td>
        </tr>
    `).join('');
}

function loadOrdersTable() {
    const tableBody = document.getElementById('adminOrdersTable');
    if (!tableBody) return;
    
    tableBody.innerHTML = sampleOrders.map(order => `
        <tr>
            <td>${order.id}</td>
            <td>${order.customer}</td>
            <td>${order.product}</td>
            <td>KSH ${order.amount.toLocaleString()}</td>
            <td><span class="status-badge ${order.status}">${order.status}</span></td>
            <td>${order.date}</td>
            <td>
                <button class="action-btn btn-view" onclick="viewOrder('${order.id}')">
                    <i class="fas fa-eye"></i> View
                </button>
                <button class="action-btn btn-edit" onclick="updateOrderStatus('${order.id}')">
                    <i class="fas fa-edit"></i> Update
                </button>
            </td>
        </tr>
    `).join('');
}

function loadCustomersTable() {
    const tableBody = document.getElementById('customersTable');
    if (!tableBody) return;
    
    tableBody.innerHTML = sampleCustomers.map(customer => `
        <tr>
            <td>${customer.name}</td>
            <td>${customer.email}</td>
            <td>${customer.phone}</td>
            <td>${customer.orders}</td>
            <td>KSH ${customer.total.toLocaleString()}</td>
            <td>${customer.joined}</td>
            <td>
                <button class="action-btn btn-view" onclick="viewCustomer('${customer.email}')">
                    <i class="fas fa-eye"></i> View
                </button>
            </td>
        </tr>
    `).join('');
}

function setupEventListeners() {
    // Menu toggle (for mobile)
    const menuToggle = document.getElementById('menuToggle');
    const sidebar = document.querySelector('.admin-sidebar');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            sidebar.classList.toggle('active');
        });
    }
    
    // Logout
    const logoutBtn = document.getElementById('adminLogoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem('user');
            window.location.href = 'index.html';
        });
    }
    
    // Add Product Modal
    const addProductBtn = document.getElementById('addProductBtn');
    const addProductModal = document.getElementById('addProductModal');
    const closeProductModal = document.getElementById('closeProductModal');
    const cancelProductBtn = document.getElementById('cancelProductBtn');
    const modalOverlay = document.getElementById('modalOverlay');
    const addProductForm = document.getElementById('addProductForm');
    
    if (addProductBtn) {
        addProductBtn.addEventListener('click', () => {
            addProductModal.classList.add('active');
            modalOverlay.classList.add('active');
        });
    }
    
    if (closeProductModal) {
        closeProductModal.addEventListener('click', closeProductModalFunc);
    }
    
    if (cancelProductBtn) {
        cancelProductBtn.addEventListener('click', closeProductModalFunc);
    }
    
    if (modalOverlay) {
        modalOverlay.addEventListener('click', closeProductModalFunc);
    }
    
    if (addProductForm) {
        addProductForm.addEventListener('submit', handleAddProduct);
    }
    
    // Product search
    const productSearch = document.getElementById('productSearch');
    if (productSearch) {
        productSearch.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const filtered = sampleProducts.filter(product => 
                product.name.toLowerCase().includes(searchTerm)
            );
            displayFilteredProducts(filtered);
        });
    }
    
    // Category filter
    const categoryFilter = document.getElementById('categoryFilter');
    if (categoryFilter) {
        categoryFilter.addEventListener('change', (e) => {
            const category = e.target.value;
            if (category === 'all') {
                displayFilteredProducts(sampleProducts);
            } else {
                const filtered = sampleProducts.filter(product => product.category === category);
                displayFilteredProducts(filtered);
            }
        });
    }
    
    // Order status filter
    const orderStatusFilter = document.getElementById('orderStatusFilter');
    if (orderStatusFilter) {
        orderStatusFilter.addEventListener('change', (e) => {
            const status = e.target.value;
            if (status === 'all') {
                loadOrdersTable();
            } else {
                const filtered = sampleOrders.filter(order => order.status === status);
                displayFilteredOrders(filtered);
            }
        });
    }
}

function closeProductModalFunc() {
    const addProductModal = document.getElementById('addProductModal');
    const modalOverlay = document.getElementById('modalOverlay');
    addProductModal.classList.remove('active');
    modalOverlay.classList.remove('active');
}

function handleAddProduct(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    // In a real application, this would send data to a server
    alert('Product added successfully! (This is a demo)');
    closeProductModalFunc();
    e.target.reset();
    loadProductsTable();
}

function displayFilteredProducts(products) {
    const tableBody = document.getElementById('adminProductsTable');
    if (!tableBody) return;
    
    if (products.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="7" style="text-align: center; padding: 40px;">No products found</td></tr>';
        return;
    }
    
    tableBody.innerHTML = products.map(product => `
        <tr>
            <td><img src="${product.image}" alt="${product.name}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 4px;" onerror="this.src='assets/9pm.jpg'"></td>
            <td>${product.name}</td>
            <td>${product.category.charAt(0).toUpperCase() + product.category.slice(1)}'s</td>
            <td>KSH ${product.price.toLocaleString()}</td>
            <td>${product.stock}</td>
            <td><span class="status-badge ${product.status}">${product.status}</span></td>
            <td>
                <button class="action-btn btn-edit" onclick="editProduct(${product.id})">
                    <i class="fas fa-edit"></i> Edit
                </button>
                <button class="action-btn btn-delete" onclick="deleteProduct(${product.id})">
                    <i class="fas fa-trash"></i> Delete
                </button>
            </td>
        </tr>
    `).join('');
}

function displayFilteredOrders(orders) {
    const tableBody = document.getElementById('adminOrdersTable');
    if (!tableBody) return;
    
    if (orders.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="7" style="text-align: center; padding: 40px;">No orders found</td></tr>';
        return;
    }
    
    tableBody.innerHTML = orders.map(order => `
        <tr>
            <td>${order.id}</td>
            <td>${order.customer}</td>
            <td>${order.product}</td>
            <td>KSH ${order.amount.toLocaleString()}</td>
            <td><span class="status-badge ${order.status}">${order.status}</span></td>
            <td>${order.date}</td>
            <td>
                <button class="action-btn btn-view" onclick="viewOrder('${order.id}')">
                    <i class="fas fa-eye"></i> View
                </button>
                <button class="action-btn btn-edit" onclick="updateOrderStatus('${order.id}')">
                    <i class="fas fa-edit"></i> Update
                </button>
            </td>
        </tr>
    `).join('');
}

// Action functions
function editProduct(id) {
    const product = sampleProducts.find(p => p.id === id);
    if (product) {
        alert(`Edit product: ${product.name}\n(This is a demo - edit functionality would be implemented here)`);
    }
}

function deleteProduct(id) {
    if (confirm('Are you sure you want to delete this product?')) {
        alert('Product deleted! (This is a demo)');
        loadProductsTable();
    }
}

function viewOrder(id) {
    const order = sampleOrders.find(o => o.id === id);
    if (order) {
        alert(`Order Details:\nID: ${order.id}\nCustomer: ${order.customer}\nProduct: ${order.product}\nAmount: KSH ${order.amount.toLocaleString()}\nStatus: ${order.status}`);
    }
}

function updateOrderStatus(id) {
    const order = sampleOrders.find(o => o.id === id);
    if (order) {
        const newStatus = prompt(`Update order status for ${order.id}:\nCurrent: ${order.status}\nEnter new status (pending/processing/shipped/delivered/cancelled):`);
        if (newStatus) {
            alert(`Order status updated to: ${newStatus} (This is a demo)`);
            loadOrdersTable();
        }
    }
}

function viewCustomer(email) {
    const customer = sampleCustomers.find(c => c.email === email);
    if (customer) {
        alert(`Customer Details:\nName: ${customer.name}\nEmail: ${customer.email}\nPhone: ${customer.phone}\nOrders: ${customer.orders}\nTotal Spent: KSH ${customer.total.toLocaleString()}`);
    }
}

