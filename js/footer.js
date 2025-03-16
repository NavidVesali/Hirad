class Footer extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
     <section id="footer" class="s-button2 w-full flex justify-between items-center my-5">
    <div class="mr-12">
        <img src="./assets/images/footer/hirad-Logo 1.png" alt="" />
    </div>

    <div class="grid grid-cols-3 grid-rows-3 gap-8">
        <div class="flex justify-start items-center gap-1">
            <img src="./assets/images/footer/arrow-left.svg" alt="" />
            <a href="/">خانه</a>
        </div>
        <div class="flex justify-start items-cente gap-1r">
            <img src="./assets/images/footer/arrow-left.svg" alt="" />
            <a href="/products">محصولات</a>
        </div>
        <div class="flex justify-start items-center gap-1">
            <img src="./assets/images/footer/arrow-left.svg" alt="" />
            <a href="/services">خدمات شرکت</a>
        </div>
        <div class="flex justify-start items-center gap-1">
            <img src="./assets/images/footer/arrow-left.svg" alt="" />
            <a href="contact">تماس با ما</a>
        </div>
        <div class="flex justify-start items-center gap-1">
            <img src="./assets/images/footer/arrow-left.svg" alt="" />
            <a href="about">درباره ما</a>
        </div>
    </div>

    <div class="flex flex-col flex-nowrap w-[546px] h-[200px] gap-8 my-2.5">
        <div class="flex justify-start items-center gap-1.5">
            <img src="./assets/images/footer/location.svg" alt="" />
            <p>
                تــهـران، خـیــابــان ستـارخــان خـیابان نیایش کوچـه موثق نـــژاد پـلـاک 1 واحــد یک
            </p>
        </div>
        <div class="flex justify-start items-center gap-1.5">
            <img src="./assets/images/footer/call-calling.svg" alt="" />
            <a href="tel:+982166420839">66420839 (21) 98+ </a>-<a href="tel:+982166429816"> 66429816(21) 98+</a>
        </div>
        <div class="flex justify-start items-center gap-1.5">
            <img src="./assets/images/footer/whatsapp.svg" alt="" />
            <a href="tel:09352557163">09352557163</a> - <a href="tel:09129333608"> 0912-9333608</a>
        </div>
        <div class="flex justify-start items-center gap-1.5">
            <img src="./assets/images/footer/sms.svg" alt="" />
            <a href="mailto:info@Hiradepc.ir">info@Hiradepc.ir </a> - <a href="mailto:Hiradepc@gmail.com">Hiradepc@gmail.com</a>
        </div>
    </div>
</section>
<p style="text-align:center;margin-bottom:20px;">
    تمامی حقوق این وب سایت متعلق به شرکت تجهیز فرآیند هیراد می‌باشد.   ۱۴۰۳ – ۱۳۹۴
</p>
      `;
    }

}


customElements.define('hirad-footer', Footer);