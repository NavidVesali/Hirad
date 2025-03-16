class Footer extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
     <section id="footer" class="s-button2 w-full flex justify-between items-center mb-5">
    <div class="mr-12">
        <img src="/assets/images/footer/hirad-Logo 1.png" alt="" />
    </div>

    <div class="grid grid-cols-3 grid-rows-3 gap-8">
        <div class="flex justify-start items-center gap-1">
            <img src="/assets/images/footer/arrow-left.svg" alt="" />
            <p>خانه</p>
        </div>
        <div class="flex justify-start items-center gap-1">
            <img src="/assets/images/footer/arrow-left.svg" alt="" />
            <p>استانداردها</p>
        </div>
        <div class="flex justify-start items-center gap-1">
            <img src="/assets/images/footer/arrow-left.svg" alt="" />
            <p>تماس با ما</p>
        </div>
        <div class="flex justify-start items-center gap-1">
            <img src="/assets/images/footer/arrow-left.svg" alt="" />
            <p>خدمات شرکت</p>
        </div>
        <div class="flex justify-start items-center gap-1">
            <img src="/assets/images/footer/arrow-left.svg" alt="" />
            <p>درباره ما</p>
        </div>
        <div class="flex justify-start items-cente gap-1r">
            <img src="/assets/images/footer/arrow-left.svg" alt="" />
            <p>محصولات</p>
        </div>
        <div class="flex justify-start items-center gap-1">
            <img src="/assets/images/footer/arrow-left.svg" alt="" />
            <p>بلاگ</p>
        </div>
    </div>

    <div class="flex flex-col flex-nowrap w-[546px] h-[200px] gap-8 mb-2.5">
        <div class="flex justify-start items-center gap-1.5">
            <img src="/assets/images/footer/location.svg" alt="" />
            <p>
                تــهـران، خـیــابــان ستـارخــان خـیابان نیایش کوچـه موثق نـــژاد پـلـاک 1 واحــد یک
            </p>
        </div>
        <div class="flex justify-start items-center gap-1.5">
            <img src="/assets/images/footer/call-calling.svg" alt="" />
            <p>66420839 (21) 98+ - 66429816(21) 98+</p>
        </div>
        <div class="flex justify-start items-center gap-1.5">
            <img src="/assets/images/footer/whatsapp.svg" alt="" />
            <p>09352557163 / 0912-9333608</p>
        </div>
        <div class="flex justify-start items-center gap-1.5">
            <img src="/assets/images/footer/sms.svg" alt="" />
            <p>info@Hiradepc.ir / Hiradepc@gmail.com</p>
        </div>
    </div>
</section>
<p style="text-align:center;margin-bottom:20px;">
    تمامی حقوق این وب سایت متعلق به شرکت تجهیز فرآیند هیراد می‌باشد.   ۱۴۰۳ – ۱۳۹۴
</p>
      `;
    //   this.initializeEvents();
    //   this.checkCurrentRoute();
  }

  // initializeEvents() {
  //   const headeritems = this.querySelectorAll('.header-item');
  //   headeritems.forEach((item) => {
  //     item.addEventListener('click', function () {
  //       headeritems.forEach((headeritem) =>
  //         headeritem.classList.remove('active')
  //       );
  //       this.classList.add('active');

  //       const navIndex = document.getElementById("nav-index");
  //       const itemRect = this.getBoundingClientRect();
  //       const navBarRect = document.getElementById("nav-bar").getBoundingClientRect();
  //       navIndex.style.right = `${navBarRect.right - itemRect.right}px`;
  //       navIndex.style.width = `${itemRect.width}px`;
  //     });
  //   });
  // }

  //     checkCurrentRoute() {
  //       // Get the current path and filename
  //       const currentPath = window.location.pathname;
  //       const currentFile = currentPath.split('/').pop();

  //       const headerItems = this.querySelectorAll('.header-item');
  //       let activeItem = null;

  //       // First try to match by exact path
  //       headerItems.forEach((item) => {
  //         const itemHref = item.getAttribute('href');
  //         if (itemHref && (itemHref === currentPath || itemHref.endsWith(currentPath))) {
  //           activeItem = item;
  //         }
  //       });

  //       // If no match by href, try to match by filename (for relative paths)
  //       if (!activeItem && currentFile) {
  //         headerItems.forEach((item) => {
  //           const itemHref = item.getAttribute('href');
  //           if (itemHref && itemHref.includes(currentFile)) {
  //             activeItem = item;
  //           }
  //         });
  //       }

  //       // If still no match, try to match by data-route
  //       if (!activeItem) {
  //         headerItems.forEach((item) => {
  //           const itemRoute = item.getAttribute('data-route');

  //           // Check if the current path includes the route path
  //           if (itemRoute && currentPath.includes(itemRoute.substring(1))) {
  //             activeItem = item;
  //           }

  //           // Special case for home page
  //           if (itemRoute === '/' && (currentPath === '/' || currentPath.endsWith('/index.html'))) {
  //             activeItem = item;
  //           }
  //         });
  //       }

  //       // If we found an active item, update it
  //       if (activeItem) {
  //         headerItems.forEach((headerItem) => headerItem.classList.remove('active'));
  //         activeItem.classList.add('active');

  //         // Position the nav-index
  //         const navIndex = document.getElementById("nav-index");
  //         const itemRect = activeItem.getBoundingClientRect();
  //         const navBarRect = document.getElementById("nav-bar").getBoundingClientRect();
  //         navIndex.style.right = `${navBarRect.right - itemRect.right}px`;
  //         navIndex.style.width = `${itemRect.width}px`;
  //       } else if (headerItems.length > 0) {
  //         // Default to first item if no match found
  //         headerItems[0].classList.add('active');

  //         const navIndex = document.getElementById("nav-index");
  //         const itemRect = headerItems[0].getBoundingClientRect();
  //         const navBarRect = document.getElementById("nav-bar").getBoundingClientRect();
  //         navIndex.style.right = `${navBarRect.right - itemRect.right}px`;
  //         navIndex.style.width = `${itemRect.width}px`;
  //       }
  //     }
  //   }

  // Add event listener for page load
}
//   window.addEventListener('load', () => {
//     // Make sure to re-check the route when everything is loaded
//     const header = document.querySelector('hirad-header');
//     if (header) {
//       header.checkCurrentRoute();
//     }
//   });

customElements.define('hirad-footer', Footer);
