function expandDiv(clickedDiv) {
    let activeBox = document.querySelector(".servic-box.show");
    let activeParent = document.querySelector(".box.show");

    let serviceBox = clickedDiv.querySelector(".servic-box");
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
    const allServiceBoxes = document.querySelectorAll(".servic-box");

    if (allServiceBoxes.length > 0) {
        expandDiv(allServiceBoxes[0].parentElement);
    }
});