// Authentication JavaScript

// Tab switching
document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');

    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const tab = btn.dataset.tab;
            
            // Update active tab button
            tabButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Show/hide forms
            if (tab === 'login') {
                loginForm.classList.add('active');
                signupForm.classList.remove('active');
            } else {
                loginForm.classList.remove('active');
                signupForm.classList.add('active');
            }
        });
    });

    // Login form submission
    const loginFormElement = document.getElementById('loginForm');
    loginFormElement.addEventListener('submit', handleLogin);

    // Signup form submission
    const signupFormElement = document.getElementById('signupForm');
    signupFormElement.addEventListener('submit', handleSignup);

    // Google Sign In
    const googleSignInBtn = document.getElementById('googleSignIn');
    googleSignInBtn.addEventListener('click', handleGoogleSignIn);

    // Check if user is already logged in
    checkAuthStatus();
});

function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    const rememberMe = document.getElementById('remember-me').checked;

    // Simulate authentication (replace with actual API call)
    showMessage('Logging in...', 'success');
    
    setTimeout(() => {
        // Store user data
        const userData = {
            email: email,
            name: email.split('@')[0],
            role: email.includes('admin') ? 'admin' : 'customer',
            loginMethod: 'email'
        };
        
        localStorage.setItem('user', JSON.stringify(userData));
        if (rememberMe) {
            localStorage.setItem('rememberMe', 'true');
        }
        
        // Redirect based on role
        if (userData.role === 'admin') {
            window.location.href = 'admin-dashboard.html';
        } else {
            window.location.href = 'customer-dashboard.html';
        }
    }, 1000);
}

function handleSignup(e) {
    e.preventDefault();
    const name = document.getElementById('signup-name').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const confirmPassword = document.getElementById('signup-confirm-password').value;

    // Validate passwords match
    if (password !== confirmPassword) {
        showMessage('Passwords do not match!', 'error');
        return;
    }

    if (password.length < 6) {
        showMessage('Password must be at least 6 characters!', 'error');
        return;
    }

    // Simulate signup (replace with actual API call)
    showMessage('Creating account...', 'success');
    
    setTimeout(() => {
        const userData = {
            email: email,
            name: name,
            role: 'customer',
            loginMethod: 'email'
        };
        
        localStorage.setItem('user', JSON.stringify(userData));
        showMessage('Account created successfully!', 'success');
        
        setTimeout(() => {
            window.location.href = 'customer-dashboard.html';
        }, 1500);
    }, 1000);
}

function handleGoogleSignIn() {
    showMessage('Signing in with Google...', 'success');
    
    // Simulate Google OAuth (replace with actual Google OAuth implementation)
    setTimeout(() => {
        const userData = {
            email: 'user@gmail.com',
            name: 'Google User',
            role: 'customer',
            loginMethod: 'google',
            picture: 'https://ui-avatars.com/api/?name=Google+User&background=6366f1&color=fff'
        };
        
        localStorage.setItem('user', JSON.stringify(userData));
        
        // Redirect based on role
        if (userData.role === 'admin') {
            window.location.href = 'admin-dashboard.html';
        } else {
            window.location.href = 'customer-dashboard.html';
        }
    }, 1000);
}

function showMessage(message, type) {
    const messageEl = document.getElementById('auth-message');
    messageEl.textContent = message;
    messageEl.className = `auth-message ${type}`;
    
    setTimeout(() => {
        messageEl.className = 'auth-message';
        messageEl.textContent = '';
    }, 5000);
}

function checkAuthStatus() {
    const user = localStorage.getItem('user');
    if (user) {
        const userData = JSON.parse(user);
        // Redirect if already logged in
        if (userData.role === 'admin') {
            window.location.href = 'admin-dashboard.html';
        } else {
            window.location.href = 'customer-dashboard.html';
        }
    }
}

