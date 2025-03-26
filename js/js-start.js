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

// ==================================================

