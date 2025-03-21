document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector(".form-container form");
    const submitButton = document.getElementById("send-contact-message");

    form.addEventListener("submit", async function(event) {
        event.preventDefault(); // Prevent default form submission

        // Collect form data
        const formData = {
            name: document.getElementById("name").value.trim() || null,
            department: document.getElementById("department").value.trim(),
            email: document.getElementById("email").value.trim(),
            phone: document.getElementById("phone").value.trim() || null,
            message: document.getElementById("message").value.trim(),
        };

        // Basic validation
        if (!formData.email || !formData.department || !formData.message) {
            showSnackbar("لطفاً تمام فیلدهای ضروری را پر کنید.");
            return;
        }

        // Disable button to prevent multiple clicks
        submitButton.disabled = true;
        submitButton.innerText = "در حال ارسال...";

        try {
            const response = await fetch("http://localhost:3000/api/send-message", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                showSnackbar("پیام شما با موفقیت ارسال شد.");
                form.reset(); // Clear the form
            } else {
                const errorData = await response.json();
                showSnackbar(errorData.error || "خطایی در ارسال پیام رخ داد.");
            }
        } catch (error) {
            showSnackbar("خطا در ارتباط با سرور. لطفاً دوباره تلاش کنید.");
            console.error("Error:", error);
        } finally {
            submitButton.disabled = false;
            submitButton.innerText = "ارسال پیام";
        }
    });
});

function showSnackbar(message) {
    const snackbar = document.getElementById('snackbar');
    if (snackbar) {
        snackbar.textContent = message;
        snackbar.className = 'show';
        setTimeout(() => {
            snackbar.className = snackbar.className.replace('show', '');
        }, 3000);
    } else {
        console.error('Snackbar element not found');
    }
}