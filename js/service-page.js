function expandDiv(clickedDiv) {
    let activeBox = document.querySelector(".service-box.show");
    let activeParent = document.querySelector(".box.show");

    let serviceBox = clickedDiv.querySelector(".service-box");
    let parentBox = clickedDiv;

    if (activeBox === serviceBox) return;

    if (activeBox && activeParent) {
        activeParent.classList.remove("show");
        activeParent.style.width = "120px";

        setTimeout(() => {
            activeBox.classList.remove("show");
            activeBox.style.display = "none";
        }, 500);
    }

    if (serviceBox && parentBox) {
        parentBox.style.display = "flex";
        serviceBox.style.display = "flex";

        setTimeout(() => {
            serviceBox.classList.add("show");
            parentBox.classList.add("show");
            parentBox.style.width = "calc(80vw - 360px)";
        }, 50);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    // Load stored data first
    const storedData = getFromStorage("ServicePageData");
    if (storedData) {
        document.dispatchEvent(new CustomEvent("ServicePageDataUpdated", { detail: storedData }));
    }

    // Fetch new data
    fetchServicePageData();
    const allServiceBoxes = document.querySelectorAll(".service-box");

    if (allServiceBoxes.length > 0) {
        expandDiv(allServiceBoxes[0].parentElement);
    }
});

async function fetchServicePageData() {
    try {
        const response = await fetch("http://localhost:3000/api/get-services");

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        // Store updated data in localStorage
        saveToStorage("ServicePageData", data);

        // Dispatch an event for UI updates
        document.dispatchEvent(new CustomEvent("ServicePageDataUpdated", { detail: data }));
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
    if (Array.isArray(data)) { // Ensure data is an array
        const serviceBoxes = document.querySelectorAll('.service-box');

        serviceBoxes.forEach((item, index) => {
            if (data[index]) {
                const image = item.querySelector('img');
                const title = item.querySelector('h2');
                const text = item.querySelector('p');

                if (image) {
                    console.log(data[index].image);
                    image.src = data[index].image || '../assets/images/placeholder.gif';
                    image.onerror = () => {
                        image.src = '../assets/images/placeholder.gif';
                    };
                }

                if (title) {
                    title.textContent = data[index].name || 'بدون عنوان';
                }

                if (text) {
                    text.textContent = data[index].long_description || 'بدون توضیحات';
                }
            }
        });
    }
}



// Listen for data update event
document.addEventListener("ServicePageDataUpdated", (event) => {
    updateContent(event.detail);
});