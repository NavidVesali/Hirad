let tabData = [];
let currentTabIndex = 0;
let cachedData = new Map();


async function fetchProductCatData() {
    try {
        const response = await fetch("http://localhost:3000/api/product-list");
        if (!response.ok) throw new Error("Fetch failed");
        const data = await response.json();
        saveToStorage("ProductCatData", data);
        document.dispatchEvent(new CustomEvent("ProductCatDataUpdated", { detail: data }));
    } catch (error) {
        console.error("Error:", error);
    }
}

async function fetchProductListData(categorySlug = "") {
    const key = `ProductListData${categorySlug}`;
    if (cachedData.has(key)) {
        document.dispatchEvent(new CustomEvent("ProductListDataUpdated", {
            detail: { data: cachedData.get(key), categorySlug }
        }));
        return;
    }

    try {
        const apiUrl = categorySlug ?
            `http://localhost:3000/api/product-list/${encodeURIComponent(categorySlug)}` :
            "http://localhost:3000/api/product-list/default";

        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error("Fetch failed");
        const data = await response.json();

        cachedData.set(key, data);
        saveToStorage(key, data);

        document.dispatchEvent(new CustomEvent("ProductListDataUpdated", {
            detail: { data, categorySlug }
        }));
    } catch (error) {
        console.error("Error:", error);
    }
}

function saveToStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

function getFromStorage(key) {
    const storedData = localStorage.getItem(key);
    return storedData ? JSON.parse(storedData) : null;
}

function showDummyLoaders(count) {
    const container = document.getElementById('product-container');
    if (!container) return;

    container.innerHTML = '';

    for (let i = 0; i < count; i++) {
        const dummyCard = document.createElement('div');
        dummyCard.className = 'product-card dummy-loader';
        dummyCard.innerHTML = `
            <div class="loader-image"></div>
            <div class="product-content">
                <div class="loader-title"></div>
                <div class="loader-text"></div>
                <div class="loader-text"></div>
                <div class="loader-text"></div>
                <div class="loader-text"></div>
                <div class="loader-text"></div>
            </div>
            <div class="button-container">
                <div class="loader-button"></div>
                <div class="loader-button"></div>
            </div>
        `;
        container.appendChild(dummyCard);
    }
}

function updateContent(data) {
    tabData = data || [];
    changeTab(0);
}

function updateProductList(eventData) {
    const { data, categorySlug } = eventData || {};
    const currentSlug = tabData[currentTabIndex].slug || "";

    if (categorySlug === currentSlug && data && data.length) {
        const container = document.getElementById('product-container');
        if (!container) return;

        // Fade out dummy loaders
        const dummyCards = container.querySelectorAll('.dummy-loader');
        dummyCards.forEach(card => {
            card.classList.add('fade-out');
        });

        setTimeout(() => {
            container.innerHTML = ''; // Clear the container

            // Loop over the fetched product data
            data.forEach(product => {
                const productLink = `/product/${product.id}`;
                const card = document.createElement('div');
                card.className = 'product-card';
                card.style.opacity = '0'; // Start hidden for animation
                card.addEventListener('click', (event) => {
                    openProductPage(productLink, product.name);
                });
                const imgElement = document.createElement('img');
                imgElement.className = 'product-image';
                imgElement.alt = product.name;
                imgElement.src = product.image_url || '../assets/images/product-list/image.svg';

                imgElement.onerror = () => {
                    imgElement.src = '../assets/images/placeholder.gif';
                };

                // Create the content for the product card dynamically from the data
                card.innerHTML = `
                    <div class="product-content">
                        <h3 class="product-title">${product.name}</h3>
                        <p class="product-text">${product.description || 'No description available'}</p>
                    </div>
                    <div class="button-container">
                        <button class="s-button" style="width: 50%">
                            مشاوره
                            <img class="ml-1" src="../assets/images/services/call-outgoing.svg" alt="">
                        </button>
                        <button class="primary-button" style="width: 50%" onclick="openProductPage(productLink, product.name);">
                            اطلاعات بیشتر
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M14.9998 19.92L8.47984 13.4C7.70984 12.63 7.70984 11.37 8.47984 10.6L14.9998 4.07996" stroke="#D4D4D4" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </button>
                    </div>
                `;
                card.prepend(imgElement); // Prepend image to the card
                container.appendChild(card);

                // Fade in animation for the new product card
                setTimeout(() => {
                    card.style.transition = 'opacity 0.5s ease-in';
                    card.style.opacity = '1';
                }, 50);

                setTextDirection(card);
            });
        }, 300); // Match fade-out duration
    }
}

function openProductPage(link, name) {
    const url = new URL(link, window.location.origin);
    url.searchParams.set("title", name);
    window.location.href = url.toString();
}


function setTextDirection(element) {

    // Find child elements with classes 'product-title' and 'product-text'
    const productTitle = element.querySelector('.product-title');
    const productText = element.querySelector('.product-text');

    // Set the direction for each of them
    if (productTitle) {
        const isRTL = /[\u0600-\u06FF]/.test(productTitle);
        productTitle.style.direction = isRTL ? "rtl" : "ltr";
    }
    if (productText) {
        const isRTL = /[\u0600-\u06FF]/.test(productText);
        productText.style.direction = isRTL ? "rtl" : "ltr";
    }
}


document.addEventListener("ProductCatDataUpdated", (event) => {
    updateContent(event.detail);
});

document.addEventListener("ProductListDataUpdated", (event) => {
    updateProductList(event.detail);
});

document.addEventListener("DOMContentLoaded", async function() {
    const storedData = getFromStorage("ProductCatData");
    if (storedData && storedData.length) {
        tabData = storedData;

        // Get default slug (tab 0) product count
        const defaultSlug = tabData[0].slug || "";
        const storedProducts = getFromStorage(`ProductListData${defaultSlug}`);
        const productCount = storedProducts.length || 5; // Default to 5 if no data

        showDummyLoaders(productCount);
        changeTab(0);
    } else {
        fetchProductCatData();
        showDummyLoaders(5); // Show 5 dummy loaders while fetching
    }
});

function changeTab(index) {
    if (tabData[index]) {
        currentTabIndex = index;
        const selectedSlug = tabData[index]['slug'];
        fetchProductListData(selectedSlug);
        document.querySelectorAll('.tab-button').forEach((btn, i) => {
            btn.classList.toggle('active', i === index);
        });

        const title = document.getElementById("tab-title");
        const image = document.getElementById("tab-image");
        const description = document.getElementById("tab-description");
        const catButton = document.getElementById("cat-button");

        title.classList.remove("fade-in");
        image.classList.remove("fade-in");
        description.classList.remove("fade-in");
        catButton.classList.remove("fade-in");

        title.classList.add("fade-out");
        image.classList.add("fade-out");
        description.classList.add("fade-out");
        catButton.classList.add("fade-out");

        setTimeout(() => {
            title.innerText = tabData[index]['name'];
            image.className = 'tab-image';
            image.src = tabData[index]['image'];

            image.onerror = () => {
                image.src = '../assets/images/placeholder.gif';
            };
            description.innerText = tabData[index]['description'];

            const newCatButton = catButton.cloneNode(true);
            catButton.replaceWith(newCatButton);
            newCatButton.addEventListener("click", () => {
                window.location.href = `/products/${tabData[index]['slug']}`;
            });

            title.classList.remove("fade-out");
            image.classList.remove("fade-out");
            description.classList.remove("fade-out");
            newCatButton.classList.remove("fade-out");

            title.classList.add("fade-in");
            image.classList.add("fade-in");
            description.classList.add("fade-in");
            newCatButton.classList.add("fade-in");
        }, 300);
    }
}