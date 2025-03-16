// AnimatedLineConnector class
class AnimatedLineConnector {
    constructor(container, options = {}) {
        this.container = typeof container === 'string' ? document.querySelector(container) : container;
        this.items = this.container.querySelectorAll('.hero-items');
        this.options = {
            lineColor: 'rgba(255, 255, 255, 0.08)',
            lineWidth: 1,
            animationDuration: 1000,
            radius: 30,
            ...options
        };

        this.itemCenters = [];
        this.connectorStarts = [];
        this.svg = null;
        this.paths = [];

        this.init();
    }

    init() {
        // Create SVG element
        this.svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        this.svg.style.position = 'absolute';
        this.svg.style.top = '0';
        this.svg.style.left = '0';
        this.svg.style.width = '100%';
        this.svg.style.height = '100%';
        this.svg.style.pointerEvents = 'none';
        this.svg.style.zIndex = '1';

        // Insert SVG before the first item
        this.container.insertBefore(this.svg, this.container.firstChild);

        // Calculate positions
        this.calculatePositions();

        // Create paths
        this.createPaths();

        // Start animation
        this.animatePaths();

        // Handle window resize
        window.addEventListener('resize', () => {
            this.calculatePositions();
            this.updatePaths();
        });
    }

    calculatePositions() {
        const containerRect = this.container.getBoundingClientRect();
        const screenHeight = window.innerHeight;
        const screenWidth = window.innerWidth;
        const midpoint = screenHeight * 0.3;
        const verticalMidPoint = screenWidth * 0.5;

        this.itemCenters = [];
        this.connectorStarts = [];

        // Calculate center positions for each item
        this.items.forEach(item => {
            const rect = item.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2 - containerRect.left;
            const centerY = rect.top + rect.height / 2 - containerRect.top;
            this.itemCenters.push({ x: centerX, y: centerY });

            let startY;
            let startX;

            if (centerY < midpoint) {
                startY = centerY - 130;
            } else {
                startY = centerY + 130;
            }

            if (centerX < verticalMidPoint) {
                startX = 0;
            } else {
                startX = screenWidth;
            }

            startY = Math.max(0, Math.min(startY, screenHeight));
            this.connectorStarts.push({ x: startX, y: startY });
        });
    }

    createPaths() {
        // Remove existing paths
        while (this.svg.firstChild) {
            this.svg.removeChild(this.svg.firstChild);
        }

        this.paths = [];

        // Create new paths
        for (let i = 0; i < this.itemCenters.length; i++) {
            const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path.setAttribute('fill', 'none');
            path.setAttribute('stroke', this.options.lineColor);
            path.setAttribute('stroke-width', this.options.lineWidth);
            path.setAttribute('d', this.createPathData(this.connectorStarts[i], this.itemCenters[i]));

            this.svg.appendChild(path);
            this.paths.push({
                element: path,
                length: path.getTotalLength()
            });

            // Set initial state - invisible
            path.style.strokeDasharray = path.getTotalLength();
            path.style.strokeDashoffset = path.getTotalLength();
        }
    }

    createPathData(start, end) {
        const { radius } = this.options;
        let pathData = `M ${start.x} ${start.y}`;

        const isLeftStart = start.x === 0;
        const xTurn = isLeftStart ? end.x - radius : end.x + radius;

        if (start.y < end.y) {
            // Start above end: curve downward
            pathData += ` L ${xTurn} ${start.y}`;

            if (isLeftStart) {
                pathData += ` A ${radius} ${radius} 0 0 1 ${end.x} ${start.y + radius}`;
            } else {
                pathData += ` A ${radius} ${radius} 0 0 0 ${end.x} ${start.y + radius}`;
            }

            pathData += ` L ${end.x} ${end.y}`;
        } else if (start.y > end.y) {
            // Start below end: curve upward
            pathData += ` L ${xTurn} ${start.y}`;

            if (isLeftStart) {
                pathData += ` A ${radius} ${radius} 0 0 0 ${end.x} ${start.y - radius}`;
            } else {
                pathData += ` A ${radius} ${radius} 0 0 1 ${end.x} ${start.y - radius}`;
            }

            pathData += ` L ${end.x} ${end.y}`;
        } else {
            // Same vertical level
            pathData += ` L ${end.x} ${end.y}`;
        }

        return pathData;
    }

    updatePaths() {
        for (let i = 0; i < this.paths.length; i++) {
            const path = this.paths[i].element;
            path.setAttribute('d', this.createPathData(this.connectorStarts[i], this.itemCenters[i]));

            // Update length
            this.paths[i].length = path.getTotalLength();
            path.style.strokeDasharray = this.paths[i].length;
        }
    }

    animatePaths() {
        const startTime = performance.now();
        const duration = this.options.animationDuration;

        const animate = (currentTime) => {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1);

            this.paths.forEach(path => {
                path.element.style.strokeDashoffset = path.length * (1 - progress);
            });

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    }

    // Public method to trigger animation manually
    animate() {
        this.animatePaths();
    }
}

// Usage example
document.addEventListener('DOMContentLoaded', () => {
    // Initialize the connector
    const connector = new AnimatedLineConnector('.hero-items-container', {
        lineColor: 'rgba(255, 255, 255, 0.08)',
        lineWidth: 1,
        animationDuration: 1000,
        radius: 30
    });
});