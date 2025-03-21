let tabData = [];

async function fetchProductListData() {
    try {
        const response = await fetch("http://localhost:3000/api/product-list");

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        // Store updated data in localStorage
        saveToStorage("ProductListData", data);

        // Dispatch an event for UI updates
        document.dispatchEvent(new CustomEvent("ProductListDataUpdated", { detail: data }));
    } catch (error) {
        console.error("Error fetching product list data:", error);
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

        // Product Category Section
        tabData = data;
        changeTab(0);
    }
}

// Listen for data update event
document.addEventListener("ProductListDataUpdated", (event) => {
    updateContent(event.detail);
});

document.addEventListener("DOMContentLoaded", function() {
    // Load stored data first
    const storedData = getFromStorage("ProductListData");
    if (storedData) {
        document.dispatchEvent(new CustomEvent("ProductListDataUpdated", { detail: storedData }));
    }

    // Fetch new data
    fetchProductListData();
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