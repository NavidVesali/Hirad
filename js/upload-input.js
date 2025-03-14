const dropArea = document.getElementById('drop-area');
const fileInput = document.getElementById('cat-image');
const fileInfo = document.getElementById('file-info');
const acceptedTypes = ['image/jpeg', 'image/png', 'image/jpg']; // Allowed MIME types
const maxFiles = 5; // Maximum number of files

// Trigger file input when the drop area is clicked
dropArea.addEventListener('click', () => {
    fileInput.click();
});

// Handle drag events to highlight the drop area
dropArea.addEventListener('dragover', (event) => {
    event.preventDefault();
    dropArea.style.borderColor = "#832339";
    dropArea.style.backgroundColor = 'rgba(255, 255, 255, 0.04)'; // Change color while dragging over
});

dropArea.addEventListener('dragleave', () => {
    dropArea.style.borderColor = "rgba(255, 255, 255, 0.08)";
    dropArea.style.backgroundColor = 'rgba(255, 255, 255, 0.03)'; // Reset color when drag leaves
});

// Handle file drop
dropArea.addEventListener('drop', (event) => {
    event.preventDefault();
    dropArea.style.borderColor = "rgba(255, 255, 255, 0.08)";
    dropArea.style.backgroundColor = '#rgba(255, 255, 255, 0.03)'; // Reset color after drop
    const files = event.dataTransfer.files;
    if (files.length > 0) {
        handleFiles(files);
    }
});

// Handle file selection from the file input
fileInput.addEventListener('change', () => {
    const files = fileInput.files;
    if (files.length > 0) {
        handleFiles(files);
    }
});

// Function to handle files, including validation and displaying info
function handleFiles(files) {
    if (files.length > maxFiles) {
        alert(`You can upload a maximum of ${maxFiles} files.`);
        return;
    }

    fileInfo.innerHTML = ''; // Clear previous file info
    let validFiles = [];
    let invalidFiles = [];
    // Loop through the files and check types
    Array.from(files).forEach(file => {
        if (acceptedTypes.includes(file.type)) {
            validFiles.push(file);
        } else {
            invalidFiles.push(file);
        }
    });

    // Show valid files
    validFiles.forEach(file => {
        showFileInfo(file);
    });

    // Handle invalid files
    if (invalidFiles.length > 0) {
        alert(`Some files were not accepted due to invalid file types: ${invalidFiles.map(f => f.name).join(', ')}`);
    }
}

// Function to display file info (name and icon)
function showFileInfo(file) {
    const fileName = file.name;
    const label = document.getElementById("file-upload-label");
    label.innerText = fileName;
}