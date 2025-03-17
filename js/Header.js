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
        onclick="window.location.href='/'"
        class="container-1"
        style="
          cursor: pointer;
          border-radius: 24px;
          width: 80px;
          height: 80px;
          display: flex;
          justify-content: center;
          align-items: center;
        "
        ><img src="/assets/images/Header/Logo1.svg" alt=""
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
         <a href="/" class="header-item" data-route="/">خانه</a>
          
          <a href="/services" class="header-item" data-route="/services">خدمات شرکت</a>

          <a href="/products" class="header-item" data-route="/products">محصولات</a>
          <a href="/about" class="header-item" data-route="/about">درباره ما</a>

          <a href="/contact" class="header-item" data-route="/contact">تماس با ما</a>
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
          src="/assets/images/Header/search-normal.svg"
          class="header-search"
          alt="search" />
      </div>
    </header>
    `;
        this.initializeEvents();
        this.checkCurrentRoute();
    }
    initializeEvents() {
        const headerItems = this.querySelectorAll('.header-item');
        const navIndex = this.querySelector("#nav-index");

        headerItems.forEach((item) => {
            item.addEventListener('click', function() {
                headerItems.forEach((headerItem) =>
                    headerItem.classList.remove('active')
                );
                this.classList.add('active');
                moveNavIndex(this);
            });

            item.addEventListener('mouseenter', function() {
                moveNavIndex(this);
            });

            item.addEventListener('mouseleave', () => {
                const activeItem = this.querySelector('.header-item.active');
                if (activeItem) {
                    moveNavIndex(activeItem);
                }
            });
        });

        function moveNavIndex(target) {
            const itemRect = target.getBoundingClientRect();
            const navBarRect = document.getElementById("nav-bar").getBoundingClientRect();
            navIndex.style.right = `${navBarRect.right - itemRect.right + ((itemRect.width - 70)/2)}px`;
            navIndex.style.width = `${itemRect.width}px`;
        }
    }

    checkCurrentRoute() {
        const currentPath = window.location.pathname;
        const headerItems = this.querySelectorAll('.header-item');
        let activeItem = null;

        headerItems.forEach((item) => {
            const itemRoute = item.getAttribute('data-route');
            if (itemRoute && currentPath.includes(itemRoute.substring(1))) {
                activeItem = item;
            }
            if (itemRoute === '/' && (currentPath === '/' || currentPath.endsWith('/index.html'))) {
                activeItem = item;
            }
        });

        if (activeItem) {
            headerItems.forEach((headerItem) => headerItem.classList.remove('active'));
            activeItem.classList.add('active');
            this.moveNavIndex(activeItem);
        }
    }

    moveNavIndex(target) {
        const navIndex = this.querySelector("#nav-index");
        const itemRect = target.getBoundingClientRect();
        const navBarRect = this.querySelector("#nav-bar").getBoundingClientRect();
        navIndex.style.right = `${navBarRect.right - itemRect.right + ((itemRect.width - 70)/2)}px`;
        navIndex.style.width = `${itemRect.width}px`;
    }
}

window.addEventListener('load', () => {
    const header = document.querySelector('hirad-header');
    if (header) {
        header.checkCurrentRoute();
    }
});

customElements.define('hirad-header', Header);