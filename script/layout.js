const elHeaderLogoIcon = document.querySelector('.header-logo-icon')
const elContactUs = document.querySelector('.contact-us')
const elLocation = document.querySelector('.location')
const elSocialMedia = document.querySelector('.social-media')
const elLanguageSelect = document.querySelector('.language-select')
const elHeaderList = document.querySelector('.header-list')

const requestHeaderFooter = () => {
    fetch('https://qlapi.stesting.uz/api/v1/menu/').then(res => res.json()).then(data => renderMenu(data)).catch(error => {
        console.log(error);
    })
const renderMenu = (arr) => {
    const html = `
        <img src='${arr.logo_url}'>
    `
    elHeaderLogoIcon.insertAdjacentHTML('beforeend', html)

    const htmll = `
    <h2 class="text-4xl text-white mb-[38px] font-semibold">
    Свяжитесь с нами
</h2>
<div class="mt-6 max-w-[392px]">
    <p class="text-base text-[#73777d;]">
        Адрес
    </p>
    <p class="text-lg text-white">
        ${arr.footer.footer_info.address}
    </p>
</div>
<div class="mt-6">
    <p class="text-base text-[#73777d;]">
        Электронная Почта
    </p>
    <a class="text-lg text-white" href="mailto:${arr.footer.footer_info.email}">
    ${arr.footer.footer_info.email}
    </a>
</div>
<div class="mt-6">
    <p class="text-base text-[#73777d;]">
        Номер Телефона
    </p>
    <a class="text-lg text-white" href="tel:${arr.footer.footer_info.phone}">
    ${arr.footer.footer_info.phone}
    </a>
</div>
    `
    elContactUs.insertAdjacentHTML('beforeend', htmll)

    const location = `
    <iframe class=" hidden sm:block "  width="510" height="297" src="${arr.footer.footer_info.location}" frameborder="0">
                    
    </iframe> 
    <iframe class=" block sm:hidden "  width="300" height="150" src="${arr.footer.footer_info.location}" frameborder="0">
                    
    </iframe> 
    `
    elLocation.insertAdjacentHTML('beforeend', location)

    const social = `
    <a class="bg-[#4f95ff] hover:bg-[#1064b2] transition px-2.5 py-1.5 rounded-lg" href="${arr.footer.footer_info.facebook}" target="_blank">
                    <svg data-v-5115afde="" width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path data-v-5115afde="" d="M7.5 4.8125H4.875V3.0625C4.875 2.5795 5.267 2.1875 5.75 2.1875H6.625V0H4.875C3.42513 0 2.25 1.17513 2.25 2.625V4.8125H0.5V7H2.25V14H4.875V7H6.625L7.5 4.8125Z" fill="white"></path></svg>
                </a>
                <a class="bg-[#4f95ff] hover:bg-[#1064b2] transition px-1.5 py-1.5 rounded-lg" href="${arr.footer.footer_info.telegram}" target="_blank">
                    <svg data-v-5115afde="" width="14" height="12" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path data-v-5115afde="" fill-rule="evenodd" clip-rule="evenodd" d="M10.7242 11.7058C10.9121 11.8388 11.1541 11.8721 11.37 11.7904C11.5858 11.7081 11.7445 11.5238 11.7923 11.3004C12.2992 8.91805 13.5289 2.88814 13.9903 0.721055C14.0253 0.557722 13.967 0.387972 13.8386 0.278889C13.7103 0.169805 13.5324 0.138305 13.3737 0.197222C10.9278 1.10256 3.39523 3.9288 0.316399 5.06805C0.120982 5.14039 -0.00618459 5.32822 0.000232081 5.53414C0.00723208 5.74064 0.146065 5.91972 0.346149 5.9798C1.7269 6.3928 3.53932 6.96739 3.53932 6.96739C3.53932 6.96739 4.38632 9.5253 4.8279 10.8261C4.88332 10.9895 5.01107 11.1178 5.17965 11.1621C5.34765 11.2059 5.52732 11.1598 5.65273 11.0414C6.36207 10.3717 7.45873 9.3363 7.45873 9.3363C7.45873 9.3363 9.5424 10.8641 10.7242 11.7058ZM4.30173 6.64422L5.28115 9.87472L5.49873 7.82897C5.49873 7.82897 9.28282 4.41589 11.44 2.47047C11.503 2.41331 11.5117 2.31764 11.4592 2.25056C11.4073 2.18347 11.3116 2.16772 11.2399 2.21322C8.73973 3.8098 4.30173 6.64422 4.30173 6.64422Z" fill="white"></path></svg>
                </a>
                <a class="bg-[#4f95ff] hover:bg-[#1064b2] transition px-2 py-1.5 rounded-lg" href="${arr.footer.footer_info.instagram}" target="_blank">
                    <svg data-v-5115afde="" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path data-v-5115afde="" d="M9.625 0H4.375C1.95913 0 0 1.95913 0 4.375V9.625C0 12.0409 1.95913 14 4.375 14H9.625C12.0409 14 14 12.0409 14 9.625V4.375C14 1.95913 12.0409 0 9.625 0ZM12.6875 9.625C12.6875 11.3138 11.3138 12.6875 9.625 12.6875H4.375C2.68625 12.6875 1.3125 11.3138 1.3125 9.625V4.375C1.3125 2.68625 2.68625 1.3125 4.375 1.3125H9.625C11.3138 1.3125 12.6875 2.68625 12.6875 4.375V9.625Z" fill="white"></path> <path data-v-5115afde="" d="M7 3.5C5.06712 3.5 3.5 5.06712 3.5 7C3.5 8.93288 5.06712 10.5 7 10.5C8.93288 10.5 10.5 8.93288 10.5 7C10.5 5.06712 8.93288 3.5 7 3.5ZM7 9.1875C5.79425 9.1875 4.8125 8.20575 4.8125 7C4.8125 5.79338 5.79425 4.8125 7 4.8125C8.20575 4.8125 9.1875 5.79338 9.1875 7C9.1875 8.20575 8.20575 9.1875 7 9.1875Z" fill="white"></path> <path data-v-5115afde="" d="M10.7623 3.70228C11.0198 3.70228 11.2286 3.49347 11.2286 3.2359C11.2286 2.97833 11.0198 2.76953 10.7623 2.76953C10.5047 2.76953 10.2959 2.97833 10.2959 3.2359C10.2959 3.49347 10.5047 3.70228 10.7623 3.70228Z" fill="white"></path></svg>
                </a>


    `

    elSocialMedia.insertAdjacentHTML('beforeend', social)

}

}



requestHeaderFooter()