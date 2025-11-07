// Authentication functionality
class Auth {
    constructor() {
        this.currentUser = null;
        this.init();
    }

    init() {
        // Check if user is logged in
        this.checkAuthState();
        
        // Set up event listeners
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Login form
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => this.handleLogin(e));
        }

        // Register form
        const registerForm = document.getElementById('registerForm');
        if (registerForm) {
            registerForm.addEventListener('submit', (e) => this.handleRegister(e));
        }

        // Logout button
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', (e) => this.handleLogout(e));
        }

        // Password confirmation validation
        const confirmPassword = document.getElementById('confirmPassword');
        if (confirmPassword) {
            confirmPassword.addEventListener('input', () => this.validatePasswordMatch());
        }
    }

    checkAuthState() {
        const user = localStorage.getItem('currentUser');
        if (user) {
            this.currentUser = JSON.parse(user);
            
            // Redirect to dashboard if on auth pages
            if (window.location.pathname.includes('login.html') || 
                window.location.pathname.includes('register.html')) {
                window.location.href = 'dashboard.html';
            }
        } else {
            // Redirect to login if on protected pages
            if (window.location.pathname.includes('dashboard.html') ||
                window.location.pathname.includes('challenges.html') ||
                window.location.pathname.includes('simulations.html') ||
                window.location.pathname.includes('learn.html') ||
                window.location.pathname.includes('community.html') ||
                window.location.pathname.includes('profile.html')) {
                window.location.href = 'login.html';
            }
        }
    }

    handleLogin(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        // Demo account for testing
        if (email === 'demo@finquest.com' && password === 'demo123') {
            this.loginUser({
                id: 1,
                name: 'Thabo Johnson',
                email: 'demo@finquest.com',
                lifePath: 'music-producer',
                level: 2,
                points: 980
            });
            return;
        }

        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find(u => u.email === email && u.password === password);
        
        if (user) {
            this.loginUser(user);
        } else {
            this.showError('Invalid email or password');
        }
    }

    handleRegister(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const userData = Object.fromEntries(formData);
        
        // Validate password match
        if (userData.password !== userData.confirmPassword) {
            this.showError('Passwords do not match');
            return;
        }

        // Check if user already exists
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        if (users.find(u => u.email === userData.email)) {
            this.showError('User with this email already exists');
            return;
        }

        // Create new user
        const newUser = {
            id: Date.now(),
            name: userData.fullName,
            email: userData.email,
            password: userData.password,
            lifePath: userData.lifePath,
            level: 1,
            points: 0,
            createdAt: new Date().toISOString()
        };

        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        
        this.loginUser(newUser);
    }

    loginUser(user) {
        // Remove password before storing
        const { password, ...userWithoutPassword } = user;
        localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
        this.currentUser = userWithoutPassword;
        
        // Show success message
        this.showSuccess('Login successful! Redirecting...');
        
        // Redirect to dashboard
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 1000);
    }

    handleLogout(e) {
        e.preventDefault();
        
        localStorage.removeItem('currentUser');
        this.currentUser = null;
        
        // Redirect to login
        window.location.href = 'login.html';
    }

    validatePasswordMatch() {
        const password = document.getElementById('password');
        const confirmPassword = document.getElementById('confirmPassword');
        
        if (password && confirmPassword) {
            if (password.value !== confirmPassword.value) {
                confirmPassword.style.borderColor = 'var(--danger)';
            } else {
                confirmPassword.style.borderColor = 'var(--success)';
            }
        }
    }

    showError(message) {
        this.showNotification(message, 'error');
    }

    showSuccess(message) {
        this.showNotification(message, 'success');
    }

    showNotification(message, type) {
        // Remove existing notifications
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        // Create notification
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        // Style notification
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: var(--border-radius);
            color: white;
            font-weight: 500;
            z-index: 10000;
            animation: slideIn 0.3s ease;
            background: ${type === 'error' ? 'var(--danger)' : 'var(--success)'};
        `;

        document.body.appendChild(notification);

        // Remove after 3 seconds
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    getCurrentUser() {
        return this.currentUser;
    }
}

// Initialize auth when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.auth = new Auth();
});

// Add CSS for notifications
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
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
`;
document.head.appendChild(notificationStyles);
// Authentication functionality
class Auth {
    constructor() {
        this.currentUser = null;
        this.init();
    }

    init() {
        // Check if user is logged in
        this.checkAuthState();
        
        // Set up event listeners
        this.setupEventListeners();
        
        // Initialize password strength checker
        this.initPasswordStrength();
    }

    setupEventListeners() {
        // Login form
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => this.handleLogin(e));
        }

        // Register form
        const registerForm = document.getElementById('registerForm');
        if (registerForm) {
            registerForm.addEventListener('submit', (e) => this.handleRegister(e));
        }

        // Logout button
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', (e) => this.handleLogout(e));
        }

        // Password confirmation validation
        const confirmPassword = document.getElementById('confirmPassword');
        if (confirmPassword) {
            confirmPassword.addEventListener('input', () => this.validatePasswordMatch());
        }

        // Demo account link
        const useDemo = document.getElementById('use-demo');
        if (useDemo) {
            useDemo.addEventListener('click', (e) => {
                e.preventDefault();
                this.useDemoAccount();
            });
        }

        // Navigation between auth pages
        const showRegister = document.getElementById('show-register');
        if (showRegister) {
            showRegister.addEventListener('click', (e) => {
                e.preventDefault();
                window.location.href = 'register.html';
            });
        }

        const showLogin = document.getElementById('show-login');
        if (showLogin) {
            showLogin.addEventListener('click', (e) => {
                e.preventDefault();
                window.location.href = 'login.html';
            });
        }
    }

    initPasswordStrength() {
        const passwordInput = document.getElementById('password');
        if (passwordInput) {
            passwordInput.addEventListener('input', (e) => {
                this.checkPasswordStrength(e.target.value);
            });
        }
    }

    checkPasswordStrength(password) {
        const strengthBar = document.querySelector('.password-strength');
        if (!strengthBar) return;

        let strength = 0;
        const patterns = {
            length: /.{8,}/,
            lowercase: /[a-z]/,
            uppercase: /[A-Z]/,
            numbers: /\d/,
            special: /[!@#$%^&*(),.?":{}|<>]/
        };

        Object.values(patterns).forEach(pattern => {
            if (pattern.test(password)) strength++;
        });

        strengthBar.className = 'password-strength';
        
        if (password.length === 0) {
            strengthBar.style.display = 'none';
            return;
        }
        
        strengthBar.style.display = 'block';

        if (strength <= 2) {
            strengthBar.classList.add('strength-weak');
        } else if (strength <= 3) {
            strengthBar.classList.add('strength-fair');
        } else if (strength <= 4) {
            strengthBar.classList.add('strength-good');
        } else {
            strengthBar.classList.add('strength-strong');
        }
    }

    checkAuthState() {
        const user = localStorage.getItem('currentUser');
        if (user) {
            this.currentUser = JSON.parse(user);
            
            // Redirect to dashboard if on auth pages
            if (this.isAuthPage() && !this.isLogoutRequested()) {
                window.location.href = 'dashboard.html';
            }
        } else {
            // Redirect to login if on protected pages
            if (this.isProtectedPage()) {
                window.location.href = 'login.html';
            }
        }
    }

    isAuthPage() {
        return window.location.pathname.includes('login.html') || 
               window.location.pathname.includes('register.html');
    }

    isProtectedPage() {
        return window.location.pathname.includes('dashboard.html') ||
               window.location.pathname.includes('challenges.html') ||
               window.location.pathname.includes('simulations.html') ||
               window.location.pathname.includes('learn.html') ||
               window.location.pathname.includes('community.html') ||
               window.location.pathname.includes('profile.html');
    }

    isLogoutRequested() {
        return new URLSearchParams(window.location.search).has('logout');
    }

    handleLogin(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const rememberMe = document.getElementById('remember')?.checked || false;
        
        // Show loading state
        const submitBtn = e.target.querySelector('button[type="submit"]');
        this.setButtonLoading(submitBtn, true);

        // Simulate API call
        setTimeout(() => {
            // Demo account for testing
            if (email === 'demo@finquest.com' && password === 'demo123') {
                this.loginUser({
                    id: 1,
                    name: 'Thabo Johnson',
                    email: 'demo@finquest.com',
                    lifePath: 'music-producer',
                    level: 2,
                    points: 980,
                    avatar: 'TJ'
                }, rememberMe);
                return;
            }

            const users = JSON.parse(localStorage.getItem('users') || '[]');
            const user = users.find(u => u.email === email && u.password === password);
            
            if (user) {
                this.loginUser(user, rememberMe);
            } else {
                this.showError('Invalid email or password');
                this.setButtonLoading(submitBtn, false);
            }
        }, 1000);
    }

    handleRegister(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const userData = Object.fromEntries(formData);
        
        // Validate password match
        if (userData.password !== userData.confirmPassword) {
            this.showError('Passwords do not match');
            return;
        }

        // Validate password strength
        if (userData.password.length < 6) {
            this.showError('Password must be at least 6 characters long');
            return;
        }

        // Check if user already exists
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        if (users.find(u => u.email === userData.email)) {
            this.showError('User with this email already exists');
            return;
        }

        // Show loading state
        const submitBtn = e.target.querySelector('button[type="submit"]');
        this.setButtonLoading(submitBtn, true);

        // Simulate API call
        setTimeout(() => {
            // Create new user
            const newUser = {
                id: Date.now(),
                name: userData.fullName,
                email: userData.email,
                password: userData.password,
                lifePath: userData.lifePath,
                level: 1,
                points: 0,
                avatar: userData.fullName.split(' ').map(n => n[0]).join(''),
                createdAt: new Date().toISOString(),
                lastLogin: new Date().toISOString()
            };

            users.push(newUser);
            localStorage.setItem('users', JSON.stringify(users));
            
            this.loginUser(newUser, false);
        }, 1000);
    }

    loginUser(user, rememberMe) {
        // Remove password before storing
        const { password, ...userWithoutPassword } = user;
        
        // Update last login
        userWithoutPassword.lastLogin = new Date().toISOString();
        
        if (rememberMe) {
            localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
        } else {
            sessionStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
        }
        
        this.currentUser = userWithoutPassword;
        
        // Show success message
        this.showSuccess('Login successful! Redirecting...');
        
        // Redirect to dashboard
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 1500);
    }

    handleLogout(e) {
        if (e) e.preventDefault();
        
        // Clear both storage types
        localStorage.removeItem('currentUser');
        sessionStorage.removeItem('currentUser');
        this.currentUser = null;
        
        // Redirect to login with logout parameter
        window.location.href = 'login.html?logout=true';
    }

    validatePasswordMatch() {
        const password = document.getElementById('password');
        const confirmPassword = document.getElementById('confirmPassword');
        
        if (password && confirmPassword) {
            const confirmGroup = confirmPassword.closest('.form-group');
            
            if (password.value !== confirmPassword.value && confirmPassword.value.length > 0) {
                confirmGroup.classList.add('error');
                this.showFieldError(confirmPassword, 'Passwords do not match');
            } else {
                confirmGroup.classList.remove('error');
                this.clearFieldError(confirmPassword);
                
                if (password.value === confirmPassword.value && confirmPassword.value.length > 0) {
                    confirmGroup.classList.add('success');
                } else {
                    confirmGroup.classList.remove('success');
                }
            }
        }
    }

    useDemoAccount() {
        // Auto-fill demo credentials
        const emailInput = document.getElementById('email');
        const passwordInput = document.getElementById('password');
        
        if (emailInput && passwordInput) {
            emailInput.value = 'demo@finquest.com';
            passwordInput.value = 'demo123';
            
            // Trigger input events to update UI
            emailInput.dispatchEvent(new Event('input'));
            passwordInput.dispatchEvent(new Event('input'));
            
            this.showSuccess('Demo credentials filled! Click Login to continue.');
        }
    }

    setButtonLoading(button, isLoading) {
        if (isLoading) {
            button.disabled = true;
            const originalText = button.innerHTML;
            button.setAttribute('data-original-text', originalText);
            button.innerHTML = '<div class="loading-spinner"></div> Loading...';
            button.style.opacity = '0.7';
        } else {
            button.disabled = false;
            button.innerHTML = button.getAttribute('data-original-text') || button.textContent;
            button.style.opacity = '1';
        }
    }

    showFieldError(input, message) {
        this.clearFieldError(input);
        
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        
        input.parentNode.appendChild(errorElement);
    }

    clearFieldError(input) {
        const existingError = input.parentNode.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
    }

    showError(message) {
        this.showNotification(message, 'error');
    }

    showSuccess(message) {
        this.showNotification(message, 'success');
    }

    showNotification(message, type) {
        // Remove existing notifications
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        // Create notification
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);

        // Remove after 3 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 3000);
    }

    getCurrentUser() {
        if (!this.currentUser) {
            const user = localStorage.getItem('currentUser') || sessionStorage.getItem('currentUser');
            this.currentUser = user ? JSON.parse(user) : null;
        }
        return this.currentUser;
    }

    updateUserProfile(updates) {
        const currentUser = this.getCurrentUser();
        if (currentUser) {
            const updatedUser = { ...currentUser, ...updates };
            
            // Update in both storage locations
            if (localStorage.getItem('currentUser')) {
                localStorage.setItem('currentUser', JSON.stringify(updatedUser));
            }
            if (sessionStorage.getItem('currentUser')) {
                sessionStorage.setItem('currentUser', JSON.stringify(updatedUser));
            }
            
            this.currentUser = updatedUser;
            return true;
        }
        return false;
    }

    // Utility method to check if user is authenticated
    isAuthenticated() {
        return this.getCurrentUser() !== null;
    }

    // Utility method to get user's display name
    getUserDisplayName() {
        const user = this.getCurrentUser();
        return user ? user.name : 'Guest';
    }

    // Utility method to get user's avatar
    getUserAvatar() {
        const user = this.getCurrentUser();
        return user ? user.avatar : 'GU';
    }
}

// Initialize auth when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.auth = new Auth();
});

// Add global auth helper functions
window.FinQuestAuth = {
    login: (email, password) => {
        // Implementation for programmatic login
    },
    
    logout: () => {
        if (window.auth) {
            window.auth.handleLogout();
        }
    },
    
    getCurrentUser: () => {
        return window.auth ? window.auth.getCurrentUser() : null;
    },
    
    isAuthenticated: () => {
        return window.auth ? window.auth.isAuthenticated() : false;
    },
    
    updateProfile: (updates) => {
        return window.auth ? window.auth.updateUserProfile(updates) : false;
    }
};