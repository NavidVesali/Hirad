// auth.js
// Function to send login request
async function login(email, password, ipAddress, userAgent) {
    try {
        const response = await fetch('http://localhost:3000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password,
                ip_address: ipAddress,
                user_agent: userAgent
            })
        });

        if (response.ok) {
            showSnackbar('ورود با موفقیت انجام شد! در حال انتقال...');
            setTimeout(() => {
                window.location.href = '/dashboard';
            }, 1000);
        } else {
            const errorData = await response.json();
            showSnackbar(errorData.message || 'ورود ناموفق بود. لطفاً دوباره امتحان کنید.');
        }
    } catch (error) {
        console.error('خطا در هنگام ورود:', error);
        showSnackbar('خطایی رخ داده است. لطفاً اتصال خود را بررسی کرده و دوباره امتحان کنید.');
    }
}


// Bind form submission to login function
document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    const ipAddress = '192.168.1.100'; // You can dynamically set this if needed
    const userAgent = navigator.userAgent;

    if (email && password) {
        login(email, password, ipAddress, userAgent);
    } else {
        showSnackbar('لطفاً ایمیل و رمز عبور را وارد کنید.');
    }
});


// Check authentication before accessing the dashboard
// Check authentication before accessing the dashboard
async function checkAuth() {
    try {
        console.log("Checking authentication...");
        const response = await fetch('http://localhost:3000/api/protected/user-info', {
            credentials: 'include'
        });

        console.log("Response status:", response.status);

        if (response.status === 401) {
            console.warn("Unauthorized! Redirecting to login...");
            showSnackbar('برای دسترسی به داشبورد، لطفاً وارد شوید.');
            setTimeout(() => {
                window.location.href = '/login'; // Redirect to login page
            }, 1000);
        } else if (!response.ok) {
            console.error("Server error:", response.status);
            showSnackbar('خطایی رخ داده است. لطفاً دوباره امتحان کنید.');
        } else {
            console.log("User is authenticated.");
        }
    } catch (error) {
        console.error('خطا در بررسی احراز هویت:', error);
        showSnackbar('خطایی رخ داده است. لطفاً دوباره وارد شوید.');
        setTimeout(() => {
            window.location.href = '/login'; // Redirect to login page
        }, 1000);
    }
}


// Consolidated DOMContentLoaded handler
document.addEventListener('DOMContentLoaded', () => {
    // Call this when the dashboard loads
    console.log("Current path:", window.location.pathname); // Debugging
    if (window.location.pathname === '/dashboard') {
        console.log("Dashboard route detected. Checking authentication...");
        checkAuth();
    }
    // Password toggle handlers
    const toggleLoginPassword = document.getElementById('toggle-password-login');
    if (toggleLoginPassword) {
        toggleLoginPassword.addEventListener('click', function() {
            togglePasswordVisibility('login-password', this);
        });
    }

    const toggleRegisterPassword = document.getElementById('toggle-password-register');
    if (toggleRegisterPassword) {
        toggleRegisterPassword.addEventListener('click', function() {
            togglePasswordVisibility('register-password', this);
        });
    }

    // Form switching
    const showRegister = document.getElementById('show-register');
    const showLogin = document.getElementById('show-login');
    const registerFormContainer = document.getElementById('register-form');
    const loginFormContainer = document.getElementById('login-container');

    if (showRegister && showLogin && registerFormContainer && loginFormContainer) {
        loginFormContainer.classList.add('show');

        showRegister.addEventListener('click', (e) => {
            e.preventDefault();
            if (!registerFormContainer.classList.contains('show')) {
                loginFormContainer.classList.remove('show');
                setTimeout(() => {
                    registerFormContainer.classList.add('show');
                }, 100);
            }
        });

        showLogin.addEventListener('click', (e) => {
            e.preventDefault();
            if (!loginFormContainer.classList.contains('show')) {
                registerFormContainer.classList.remove('show');
                setTimeout(() => {
                    loginFormContainer.classList.add('show');
                }, 100);
            }
        });
    }
});

// Toggle password visibility
function togglePasswordVisibility(passwordFieldId, toggleButtonElement) {
    const passwordField = document.getElementById(passwordFieldId);
    if (passwordField) {
        const isPassword = passwordField.type === 'password';
        passwordField.type = isPassword ? 'text' : 'password';
        toggleButtonElement.className = isPassword ?
            'isax isax-eye-slash toggle-password' :
            'isax isax-eye toggle-password';
    }
}

// Utility function for showing notifications
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

window.showSnackbar = showSnackbar;