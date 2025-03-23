window.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const title = params.get("title");
    if (title) {
        document.title = title;
    }
    parseMarkdownSections();
});

// Get the product ID from the URL query parameter
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

// Function to parse markdown lists
function parseMarkdownLists(markdown) {
    if (!markdown) return [];

    // Split by new lines and filter out empty lines
    const lines = markdown.split('\n').filter(line => line.trim() !== '');

    // Extract list items (lines starting with - or *)
    return lines
        .filter(line => line.trim().startsWith('-') || line.trim().startsWith('*'))
        .map(line => line.replace(/^[\s-*]+/, '').trim());
}

// Function to parse markdown sections with headings
function parseMarkdownSections(markdown) {
    if (!markdown) return {};

    const sections = {};
    let currentSection = null;

    const lines = markdown.split('\n');

    lines.forEach(line => {
        // Check if line is a heading (starts with ###)
        if (line.startsWith('###')) {
            currentSection = line.replace('###', '').trim();
            sections[currentSection] = [];
        }
        // If we have a current section and line has content, add to that section
        else if (currentSection && line.trim()) {
            sections[currentSection].push(line.trim());
        }
    });

    return sections;
}

// Function to create a specification section
function createSpecSection(title, content) {
    // Create container for specification section
    const specContainer = document.createElement('div');

    // Create header with title
    const headerDiv = document.createElement('div');
    headerDiv.style.display = 'flex';
    headerDiv.style.alignItems = 'center';
    headerDiv.style.gap = '8px';

    const titleSpan = document.createElement('span');
    titleSpan.style.whiteSpace = 'nowrap';
    titleSpan.textContent = title;

    const dividerDiv = document.createElement('div');
    dividerDiv.style.width = '100%';
    dividerDiv.style.height = '1px';
    dividerDiv.style.backgroundColor = 'rgba(255,255,255,0.1)';

    headerDiv.appendChild(titleSpan);
    headerDiv.appendChild(dividerDiv);

    specContainer.appendChild(headerDiv);

    // Check if content contains list items
    const containsList = content.some(item => item.trim().startsWith('-'));

    if (containsList) {
        // Create a list for content
        const contentList = document.createElement('ul');
        contentList.style.listStyleType = 'disc';
        contentList.style.listStylePosition = 'inside';
        contentList.style.padding = '5px';
        contentList.style.direction = 'ltr';

        content.forEach(item => {
            if (item.trim().startsWith('-')) {
                const li = document.createElement('li');
                li.textContent = item.substring(1).trim();
                contentList.appendChild(li);
            }
        });

        specContainer.appendChild(contentList);
    } else {
        // Create a simple span for non-list content
        const contentSpan = document.createElement('span');
        contentSpan.textContent = content.join(' ').trim();
        specContainer.appendChild(contentSpan);
    }

    return specContainer;
}

// Function to fetch product data and populate the HTML
async function fetchProductData() {
    try {
        if (!productId) {
            console.error('No product ID provided in URL');
            return;
        }

        const response = await fetch(`http://localhost:3000/api/product/${productId}`);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const product = await response.json();

        // Update product details in the HTML
        document.getElementById('product-name-breadcrumb').textContent = product.name;
        document.getElementById('product-name').textContent = product.name;
        const image = document.getElementById('product-image');
        image.src = product.image_url;
        image.onerror = () => {
            image.src = '../assets/images/placeholder.gif';
        };

        // Set catalog link
        if (product.catalog_link) {
            document.getElementById('catalog-link').href = product.catalog_link;
        }

        // Find the product details container
        const productDetailsContainer = document.getElementById('specs');

        // Remove the template spec-title section
        const templateSpec = productDetailsContainer.querySelector('.spec-title');
        if (templateSpec) {
            templateSpec.remove();
        }

        // Get the button div that should remain at the bottom
        const buttonDiv = productDetailsContainer.querySelector('div[class^="button-container"]');

        // Handle technical specs dynamically
        if (product.technical_specs) {
            const techSpecs = parseMarkdownSections(product.technical_specs);

            // For each section in the technical specs
            Object.entries(techSpecs).forEach(([title, content]) => {
                const specSection = createSpecSection(title, content);

                // Add margin to create spacing between sections
                specSection.style.marginBottom = '12px';

                // Insert each new section before the button div
                productDetailsContainer.insertBefore(specSection, buttonDiv);
            });
        }

        // Handle description
        if (product.description) {
            const descItems = parseMarkdownLists(product.description);
            const DescList = document.getElementById('desc');
            DescList.innerHTML = '';

            descItems.forEach(item => {
                const li = document.createElement('li');
                li.textContent = item;
                DescList.appendChild(li);
            });

            // Add the extra desc as a separate item if it exists
            if (product.extra_desc) {
                const extraDec = document.getElementById('extra-desc');

                // Check if the text contains ### markdown
                if (product.extra_desc.includes('###')) {
                    // Split the text by ### markers and filter out empty strings
                    const sections = product.extra_desc.split('###').filter(section => section.trim() !== '');

                    // Process each section with markdown
                    const htmlContent = sections.map(section => {
                        // Trim whitespace and split into lines
                        const lines = section.trim().split('\n');
                        // First line becomes h4, rest become paragraphs
                        let result = `<h4>${lines[0]}</h4>`;
                        if (lines.length > 1) {
                            result += lines.slice(1)
                                .filter(line => line.trim() !== '')
                                .map(line => `<p>${line}</p>`)
                                .join('');
                        }
                        return result;
                    }).join('');

                    extraDec.innerHTML = htmlContent;
                } else {
                    // If no markdown, wrap the entire text in a single paragraph
                    extraDec.innerHTML = `<p>${product.extra_desc.trim()}</p>`;
                }
            }
        }

    } catch (error) {
        console.error('Error fetching product data:', error);
    }
}

// Call the function when the page loads
document.addEventListener('DOMContentLoaded', fetchProductData);