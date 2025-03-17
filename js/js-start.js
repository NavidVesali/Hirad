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