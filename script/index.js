const elTutorialVideoLeft = document.querySelector('.video-tutorial-left')
const elAboutStesting = document.querySelector('.about-stesting')
const elLastInformation = document.querySelector('.last-information')
const elVideoLesson = document.querySelector('.video-lesson')
const elLoadingAnimation = document.querySelector('.animation')
const responsiveMenu = document.querySelector('.responsive-menu')
const hamburgerIcon = document.querySelector('.hamburger-icon')
const xIcon = document.querySelector('.icon-x')
const elMain = document.querySelector('.main')

let loading = false

const reguestIndex = () =>
     loading = true
    elLoadingAnimation.classList.remove("hidden")
    fetch('https://qlapi.stesting.uz/api/v1/index/').then(res => res.json()).then(data => {
        renderSection(data)
        loading = false
        elLoadingAnimation.classList.add("hidden")}).catch(error => {
        loading = true
        elLoadingAnimation.classList.add("hidden")
        elBoxList.textContent = "Xatolik bor"
        elBoxList.style.fontSize = '40px'
        elBoxList.style.color = 'red'
        elBoxList.style.textAlign = 'center'
        console.log(error);
    })

const renderSection = (arr) => {
    const html = `
        <p class=" text-[51px] leading-tight font-semibold relative">
            <img class="absolute ml-[80px] hidden md:block " src="https://stesting.uz/wrap1.png" alt="">    
            <span class="">${arr.registration.title}</span>
        </p>
    <p class="text-lg mt-[40px] ">
        ${arr.registration.description}
    </p>
    
    `
    elTutorialVideoLeft.insertAdjacentHTML('afterbegin', html)

    elAboutStesting.textContent = arr.short_description

    for (let item of arr.research) {

        const htmll = `
            <a class="shadow-md hover:shadow-xl transition" href="#">
            <div class="relative w-full lg:max-w-[226px] ">
                <img class="w-full  h-[450px]  md:h-[357px] lg:w-[226px] lg:h-[170px]" src="${item.image_url}" alt="">
                <div class="">
                    <div class="flex items-center justify-around w-full min-h-[60px] absolute bottom-0 left-0 backdrop-blur-md text-white text-base">
                        <div class="">
                            <svg data-v-08451a58="" width="20" height="20" viewBox="0 0 20 20" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path data-v-08451a58=""
                                    d="M0.833496 9.9987C0.833496 9.9987 4.16683 3.33203 10.0002 3.33203C15.8335 3.33203 19.1668 9.9987 19.1668 9.9987C19.1668 9.9987 15.8335 16.6654 10.0002 16.6654C4.16683 16.6654 0.833496 9.9987 0.833496 9.9987Z"
                                    stroke="white" stroke-width="1.3" stroke-linecap="round"
                                    stroke-linejoin="round"></path>
                                <path data-v-08451a58=""
                                    d="M10 12.5C11.3807 12.5 12.5 11.3807 12.5 10C12.5 8.61929 11.3807 7.5 10 7.5C8.61929 7.5 7.5 8.61929 7.5 10C7.5 11.3807 8.61929 12.5 10 12.5Z"
                                    stroke="white" stroke-width="1.3" stroke-linecap="round"
                                    stroke-linejoin="round"></path>
                            </svg>
                            <p>
                                ${item.views}
                            </p>
                        </div>
                        <div>
                            <svg data-v-08451a58="" width="20" height="20" viewBox="0 0 20 20" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path data-v-08451a58=""
                                    d="M15.8333 2.33203H4.16667C3.24619 2.33203 2.5 3.07822 2.5 3.9987V15.6654C2.5 16.5858 3.24619 17.332 4.16667 17.332H15.8333C16.7538 17.332 17.5 16.5858 17.5 15.6654V3.9987C17.5 3.07822 16.7538 2.33203 15.8333 2.33203Z"
                                    stroke="white" stroke-width="1.3" stroke-linecap="round"
                                    stroke-linejoin="round"></path>
                                <path data-v-08451a58="" d="M13.3335 0.667969V4.0013" stroke="white"
                                    stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round">
                                </path>
                                <path data-v-08451a58="" d="M6.6665 0.667969V4.0013" stroke="white"
                                    stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round">
                                </path>
                                <path data-v-08451a58="" d="M2.5 7.33203H17.5" stroke="white"
                                    stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round">
                                </path>
                            </svg>
                            <p>
                                ${item.date}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div class=" lg:max-w-[230px] p-[15px]">
                <p class="line-clamp-2 text-base font-semibold">
                    ${item.title}
                </p>
                <p class="line-clamp-3 text-sm text-[#73777d]">
                    ${item.description}
                </p>
            </div>
        </a>
              `

        elLastInformation.insertAdjacentHTML('beforeend', htmll)
    }
    const lesson = `
            <div class="w-full lg:min-w-[500px]"> 
            <iframe   src="${arr.main_video.video}" width="100%" height="315" frameborder="0"></iframe>
            </div>
            
            `

    elVideoLesson.insertAdjacentHTML('beforeend', lesson)
}

hamburgerIcon.addEventListener('click', () => {
    hamburgerIcon.style.visibility = 'hidden'
    responsiveMenu.style.visibility = 'visible'
    xIcon.style.visibility = 'visible'
    elMain.style.overflow = "hidden"
})

xIcon.addEventListener('click', () =>{
    hamburgerIcon.style.visibility = 'visible'
    responsiveMenu.style.visibility = 'hidden'
    xIcon.style.visibility = 'hidden'

})

reguestIndex();


