class Community {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadCommunityData();
    }

    setupEventListeners() {
        // Squad join buttons
        const squadBtns = document.querySelectorAll('.squad-card .btn');
        squadBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.handleSquadJoin(e.target);
            });
        });

        // Community challenge buttons
        const challengeBtns = document.querySelectorAll('.community-challenge-card .btn');
        challengeBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.handleCommunityChallenge(e.target);
            });
        });

        // Discussion items
        const discussionItems = document.querySelectorAll('.discussion-item');
        discussionItems.forEach(item => {
            item.addEventListener('click', (e) => {
                this.handleDiscussionClick(e.currentTarget);
            });
        });

        // Create squad button
        const createSquadBtn = document.querySelector('.squads-section .btn.secondary');
        if (createSquadBtn) {
            createSquadBtn.addEventListener('click', () => {
                this.handleCreateSquad();
            });
        }
    }

    handleSquadJoin(button) {
        const squadCard = button.closest('.squad-card');
        const squadName = squadCard.querySelector('h3').textContent;
        
        if (button.textContent === 'Join Squad') {
            this.joinSquad(squadName, button);
        }
    }

    joinSquad(squadName, button) {
        // In a real app, this would make an API call
        button.textContent = 'Joined!';
        button.classList.remove('primary');
        button.classList.add('secondary');
        button.disabled = true;
        
        this.showNotification(`Successfully joined ${squadName}!`);
        
        // Update squad stats
        const memberCount = button.closest('.squad-card').querySelector('.stat-value');
        if (memberCount) {
            const currentCount = parseInt(memberCount.textContent);
            memberCount.textContent = (currentCount + 1).toString();
        }
    }

    handleCommunityChallenge(button) {
        const challengeCard = button.closest('.community-challenge-card');
        const challengeName = challengeCard.querySelector('h3').textContent;
        
        if (button.textContent === 'Join Challenge') {
            this.joinCommunityChallenge(challengeName, challengeCard, button);
        }
    }

    joinCommunityChallenge(challengeName, card, button) {
        // In a real app, this would make an API call
        button.textContent = 'Joined!';
        button.disabled = true;
        
        // Update progress
        const progressStats = card.querySelector('.progress-stats');
        if (progressStats) {
            const participantText = progressStats.querySelector('span:first-child');
            if (participantText) {
                const currentParticipants = parseInt(participantText.textContent);
                participantText.textContent = `${currentParticipants + 1} participants`;
            }
        }
        
        this.showNotification(`You've joined the ${challengeName}!`);
    }

    handleDiscussionClick(discussionItem) {
        const discussionTitle = discussionItem.querySelector('h4').textContent;
        this.openDiscussion(discussionTitle);
    }

    openDiscussion(title) {
        // In a real app, this would open the discussion thread
        alert(`Opening discussion: ${title}`);
    }

    handleCreateSquad() {
        const squadName = prompt('Enter your squad name:');
        if (squadName) {
            this.createSquad(squadName);
        }
    }

    createSquad(name) {
        // In a real app, this would make an API call
        this.showNotification(`Squad "${name}" created successfully!`);
        
        // Refresh squads list (in real app, this would update from API)
        setTimeout(() => {
            alert(`Squad "${name}" has been created! You are now the squad leader.`);
        }, 1000);
    }

    loadCommunityData() {
        // This would typically fetch from an API
        console.log('Loading community data...');
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
    if (window.location.pathname.includes('community.html')) {
        window.community = new Community();
    }
});