const server = {
    hero_image: {
        id: 0,
        image_url: "https://example.com/zero-image.jpg",
        caption: "Zero ID caption",
        title: "Zero ID title",
    },
    services: [{
            id: 1,
            icon: "web_icon.png",
            name: "Web Development",
            description: "Building modern, responsive websites.",
        },
        {
            id: 2,
            icon: "web_icon.png",
            name: "Web Development",
            description: "Building modern, responsive websites.",
        },
        {
            id: 3,
            icon: "web_icon.png",
            name: "Web Development",
            description: "Building modern, responsive websites.",
        },
        {
            id: 4,
            icon: "web_icon.png",
            name: "Web Development",
            description: "Building modern, responsive websites.",
        },
    ],
    about: {
        id: 0,
        title: "About Our Company",
        content: "We are a leading provider of innovative solutions...",
        link: "",
    },
    statistics: [
        { about_id: 0, title: "Customers", value: "10,000+" },
        { about_id: 0, title: "Countries", value: "25" },
        { about_id: 0, title: "Team members", value: "150" },
    ],
};

document.querySelectorAll("#nav-bar span").forEach((span, index) => {
    span.addEventListener("click", () => {
        const navIndex = document.getElementById("nav-index");
        const spanRect = span.getBoundingClientRect();
        const navBarRect = document
            .getElementById("nav-bar")
            .getBoundingClientRect();
        navIndex.style.right = `${navBarRect.right - spanRect.right}px`;
    });
    span.querySelector("a").addEventListener("click", (event) => {
        event.preventDefault();
        span.click();
    });
});

function loadServices() {
    server.services.forEach((service, index) => {
        const serviceElement = document.getElementById(`service${index + 1}`);
        if (serviceElement) {
            serviceElement.innerHTML = `
        <img  src="https://example.com/${service.icon}" alt="${service.name}">
        <h3 class=" font-[700] text-[20px]">${service.name}</h3>
        <p class=" font-[400] text-[16px] sec-color">${service.description}</p>
      `;
        }
    });
}

loadServices();

function expandDiv(clickedDiv) {
    // Find currently active box
    let activeBox = document.querySelector(".servic-box.show");

    // If the clicked box is already active, do nothing
    let serviceBox = clickedDiv.querySelector(".servic-box");
    if (activeBox === serviceBox) return;

    // Hide previously active service box
    if (activeBox) {
        activeBox.classList.remove("show");
        setTimeout(() => {
            activeBox.style.display = "none";
        }, 0); // Wait for the animation to complete
    }

    // Show clicked service box
    if (serviceBox) {
        serviceBox.style.display = "flex";
        setTimeout(() => {
            serviceBox.classList.add("show");
        }, 50); // Small delay to trigger transition
    }
}

// Initially display the first service box
document.addEventListener("DOMContentLoaded", () => {
    const allServiceBoxes = document.querySelectorAll(".servic-box");

    if (allServiceBoxes.length > 0) {
        expandDiv(allServiceBoxes[0].parentElement);
    }
});

function onClick() {
    window.location.href = "/index.html";
}