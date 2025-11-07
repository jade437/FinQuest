class Simulations {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadSimulations();
    }

    setupEventListeners() {
        // Category cards
        const categoryCards = document.querySelectorAll('.category-card');
        categoryCards.forEach(card => {
            card.addEventListener('click', (e) => {
                this.handleCategorySelect(e.currentTarget);
            });
        });

        // Simulation buttons
        const simulationBtns = document.querySelectorAll('.simulation-card .btn');
        simulationBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.handleSimulationStart(e.target);
            });
        });
    }

    handleCategorySelect(card) {
        const category = card.getAttribute('data-category');
        
        // Highlight selected category
        document.querySelectorAll('.category-card').forEach(c => {
            c.style.borderColor = 'transparent';
        });
        card.style.borderColor = 'var(--primary)';
        
        this.filterSimulations(category);
    }

    filterSimulations(category) {
        // In a real app, this would filter simulations by category
        console.log(`Filtering simulations by category: ${category}`);
        
        // Show notification
        this.showNotification(`Showing ${category} simulations`);
    }

    handleSimulationStart(button) {
        const simulationCard = button.closest('.simulation-card');
        const simulationTitle = simulationCard.querySelector('h3').textContent;
        
        if (button.textContent.includes('Start') || button.textContent.includes('Continue')) {
            this.launchSimulation(simulationTitle);
        }
    }

    launchSimulation(simulationTitle) {
        // In a real app, this would launch the simulation
        alert(`Launching simulation: ${simulationTitle}`);
        
        // Simulate progress update for in-progress simulations
        const progressBadge = document.querySelector('.simulation-card.in-progress .progress-badge');
        if (progressBadge) {
            const currentProgress = parseInt(progressBadge.textContent);
            const newProgress = Math.min(currentProgress + 15, 100);
            progressBadge.textContent = `${newProgress}% Complete`;
            
            // Update progress bar
            const progressFill = progressBadge.closest('.simulation-card').querySelector('.progress-fill');
            if (progressFill) {
                progressFill.style.width = `${newProgress}%`;
            }
        }
    }

    loadSimulations() {
        // This would typically fetch from an API
        console.log('Loading simulations data...');
    }

    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--primary);
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
    if (window.location.pathname.includes('simulations.html')) {
        window.simulations = new Simulations();
    }
});
// Simulations functionality
class Simulations {
    constructor() {
        this.currentCategory = 'all';
        this.simulations = [];
        this.init();
    }

    init() {
        this.currentUser = window.auth ? window.auth.getCurrentUser() : null;
        if (!this.currentUser) {
            window.location.href = 'login.html';
            return;
        }

        this.loadSimulations();
        this.setupEventListeners();
        this.initializeAnimations();
    }

    loadSimulations() {
        this.simulations = this.getStoredData('simulations') || this.getDefaultSimulations();
        this.renderSimulations();
    }

    getDefaultSimulations() {
        return {
            'popular': [
                {
                    id: 1,
                    title: 'Gig Economy Simulator',
                    description: 'Manage irregular income from freelance work. Make decisions about gig selection, pricing, and budgeting with unpredictable cash flow.',
                    category: 'gig-economy',
                    difficulty: 'intermediate',
                    duration: '15-20 min',
                    rating: 4.8,
                    players: 2450,
                    points: 200,
                    icon: '💼',
                    badge: 'popular',
                    progress: 0
                },
                {
                    id: 2,
                    title: 'Black Tax Budget Balancer',
                    description: 'Practice balancing personal financial goals with family responsibilities. Make decisions about supporting relatives while saving for your future.',
                    category: 'black-tax',
                    difficulty: 'advanced',
                    duration: '20-25 min',
                    rating: 4.9,
                    players: 1780,
                    points: 250,
                    icon: '👨‍👩‍👧‍👦',
                    badge: 'new',
                    progress: 0
                },
                {
                    id: 3,
                    title: 'Township Entrepreneur',
                    description: 'Run a small spaza shop while managing costs, inventory, and savings. Navigate challenges like power outages and supplier issues.',
                    category: 'entrepreneur',
                    difficulty: 'advanced',
                    duration: '25-30 min',
                    rating: 4.7,
                    players: 1230,
                    points: 300,
                    icon: '🏪',
                    badge: '',
                    progress: 0
                }
            ],
            'in-progress': [
                {
                    id: 4,
                    title: 'Student Life Manager',
                    description: 'Balance tuition, accommodation, and social spending as a university student.',
                    category: 'student-life',
                    difficulty: 'intermediate',
                    duration: '20-25 min',
                    rating: 4.5,
                    players: 1890,
                    points: 180,
                    icon: '🎓',
                    badge: '',
                    progress: 65
                },
                {
                    id: 5,
                    title: 'First Job Budgeter',
                    description: 'Manage your finances with your first real paycheck and new responsibilities.',
                    category: 'gig-economy',
                    difficulty: 'beginner',
                    duration: '15-20 min',
                    rating: 4.6,
                    players: 1560,
                    points: 150,
                    icon: '💼',
                    badge: '',
                    progress: 40
                }
            ]
        };
    }

    renderSimulations() {
        this.renderSection('popular', 'Popular Simulations');
        this.renderSection('in-progress', 'Continue Your Journey');
    }

    renderSection(sectionKey, sectionTitle) {
        const sectionSimulations = this.simulations[sectionKey];
        if (!sectionSimulations) return;

        const section = document.querySelector(`[data-section="${sectionKey}"]`) || this.createSection(sectionKey, sectionTitle);
        const grid = section.querySelector('.simulations-grid');
        
        if (grid) {
            grid.innerHTML = sectionSimulations.map(sim => this.createSimulationCard(sim, sectionKey)).join('');
        }
    }

    createSection(sectionKey, sectionTitle) {
        const section = document.createElement('section');
        section.className = 'simulations-section';
        section.setAttribute('data-section', sectionKey);
        section.innerHTML = `
            <h2>${sectionTitle}</h2>
            <div class="simulations-grid"></div>
        `;
        
        document.querySelector('.simulations-container').appendChild(section);
        return section;
    }

    createSimulationCard(simulation, section) {
        const isInProgress = section === 'in-progress';
        
        return `
            <div class="simulation-card ${isInProgress ? 'in-progress' : ''}" data-simulation-id="${simulation.id}">
                ${this.getSimulationHeader(simulation)}
                <div class="simulation-icon">${simulation.icon}</div>
                <h3>${simulation.title}</h3>
                <p>${simulation.description}</p>
                <div class="simulation-details">
                    <div class="detail">
                        <span class="label">Duration:</span>
                        <span class="value">${simulation.duration}</span>
                    </div>
                    <div class="detail">
                        <span class="label">Difficulty:</span>
                        <span class="value difficulty-${simulation.difficulty}">${this.getDifficultyText(simulation.difficulty)}</span>
                    </div>
                    <div class="detail">
                        <span class="label">Reward:</span>
                        <span class="value">+${simulation.points} points</span>
                    </div>
                </div>
                ${isInProgress ? this.getProgressSection(simulation) : ''}
                <button class="btn primary full-width">${isInProgress ? 'Continue Simulation' : 'Start Simulation'}</button>
            </div>
        `;
    }

    getSimulationHeader(simulation) {
        let header = '<div class="simulation-header">';
        
        if (simulation.badge) {
            header += `<div class="simulation-badge ${simulation.badge}">${simulation.badge === 'popular' ? 'Most Popular' : 'New'}</div>`;
        }
        
        header += `
            <div class="simulation-stats">
                <span class="stat">⭐ ${simulation.rating}</span>
                <span class="stat">👥 ${simulation.players.toLocaleString()}</span>
            </div>
        </div>`;
        
        return header;
    }

    getProgressSection(simulation) {
        return `
            <div class="simulation-progress">
                <div class="progress-badge">${simulation.progress}% Complete</div>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${simulation.progress}%"></div>
                </div>
            </div>
        `;
    }

    getDifficultyText(difficulty) {
        const texts = {
            'beginner': 'Beginner',
            'intermediate': 'Intermediate',
            'advanced': 'Advanced'
        };
        return texts[difficulty] || difficulty;
    }

    setupEventListeners() {
        // Category cards
        const categoryCards = document.querySelectorAll('.category-card');
        categoryCards.forEach(card => {
            card.addEventListener('click', (e) => {
                this.handleCategorySelect(e.currentTarget);
            });
        });

        // Simulation buttons
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('btn') && e.target.closest('.simulation-card')) {
                this.handleSimulationStart(e.target);
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

    handleCategorySelect(card) {
        const category = card.getAttribute('data-category');
        
        // Highlight selected category
        document.querySelectorAll('.category-card').forEach(c => {
            c.style.borderColor = 'transparent';
        });
        card.style.borderColor = 'var(--primary)';
        
        this.currentCategory = category;
        this.filterSimulations();
    }

    filterSimulations() {
        const simulationCards = document.querySelectorAll('.simulation-card');
        
        simulationCards.forEach(card => {
            const shouldShow = this.shouldShowCard(card);
            card.style.display = shouldShow ? 'block' : 'none';
        });
    }

    shouldShowCard(card) {
        if (this.currentCategory === 'all') return true;
        
        const simulationId = parseInt(card.getAttribute('data-simulation-id'));
        const simulation = this.findSimulationById(simulationId);
        
        return simulation && simulation.category === this.currentCategory;
    }

    findSimulationById(id) {
        for (const section in this.simulations) {
            const simulation = this.simulations[section].find(s => s.id === id);
            if (simulation) return simulation;
        }
        return null;
    }

    handleSimulationStart(button) {
        const simulationCard = button.closest('.simulation-card');
        const simulationId = parseInt(simulationCard.getAttribute('data-simulation-id'));
        const simulation = this.findSimulationById(simulationId);
        
        if (!simulation) return;

        this.launchSimulation(simulation);
    }

    launchSimulation(simulation) {
        // Simulate simulation launch
        this.showNotification(`Launching: ${simulation.title}`);
        
        // Update simulation progress
        if (simulation.progress === 0) {
            simulation.progress = 25;
        } else {
            simulation.progress = Math.min(simulation.progress + 25, 100);
        }
        
        if (simulation.progress === 100) {
            this.awardPoints(simulation.points);
            this.showNotification(`Simulation completed! +${simulation.points} points earned!`);
        } else {
            this.awardPoints(Math.floor(simulation.points * 0.1)); // Award 10% of points for progress
        }
        
        // Save changes and re-render
        this.saveData('simulations', this.simulations);
        this.renderSimulations();
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
        const simulationCards = document.querySelectorAll('.simulation-card');
        const searchTerm = query.toLowerCase().trim();
        
        simulationCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const description = card.querySelector('p').textContent.toLowerCase();
            const matches = title.includes(searchTerm) || description.includes(searchTerm);
            card.style.display = matches ? 'block' : 'none';
        });
    }

    initializeAnimations() {
        // Add hover animations
        const simulationCards = document.querySelectorAll('.simulation-card');
        simulationCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-5px)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0)';
            });
        });

        // Animate category cards
        const categoryCards = document.querySelectorAll('.category-card');
        categoryCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-3px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
            });
        });
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

// Initialize simulations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.includes('simulations.html')) {
        window.simulations = new Simulations();
    }
});