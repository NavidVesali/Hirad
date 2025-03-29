let tabData = [];
let currentTabIndex = 0;
let cachedData = new Map();

// Parse markdown sections with headings
function parseMarkdownSections(markdown) {
    if (!markdown) return {};
    const sections = {};
    let currentSection = null;

    markdown.split('\n').forEach(line => {
        if (line.startsWith('###')) {
            currentSection = line.replace('###', '').trim();
            sections[currentSection] = [];
        } else if (currentSection && line.trim()) {
            sections[currentSection].push(line.trim());
        }
    });
    return sections;
}

// Fetch product categories and navigate
async function fetchProductCatData() {
    try {
        const response = await fetch("http://localhost:3000/api/product-list");
        if (!response.ok) throw new Error("Fetch failed");
        const data = await response.json();

        tabData = data;
        document.dispatchEvent(new CustomEvent("ProductCatDataUpdated", { detail: data }));
        navigateToSlugTab();
    } catch (error) {
        console.error("Error fetching product categories:", error);
        window.location.href = "/not-found"; // Redirect on fetch error
    }
}

// Get slug from URL path
function getSlugFromUrl() {
    const pathParts = window.location.pathname.split('/').filter(part => part);
    const slug = pathParts.length > 1 ? decodeURIComponent(pathParts[1]) : null;
    return slug === "default" ? "default" : slug; // Handle "default" explicitly
}

// Handle tab navigation based on slug
function navigateToSlugTab() {
    const slugFromUrl = getSlugFromUrl();

    if (!tabData.length) return; // Wait for data if not loaded yet

    if (slugFromUrl === "default") {
        // If path is "/products/default", use tab(0) and ensure API call uses "default"
        changeTab(0);
    } else if (slugFromUrl) {
        const tabIndex = tabData.findIndex(tab => tab.slug === slugFromUrl);
        if (tabIndex !== -1) {
            changeTab(tabIndex); // Go directly to matching tab
        } else {
            window.location.href = "/not-found"; // Redirect if slug not found
        }
    } else {
        window.location.href = "/not-found"; // Redirect if no slug
    }
}

// Show dummy loaders
function showDummyLoaders(count) {
    const container = document.getElementById('product-container');
    if (!container) return;

    container.innerHTML = '';
    for (let i = 0; i < count; i++) {
        container.innerHTML += `
            <div class="product-card dummy-loader">
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
            </div>
        `;
    }
}

function updateContent(data) {
    tabData = data || [];
}

function openProductPage(link, name, id) {
    const url = new URL(link, window.location.origin);
    url.searchParams.set("title", name);
    url.searchParams.set("id", id);
    window.location.href = url.toString();
}

function setTextDirection(element) {
    const productTitle = element.querySelector('.product-title');
    const productTextElements = element.querySelectorAll('p');

    if (productTitle) {
        productTitle.style.direction = /[\u0600-\u06FF]/.test(productTitle.textContent) ? "rtl" : "ltr";
    }
    productTextElements.forEach(p => {
        p.style.direction = /[\u0600-\u06FF]/.test(p.textContent) ? "rtl" : "ltr";
    });
}

document.addEventListener("ProductCatDataUpdated", () => navigateToSlugTab());

document.addEventListener("ProductListDataUpdated", (event) => updateProductList(event.detail));

async function fetchProductListData(categorySlug = "") {
    const key = `ProductListData${categorySlug}`;
    if (cachedData.has(key)) {
        document.dispatchEvent(new CustomEvent("ProductListDataUpdated", { detail: { data: cachedData.get(key), categorySlug } }));
        return;
    }

    try {
        const apiUrl = `http://localhost:3000/api/product-list/${encodeURIComponent(categorySlug)}`;
        const response = await fetch(apiUrl);
        if (!response.ok) {
            window.location.href = "/not-found";
            throw new Error("Fetch failed");
        }
        const data = await response.json();

        cachedData.set(key, data);
        document.dispatchEvent(new CustomEvent("ProductListDataUpdated", { detail: { data, categorySlug } }));
    } catch (error) {
        console.error("Error fetching product list:", error);
        document.dispatchEvent(new CustomEvent("ProductListDataUpdated", { detail: { data: [], categorySlug } }));
    }
}

function updateProductList({ data, categorySlug }) {
    const currentSlug = tabData[currentTabIndex].slug || "";
    const container = document.getElementById('product-container');
    if (!container || categorySlug !== currentSlug) return;

    container.querySelectorAll('.dummy-loader, .product-card').forEach(item => item.classList.add('fade-out'));

    setTimeout(() => {
        container.innerHTML = '';

        if (data.length) {
            data.forEach(product => {
                const productLink = `/product/${product.id}`;
                const card = document.createElement('div');
                card.className = 'product-card';
                card.style.opacity = '0';
                card.addEventListener('click', () => openProductPage(productLink, product.name, product.id));

                card.innerHTML = `
                    <img class="product-image" alt="${product.name}" src="${product.image_url || '../assets/images/product-list/image.svg'}">
                    <div class="product-content">
                        <h3 class="product-title">${product.name}</h3>
                        <div class="technical-specs-container"></div>
                    </div>
                    <div class="button-container">
                        <button class="s-button" style="width: 50%">
                            مشاوره
                            <img class="ml-1" src="../assets/images/services/call-outgoing.svg" alt="">
                        </button>
                        <button class="primary-button" style="width: 50%" onclick="openProductPage('${productLink}', '${product.name}', ${product.id});">
                            اطلاعات بیشتر
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M14.9998 19.92L8.47984 13.4C7.70984 12.63 7.70984 11.37 8.47984 10.6L14.9998 4.07996" stroke="#D4D4D4" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </button>
                    </div>
                `;

                const imgElement = card.querySelector('.product-image');
                imgElement.onerror = () => imgElement.src = '../assets/images/placeholder.gif';

                if (product.technical_specs) {
                    const techSpecsContainer = card.querySelector('.technical-specs-container');
                    Object.entries(parseMarkdownSections(product.technical_specs)).forEach(([title, content]) => {
                        techSpecsContainer.innerHTML += `
                            <div style="margin-bottom: 12px;">
                                <div class="spec-title" style="display: flex; align-items: center; gap: 8px;">
                                    <span class="markdown">${title}</span>
                                    <div style="width: 100%; height: 1px; background-color: rgba(255,255,255,0.1);"></div>
                                </div>
                                <p class="spec-content">${content}</p>
                            </div>
                        `;
                    });
                } else {
                    card.querySelector('.technical-specs-container').innerHTML = '<p>No specifications available</p>';
                }

                container.appendChild(card);
                setTimeout(() => {
                    card.style.transition = 'opacity 0.5s ease-in';
                    card.style.opacity = '1';
                }, 50);
                setTextDirection(card);
            });
        } else {
            container.innerHTML = `
                <div class="empty-state" style="width: 100%; padding: 40px 20px; animation: fadeIn 0.5s ease-in;">
                    <img src="../assets/images/about-2/box.svg" alt="No products" style="width: 80px; height: 80px; margin-bottom: 16px; opacity: 0.7;">
                    <h3 style="margin-bottom: 8px;">محصولی یافت نشد</h3>
                    <p style="color: rgba(255,255,255,0.7);">در این دسته‌بندی محصولی وجود ندارد</p>
                </div>
            `;
        }
    }, 300);
}

document.addEventListener("DOMContentLoaded", () => {
    showDummyLoaders(3);
    fetchProductCatData();

    const styleEl = document.createElement('style');
    styleEl.textContent = `
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .empty-state { animation: fadeIn 0.5s ease-in; }
        .empty-state img { animation: float 3s ease-in-out infinite; }
        @keyframes float { 0% { transform: translateY(0); } 50% { transform: translateY(-10px); } 100% { transform: translateY(0); } }
    `;
    document.head.appendChild(styleEl);
});

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

    currentTabIndex = index;
    const selectedSlug = tabData[index].slug;
    fetchProductListData(selectedSlug);

    document.querySelectorAll('.tab-button').forEach((btn, i) => btn.classList.toggle('active', i === index));

    const [title, image, description] = ['tab-title', 'tab-image', 'tab-description'].map(id => document.getElementById(id));
    [title, image, description].forEach(el => el.classList.add("fade-out"));

    setTimeout(() => {
        title.innerText = tabData[index].name;
        image.className = 'tab-image';
        image.src = tabData[index].image;
        image.onerror = () => image.src = '../assets/images/placeholder.gif';
        description.innerText = tabData[index].description;

        [title, image, description].forEach(el => {
            el.classList.remove("fade-out");
            el.classList.add("fade-in");
        });
    }, 300);
}