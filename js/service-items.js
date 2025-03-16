class ServiceItems extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.items = [];
        this._resizeObserver = null;
        this.isLoading = true; // Add a loading state
    }

    connectedCallback() {
        this._fetchServices();
        this._resizeObserver = new ResizeObserver(() => {
            this._updateResponsiveLayout();
        });
        this._resizeObserver.observe(this);
    }

    disconnectedCallback() {
        if (this._resizeObserver) {
            this._resizeObserver.disconnect();
        }
    }

    async _fetchServices() {
        try {
            this.isLoading = true; // Set loading state
            this.render(); // Render placeholders immediately

            const response = await fetch("http://localhost:3000/api/get-services", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (!response.ok) throw new Error("Failed to fetch services");

            const data = await response.json();
            this.items = data;
            this.isLoading = false; // Data is loaded
            this.render(); // Re-render with actual data
        } catch (error) {
            this.isLoading = false;
            this.items = Array(4).fill({ id: null }); // Fallback placeholders
            this.render();
            console.error("Error fetching services:", error);
        }
    }

    _updateResponsiveLayout() {
        const container = this.shadowRoot.querySelector('.services-container');
        if (!container) return;

        const width = this.clientWidth;

        if (width < 768) {
            container.classList.add('mobile');
            container.classList.remove('tablet');
        } else if (width < 1024) {
            container.classList.add('tablet');
            container.classList.remove('mobile');
        } else {
            container.classList.remove('mobile', 'tablet');
        }

        this._updateTopBorders();
    }

    render() {
        const style = document.createElement('style');
        style.textContent = `
            :host {
                display: block;
                width: 100%;
            }
            .services-container {
                position: relative;
                width: 100%;
                height: auto;
                min-height: 600px;
                padding-bottom: 50px;
                padding-top: 240px;
                box-sizing: border-box;
            }
            .vertical-line {
                position: absolute;
                top: 0;
                left: 50%;
                width: 1px;
                height: 200px;
                background: linear-gradient(to bottom, transparent, rgba(40, 40, 40, 1));
                animation: fadeIn 1s ease-out, slideDown 1s ease-out;
            }
            .circle-avatar {
                position: absolute;
                top: 196px;
                left: calc(50% - 4px);
                width: 8px;
                height: 8px;
                border-radius: 50%;
                background-color: rgba(40, 40, 40, 1);
                animation: fadeIn 1s ease-out, slideDown 1s ease-out;
            }
            .top-borders {
                position: absolute;
                top: 200px;
                left: 0;
                width: 100%;
                display: flex;
                justify-content: center;
                padding: 0 12.5%;
                animation: fadeIn 1s ease-out, slideDown 1s ease-out;
                box-sizing: border-box;
            }
            .top-border {
                width: calc(100% / 4 - 20px);
                height: 40px;
                margin: 0 10px;
                border-top: 1px solid rgba(40, 40, 40, 1);
                border-left: 1px solid rgba(40, 40, 40, 1);
                border-right: 1px solid rgba(40, 40, 40, 1);
                border-radius: 30px 30px 0 0;
                background-color: transparent;
                box-sizing: border-box;
            }
            .services-row {
                display: flex;
                justify-content: space-around;
                padding: 0 12.5%;
                animation: fadeIn 1s ease-out, slideDown 1s ease-out;
                box-sizing: border-box;
            }
            .service-container {
                width: calc(100% / 4 - 20px);
                margin: 0 10px;
                padding: 20px;
                align-items: center;
                justify-content: flex-start;
                text-align: center;
                box-sizing: border-box;
                display: flex;
                flex-direction: column;
                border: 1px solid transparent;
                border-radius: 32px;
                background: rgba(255, 255, 255, 0.03) padding-box, linear-gradient(var(--angle), rgba(255, 255, 255, 0.03), #3c3c3c) border-box;
                box-shadow: inset 0px 4px 15px 2px rgba(255, 255, 255, 0.04);
                backdrop-filter: blur(10px);
            }
            .service-icon {
                width: 80px;
                height: 80px;
                margin-bottom: 20px;
                background: linear-gradient(90deg, #3c3c3c, #5a5a5a, #3c3c3c);
                background-size: 200% 100%;
                animation: shimmer 1.5s infinite;
                border-radius: 50%;
            }
            .service-name {
                width: 60%;
                height: 20px;
                margin-bottom: 10px;
                background: linear-gradient(90deg, #3c3c3c, #5a5a5a, #3c3c3c);
                background-size: 200% 100%;
                animation: shimmer 1.5s infinite;
                border-radius: 4px;
            }
            .service-description {
                width: 90%;
                height: 60px;
                background: linear-gradient(90deg, #3c3c3c, #5a5a5a, #3c3c3c);
                background-size: 200% 100%;
                animation: shimmer 1.5s infinite;
                border-radius: 16px;
            }
            .service-icon-loaded {
                width: 80px;
                height: 80px;
                margin-bottom: 20px;
                border-radius: 50%;
                object-fit: cover;
            }
            .service-name-loaded {
                width: 100%;
                margin-bottom: 10px;
                font-size: 18px;
                font-weight: bold;
                color: #d4d4d4;
            }
            .service-desc-loaded {
                width: 90%;
                font-size: 14px;
                color: #d4d4d4;
            }
            @keyframes shimmer {
                0% { background-position: 200% 0; }
                100% { background-position: -200% 0; }
            }
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            @keyframes slideDown {
                from { transform: translateY(-30px); }
                to { transform: translateY(0); }
            }
            .tablet .top-borders {
                padding: 0 8%;
            }
            .tablet .services-row {
                flex-wrap: wrap;
                padding: 0 8%;
            }
            .tablet .service-container {
                width: calc(50% - 20px);
                margin-bottom: 20px;
            }
            .tablet .top-border {
                width: calc(50% - 20px);
            }
            .mobile .top-borders,
            .mobile .vertical-line,
            .mobile .circle-avatar {
                display: none;
            }
            .mobile .services-row {
                flex-direction: column;
                padding: 0 5%;
            }
            .mobile .service-container {
                width: 100%;
                margin-bottom: 20px;
            }
        `;

        const container = document.createElement('div');
        container.className = 'services-container';

        const verticalLine = document.createElement('div');
        verticalLine.className = 'vertical-line';
        container.appendChild(verticalLine);

        const circleAvatar = document.createElement('div');
        circleAvatar.className = 'circle-avatar';
        container.appendChild(circleAvatar);

        const topBorders = document.createElement('div');
        topBorders.className = 'top-borders';
        container.appendChild(topBorders);
        this._updateTopBorders();

        const servicesRow = document.createElement('div');
        servicesRow.className = 'services-row';

        this.items.forEach((item, index) => {
            const serviceContainer = document.createElement('div');
            serviceContainer.className = 'service-container';
            serviceContainer.id = item.id || `placeholder-${index}`;

            if (this.isLoading || !item.id) {
                // Render shimmer placeholders during loading or if no real data
                const serviceIcon = document.createElement('div');
                serviceIcon.className = 'service-icon';

                const serviceName = document.createElement('div');
                serviceName.className = 'service-name';

                const serviceDescription = document.createElement('div');
                serviceDescription.className = 'service-description';

                serviceContainer.appendChild(serviceIcon);
                serviceContainer.appendChild(serviceName);
                serviceContainer.appendChild(serviceDescription);
            } else {
                // Render actual content when data is loaded
                const serviceIcon = document.createElement('img');
                serviceIcon.className = 'service-icon-loaded';
                serviceIcon.src = item.icon || './assets/images/default.png'; // Initial src with fallback
                serviceIcon.alt = item.name || 'Service Icon';
                // Add error handling for image loading failure
                serviceIcon.onerror = () => {
                    serviceIcon.src = './assets/images/default.png'; // Fallback to default image
                };

                const serviceName = document.createElement('div');
                serviceName.className = 'service-name-loaded';
                serviceName.textContent = item.name || 'Unnamed Service';

                const serviceDescription = document.createElement('div');
                serviceDescription.className = 'service-desc-loaded';
                serviceDescription.textContent = item.description || 'No description available';

                serviceContainer.appendChild(serviceIcon);
                serviceContainer.appendChild(serviceName);
                serviceContainer.appendChild(serviceDescription);
            }

            servicesRow.appendChild(serviceContainer);
        });

        container.appendChild(servicesRow);

        this.shadowRoot.innerHTML = '';
        this.shadowRoot.appendChild(style);
        this.shadowRoot.appendChild(container);

        setTimeout(() => {
            this._updateResponsiveLayout();
        }, 0);
    }

    _updateTopBorders() {
        const topBorders = this.shadowRoot.querySelector('.top-borders');
        if (!topBorders) return;

        topBorders.innerHTML = '';
        const width = this.clientWidth;

        if (width > 1024) {
            for (let i = 0; i < this.items.length - 1; i++) {
                const topBorder = document.createElement('div');
                topBorder.className = 'top-border';
                topBorders.appendChild(topBorder);
            }
        } else {
            const topBorder = document.createElement('div');
            topBorder.className = 'top-border';
            topBorders.appendChild(topBorder);
        }
    }
}

customElements.define('service-items', ServiceItems);