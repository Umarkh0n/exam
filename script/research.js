const elList = document.querySelector('.list')
const elSelectResearch = document.querySelector('.select-research')
const elFormBtnPagination = document.querySelector('.pagination-list')
const elInternationArea = document.querySelector('.internation-area')
const elNationalArea = document.querySelector('.national-area')
const elLoadingAnimation = document.querySelector('.animation')
const responsiveMenu = document.querySelector('.responsive-menu')
const hamburgerIcon = document.querySelector('.hamburger-icon')
const xIcon = document.querySelector('.icon-x')
const allInfoBox = document.querySelector('.all-info-box')

let loading = false
let page = 1
let areaButton = ""
 
const requestResearch = (slug) => {
    loading = true
    elLoadingAnimation.classList.remove("hidden")
    fetch(slug === 'all' ? `https://qlapi.stesting.uz/api/v1/research/?area=${areaButton}&?page=${page}&category__slug=` : `https://qlapi.stesting.uz/api/v1/research/?area=${areaButton}&?page=${page}&category__slug=${slug || ''}`).then(res => res.json()).then(data => {   
        renderResearch(data.results) || renderPages(data.total_pages)
        loading = false
        elLoadingAnimation.classList.add("hidden")

    }).catch(error => {
        loading = true
        elLoadingAnimation.classList.add("hidden")
        console.log(error)}
    
    )
}

const renderResearch = (arr) => {
    arr.forEach(item => {
        const html = `
        <a class="shadow-md hover:shadow-xl transition" href="#">
        <div class="relative w-full lg:max-w-[226px] ">
            <img class="w-full h-[300px]  md:h-[557px] lg:w-[226px] lg:h-[170px]" src="${item.image_url}" alt="">
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

elList.insertAdjacentHTML('beforeend', html)

    });


}

const requestSelectResearch = () => {
    fetch('https://qlapi.stesting.uz/api/v1/research/research-category').then(res => res.json()).then(data => renderSelectResearch(data))
}

const renderSelectResearch = (arr) => {

    const newOption = document.createElement('option')
    newOption.textContent = "Все"
    newOption.setAttribute('value', 'all')
    elSelectResearch.append(newOption)

    newOption.addEventListener('click', () => {
        requestResearch('')
    })

    arr.forEach(item => {

        
        const html = `
        <option value="${item.slug}">${item.title}</option>
        `

        elSelectResearch.insertAdjacentHTML('beforeend', html)

    })

}
elSelectResearch.addEventListener('change', () => {
    const elselectValue = elSelectResearch.value
    elList.innerHTML = null
    elFormBtnPagination.innerHTML = null

    if(areaButton === 2){
        elList.textContent = "Info yo'q"
            
    }

    
    requestResearch(elselectValue)
})

const renderPages = (pagee) => {
    for (let i = 0; i < pagee; i++) {
        const pagination = `
            <button class="page-btn px-4 py-2 border text-[#007bff] hover:bg-[#e9ecef] transition">${i + 1}</button>
        
        `
        
        elFormBtnPagination.insertAdjacentHTML('beforeend', pagination)
    }

    
}

elInternationArea.addEventListener('click', () => {
    areaButton = 1; 
    page = 1; 
    
    elNationalArea.setAttribute('class', "py-2.5 px-[65px] bg-[#e1edff] text-[#4f95ff] transition hover:text-black text-base font-semibold w-full mt-3 md:mt-0")
    elInternationArea.setAttribute('class', "py-2.5 px-[65px] text-white bg-[#4f95ff] transition  text-base font-semibold w-full mt-3 md:mt-0")

    elList.innerHTML = '';
    elFormBtnPagination.innerHTML = '';
    elList.setAttribute('class', "list md:grid grid-cols-2 gap-[30px] lg:flex items-stretch justify-between")
    
    requestResearch(elSelectResearch.value); 
});

elNationalArea.addEventListener('click', () => {
    areaButton = 2; 
    page = 1; 
    
    elInternationArea.setAttribute('class', "py-2.5 px-[65px] bg-[#e1edff] text-[#4f95ff] transition hover:text-black text-base font-semibold w-full mt-3 md:mt-0")
    elNationalArea.setAttribute('class', "py-2.5 px-[65px] text-white bg-[#4f95ff] transition  text-base font-semibold w-full mt-3 md:mt-0")

    
    elFormBtnPagination.innerHTML = '';
    elList.setAttribute('class', " text-4xl text-center font-bold")
    if(areaButton === 2){
        elList.textContent = "Info yo'q"
    }
    
    
    requestResearch(elSelectResearch.value); 
})


hamburgerIcon.addEventListener('click', () => {
    hamburgerIcon.style.visibility = 'hidden'
    responsiveMenu.style.visibility = 'visible'
    xIcon.style.visibility = 'visible'
})

xIcon.addEventListener('click', () =>{
    hamburgerIcon.style.visibility = 'visible'
    responsiveMenu.style.visibility = 'hidden'
    xIcon.style.visibility = 'hidden'

})

requestSelectResearch()
requestResearch()