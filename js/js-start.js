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

function toggleAccordion(element) {
    const parent = element.parentElement;

    // Close all items
    document.querySelectorAll(".accordion-item").forEach((item) => {
      if (item !== parent) {
        item.classList.remove("active");
      }
    });

    // Toggle current item
    parent.classList.toggle("active");
  }

  document.addEventListener("click", (e) => {
    if (!e.target.closest(".accordion-item")) {
      document.querySelectorAll(".accordion-item").forEach((item) => {
        item.classList.remove("active");
      });
    }
  });