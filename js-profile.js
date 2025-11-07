class Profile {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadProfileData();
    }

    setupEventListeners() {
        // Edit profile button
        const editProfileBtn = document.querySelector('.profile-header-card .btn.secondary');
        if (editProfileBtn) {
            editProfileBtn.addEventListener('click', () => {
                this.toggleEditMode();
            });
        }

        // Settings form
        const settingsForm = document.querySelector('.settings-form');
        if (settingsForm) {
            settingsForm.addEventListener('submit', (e) => {
                this.handleSettingsSave(e);
            });
        }

        // Add goal button
        const addGoalBtn = document.querySelector('.goals-section .btn.primary');
        if (addGoalBtn) {
            addGoalBtn.addEventListener('click', () => {
                this.handleAddGoal();
            });
        }

        // Delete account button
        const deleteAccountBtn = document.querySelector('.btn.danger');
        if (deleteAccountBtn) {
            deleteAccountBtn.addEventListener('click', () => {
                this.handleDeleteAccount();
            });
        }

        // Edit avatar button
        const editAvatarBtn = document.querySelector('.edit-avatar-btn');
        if (editAvatarBtn) {
            editAvatarBtn.addEventListener('click', () => {
                this.handleEditAvatar();
            });
        }
    }

    toggleEditMode() {
        const settingsSection = document.querySelector('.settings-section');
        const isEditing = settingsSection.style.display === 'block';
        
        if (isEditing) {
            settingsSection.style.display = 'none';
        } else {
            settingsSection.style.display = 'block';
            settingsSection.scrollIntoView({ behavior: 'smooth' });
        }
    }

    handleSettingsSave(e) {
        e.preventDefault();
        
        // In a real app, this would send data to the server
        const formData = new FormData(e.target);
        const settings = Object.fromEntries(formData);
        
        console.log('Saving settings:', settings);
        this.showNotification('Profile settings saved successfully!');
        
        // Update profile display
        this.updateProfileDisplay(settings);
    }

    updateProfileDisplay(settings) {
        // Update name if changed
        if (settings.fullName) {
            const nameElements = document.querySelectorAll('.user-name, .profile-info h2');
            nameElements.forEach(el => {
                el.textContent = settings.fullName;
            });
            
            // Update avatar initials
            const avatarElements = document.querySelectorAll('.avatar');
            avatarElements.forEach(avatar => {
                const initials = settings.fullName.split(' ').map(n => n[0]).join('');
                avatar.textContent = initials;
            });
        }
    }

    handleAddGoal() {
        const goalName = prompt('Enter your financial goal:');
        if (goalName) {
            const targetAmount = prompt('Enter target amount (R):');
            if (targetAmount) {
                const deadline = prompt('Enter deadline (e.g., Dec 2024):');
                if (deadline) {
                    this.createGoal(goalName, targetAmount, deadline);
                }
            }
        }
    }

    createGoal(name, target, deadline) {
        // In a real app, this would make an API call
        const goalsList = document.querySelector('.goals-list');
        
        const goalCard = document.createElement('div');
        goalCard.className = 'goal-card';
        goalCard.innerHTML = `
            <div class="goal-icon">🎯</div>
            <div class="goal-info">
                <h4>${name}</h4>
                <p>Target: R${target} | Current: R0</p>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: 0%"></div>
                </div>
            </div>
            <div class="goal-deadline">${deadline}</div>
        `;
        
        goalsList.appendChild(goalCard);
        this.showNotification('New goal added successfully!');
    }

    handleDeleteAccount() {
        const confirmed = confirm('Are you sure you want to delete your account? This action cannot be undone.');
        if (confirmed) {
            this.deleteAccount();
        }
    }

    deleteAccount() {
        // In a real app, this would make an API call
        alert('Account deletion requested. You will be logged out.');
        
        // Simulate logout
        setTimeout(() => {
            if (window.auth) {
                window.auth.handleLogout({ preventDefault: () => {} });
            }
        }, 2000);
    }

    handleEditAvatar() {
        // In a real app, this would open an avatar upload/editor
        alert('Avatar editor would open here. In a real app, you could upload a new photo.');
    }

    loadProfileData() {
        // This would typically fetch from an API
        console.log('Loading profile data...');
    }

    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--success);
            color: white;
            padding: 15px 20px;
            border-radius: var(--border-radius);
            z-index: 1000;
            animation: slideIn 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.includes('profile.html')) {
        window.profile = new Profile();
    }
});
// Profile functionality
class Profile {
    constructor() {
        this.init();
    }

    init() {
        this.currentUser = window.auth ? window.auth.getCurrentUser() : null;
        if (!this.currentUser) {
            window.location.href = 'login.html';
            return;
        }

        this.loadProfileData();
        this.setupEventListeners();
        this.initializeProgressBars();
    }

    loadProfileData() {
        this.achievements = this.getStoredData('achievements') || this.getDefaultAchievements();
        this.financialGoals = this.getStoredData('financialGoals') || this.getDefaultFinancialGoals();
        this.learningProgress = this.getStoredData('learningProgress') || this.getDefaultLearningProgress();
        
        this.renderProfileHeader();
        this.renderProgressOverview();
        this.renderAchievements();
        this.renderFinancialGoals();
    }

    getDefaultAchievements() {
        return [
            {
                id: 1,
                title: 'First Savings',
                description: 'Saved your first R100',
                icon: '💰',
                unlocked: true,
                date: 'Mar 15, 2023',
                points: 25
            },
            {
                id: 2,
                title: 'Budget Master',
                description: 'Stuck to your budget for 30 days',
                icon: '📊',
                unlocked: true,
                date: 'Apr 2, 2023',
                points: 50
            },
            {
                id: 3,
                title: 'On Fire',
                description: '7-day streak of financial learning',
                icon: '🔥',
                unlocked: true,
                date: 'Apr 10, 2023',
                points: 30
            },
            {
                id: 4,
                title: 'Level Up',
                description: 'Reached Level 2',
                icon: '🚀',
                unlocked: true,
                date: 'Apr 18, 2023',
                points: 75
            },
            {
                id: 5,
                title: 'Investment Guru',
                description: 'Complete investment learning path',
                icon: '💎',
                unlocked: false,
                progress: '2/8 modules',
                points: 100
            },
            {
                id: 6,
                title: 'Squad Leader',
                description: 'Create your first squad',
                icon: '👥',
                unlocked: false,
                progress: 'Not started',
                points: 50
            }
        ];
    }

    getDefaultFinancialGoals() {
        return [
            {
                id: 1,
                title: 'Save for House Deposit',
                target: 50000,
                current: 12350,
                deadline: 'Dec 2024',
                icon: '🏠'
            },
            {
                id: 2,
                title: 'Car Emergency Fund',
                target: 10000,
                current: 3500,
                deadline: 'Aug 2023',
                icon: '🚗'
            },
            {
                id: 3,
                title: 'Further Studies',
                target: 30000,
                current: 8000,
                deadline: 'Jun 2024',
                icon: '🎓'
            }
        ];
    }

    getDefaultLearningProgress() {
        return {
            'foundations': {
                title: 'Financial Foundations',
                description: 'Budgeting, Banking, Basic Saving',
                progress: 80,
                modules: 10,
                completed: 8
            },
            'growth': {
                title: 'Financial Growth',
                description: 'Advanced Saving, Credit, Introduction to Investing',
                progress: 45,
                modules: 9,
                completed: 4
            },
            'wealth': {
                title: 'Wealth Building',
                description: 'Advanced Investing, Side Hustles, Insurance',
                progress: 15,
                modules: 8,
                completed: 1
            }
        };
    }

    renderProfileHeader() {
        // Update avatar
        const avatarElements = document.querySelectorAll('.avatar');
        avatarElements.forEach(avatar => {
            avatar.textContent = this.currentUser.avatar;
        });

        // Update user info
        const userNameElements = document.querySelectorAll('.user-name, .profile-info h2');
        userNameElements.forEach(element => {
            element.textContent = this.currentUser.name;
        });

        // Update email
        const emailElement = document.querySelector('.profile-email');
        if (emailElement) {
            emailElement.textContent = this.currentUser.email;
        }

        // Update stats
        const stats = {
            'Level': this.currentUser.level,
            'Points': this.currentUser.points,
            'Day Streak': this.calculateDayStreak(),
            'Challenges': this.countCompletedChallenges()
        };

        const statElements = document.querySelectorAll('.profile-stat');
        Object.values(stats).forEach((value, index) => {
            if (statElements[index]) {
                const valueElement = statElements[index].querySelector('.stat-value');
                const labelElement = statElements[index].querySelector('.stat-label');
                
                if (valueElement) valueElement.textContent = value;
                if (labelElement) labelElement.textContent = Object.keys(stats)[index];
            }
        });
    }

    calculateDayStreak() {
        // Simple streak calculation based on login activity
        const lastLogin = new Date(this.currentUser.lastLogin);
        const today = new Date();
        const diffTime = Math.abs(today - lastLogin);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        return diffDays <= 1 ? 15 : Math.max(1, 15 - (diffDays - 1)); // Simulate 15-day streak
    }

    countCompletedChallenges() {
        const challenges = this.getStoredData('challenges');
        if (!challenges) return 12; // Default value
        
        let completed = 0;
        Object.values(challenges).forEach(level => {
            completed += level.filter(challenge => challenge.status === 'completed').length;
        });
        
        return completed;
    }

    renderProgressOverview() {
        const progressCards = document.querySelector('.progress-cards');
        if (!progressCards) return;

        progressCards.innerHTML = Object.values(this.learningProgress).map(progress => `
            <div class="progress-card">
                <h3>${progress.title}</h3>
                <p>${progress.description}</p>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${progress.progress}%"></div>
                </div>
                <div class="progress-stats">
                    <span>${progress.completed} of ${progress.modules} modules</span>
                    <span>${progress.progress}% Complete</span>
                </div>
            </div>
        `).join('');
    }

    renderAchievements() {
        const achievementsGrid = document.querySelector('.achievements-grid');
        if (!achievementsGrid) return;

        achievementsGrid.innerHTML = this.achievements.map(achievement => `
            <div class="achievement-card ${achievement.unlocked ? '' : 'locked'}" data-achievement-id="${achievement.id}">
                <div class="achievement-icon">${achievement.icon}</div>
                <div class="achievement-info">
                    <h4>${achievement.title}</h4>
                    <p>${achievement.description}</p>
                </div>
                ${achievement.unlocked ? 
                    `<div class="achievement-date">${achievement.date}</div>` :
                    `<div class="achievement-progress">${achievement.progress}</div>`
                }
            </div>
        `).join('');
    }

    renderFinancialGoals() {
        const goalsList = document.querySelector('.goals-list');
        if (!goalsList) return;

        goalsList.innerHTML = this.financialGoals.map(goal => `
            <div class="goal-card" data-goal-id="${goal.id}">
                <div class="goal-icon">${goal.icon}</div>
                <div class="goal-info">
                    <h4>${goal.title}</h4>
                    <p>Target: R${goal.target.toLocaleString()} | Current: R${goal.current.toLocaleString()}</p>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${Math.round((goal.current / goal.target) * 100)}%"></div>
                    </div>
                </div>
                <div class="goal-deadline">${goal.deadline}</div>
            </div>
        `).join('');
    }

    setupEventListeners() {
        // Edit profile button
        const editProfileBtn = document.querySelector('.profile-header-card .btn.secondary');
        if (editProfileBtn) {
            editProfileBtn.addEventListener('click', () => {
                this.toggleEditMode();
            });
        }

        // Settings form
        const settingsForm = document.querySelector('.settings-form');
        if (settingsForm) {
            settingsForm.addEventListener('submit', (e) => {
                this.handleSettingsSave(e);
            });
        }

        // Add goal button
        const addGoalBtn = document.querySelector('.goals-section .btn.primary');
        if (addGoalBtn) {
            addGoalBtn.addEventListener('click', () => {
                this.handleAddGoal();
            });
        }

        // Delete account button
        const deleteAccountBtn = document.querySelector('.btn.danger');
        if (deleteAccountBtn) {
            deleteAccountBtn.addEventListener('click', () => {
                this.handleDeleteAccount();
            });
        }

        // Edit avatar button
        const editAvatarBtn = document.querySelector('.edit-avatar-btn');
        if (editAvatarBtn) {
            editAvatarBtn.addEventListener('click', () => {
                this.handleEditAvatar();
            });
        }

        // Form cancel button
        const cancelBtn = document.querySelector('.form-actions .btn.outline');
        if (cancelBtn) {
            cancelBtn.addEventListener('click', () => {
                this.toggleEditMode();
            });
        }
    }

    toggleEditMode() {
        const settingsSection = document.querySelector('.settings-section');
        const isEditing = settingsSection.style.display === 'block';
        
        if (isEditing) {
            settingsSection.style.display = 'none';
        } else {
            settingsSection.style.display = 'block';
            settingsSection.scrollIntoView({ behavior: 'smooth' });
            this.populateSettingsForm();
        }
    }

    populateSettingsForm() {
        // Populate form with current user data
        const form = document.querySelector('.settings-form');
        if (!form) return;

        const fields = {
            'fullName': this.currentUser.name,
            'email': this.currentUser.email,
            'phone': '+27 72 123 4567',
            'location': 'Johannesburg, South Africa',
            'lifePath': this.currentUser.lifePath || 'music-producer'
        };

        Object.entries(fields).forEach(([field, value]) => {
            const element = document.getElementById(field);
            if (element) {
                element.value = value;
            }
        });
    }

    handleSettingsSave(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const settings = Object.fromEntries(formData);
        
        // Validate form
        if (!this.validateSettings(settings)) {
            return;
        }

        // Show loading state
        const submitBtn = e.target.querySelector('button[type="submit"]');
        this.setButtonLoading(submitBtn, true);

        // Simulate API call
        setTimeout(() => {
            // Update user profile
            const updates = {
                name: settings.fullName,
                email: settings.email,
                lifePath: settings.lifePath,
                avatar: settings.fullName.split(' ').map(n => n[0]).join('')
            };

            const success = window.auth.updateUserProfile(updates);
            
            if (success) {
                this.currentUser = window.auth.getCurrentUser();
                this.renderProfileHeader();
                this.showNotification('Profile settings saved successfully!');
                this.toggleEditMode();
            } else {
                this.showNotification('Error saving profile settings. Please try again.', 'error');
            }
            
            this.setButtonLoading(submitBtn, false);
        }, 1000);
    }

    validateSettings(settings) {
        if (!settings.fullName.trim()) {
            this.showNotification('Please enter your full name', 'error');
            return false;
        }

        if (!settings.email.trim()) {
            this.showNotification('Please enter your email address', 'error');
            return false;
        }

        if (!this.isValidEmail(settings.email)) {
            this.showNotification('Please enter a valid email address', 'error');
            return false;
        }

        return true;
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    handleAddGoal() {
        const goalName = prompt('Enter your financial goal:');
        if (goalName) {
            const targetAmount = parseInt(prompt('Enter target amount (R):'));
            if (targetAmount && !isNaN(targetAmount)) {
                const deadline = prompt('Enter deadline (e.g., Dec 2024):');
                if (deadline) {
                    this.createGoal(goalName, targetAmount, deadline);
                }
            } else {
                this.showNotification('Please enter a valid amount', 'error');
            }
        }
    }

    createGoal(name, target, deadline) {
        const newGoal = {
            id: Date.now(),
            title: name,
            target: target,
            current: 0,
            deadline: deadline,
            icon: '🎯'
        };

        this.financialGoals.push(newGoal);
        this.saveData('financialGoals', this.financialGoals);
        
        this.showNotification('New goal added successfully!');
        this.renderFinancialGoals();
    }

    handleDeleteAccount() {
        const confirmed = confirm('Are you sure you want to delete your account? This action cannot be undone. All your data will be permanently lost.');
        if (confirmed) {
            const confirmText = prompt('Type "DELETE" to confirm account deletion:');
            if (confirmText === 'DELETE') {
                this.deleteAccount();
            } else {
                this.showNotification('Account deletion cancelled. The confirmation text did not match.', 'error');
            }
        }
    }

    deleteAccount() {
        // Show loading state
        this.showNotification('Deleting account...');
        
        // Simulate API call
        setTimeout(() => {
            // Clear all user data
            const keys = Object.keys(localStorage).filter(key => key.startsWith('finquest_'));
            keys.forEach(key => localStorage.removeItem(key));
            
            localStorage.removeItem('currentUser');
            sessionStorage.removeItem('currentUser');
            localStorage.removeItem('users');
            
            this.showNotification('Account deleted successfully. Redirecting to home page...');
            
            // Redirect to home page
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 2000);
        }, 1500);
    }

    handleEditAvatar() {
        const newAvatar = prompt('Enter new avatar initials (2 letters max):', this.currentUser.avatar);
        if (newAvatar && newAvatar.length <= 2) {
            this.updateAvatar(newAvatar.toUpperCase());
        } else if (newAvatar) {
            this.showNotification('Avatar must be 2 letters or less', 'error');
        }
    }

    updateAvatar(newAvatar) {
        const success = window.auth.updateUserProfile({ avatar: newAvatar });
        
        if (success) {
            this.currentUser = window.auth.getCurrentUser();
            this.renderProfileHeader();
            this.showNotification('Avatar updated successfully!');
        } else {
            this.showNotification('Error updating avatar', 'error');
        }
    }

    setButtonLoading(button, isLoading) {
        if (isLoading) {
            button.disabled = true;
            const originalText = button.innerHTML;
            button.setAttribute('data-original-text', originalText);
            button.innerHTML = '<div class="loading-spinner"></div> Saving...';
            button.style.opacity = '0.7';
        } else {
            button.disabled = false;
            button.innerHTML = button.getAttribute('data-original-text') || button.textContent;
            button.style.opacity = '1';
        }
    }

    initializeProgressBars() {
        // Animate progress bars when they come into view
        const progressBars = document.querySelectorAll('.progress-fill');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progressFill = entry.target;
                    const width = progressFill.style.width;
                    progressFill.style.width = '0%';
                    
                    setTimeout(() => {
                        progressFill.style.transition = 'width 1s ease-in-out';
                        progressFill.style.width = width;
                    }, 100);
                    
                    observer.unobserve(progressFill);
                }
            });
        }, { threshold: 0.5 });
        
        progressBars.forEach(bar => observer.observe(bar));
    }

    showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 1000;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    // Utility methods for data storage
    getStoredData(key) {
        try {
            return JSON.parse(localStorage.getItem(`finquest_${key}`));
        } catch (e) {
            return null;
        }
    }

    saveData(key, data) {
        try {
            localStorage.setItem(`finquest_${key}`, JSON.stringify(data));
            return true;
        } catch (e) {
            return false;
        }
    }
}

// Initialize profile when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.includes('profile.html')) {
        window.profile = new Profile();
    }
});