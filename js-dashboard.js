// Dashboard functionality
class Dashboard {
    constructor() {
        this.currentUser = null;
        this.init();
    }

    init() {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.updateUserInfo();
        this.loadDashboardData();
        this.setupEventListeners();
    }

    updateUserInfo() {
        // Update user name and avatar
        const userNameElements = document.querySelectorAll('.user-name, .user-info .user-name');
        const avatarElements = document.querySelectorAll('.avatar');
        
        if (this.currentUser) {
            userNameElements.forEach(el => {
                el.textContent = this.currentUser.name;
            });
            
            avatarElements.forEach(el => {
                el.textContent = this.currentUser.name.split(' ').map(n => n[0]).join('');
            });
        }
    }

    loadDashboardData() {
        // Load user progress
        this.loadProgressData();
        
        // Load financial data
        this.loadFinancialData();
        
        // Load current challenges
        this.loadCurrentChallenges();
        
        // Load recent activity
        this.loadRecentActivity();
    }

    loadProgressData() {
        const progressData = {
            level: this.currentUser?.level || 1,
            progress: 45,
            skills: [
                { name: 'Basic Budgeting', completed: true },
                { name: 'Emergency Fund', completed: true },
                { name: 'Debt Management', completed: false, current: true },
                { name: 'Investing Basics', completed: false }
            ]
        };

        // Update progress bar
        const progressFill = document.querySelector('.progress-fill');
        if (progressFill) {
            progressFill.style.width = `${progressData.progress}%`;
        }

        // Update level info
        const levelInfo = document.querySelector('.progress-info');
        if (levelInfo) {
            levelInfo.innerHTML = `
                <span>Level ${progressData.level}: Financial Builder</span>
                <span>${progressData.progress}% to next level</span>
            `;
        }

        // Update skills list
        const skillsList = document.querySelector('.skills-list ul');
        if (skillsList) {
            skillsList.innerHTML = progressData.skills.map(skill => `
                <li class="${skill.completed ? 'skill-completed' : skill.current ? 'skill-current' : 'skill-upcoming'}">
                    ${skill.completed ? '✓' : skill.current ? '→' : '○'} ${skill.name}
                </li>
            `).join('');
        }
    }

    loadFinancialData() {
        const financialData = {
            income: 8500,
            expenses: 6200,
            savings: 12350,
            debt: 4500
        };

        // Update financial stats
        const statCards = document.querySelectorAll('.stat-card .stat-value');
        statCards.forEach(card => {
            const type = card.classList[1]; // income, expenses, etc.
            if (financialData[type]) {
                card.textContent = `R${financialData[type].toLocaleString()}`;
            }
        });
    }

    loadCurrentChallenges() {
        const currentChallenge = {
            title: 'Save R500 This Month',
            description: 'Build your emergency fund by saving R500 this month',
            progress: 65,
            icon: '💸'
        };

        // Update challenge display
        const challengeContent = document.querySelector('.challenge-content');
        if (challengeContent) {
            challengeContent.innerHTML = `
                <div class="challenge-icon">${currentChallenge.icon}</div>
                <div class="challenge-details">
                    <h3>${currentChallenge.title}</h3>
                    <p>${currentChallenge.description}</p>
                    <div class="challenge-progress">
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${currentChallenge.progress}%"></div>
                        </div>
                        <span>${currentChallenge.progress}% Complete</span>
                    </div>
                </div>
            `;
        }
    }

    loadRecentActivity() {
        const activities = [
            {
                icon: '✅',
                text: 'Completed "Budget Basics" simulation',
                time: '2 hours ago'
            },
            {
                icon: '⭐',
                text: 'Earned 50 points for daily login',
                time: '1 day ago'
            },
            {
                icon: '🏆',
                text: 'Reached Level 2: Financial Builder',
                time: '3 days ago'
            }
        ];

        // Update activity list
        const activityList = document.querySelector('.activity-list');
        if (activityList) {
            activityList.innerHTML = activities.map(activity => `
                <div class="activity-item">
                    <span class="activity-icon">${activity.icon}</span>
                    <div class="activity-details">
                        <div>${activity.text}</div>
                        <div class="activity-time">${activity.time}</div>
                    </div>
                </div>
            `).join('');
        }
    }

    setupEventListeners() {
        // Quick action cards
        const actionCards = document.querySelectorAll('.action-card');
        actionCards.forEach(card => {
            card.addEventListener('click', (e) => {
                e.preventDefault();
                const actionText = card.querySelector('span:last-child').textContent;
                this.trackAction(actionText);
            });
        });

        // Coach actions
        const coachActions = document.querySelectorAll('.coach-actions .btn');
        coachActions.forEach(btn => {
            btn.addEventListener('click', () => {
                if (btn.textContent.includes('Ask Zari')) {
                    this.simulateCoachInteraction();
                }
            });
        });
    }

    trackAction(action) {
        console.log(`User performed action: ${action}`);
        // In a real app, you would send this to analytics
    }

    simulateCoachInteraction() {
        const coachMessage = document.querySelector('.coach-message');
        if (coachMessage) {
            const messages = [
                "I see you're making great progress on your savings goal! Want to discuss strategies to optimize your budget?",
                "Your spending patterns show you're doing well with essentials. Have you considered setting aside 10% for investments?",
                "Great job on tracking your expenses consistently! This habit will serve you well in your financial journey.",
                "I notice you've been consistent with your savings. Would you like to learn about basic investment options?"
            ];
            
            const randomMessage = messages[Math.floor(Math.random() * messages.length)];
            coachMessage.textContent = `"${randomMessage}"`;
        }
    }
}

// Initialize dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.includes('dashboard.html')) {
        window.dashboard = new Dashboard();
    }
    // Dashboard functionality
class Dashboard {
    constructor() {
        this.currentUser = null;
        this.init();
    }

    init() {
        this.currentUser = window.auth ? window.auth.getCurrentUser() : null;
        if (!this.currentUser) {
            window.location.href = 'login.html';
            return;
        }

        this.updateUserInfo();
        this.loadDashboardData();
        this.setupEventListeners();
        this.initializeCharts();
    }

    updateUserInfo() {
        // Update user name and avatar throughout the dashboard
        const userNameElements = document.querySelectorAll('.user-name, .user-info .user-name, .profile-info h2');
        const avatarElements = document.querySelectorAll('.avatar, .player-avatar');
        
        if (this.currentUser) {
            userNameElements.forEach(el => {
                if (el.tagName === 'H2') {
                    el.textContent = this.currentUser.name;
                } else {
                    el.textContent = this.currentUser.name;
                }
            });
            
            avatarElements.forEach(el => {
                el.textContent = this.currentUser.avatar || this.currentUser.name.split(' ').map(n => n[0]).join('');
            });

            // Update level display
            const levelElements = document.querySelectorAll('.user-level');
            levelElements.forEach(el => {
                el.textContent = `Level ${this.currentUser.level} ${this.getLevelTitle(this.currentUser.level)}`;
            });
        }
    }

    getLevelTitle(level) {
        const titles = {
            1: 'Financial Beginner',
            2: 'Financial Builder',
            3: 'Wealth Grower',
            4: 'Investment Explorer',
            5: 'Financial Master'
        };
        return titles[level] || 'Financial Adventurer';
    }

    loadDashboardData() {
        // Load user progress
        this.loadProgressData();
        
        // Load financial data
        this.loadFinancialData();
        
        // Load current challenges
        this.loadCurrentChallenges();
        
        // Load recent activity
        this.loadRecentActivity();
        
        // Load AI coach message
        this.loadAICoachMessage();
    }

    loadProgressData() {
        const progressData = this.getStoredData('progressData') || {
            level: this.currentUser?.level || 1,
            progress: 45,
            skills: [
                { name: 'Basic Budgeting', completed: true },
                { name: 'Emergency Fund', completed: true },
                { name: 'Debt Management', completed: false, current: true },
                { name: 'Investing Basics', completed: false }
            ],
            nextLevelPoints: 1000
        };

        // Update progress bar
        const progressFill = document.querySelector('.progress-fill');
        if (progressFill) {
            progressFill.style.width = `${progressData.progress}%`;
        }

        // Update level info
        const levelInfo = document.querySelector('.progress-info');
        if (levelInfo) {
            levelInfo.innerHTML = `
                <span>Level ${progressData.level}: ${this.getLevelTitle(progressData.level)}</span>
                <span>${progressData.progress}% to next level</span>
            `;
        }

        // Update skills list
        const skillsList = document.querySelector('.skills-list ul');
        if (skillsList) {
            skillsList.innerHTML = progressData.skills.map(skill => `
                <li class="${skill.completed ? 'skill-completed' : skill.current ? 'skill-current' : 'skill-upcoming'}">
                    ${skill.completed ? '✓' : skill.current ? '→' : '○'} ${skill.name}
                </li>
            `).join('');
        }

        // Save to storage
        this.saveData('progressData', progressData);
    }

    loadFinancialData() {
        const financialData = this.getStoredData('financialData') || {
            income: 8500,
            expenses: 6200,
            savings: 12350,
            debt: 4500,
            monthlyGoal: 500,
            savedThisMonth: 325
        };

        // Update financial stats
        const statCards = {
            'income': document.querySelector('.stat-value.income'),
            'expenses': document.querySelector('.stat-value.expenses'),
            'savings': document.querySelector('.stat-value.savings'),
            'debt': document.querySelector('.stat-value.debt')
        };

        Object.entries(statCards).forEach(([type, element]) => {
            if (element && financialData[type]) {
                element.textContent = `R${financialData[type].toLocaleString()}`;
            }
        });

        // Save to storage
        this.saveData('financialData', financialData);
    }

    loadCurrentChallenges() {
        const currentChallenge = this.getStoredData('currentChallenge') || {
            title: 'Save R500 This Month',
            description: 'Build your emergency fund by saving R500 this month',
            progress: 65,
            icon: '💸',
            target: 500,
            current: 325,
            endDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000) // 15 days from now
        };

        // Update challenge display
        const challengeContent = document.querySelector('.challenge-content');
        if (challengeContent) {
            challengeContent.innerHTML = `
                <div class="challenge-icon">${currentChallenge.icon}</div>
                <div class="challenge-details">
                    <h3>${currentChallenge.title}</h3>
                    <p>${currentChallenge.description}</p>
                    <div class="challenge-progress">
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${currentChallenge.progress}%"></div>
                        </div>
                        <span>R${currentChallenge.current} of R${currentChallenge.target} (${currentChallenge.progress}%)</span>
                    </div>
                </div>
            `;
        }

        // Save to storage
        this.saveData('currentChallenge', currentChallenge);
    }

    loadRecentActivity() {
        const activities = this.getStoredData('recentActivity') || [
            {
                icon: '✅',
                text: 'Completed "Budget Basics" simulation',
                time: '2 hours ago',
                points: 50
            },
            {
                icon: '⭐',
                text: 'Earned 50 points for daily login',
                time: '1 day ago',
                points: 50
            },
            {
                icon: '🏆',
                text: 'Reached Level 2: Financial Builder',
                time: '3 days ago',
                points: 100
            }
        ];

        // Update activity list
        const activityList = document.querySelector('.activity-list');
        if (activityList) {
            activityList.innerHTML = activities.map(activity => `
                <div class="activity-item">
                    <span class="activity-icon">${activity.icon}</span>
                    <div class="activity-details">
                        <div>${activity.text}</div>
                        <div class="activity-time">${activity.time} • +${activity.points} points</div>
                    </div>
                </div>
            `).join('');
        }

        // Save to storage
        this.saveData('recentActivity', activities);
    }

    loadAICoachMessage() {
        const messages = [
            "Hi there! I noticed you're making great progress on your savings goal. Want to discuss strategies to optimize your budget?",
            "Your spending patterns show you're doing well with essentials. Have you considered setting aside 10% for investments?",
            "Great job on tracking your expenses consistently! This habit will serve you well in your financial journey.",
            "I notice you've been consistent with your savings. Would you like to learn about basic investment options?",
            "Your financial health is improving! Let's work on reducing that debt next. I have some strategies to share."
        ];
        
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        
        const coachMessage = document.querySelector('.coach-message');
        if (coachMessage) {
            coachMessage.textContent = `"${randomMessage}"`;
        }
    }

    initializeCharts() {
        // Initialize any charts or visualizations
        // This would typically use a charting library like Chart.js
        console.log('Initializing dashboard charts...');
    }

    setupEventListeners() {
        // Quick action cards
        const actionCards = document.querySelectorAll('.action-card');
        actionCards.forEach(card => {
            card.addEventListener('click', (e) => {
                e.preventDefault();
                const actionText = card.querySelector('span:last-child').textContent;
                this.trackAction(actionText);
                
                // Navigate to appropriate page
                this.navigateToAction(actionText);
            });
        });

        // Coach actions
        const coachActions = document.querySelectorAll('.coach-actions .btn');
        coachActions.forEach(btn => {
            btn.addEventListener('click', () => {
                if (btn.textContent.includes('Ask Zari')) {
                    this.simulateCoachInteraction();
                } else if (btn.textContent.includes('View Insights')) {
                    this.showFinancialInsights();
                }
            });
        });

        // Challenge continue button
        const challengeBtn = document.querySelector('.current-challenge .btn');
        if (challengeBtn) {
            challengeBtn.addEventListener('click', () => {
                this.continueChallenge();
            });
        }

        // Points display click
        const pointsDisplay = document.querySelector('.points-display');
        if (pointsDisplay) {
            pointsDisplay.addEventListener('click', () => {
                this.showPointsBreakdown();
            });
        }
    }

    navigateToAction(actionText) {
        const actionMap = {
            'New Simulation': 'simulations.html',
            'View Challenges': 'challenges.html',
            'Learn': 'learn.html',
            'Community': 'community.html'
        };

        const targetPage = actionMap[actionText];
        if (targetPage) {
            window.location.href = targetPage;
        }
    }

    trackAction(action) {
        console.log(`User performed action: ${action}`);
        // In a real app, you would send this to analytics
        
        // Simulate points award for certain actions
        if (action === 'New Simulation' || action === 'View Challenges') {
            this.awardPoints(5);
        }
    }

    awardPoints(points) {
        if (this.currentUser) {
            this.currentUser.points = (this.currentUser.points || 0) + points;
            window.auth.updateUserProfile({ points: this.currentUser.points });
            
            // Update points display
            const pointsValue = document.querySelector('.points-value');
            if (pointsValue) {
                pointsValue.textContent = `${this.currentUser.points} Points`;
            }
            
            this.showPointsNotification(points);
        }
    }

    showPointsNotification(points) {
        const notification = document.createElement('div');
        notification.className = 'notification success';
        notification.textContent = `+${points} points earned!`;
        notification.style.cssText = `
            position: fixed;
            top: 80px;
            right: 20px;
            z-index: 1000;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 2000);
    }

    simulateCoachInteraction() {
        const coachMessage = document.querySelector('.coach-message');
        if (coachMessage) {
            const questions = [
                "What's your biggest financial challenge right now?",
                "Would you like help creating a budget?",
                "Are you interested in learning about investment options?",
                "Do you need strategies to reduce your expenses?",
                "Would you like to set up a savings plan?"
            ];
            
            const randomQuestion = questions[Math.floor(Math.random() * questions.length)];
            coachMessage.textContent = `"${randomQuestion}"`;
            
            // Award points for interacting with coach
            this.awardPoints(2);
        }
    }

    showFinancialInsights() {
        const financialData = this.getStoredData('financialData') || {};
        const insights = [
            `You're saving ${((financialData.savings / financialData.income) * 100).toFixed(1)}% of your income - great job!`,
            `Your emergency fund covers ${Math.round(financialData.savings / (financialData.expenses / 30))} days of expenses.`,
            `Consider paying down your debt to reduce interest payments.`,
            `Your savings rate is better than 65% of users in your age group!`
        ];
        
        alert(`Financial Insights:\n\n${insights.join('\n\n')}`);
    }

    continueChallenge() {
        const currentChallenge = this.getStoredData('currentChallenge');
        if (currentChallenge) {
            // Simulate progress
            currentChallenge.current = Math.min(currentChallenge.current + 50, currentChallenge.target);
            currentChallenge.progress = Math.round((currentChallenge.current / currentChallenge.target) * 100);
            
            this.saveData('currentChallenge', currentChallenge);
            this.loadCurrentChallenges();
            
            // Award points
            this.awardPoints(10);
            
            this.showNotification('Great progress! Keep going!');
        }
    }

    showPointsBreakdown() {
        const pointsBreakdown = this.getStoredData('pointsBreakdown') || [
            { source: 'Daily Login', points: 150, date: 'This week' },
            { source: 'Challenges', points: 300, date: 'This week' },
            { source: 'Simulations', points: 400, points: 'This week' },
            { source: 'Learning', points: 130, date: 'This week' }
        ];
        
        let breakdownText = "Points Breakdown:\n\n";
        pointsBreakdown.forEach(item => {
            breakdownText += `${item.source}: +${item.points} points (${item.date})\n`;
        });
        
        alert(breakdownText);
    }

    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification success';
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

// Initialize dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.includes('dashboard.html')) {
        window.dashboard = new Dashboard();
    }
});
});