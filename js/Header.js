class Header extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
     <header
      style="
        background-image: linear-gradient(to bottom, #141414 40%, transparent);
        display: flex;
        justify-content: space-between;
        align-items: center;
        top: 0;
        position: sticky;
        z-index: 50;
        width: 100vw;
        padding: 30px 100px 0 100px;
      ">
      <span
        class="container-1"
        style="
          border-radius: 24px;
          width: 80px;
          height: 80px;
          display: flex;
          justify-content: center;
          align-items: center;
        "
        ><img src="../assets/images/Header/Logo1.svg" alt=""
      /></span>
      <div
        style="
          width: 60%;
          height: 59px;
          background-color: transparent;
          z-index: -1;
          position: relative;
        ">
        <section
          id="nav-bar"
          class="container-1"
          style="
            width: 100%;
            height: 59px;
            display: flex;
            justify-content: space-around;
            align-items: center;
            text-align: center;
            font-size: 1rem;
            font-weight: 300;
            border-radius: 24px;
          ">
         <a href="" class="header-item" data-route="/">خانه</a>
          
          <a href="../pages/services.html" class="header-item" data-route="/services">خدمات شرکت</a>

          <a href="" class="header-item" data-route="/products">محصولات</a>
          <a href="../pages/about.html" class="header-item" data-route="/about">درباره ما</a>

          <a href="" class="header-item" data-route="/contact">تماس با ما</a>
        </section>
        <div id="nav-index" class="nav-index"></div>
      </div>

      <div
        style="
          display: flex;
          justify-content: start;
          align-items: center;
          gap: 1rem;
        ">
        <img
          src="../assets/images/Header/search-normal.svg"
          class="header-search"
          alt="search" />
      </div>
    </header>
    `;
    this.initializeEvents();
    this.checkCurrentRoute(); 
  }

  initializeEvents() {
    const headeritems = this.querySelectorAll('.header-item');
    headeritems.forEach((item) => {
      item.addEventListener('click', function () {
        headeritems.forEach((headeritem) =>
          headeritem.classList.remove('active')
        );
        this.classList.add('active');

        const navIndex = document.getElementById("nav-index");
        const itemRect = this.getBoundingClientRect();
        const navBarRect = document.getElementById("nav-bar").getBoundingClientRect();
        navIndex.style.right = `${navBarRect.right - itemRect.right}px`;
        navIndex.style.width = `${itemRect.width}px`;
      });
    });
  }

  checkCurrentRoute() {
    // Get the current path and filename
    const currentPath = window.location.pathname;
    const currentFile = currentPath.split('/').pop();
    
    const headerItems = this.querySelectorAll('.header-item');
    let activeItem = null;
    
    // First try to match by exact path
    headerItems.forEach((item) => {
      const itemHref = item.getAttribute('href');
      if (itemHref && (itemHref === currentPath || itemHref.endsWith(currentPath))) {
        activeItem = item;
      }
    });
    
    // If no match by href, try to match by filename (for relative paths)
    if (!activeItem && currentFile) {
      headerItems.forEach((item) => {
        const itemHref = item.getAttribute('href');
        if (itemHref && itemHref.includes(currentFile)) {
          activeItem = item;
        }
      });
    }
    
    // If still no match, try to match by data-route
    if (!activeItem) {
      headerItems.forEach((item) => {
        const itemRoute = item.getAttribute('data-route');
        
        // Check if the current path includes the route path
        if (itemRoute && currentPath.includes(itemRoute.substring(1))) {
          activeItem = item;
        }
        
        // Special case for home page
        if (itemRoute === '/' && (currentPath === '/' || currentPath.endsWith('/index.html'))) {
          activeItem = item;
        }
      });
    }
    
    // If we found an active item, update it
    if (activeItem) {
      headerItems.forEach((headerItem) => headerItem.classList.remove('active'));
      activeItem.classList.add('active');
      
      // Position the nav-index
      const navIndex = document.getElementById("nav-index");
      const itemRect = activeItem.getBoundingClientRect();
      const navBarRect = document.getElementById("nav-bar").getBoundingClientRect();
      navIndex.style.right = `${navBarRect.right - itemRect.right}px`;
      navIndex.style.width = `${itemRect.width}px`;
    } else if (headerItems.length > 0) {
      // Default to first item if no match found
      headerItems[0].classList.add('active');
      
      const navIndex = document.getElementById("nav-index");
      const itemRect = headerItems[0].getBoundingClientRect();
      const navBarRect = document.getElementById("nav-bar").getBoundingClientRect();
      navIndex.style.right = `${navBarRect.right - itemRect.right}px`;
      navIndex.style.width = `${itemRect.width}px`;
    }
  }
}

// Add event listener for page load
window.addEventListener('load', () => {
  // Make sure to re-check the route when everything is loaded
  const header = document.querySelector('hirad-header');
  if (header) {
    header.checkCurrentRoute();
  }
});

customElements.define('hirad-header', Header);