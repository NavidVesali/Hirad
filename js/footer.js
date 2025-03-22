class Footer extends HTMLElement {
    constructor() {
        super();
    }

    async connectedCallback() {
            // Static fallback data (in case API fails)
            let data = {
                "id": 1,
                "address": "تــهـران، خـیــابــان ستـارخــان خـیابان نیایش کوچـه موثق نـــژاد پـلـاک 1 واحــد یک",
                "phone": [
                    "+982166420839",
                    "+982166429816"
                ],
                "whatsapp": [
                    "+989352557163",
                    "+989129333608"
                ],
                "email": [
                    "info@Hiradepc.ir",
                    "Hiradepc@gmail.com"
                ]
            };

            // Try fetching from API
            try {
                const response = await fetch("http://localhost:3000/api/contact");
                if (response.ok) {
                    const apiData = await response.json();
                    data = apiData; // Update data only if fetch is successful
                }
            } catch (error) {
                console.error("Failed to fetch footer data:", error);
            }

            // Render the footer
            this.innerHTML = `
        <section id="footer" class="s-button2 w-full flex justify-between items-center pt-[10px] mb-5">
            <div class="mr-12">
                <span onclick="window.location.href='/'" style="cursor: pointer;">
                    <img src="/assets/images/footer/hirad-Logo 1.png" alt="logo" />
                </span>
            </div>

            <div class="grid grid-cols-3 grid-rows-3 gap-8">
                <div class="flex justify-start items-center gap-1">
                    <img src="/assets/images/footer/arrow-left.svg" alt="" />
                    <a href="/">خانه</a>
                </div>
                <div class="flex justify-start items-center gap-1">
                    <img src="/assets/images/footer/arrow-left.svg" alt="" />
                    <a href="/products">محصولات</a>
                </div>
                <div class="flex justify-start items-center gap-1">
                    <img src="/assets/images/footer/arrow-left.svg" alt="" />
                    <a href="/services">خدمات شرکت</a>
                </div>
                <div class="flex justify-start items-center gap-1">
                    <img src="/assets/images/footer/arrow-left.svg" alt="" />
                    <a href="/about">درباره ما</a>
                </div>
                <div class="flex justify-start items-center gap-1">
                    <img src="/assets/images/footer/arrow-left.svg" alt="" />
                    <a href="/contact">تماس با ما</a>
                </div>
            </div>

            <div class="flex flex-col flex-nowrap w-[546px] h-[200px] gap-8 mb-2.5">
                <div class="flex justify-start items-center gap-1.5">
                    <img src="/assets/images/footer/location.svg" alt="" />
                    <p>${data.address}</p>
                </div>
                <div class="flex justify-start items-center gap-1.5">
                    <img src="/assets/images/footer/call-calling.svg" alt="" />
                    ${data.phone.map(phone => `<a href="tel:${phone}">${phone.replace('+98','0')}</a>`).join(" - ")}
                </div>
                <div class="flex justify-start items-center gap-1.5">
                    <img src="/assets/images/footer/whatsapp.svg" alt="" />
                    ${data.whatsapp.map(whatsapp => `<a href="tel:${whatsapp}">${whatsapp.replace('+98','0')}</a>`).join(" / ")}
                </div>
                <div class="flex justify-start items-center gap-1.5">
                    <img src="/assets/images/footer/sms.svg" alt="" />
                    ${data.email.map(email => `<a href="mailto:${email}">${email}</a>`).join(" / ")}
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