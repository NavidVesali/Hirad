async function postCategory(name, description, slug, image) {
    try {
        console.info(JSON.stringify({
            name: name,
            description: description,
            slug: slug,
            image: image
        }));
        const response = await fetch("http://localhost:3000/protected/api/product-category", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                description: description,
                slug: slug,
                image: image
            })
        });

        if (response.ok) {
            showSnackbar('دسته بندی با موفقیت ثبت شد');
            setTimeout(() => {
                clearCatForm();
                UpdateCatTable();
            }, 1000);
        } else {
            const errorData = await response.json();
            showSnackbar(errorData.message || 'ثبت ناموفق بود. لطفاً دوباره امتحان کنید.');
        }
    } catch (error) {
        console.error('خطا در هنگام ثبت دسته بندی:', error);
        showSnackbar('خطایی رخ داده است. لطفاً اتصال خود را بررسی کرده و دوباره امتحان کنید.');
    }

}


// Bind form submission to cat function
let selectedFileName = ""; // Store the file name globally

// Handle file selection
const imageInput = document.getElementById('cat-image');
imageInput.addEventListener('change', () => {
    const file = imageInput.files[0];

    if (file) {
        selectedFileName = file.name;
    }
});

// Function to upload the file and return the filename
async function uploadImage(file) {
    if (!file) {
        return null;
    }
    console.log(file);
    const formData = new FormData();
    formData.append('file', file);

    try {
        const response = await fetch('http://localhost:3000/upload', {
            method: 'POST',
            body: formData
        });
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Upload failed: ${response.status} ${errorText}`);
        }

        // Return the filename for use in postCategory
        return file.name;
    } catch (error) {
        console.error('Error uploading image:', error);
        showSnackbar('خطا در آپلود تصویر. لطفاً دوباره امتحان کنید.');
        throw error;
    }
}

// Update your form submission event listener
document.getElementById('cat-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const name = document.getElementById('cat-name').value;
    const description = document.getElementById('cat-dec').value;
    const slug = makeSlug(name);
    const imageFile = document.getElementById('cat-image').files[0];

    if (!name) {
        showSnackbar('نام محصول اجباری می‌باشد.');
        return;
    }

    try {
        // First upload the image if one is selected
        let imageName = null;
        if (imageFile) {
            imageName = await uploadImage(imageFile);
        }

        // Then post the category with the image filename
        await postCategory(name, description, slug, imageName || selectedFileName);
    } catch (error) {
        console.error('Error in form submission:', error);
        // Error handling is already in the individual functions
    }
});



function makeSlug(name) {
    return name
        .trim()
        .replace(/\s+/g, "-")
        .replace(/[^\w\u0600-\u06FF-]/g, "")
        .toLowerCase();
}