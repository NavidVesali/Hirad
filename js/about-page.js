async function fetchAboutData() {
    try {
        const response = await fetch("http://localhost:3000/api/about");

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        // Store updated data in localStorage
        saveToStorage("AboutData", data);

        // Dispatch an event for UI updates
        document.dispatchEvent(new CustomEvent("AboutUpdated", { detail: data }));
    } catch (error) {
        console.error("Error fetching about page data:", error);
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
}

// Listen for data update event
document.addEventListener("AboutUpdated", (event) => {
    updateContent(event.detail);
});

document.addEventListener("DOMContentLoaded", function() {
    // Load stored data first
    const storedData = getFromStorage("AboutData");
    if (storedData) {
        document.dispatchEvent(new CustomEvent("AboutUpdated", { detail: storedData }));
    }

    // Fetch new data
    fetchAboutData();
});