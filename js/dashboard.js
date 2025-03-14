// Toggle sidebar
// const sidebar = document.getElementById('sidebar');
// const toggleBtn = document.getElementById('toggle-sidebar');

// toggleBtn.addEventListener('click', () => {
//     sidebar.classList.toggle('collapsed');
// });

// Make menu items clickable
const menuItems = document.querySelectorAll('.menu-item');
const tabContents = document.querySelectorAll('.tab-content');

menuItems.forEach(item => {
    item.addEventListener('click', () => {
        const tab = item.getAttribute('data-tab');

        menuItems.forEach(i => i.classList.remove('active'));
        item.classList.add('active');

        tabContents.forEach(content => {
            content.classList.remove('active');
        });
        document.getElementById(tab).classList.add('active');
    });
});

function showSubTab(index) {
    const tabs = document.querySelectorAll('.sub-tab');
    const contents = document.querySelectorAll('.sub-tab-content');

    tabs.forEach((tab, i) => {
        tab.classList.toggle('active', i === index);
        contents[i].classList.toggle('active', i === index);
    });
}


async function logout() {
    try {
        const response = await fetch('http://localhost:3000/api/logout', {
            method: 'GET',
            credentials: 'include', // Include cookies
        });

        if (response.ok) {
            showSnackbar('با موفقیت خارج شدید!');
            setTimeout(() => {
                window.location.href = '/login'; // Redirect to login page
            }, 1000);
        } else {
            showSnackbar('خروج ناموفق بود. لطفاً دوباره امتحان کنید.');
        }
    } catch (error) {
        console.error('خطا در هنگام خروج:', error);
        showSnackbar('خطایی رخ داده است. لطفاً دوباره امتحان کنید.');
    }
}

// Call logout on button click
document.getElementById('log-out').addEventListener('click', function() {
    logout();
});

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
// Class for sidebar
class Sidebar extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
      <div class="sidebar-header">
            <div class="logo">
                <span class="logo-text">هیراد</span>
            </div>
        </div>
        <ul class="menu">
            <li class="menu-item active" data-tab="dashboard">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21.5 10.9V4.1C21.5 2.6 20.86 2 19.27 2H15.23C13.64 2 13 2.6 13 4.1V10.9C13 12.4 13.64 13 15.23 13H19.27C20.86 13 21.5 12.4 21.5 10.9Z" fill="#292D32"/>
                    <path d="M11 13.1V19.9C11 21.4 10.36 22 8.77 22H4.73C3.14 22 2.5 21.4 2.5 19.9V13.1C2.5 11.6 3.14 11 4.73 11H8.77C10.36 11 11 11.6 11 13.1Z" fill="#292D32"/>
                    <path opacity="0.4" d="M21.5 19.9V17.1C21.5 15.6 20.86 15 19.27 15H15.23C13.64 15 13 15.6 13 17.1V19.9C13 21.4 13.64 22 15.23 22H19.27C20.86 22 21.5 21.4 21.5 19.9Z" fill="#292D32"/>
                    <path opacity="0.4" d="M11 6.9V4.1C11 2.6 10.36 2 8.77 2H4.73C3.14 2 2.5 2.6 2.5 4.1V6.9C2.5 8.4 3.14 9 4.73 9H8.77C10.36 9 11 8.4 11 6.9Z" fill="#292D32"/>
                    </svg>
                <span class="menu-text">داشبورد</span>
            </li>
            <li class="menu-item" data-tab="products">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path opacity="0.4" d="M20.1004 6.93998C20.1004 7.47998 19.8104 7.96995 19.3504 8.21995L17.6104 9.15995L16.1304 9.94999L13.0604 11.61C12.7304 11.79 12.3704 11.88 12.0004 11.88C11.6304 11.88 11.2704 11.79 10.9404 11.61L4.65039 8.21995C4.19039 7.96995 3.90039 7.47998 3.90039 6.93998C3.90039 6.39998 4.19039 5.90995 4.65039 5.65995L6.62039 4.59996L8.1904 3.74998L10.9404 2.27C11.6004 1.91 12.4004 1.91 13.0604 2.27L19.3504 5.65995C19.8104 5.90995 20.1004 6.39998 20.1004 6.93998Z" fill="#292D32"/>
                    <path opacity="0.4" d="M9.9007 12.7899L4.05069 9.85989C3.60069 9.62989 3.0807 9.65989 2.6507 9.91989C2.2207 10.1799 1.9707 10.6399 1.9707 11.1399V16.6699C1.9707 17.6299 2.50069 18.4899 3.36069 18.9199L9.21069 21.8399C9.41069 21.9399 9.63071 21.9899 9.85071 21.9899C10.1107 21.9899 10.3707 21.9199 10.6007 21.7699C11.0307 21.5099 11.2807 21.0499 11.2807 20.5499V15.0199C11.2907 14.0799 10.7607 13.2199 9.9007 12.7899Z" fill="#292D32"/>
                    <path opacity="0.4" d="M22.0309 11.1502V16.6801C22.0309 17.6301 21.501 18.4901 20.641 18.9201L14.791 21.8501C14.591 21.9501 14.3709 22.0001 14.1509 22.0001C13.8909 22.0001 13.631 21.9302 13.391 21.7802C12.971 21.5202 12.7109 21.0601 12.7109 20.5601V15.0401C12.7109 14.0801 13.241 13.2201 14.101 12.7901L16.2509 11.7201L17.7509 10.9701L19.951 9.87013C20.401 9.64013 20.921 9.66012 21.351 9.93012C21.771 10.1901 22.0309 10.6502 22.0309 11.1502Z" fill="#292D32"/>
                    <path d="M17.6091 9.15997L16.1292 9.95001L6.61914 4.59998L8.18915 3.75L17.3691 8.92999C17.4691 8.98999 17.5491 9.06997 17.6091 9.15997Z" fill="#292D32"/>
                    <path d="M17.75 10.97V13.24C17.75 13.65 17.41 13.99 17 13.99C16.59 13.99 16.25 13.65 16.25 13.24V11.72L17.75 10.97Z" fill="#292D32"/>
                    </svg>
                <span class="menu-text">محصولات</span>
            </li>
            <li class="menu-item" data-tab="orders">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path opacity="0.4" d="M21.3709 11.3901V17.3801C21.3709 20.1401 19.1309 22.3801 16.3709 22.3801H7.63086C4.87086 22.3801 2.63086 20.1401 2.63086 17.3801V11.4601C3.39086 12.2801 4.47086 12.7501 5.64086 12.7501C6.90086 12.7501 8.11086 12.1201 8.87086 11.1101C9.55086 12.1201 10.7109 12.7501 12.0009 12.7501C13.2809 12.7501 14.4209 12.1501 15.1109 11.1501C15.8809 12.1401 17.0709 12.7501 18.3109 12.7501C19.5209 12.7501 20.6209 12.2601 21.3709 11.3901Z" fill="#292D32"/>
                    <path d="M14.9894 1.25H8.98936L8.24936 8.61C8.18936 9.29 8.28936 9.93 8.53936 10.51C9.11936 11.87 10.4794 12.75 11.9994 12.75C13.5394 12.75 14.8694 11.89 15.4694 10.52C15.6494 10.09 15.7594 9.59 15.7694 9.08V8.89L14.9894 1.25Z" fill="#292D32"/>
                    <path opacity="0.6" d="M22.3598 8.27L22.0698 5.5C21.6498 2.48 20.2798 1.25 17.3498 1.25H13.5098L14.2498 8.75C14.2598 8.85 14.2698 8.96 14.2698 9.15C14.3298 9.67 14.4898 10.15 14.7298 10.58C15.4498 11.9 16.8498 12.75 18.3098 12.75C19.6398 12.75 20.8398 12.16 21.5898 11.12C22.1898 10.32 22.4598 9.31 22.3598 8.27Z" fill="#292D32"/>
                    <path opacity="0.6" d="M6.58965 1.25C3.64965 1.25 2.28965 2.48 1.85965 5.53L1.58965 8.28C1.48965 9.35 1.77965 10.39 2.40965 11.2C3.16965 12.19 4.33965 12.75 5.63965 12.75C7.09965 12.75 8.49965 11.9 9.20965 10.6C9.46965 10.15 9.63965 9.63 9.68965 9.09L10.4697 1.26H6.58965V1.25Z" fill="#292D32"/>
                    <path d="M11.3491 16.66C10.0791 16.79 9.11914 17.87 9.11914 19.15V22.38H14.8691V19.5C14.8791 17.41 13.6491 16.42 11.3491 16.66Z" fill="#292D32"/>
                    </svg>
                <span class="menu-text">سفارشات</span>
            </li>
            <li class="menu-item" data-tab="customers">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path opacity="0.4" d="M9 2C6.38 2 4.25 4.13 4.25 6.75C4.25 9.32 6.26 11.4 8.88 11.49C8.96 11.48 9.04 11.48 9.1 11.49C9.12 11.49 9.13 11.49 9.15 11.49C9.16 11.49 9.16 11.49 9.17 11.49C11.73 11.4 13.74 9.32 13.75 6.75C13.75 4.13 11.62 2 9 2Z" fill="#292D32"/>
                    <path d="M14.0809 14.1499C11.2909 12.2899 6.74094 12.2899 3.93094 14.1499C2.66094 14.9999 1.96094 16.1499 1.96094 17.3799C1.96094 18.6099 2.66094 19.7499 3.92094 20.5899C5.32094 21.5299 7.16094 21.9999 9.00094 21.9999C10.8409 21.9999 12.6809 21.5299 14.0809 20.5899C15.3409 19.7399 16.0409 18.5999 16.0409 17.3599C16.0309 16.1299 15.3409 14.9899 14.0809 14.1499Z" fill="#292D32"/>
                    <path opacity="0.4" d="M19.9894 7.3401C20.1494 9.2801 18.7694 10.9801 16.8594 11.2101C16.8494 11.2101 16.8494 11.2101 16.8394 11.2101H16.8094C16.7494 11.2101 16.6894 11.2101 16.6394 11.2301C15.6694 11.2801 14.7794 10.9701 14.1094 10.4001C15.1394 9.4801 15.7294 8.1001 15.6094 6.6001C15.5394 5.7901 15.2594 5.0501 14.8394 4.4201C15.2194 4.2301 15.6594 4.1101 16.1094 4.0701C18.0694 3.9001 19.8194 5.3601 19.9894 7.3401Z" fill="#292D32"/>
                    <path d="M21.9902 16.5899C21.9102 17.5599 21.2902 18.3999 20.2502 18.9699C19.2502 19.5199 17.9902 19.7799 16.7402 19.7499C17.4602 19.0999 17.8802 18.2899 17.9602 17.4299C18.0602 16.1899 17.4702 14.9999 16.2902 14.0499C15.6202 13.5199 14.8402 13.0999 13.9902 12.7899C16.2002 12.1499 18.9802 12.5799 20.6902 13.9599C21.6102 14.6999 22.0802 15.6299 21.9902 16.5899Z" fill="#292D32"/>
                    </svg>
                <span class="menu-text">کاربران</span>
            </li>
            <li class="menu-item" data-tab="pages">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19.3697 4.89012L13.5097 2.28012C12.6497 1.90012 11.3497 1.90012 10.4897 2.28012L4.62969 4.89012C3.14969 5.55012 2.92969 6.45012 2.92969 6.93012C2.92969 7.41012 3.14969 8.31012 4.62969 8.97012L10.4897 11.5801C10.9197 11.7701 11.4597 11.8701 11.9997 11.8701C12.5397 11.8701 13.0797 11.7701 13.5097 11.5801L19.3697 8.97012C20.8497 8.31012 21.0697 7.41012 21.0697 6.93012C21.0697 6.45012 20.8597 5.55012 19.3697 4.89012Z" fill="#292D32"/>
                    <path opacity="0.4" d="M12.0003 17.04C11.6203 17.04 11.2403 16.96 10.8903 16.81L4.15031 13.81C3.12031 13.35 2.32031 12.12 2.32031 10.99C2.32031 10.58 2.65031 10.25 3.06031 10.25C3.47031 10.25 3.80031 10.58 3.80031 10.99C3.80031 11.53 4.25031 12.23 4.75031 12.45L11.4903 15.45C11.8103 15.59 12.1803 15.59 12.5003 15.45L19.2403 12.45C19.7403 12.23 20.1903 11.54 20.1903 10.99C20.1903 10.58 20.5203 10.25 20.9303 10.25C21.3403 10.25 21.6703 10.58 21.6703 10.99C21.6703 12.11 20.8703 13.35 19.8403 13.81L13.1003 16.81C12.7603 16.96 12.3803 17.04 12.0003 17.04Z" fill="#292D32"/>
                    <path opacity="0.4" d="M12.0003 22C11.6203 22 11.2403 21.92 10.8903 21.77L4.15031 18.77C3.04031 18.28 2.32031 17.17 2.32031 15.95C2.32031 15.54 2.65031 15.21 3.06031 15.21C3.47031 15.21 3.80031 15.54 3.80031 15.95C3.80031 16.58 4.17031 17.15 4.75031 17.41L11.4903 20.41C11.8103 20.55 12.1803 20.55 12.5003 20.41L19.2403 17.41C19.8103 17.16 20.1903 16.58 20.1903 15.95C20.1903 15.54 20.5203 15.21 20.9303 15.21C21.3403 15.21 21.6703 15.54 21.6703 15.95C21.6703 17.17 20.9503 18.27 19.8403 18.77L13.1003 21.77C12.7603 21.92 12.3803 22 12.0003 22Z" fill="#292D32"/>
                    </svg>
                <span class="menu-text">صفحات</span>
            </li>
            <li class="menu-item" data-tab="analytics">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path opacity="0.4" d="M16.19 2H7.81C4.17 2 2 4.17 2 7.81V16.18C2 19.83 4.17 22 7.81 22H16.18C19.82 22 21.99 19.83 21.99 16.19V7.81C22 4.17 19.83 2 16.19 2Z" fill="#292D32"/>
                    <path d="M6.88086 18.9001C6.47086 18.9001 6.13086 18.5601 6.13086 18.1501V16.0801C6.13086 15.6701 6.47086 15.3301 6.88086 15.3301C7.29086 15.3301 7.63086 15.6701 7.63086 16.0801V18.1501C7.63086 18.5701 7.29086 18.9001 6.88086 18.9001Z" fill="#292D32"/>
                    <path d="M12 18.9C11.59 18.9 11.25 18.56 11.25 18.15V14C11.25 13.59 11.59 13.25 12 13.25C12.41 13.25 12.75 13.59 12.75 14V18.15C12.75 18.57 12.41 18.9 12 18.9Z" fill="#292D32"/>
                    <path d="M17.1191 18.9002C16.7091 18.9002 16.3691 18.5602 16.3691 18.1502V11.9302C16.3691 11.5202 16.7091 11.1802 17.1191 11.1802C17.5291 11.1802 17.8691 11.5202 17.8691 11.9302V18.1502C17.8691 18.5702 17.5391 18.9002 17.1191 18.9002Z" fill="#292D32"/>
                    <path d="M17.871 5.8201C17.871 5.7701 17.851 5.7101 17.841 5.6601C17.831 5.6201 17.821 5.5701 17.811 5.5301C17.791 5.4901 17.761 5.4601 17.741 5.4201C17.711 5.3801 17.681 5.3301 17.641 5.3001C17.631 5.2901 17.631 5.2801 17.621 5.2801C17.591 5.2601 17.561 5.2501 17.531 5.2301C17.491 5.2001 17.441 5.1701 17.391 5.1501C17.341 5.1301 17.291 5.1301 17.241 5.1201C17.201 5.1101 17.171 5.1001 17.131 5.1001H14.201C13.791 5.1001 13.451 5.4401 13.451 5.8501C13.451 6.2601 13.791 6.6001 14.201 6.6001H15.451C13.071 9.1001 10.071 10.8601 6.70096 11.7101C6.30096 11.8101 6.05096 12.2201 6.15096 12.6201C6.23096 12.9601 6.54096 13.1901 6.88096 13.1901C6.94096 13.1901 7.00096 13.1801 7.06096 13.1701C10.631 12.2801 13.821 10.4301 16.371 7.8101V8.7801C16.371 9.1901 16.711 9.5301 17.121 9.5301C17.531 9.5301 17.871 9.1901 17.871 8.7801V5.8501C17.871 5.8401 17.871 5.8301 17.871 5.8201Z" fill="#292D32"/>
                    </svg>
                <span class="menu-text">آمار</span>
            </li>
            <li class="menu-item" data-tab="settings">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path opacity="0.4" d="M2 12.8799V11.1199C2 10.0799 2.85 9.21994 3.9 9.21994C5.71 9.21994 6.45 7.93994 5.54 6.36994C5.02 5.46994 5.33 4.29994 6.24 3.77994L7.97 2.78994C8.76 2.31994 9.78 2.59994 10.25 3.38994L10.36 3.57994C11.26 5.14994 12.74 5.14994 13.65 3.57994L13.76 3.38994C14.23 2.59994 15.25 2.31994 16.04 2.78994L17.77 3.77994C18.68 4.29994 18.99 5.46994 18.47 6.36994C17.56 7.93994 18.3 9.21994 20.11 9.21994C21.15 9.21994 22.01 10.0699 22.01 11.1199V12.8799C22.01 13.9199 21.16 14.7799 20.11 14.7799C18.3 14.7799 17.56 16.0599 18.47 17.6299C18.99 18.5399 18.68 19.6999 17.77 20.2199L16.04 21.2099C15.25 21.6799 14.23 21.3999 13.76 20.6099L13.65 20.4199C12.75 18.8499 11.27 18.8499 10.36 20.4199L10.25 20.6099C9.78 21.3999 8.76 21.6799 7.97 21.2099L6.24 20.2199C5.33 19.6999 5.02 18.5299 5.54 17.6299C6.45 16.0599 5.71 14.7799 3.9 14.7799C2.85 14.7799 2 13.9199 2 12.8799Z" fill="#292D32"/>
                    <path d="M12 15.25C13.7949 15.25 15.25 13.7949 15.25 12C15.25 10.2051 13.7949 8.75 12 8.75C10.2051 8.75 8.75 10.2051 8.75 12C8.75 13.7949 10.2051 15.25 12 15.25Z" fill="#292D32"/>
                    </svg>
                <span class="menu-text">تنظیمات</span>
            </li>
        </ul>
        `;
        this.initializeEvents();
    }

    initializeEvents() {
        const menuItems = this.querySelectorAll('.menu-item');
        menuItems.forEach(item => {
            item.addEventListener('click', function() {
                menuItems.forEach(menuItem => menuItem.classList.remove('active'));
                this.classList.add('active');

                const tabName = this.getAttribute('data-tab');
                const event = new CustomEvent('tabChanged', {
                    detail: { tab: tabName }
                });
                document.dispatchEvent(event);
            });
        });
    }
}

document.addEventListener('tabChanged', function(event) {
    const tabName = event.detail.tab;
    const content = document.querySelector('.content');
    const tabContents = document.querySelectorAll('.tab-content');
    const activeTab = document.getElementById(tabName);

    // Fade out the content parent
    content.classList.add('fading');

    // Hide all tab contents (no animation here, just display toggle)
    tabContents.forEach(content => {
        content.classList.remove('active');
    });

    // After fade-out, switch tabs and fade in
    content.addEventListener('transitionend', function handler() {
        // Show the selected tab content
        if (activeTab) {
            activeTab.classList.add('active');
        }

        // Fade the content parent back in
        content.classList.remove('fading');

        // Clean up the listener
        content.removeEventListener('transitionend', handler);
    }, { once: true });
});

// Helper function to dispatch the tabChanged event
function changeTab(tabName) {
    const event = new CustomEvent('tabChanged', { detail: { tab: tabName } });
    document.dispatchEvent(event);
}

// Register the custom element
customElements.define('hirad-sidebar', Sidebar);