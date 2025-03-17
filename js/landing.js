function scrollToSection(id) {
    document.getElementById(id).scrollIntoView({
        behavior: 'smooth'
    });
}

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
        const heroTitle = document.getElementById("hero-title");
        const heroCaption = document.getElementById("hero-caption");
        heroTitle.textContent = data["hero_image"]["title"];
        heroCaption.textContent = data["hero_image"]["caption"];

        // About Section
        const counterItems = document.querySelectorAll(".counter-item");
        const downloadButton = document.getElementById("download-button");
        //Create a link and make file downloadable
        if (data.about.link) {
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