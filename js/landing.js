let tabData = [];

function scrollToSection(id) {
    const element = document.getElementById(id);
    if (element) {
        const yOffset = -140;
        const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
    }
}

async function fetchLandingPageData() {
    try {
        const response = await fetch("http://localhost:3000/api/get-landing-page");
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();
        document.dispatchEvent(new CustomEvent("landingPageDataUpdated", { detail: data }));
    } catch (error) {
        console.error("Error fetching landing page data:", error);
    }
}

function updateContent(data) {
    if (!data || typeof data !== "object") return;

    // Hero Image Section
    if (data.hero_image) {
        const heroCaption = document.getElementById("hero-caption");
        if (heroCaption) heroCaption.textContent = data.hero_image.caption;
    }

    // About Section
    if (data.about) {
        const aboutDescription = document.getElementById("about-description");
        const downloadButton = document.getElementById("download-button");
        if (aboutDescription) aboutDescription.textContent = data.about.content;
        if (data.about.link && downloadButton) {
            downloadButton.onclick = () => {
                const link = document.createElement("a");
                link.href = data.about.link;
                link.download = "Hirad-Catalouge.pdf";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            };
        }

        const counterItems = document.querySelectorAll(".counter-item");
        if (data.statistics && counterItems.length) {
            counterItems.forEach((item, index) => {
                if (data.statistics[index]) {
                    item.querySelector(".counter-value").textContent = data.statistics[index].value;
                    item.querySelector(".counter-title").textContent = data.statistics[index].title;
                }
            });
        }
    }

    // Product Category Section
    if (data.cat) {
        tabData = data.cat;
        changeTab(0);
    }

    // Standards Section
    if (data.standards.content) {
        const logoCarousel = document.getElementById("standard-logo");
        if (logoCarousel) {
            logoCarousel.innerHTML = data.standards.content.map(item =>
                `<img src="${item}" style="width: 20%; height: 80px;" onerror="this.src='./assets/images/placeholder.gif';">`
            ).join('');
        }
    }

    // Why Choose Us Section
    if (data.whychooseus) {
        const whyTitle = document.getElementById("why-title");
        const whyDescription = document.getElementById("why-description");
        const whyContent = document.getElementById("why-content");
        if (whyTitle) whyTitle.textContent = data.whychooseus.title;
        if (whyDescription) whyDescription.textContent = data.whychooseus.description;
        if (whyContent) whyContent.textContent = data.whychooseus.content;
    }

    // Partners Section
    if (data.testimonials) {
        const partnersTitle = document.getElementById('partners-title');
        const partnersDescription = document.getElementById('partners-description');
        const partnersCarousel = document.getElementById('partners-logo');
        if (partnersTitle) partnersTitle.textContent = data.testimonials.title;
        if (partnersDescription) partnersDescription.textContent = data.testimonials.description;
        if (partnersCarousel && data.testimonials.content) {
            partnersCarousel.innerHTML = data.testimonials.content.map(item =>
                `<img src="${item}" style="width: 20%; height: 80px; object-fit: cover;" onerror="this.src='./assets/images/placeholder.gif';">`
            ).join('');
        }
    }
}

function changeTab(index) {
    if (!tabData || !tabData[index]) {
        document.getElementById("tab1").checked = true;
        try {
            changeTab(0);
        } catch (e) {
            console.error("Error in changeTab function:", e);
        }
        return;
    }

    const elements = {
        title: document.getElementById("tab-title"),
        image: document.getElementById("tab-image"),
        description: document.getElementById("tab-description"),
        catButton: document.getElementById("cat-button")
    };

    // Remove animations
    Object.values(elements).forEach(el => {
        if (el) {
            el.classList.remove("fade-in");
            el.classList.add("fade-out");
        }
    });

    setTimeout(() => {
        if (elements.title) elements.title.textContent = tabData[index].name;
        if (elements.image) {
            elements.image.src = tabData[index].image;
            elements.image.onerror = () => elements.image.src = './assets/images/placeholder.gif';
        }
        if (elements.description) elements.description.textContent = tabData[index].description;
        if (elements.catButton) {
            elements.catButton.onclick = () => {
                const link = document.createElement("a");
                link.href = `/products/${tabData[index].slug}`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            };
        }

        // Add fade-in animation
        Object.values(elements).forEach(el => {
            if (el) {
                el.classList.remove("fade-out");
                el.classList.add("fade-in");
            }
        });
    }, 300);
}

// Event Listeners
document.addEventListener("landingPageDataUpdated", (event) => updateContent(event.detail));

document.addEventListener("DOMContentLoaded", () => {
    fetchLandingPageData();

    const counters = document.querySelectorAll("#about-counter .counter-value");
    if (counters.length) {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        startCounting(entry.target);
                    }
                }), { threshold: 0.5 }
            }
        );

        counters.forEach(counter => observer.observe(counter));
    }

    function startCounting(counter) {
        const targetValue = parseInt(counter.textContent) || 0;
        let startValue = 0;
        const duration = 500;
        let startTime = null;

        function updateCounter(currentTime) {
            if (!startTime) startTime = currentTime;
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1);
            counter.textContent = Math.floor(progress * targetValue);

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = targetValue;
            }
        }

        requestAnimationFrame(updateCounter);
    }
});