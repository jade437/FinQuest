class Challenges {
    constructor() {
        this.currentFilter = 'all';
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadChallenges();
    }

    setupEventListeners() {
        // Filter buttons
        const filterBtns = document.querySelectorAll('.filter-btn');
        filterBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.handleFilterChange(e.target);
            });
        });

        // Challenge buttons
        const challengeBtns = document.querySelectorAll('.challenge-card .btn');
        challengeBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.handleChallengeClick(e.target);
            });
        });
    }

    handleFilterChange(button) {
        const filter = button.getAttribute('data-filter');
        
        // Update active button
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        button.classList.add('active');
        
        this.currentFilter = filter;
        this.filterChallenges();
    }

    filterChallenges() {
        const challengeCards = document.querySelectorAll('.challenge-card');
        
        challengeCards.forEach(card => {
            let shouldShow = false;
            
            switch (this.currentFilter) {
                case 'all':
                    shouldShow = true;
                    break;
                case 'active':
                    shouldShow = card.classList.contains('active');
                    break;
                case 'completed':
                    shouldShow = card.classList.contains('completed');
                    break;
                case 'beginner':
                    shouldShow = card.querySelector('.challenge-badge.beginner');
                    break;
                case 'intermediate':
                    shouldShow = card.querySelector('.challenge-badge.intermediate');
                    break;
                case 'advanced':
                    shouldShow = card.querySelector('.challenge-badge.advanced');
                    break;
            }
            
            card.style.display = shouldShow ? 'block' : 'none';
        });
    }

    handleChallengeClick(button) {
        const challengeCard = button.closest('.challenge-card');
        const challengeTitle = challengeCard.querySelector('h3').textContent;
        
        if (button.textContent.includes('Start') || button.textContent.includes('Continue')) {
            this.startChallenge(challengeTitle);
        }
    }

    startChallenge(challengeTitle) {
        // In a real app, this would navigate to the challenge
        alert(`Starting challenge: ${challengeTitle}`);
        
        // Simulate progress update
        const progressFill = document.querySelector('.challenge-card.active .progress-fill');
        if (progressFill) {
            const currentWidth = parseInt(progressFill.style.width);
            const newWidth = Math.min(currentWidth + 20, 100);
            progressFill.style.width = `${newWidth}%`;
            
            // Update progress text
            const progressText = progressFill.closest('.challenge-progress').querySelector('span');
            if (progressText) {
                progressText.textContent = `${newWidth}% Complete`;
            }
        }
    }

    loadChallenges() {
        // This would typically fetch from an API
        console.log('Loading challenges data...');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.includes('challenges.html')) {
        window.challenges = new Challenges();
    }
    // Challenges functionality
class Challenges {
    constructor() {
        this.currentFilter = 'all';
        this.challenges = [];
        this.init();
    }

    init() {
        this.currentUser = window.auth ? window.auth.getCurrentUser() : null;
        if (!this.currentUser) {
            window.location.href = 'login.html';
            return;
        }

        this.loadChallenges();
        this.setupEventListeners();
        this.updateProgressBars();
    }

    loadChallenges() {
        // Load challenges from storage or use default data
        this.challenges = this.getStoredData('challenges') || this.getDefaultChallenges();
        this.renderChallenges();
    }

    getDefaultChallenges() {
        return {
            'foundations': [
                {
                    id: 1,
                    title: 'Budgeting Basics',
                    description: 'Create and maintain your first monthly budget',
                    difficulty: 'beginner',
                    status: 'completed',
                    progress: 100,
                    points: 50,
                    icon: '💰',
                    duration: '15 min'
                },
                {
                    id: 2,
                    title: 'Needs vs Wants',
                    description: 'Learn to distinguish between essential and discretionary spending',
                    difficulty: 'beginner',
                    status: 'completed',
                    progress: 100,
                    points: 75,
                    icon: '🛒',
                    duration: '20 min'
                },
                {
                    id: 3,
                    title: 'Banking 101',
                    description: 'Understand different types of bank accounts and their uses',
                    difficulty: 'beginner',
                    status: 'completed',
                    progress: 100,
                    points: 60,
                    icon: '🏦',
                    duration: '25 min'
                },
                {
                    id: 4,
                    title: 'Emergency Fund',
                    description: 'Start building your financial safety net',
                    difficulty: 'beginner',
                    status: 'completed',
                    progress: 100,
                    points: 100,
                    icon: '🛡️',
                    duration: '30 min'
                },
                {
                    id: 5,
                    title: 'Understanding Debt',
                    description: 'Learn about different types of debt and how they work',
                    difficulty: 'beginner',
                    status: 'active',
                    progress: 60,
                    points: 80,
                    icon: '📊',
                    duration: '35 min'
                },
                {
                    id: 6,
                    title: 'Credit Score Basics',
                    description: 'Understand what affects your credit score',
                    difficulty: 'beginner',
                    status: 'upcoming',
                    progress: 0,
                    points: 90,
                    icon: '📈',
                    duration: '40 min'
                }
            ],
            'growth': [
                {
                    id: 7,
                    title: 'Saving Strategies',
                    description: 'Explore different methods to grow your savings effectively',
                    difficulty: 'intermediate',
                    status: 'completed',
                    progress: 100,
                    points: 120,
                    icon: '💸',
                    duration: '45 min'
                },
                {
                    id: 8,
                    title: 'Introduction to Investing',
                    description: 'Learn the basics of stocks, bonds, and funds',
                    difficulty: 'intermediate',
                    status: 'completed',
                    progress: 100,
                    points: 150,
                    icon: '📊',
                    duration: '50 min'
                },
                {
                    id: 9,
                    title: 'Tax Basics',
                    description: 'Understand how income tax works in South Africa',
                    difficulty: 'intermediate',
                    status: 'active',
                    progress: 30,
                    points: 110,
                    icon: '🧾',
                    duration: '55 min'
                },
                {
                    id: 10,
                    title: 'Compound Interest',
                    description: 'Understand how compound interest grows your money',
                    difficulty: 'intermediate',
                    status: 'locked',
                    progress: 0,
                    points: 130,
                    icon: '🔄',
                    duration: '60 min'
                }
            ],
            'daily': [
                {
                    id: 11,
                    title: 'Track Your Spending',
                    description: 'Log all your expenses for today',
                    difficulty: 'daily',
                    status: 'available',
                    progress: 0,
                    points: 25,
                    icon: '📝',
                    duration: '5 min'
                },
                {
                    id: 12,
                    title: 'Financial Tip',
                    description: 'Read today\'s financial tip and apply it',
                    difficulty: 'daily',
                    status: 'available',
                    progress: 0,
                    points: 15,
                    icon: '💡',
                    duration: '2 min'
                }
            ]
        };
    }

    renderChallenges() {
        this.renderLevel('foundations', 'Level 1: Financial Foundations');
        this.renderLevel('growth', 'Level 2: Financial Growth');
        this.renderLevel('daily', 'Daily Challenges');
    }

    renderLevel(levelKey, levelTitle) {
        const levelChallenges = this.challenges[levelKey];
        if (!levelChallenges) return;

        const container = document.querySelector(`[data-level="${levelKey}"]`) || this.createLevelContainer(levelKey, levelTitle);
        
        // Calculate progress
        const completed = levelChallenges.filter(c => c.status === 'completed').length;
        const total = levelChallenges.filter(c => c.status !== 'locked').length;
        const progress = total > 0 ? Math.round((completed / total) * 100) : 0;

        // Update level header
        const levelHeader = container.querySelector('.level-header');
        if (levelHeader) {
            levelHeader.innerHTML = `
                <h2>${levelTitle}</h2>
                <div class="level-progress">
                    <span>${completed} of ${total} completed</span>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${progress}%"></div>
                    </div>
                </div>
            `;
        }

        // Render challenges
        const challengesGrid = container.querySelector('.challenges-grid');
        if (challengesGrid) {
            challengesGrid.innerHTML = levelChallenges.map(challenge => this.createChallengeCard(challenge)).join('');
        }
    }

    createLevelContainer(levelKey, levelTitle) {
        const container = document.createElement('div');
        container.className = 'challenge-level';
        container.setAttribute('data-level', levelKey);
        container.innerHTML = `
            <div class="level-header">
                <h2>${levelTitle}</h2>
                <div class="level-progress">
                    <span>0 of 0 completed</span>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: 0%"></div>
                    </div>
                </div>
            </div>
            <div class="challenges-grid"></div>
        `;
        
        document.querySelector('.challenges-container').appendChild(container);
        return container;
    }

    createChallengeCard(challenge) {
        return `
            <div class="challenge-card ${challenge.status}" data-challenge-id="${challenge.id}">
                <div class="challenge-badge ${challenge.difficulty}">${this.getDifficultyText(challenge.difficulty)}</div>
                <div class="challenge-icon">${challenge.icon}</div>
                <h3>${challenge.title}</h3>
                <p>${challenge.description}</p>
                <div class="challenge-reward">
                    <span class="reward-points">+${challenge.points} points</span>
                    <span class="duration">${challenge.duration}</span>
                </div>
                ${this.getChallengeActions(challenge)}
            </div>
        `;
    }

    getDifficultyText(difficulty) {
        const texts = {
            'beginner': 'Beginner',
            'intermediate': 'Intermediate',
            'advanced': 'Advanced',
            'daily': 'Daily'
        };
        return texts[difficulty] || difficulty;
    }

    getChallengeActions(challenge) {
        switch (challenge.status) {
            case 'completed':
                return `
                    <div class="challenge-status completed">
                        <span>✓ Completed</span>
                    </div>
                    <button class="btn outline" disabled>Completed</button>
                `;
            case 'active':
                return `
                    <div class="challenge-progress">
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${challenge.progress}%"></div>
                        </div>
                        <span>${challenge.progress}% Complete</span>
                    </div>
                    <button class="btn primary">Continue Challenge</button>
                `;
            case 'locked':
                return `
                    <div class="challenge-status">
                        <span>Locked</span>
                    </div>
                    <button class="btn outline" disabled>Complete Previous Challenges</button>
                `;
            default:
                return `
                    <div class="challenge-status">
                        <span>Available</span>
                    </div>
                    <button class="btn primary">Start Challenge</button>
                `;
        }
    }

    setupEventListeners() {
        // Filter buttons
        const filterBtns = document.querySelectorAll('.filter-btn');
        filterBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.handleFilterChange(e.target);
            });
        });

        // Challenge buttons
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('btn') && e.target.closest('.challenge-card')) {
                this.handleChallengeAction(e.target);
            }
        });

        // Search functionality
        const searchInput = document.querySelector('.search-input');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.handleSearch(e.target.value);
            });
        }
    }

    handleFilterChange(button) {
        const filter = button.getAttribute('data-filter');
        
        // Update active button
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        button.classList.add('active');
        
        this.currentFilter = filter;
        this.applyFilters();
    }

    applyFilters() {
        const challengeCards = document.querySelectorAll('.challenge-card');
        
        challengeCards.forEach(card => {
            const shouldShow = this.shouldShowCard(card);
            card.style.display = shouldShow ? 'block' : 'none';
        });
    }

    shouldShowCard(card) {
        if (this.currentFilter === 'all') return true;
        
        const status = card.classList.contains('completed') ? 'completed' :
                      card.classList.contains('active') ? 'active' :
                      card.classList.contains('upcoming') ? 'upcoming' : 'available';
        
        const difficulty = card.querySelector('.challenge-badge').classList[1];
        
        switch (this.currentFilter) {
            case 'active': return status === 'active';
            case 'completed': return status === 'completed';
            case 'beginner': return difficulty === 'beginner';
            case 'intermediate': return difficulty === 'intermediate';
            case 'advanced': return difficulty === 'advanced';
            default: return true;
        }
    }

    handleChallengeAction(button) {
        const challengeCard = button.closest('.challenge-card');
        const challengeId = parseInt(challengeCard.getAttribute('data-challenge-id'));
        const challenge = this.findChallengeById(challengeId);
        
        if (!challenge) return;

        if (button.textContent.includes('Start') || button.textContent.includes('Continue')) {
            this.startChallenge(challenge);
        }
    }

    findChallengeById(id) {
        for (const level in this.challenges) {
            const challenge = this.challenges[level].find(c => c.id === id);
            if (challenge) return challenge;
        }
        return null;
    }

    startChallenge(challenge) {
        // Simulate challenge start
        this.showNotification(`Starting: ${challenge.title}`);
        
        // Update challenge progress
        if (challenge.status === 'available') {
            challenge.status = 'active';
        }
        
        if (challenge.status === 'active') {
            challenge.progress = Math.min(challenge.progress + 25, 100);
            
            if (challenge.progress === 100) {
                challenge.status = 'completed';
                this.awardPoints(challenge.points);
                this.showNotification(`Challenge completed! +${challenge.points} points earned!`);
            }
        }
        
        // Save changes and re-render
        this.saveData('challenges', this.challenges);
        this.renderChallenges();
        this.applyFilters();
    }

    awardPoints(points) {
        if (this.currentUser) {
            this.currentUser.points = (this.currentUser.points || 0) + points;
            window.auth.updateUserProfile({ points: this.currentUser.points });
            
            // Update points display in header
            const pointsValue = document.querySelector('.points-value');
            if (pointsValue) {
                pointsValue.textContent = `${this.currentUser.points} Points`;
            }
        }
    }

    handleSearch(query) {
        const challengeCards = document.querySelectorAll('.challenge-card');
        const searchTerm = query.toLowerCase().trim();
        
        challengeCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const description = card.querySelector('p').textContent.toLowerCase();
            const matches = title.includes(searchTerm) || description.includes(searchTerm);
            card.style.display = matches ? 'block' : 'none';
        });
    }

    updateProgressBars() {
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

// Initialize challenges when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.includes('challenges.html')) {
        window.challenges = new Challenges();
    }
});
});