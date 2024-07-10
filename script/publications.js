const elBody = document.querySelector('.body')
const elBoxList = document.querySelector('.box-list')
const elFormBtnPagination = document.querySelector('.pagination-list')
const elLoadingAnimation = document.querySelector('.animation')
const elSelect = document.querySelector('.select')
const elSelectDiv = document.querySelector('.select-div')
const elInternationArea = document.querySelector('.internation-area')
const elNationalArea = document.querySelector('.national-area')
const responsiveMenu = document.querySelector('.responsive-menu')
const hamburgerIcon = document.querySelector('.hamburger-icon')
const xIcon = document.querySelector('.icon-x')

let page = 1
let loading = false
let areaButton = ""
let total_pages = 0

const requestPublication = (slug ) => {
    loading = true
    elLoadingAnimation.classList.remove("hidden")
    fetch(slug === 'all' ? `https://qlapi.stesting.uz/api/v1/publication/?area=${areaButton}&?page=${page}&category__slug=` : `https://qlapi.stesting.uz/api/v1/publication/?page=${page}&category__slug=${slug || ''}`).then(res => res.json()).then(data => {
        renderPublications(data.results)
        loading = false
        elLoadingAnimation.classList.add("hidden")
        total_pages = data.total_pages

    }).catch(error => {
        loading = true
        elLoadingAnimation.classList.add("hidden")
        elBoxList.textContent = "Xatolik bor"
        elBoxList.style.fontSize = '40px'
        elBoxList.style.color = 'red'
        elBoxList.style.textAlign = 'center'
        console.log(error);
    })
}

const renderPages = (pagee) => {
    elFormBtnPagination.innerHTML = '';
    
    for (let i = 0; i < pagee; i++) {
        const pagination = `
            <button class="page-btn px-4 py-2 border-2 text-[#007bff] hover:bg-[#e9ecef] transition">${i + 1}</button>
        `;
        elFormBtnPagination.insertAdjacentHTML('beforeend', pagination);
    }

    const pageButtons = elFormBtnPagination.querySelectorAll('.page-btn');
    pageButtons.forEach((button, index) => {
        button.addEventListener('click', function() {
            elBoxList.innerHTML = null
            pageButtons.forEach(btn => {
                btn.classList.remove('active');
            });
            button.classList.add('active');
            page = index + 1;
            requestPublication(elSelect.value); 
        });
        if (index === page - 1) {
            button.classList.add('active');
        }
    });
}





const renderPublications = (arr) => {

    arr.forEach(item => {
        const result = removeSpecifiedTags(item.description, 'p')
        const html =
            `
    <div class="block lg:flex gap-[44px]  p-6 mt-5 mb-8  shadow">
    <div>
        <img class="px-[15px] min-w-[200px]" src="${item.image_url}"  alt="">
    </div>
    <div class="flex flex-col justify-between px-[15px] max-w[730px]">
        <h2 class="text-2xl font-semibold">
            ${item.title}
        </h2>
        <p class="text-lg text-[#73777d">
            ${item.description}
        </p>
        <a class="max-w-[175px]" href="${item.file_url}" target="_blank">
        <button class="flex items-center py-3 px-[43px] bg-[#4f95ff] text-white gap-1 transition hover:bg-[#1064b2]">
        <svg data-v-01251ed5="" width="24" height="24" viewBox="0 0 24 24" fill="none"
            xmlns="http://www.w3.org/2000/svg" class="inline">
            <path data-v-01251ed5=""
                d="M19 12V19H5V12H3V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V12H19ZM13 12.67L15.59 10.09L17 11.5L12 16.5L7 11.5L8.41 10.09L11 12.67V3H13V12.67Z"
                fill="white"></path>
        </svg>
        Скачать
    </button>
        </a>
    </div>
</div>
    `
        removeSpecifiedTags(html, 'p');
        elBoxList.insertAdjacentHTML('beforeend', html)
    });


}

const requestSelect = () => {
    fetch(`https://qlapi.stesting.uz/api/v1/publication/category/${elSelect.value}`).then(res => res.json()).then(data => renderSelect(data))
}

const renderSelect = (section) => {
    const newOption = document.createElement('option')
    newOption.textContent = "Все"
    newOption.setAttribute('value', 'all')
    elSelect.append(newOption)

    newOption.addEventListener('click', () => {
        requestPublication('')
    })

    section.forEach(item => {


        const html = `
        <option value="${item.slug}">${item.title}</option>
        `

        elSelect.insertAdjacentHTML('beforeend', html)

    })

}

elSelect.addEventListener('change', () => {
    const selectValue = elSelect.value
    elBoxList.innerHTML = null
    elFormBtnPagination.innerHTML = null
    requestPublication(selectValue)
})

function removeSpecifiedTags(html, tag) {
    const container = document.createElement('div');
    container.innerHTML = html;
    const elements = container.querySelectorAll(tag);
    if (elements.length > 1) {
        elements[1].remove();
    }
    let content = '';
    elements.forEach(element => {
        content += element.innerHTML;
    })
    return content;

}
elInternationArea.addEventListener('click', () => {
    areaButton = 1; 
    page = 1; 
    
    elNationalArea.setAttribute('class', "py-2.5 px-[65px] bg-[#e1edff] text-[#4f95ff] transition hover:text-black text-base font-semibold w-full mt-3 md:mt-0")
    elInternationArea.setAttribute('class', "py-2.5 px-[65px] text-white bg-[#4f95ff] transition  text-base font-semibold w-full mt-3 md:mt-0")

    elBoxList.innerHTML = '';
    elFormBtnPagination.innerHTML = '';
    
    requestPublication(elSelect.value); 
});

elNationalArea.addEventListener('click', () => {
    areaButton = 2; 
    page = 1; 
    
    elInternationArea.setAttribute('class', "py-2.5 px-[65px] bg-[#e1edff] text-[#4f95ff] transition hover:text-black text-base font-semibold w-full mt-3 md:mt-0")
    elNationalArea.setAttribute('class', "py-2.5 px-[65px] text-white bg-[#4f95ff] transition  text-base font-semibold w-full mt-3 md:mt-0")

    elBoxList.innerHTML = '';
    elFormBtnPagination.innerHTML = '';
    
    requestPublication(elSelect.value); 
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


requestSelect()
requestPublication()
setTimeout(() => {
    renderPages(total_pages)
}, 500)