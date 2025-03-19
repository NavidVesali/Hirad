function scrollToSection(id) {
    const element = document.getElementById(id);
    const yOffset = -140;
    const y = element.getBoundingClientRect().top + window.scrollY + yOffset;

    window.scrollTo({ top: y, behavior: 'smooth' });
}


let tabData = [];

async function fetchLandingPageData() {
    try {
        const response = await fetch("http://localhost:3000/api/get-landing-page");

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        // Store updated data in localStorage
        saveToStorage("landingPageData", data);

        // Dispatch an event for UI updates
        document.dispatchEvent(new CustomEvent("landingPageDataUpdated", { detail: data }));
    } catch (error) {
        console.error("Error fetching landing page data:", error);
    }
}

function saveToStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

function getFromStorage(key) {
    const storedData = localStorage.getItem(key);
    return storedData ? JSON.parse(storedData) : null;
}

function updateContent(data) {
    if (data && typeof data === "object") {
        // Hero Image Section
        if (data['hero_image']) {
            const heroTitle = document.getElementById("hero-title");
            const heroCaption = document.getElementById("hero-caption");
            heroTitle.textContent = data["hero_image"]["title"];
            heroCaption.textContent = data["hero_image"]["caption"];
        }
        // About Section
        if (data['about']) {
            const counterItems = document.querySelectorAll(".counter-item");
            const downloadButton = document.getElementById("download-button");
            const aboutDescription = document.getElementById("about-description");
            aboutDescription.textContent = data['about']['content'];
            //Create a link and make file downloadable
            if (data['about']['link']) {
                downloadButton.addEventListener("click", function() {
                    const link = document.createElement("a");
                    link.href = data['about']['link'];
                    link.download = "Hirad-Catalouge.pdf";
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                });
            }
            // Loop through all counter items and update their content
            counterItems.forEach((item, index) => {
                const valueElement = item.querySelector(".counter-value");
                const titleElement = item.querySelector(".counter-title");
                const statistics = data['statistics'];
                // Update the value and title based on the statistics array
                if (statistics[index]) {
                    valueElement.textContent = statistics[index]['value'];
                    titleElement.textContent = statistics[index]['title'];
                }
            });
        }
        // Product Category Section
        tabData = data['cat'];
        changeTab(0);

        // Standards Section
        const logoCarousel = document.getElementById("standard-logo");
        if (data['standards']['content']) {
            logoCarousel.innerHTML = "";
            data['standards']['content'].forEach(item => {
                const img = document.createElement("img");
                img.src = item;
                img.style.width = "20%";
                img.style.height = '80px';
                logoCarousel.appendChild(img);
            });
        }
        // Why Choose Us Section
        if (data['whychooseus']) {
            const whyTitle = document.getElementById("why-title");
            const whyDescription = document.getElementById("why-description");
            const whyContent = document.getElementById("why-content");

            whyTitle.textContent = data['whychooseus']['title'];
            whyDescription.textContent = data['whychooseus']['description'];
            whyContent.textContent = data['whychooseus']['content'];
        }

        // Partners Section
        if (data['testimonials']) {
            const partnersTitle = document.getElementById('partners-title');
            const partnersDescription = document.getElementById('partners-description');
            const partnersCarousel = document.getElementById('partners-logo');
            partnersTitle.textContent = data['testimonials']['title'];
            partnersDescription.textContent = data['testimonials']['description'];

            partnersCarousel.innerHTML = "";

            data['testimonials']['content'].forEach(item => {
                const img = document.createElement("img");
                img.src = item;
                img.style.width = "20%";
                img.style.height = '80px';
                partnersCarousel.appendChild(img);
            });
        }
    }
}

// Listen for data update event
document.addEventListener("landingPageDataUpdated", (event) => {
    updateContent(event.detail);
});

document.addEventListener("DOMContentLoaded", function() {
    // Load stored data first
    const storedData = getFromStorage("landingPageData");
    if (storedData) {
        document.dispatchEvent(new CustomEvent("landingPageDataUpdated", { detail: storedData }));
    }

    // Fetch new data
    fetchLandingPageData();
});

function changeTab(index) {
    if (tabData[index]) {
        const title = document.getElementById("tab-title");
        const image = document.getElementById("tab-image");
        const description = document.getElementById("tab-description");
        const catButton = document.getElementById("cat-button");
        // Remove existing animations
        title.classList.remove("fade-in");
        image.classList.remove("fade-in");
        description.classList.remove("fade-in");
        catButton.classList.remove("fade-in");

        // Add fade-out animation
        title.classList.add("fade-out");
        image.classList.add("fade-out");
        description.classList.add("fade-out");
        catButton.classList.add("fade-out");

        setTimeout(() => {
            // Update content
            title.innerText = tabData[index]['name'];
            image.src = tabData[index]['image'];
            description.innerText = tabData[index]['description'];
            catButton.addEventListener("click", function() {
                const link = document.createElement("a");
                link.href = `/products/${tabData[index]['slug']}`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            });

            // Remove fade-out and add fade-in animation
            title.classList.remove("fade-out");
            image.classList.remove("fade-out");
            description.classList.remove("fade-out");
            catButton.classList.remove("fade-out");

            title.classList.add("fade-in");
            image.classList.add("fade-in");
            description.classList.add("fade-in");
            catButton.classList.add("fade-in");
        }, 300);
    }
}