const stestingList = document.querySelector('.stesting-list')
const stestinwords = document.querySelector('.stesting-words')
const elLoadingAnimation = document.querySelector('.animation')
const responsiveMenu = document.querySelector('.responsive-menu')
const hamburgerIcon = document.querySelector('.hamburger-icon')
const xIcon = document.querySelector('.icon-x')

let loading = false

const requestStesting = () => {
    loading = true
    elLoadingAnimation.classList.remove("hidden")
    fetch('https://qlapi.stesting.uz/api/v1/aboutus/').then(res => res.json()).then(data => {
        renderStesting(data)    
    loading = false
    elLoadingAnimation.classList.remove("hidden")    
        
    }).catch(error => {
        loading = true
        elLoadingAnimation.classList.add("hidden")
        console.log(error);

    }).finally(() => {
        if (!loading) {
            elLoadingAnimation.classList.add("hidden");
        }
    });
}

const renderStesting = (item) => {
    const html = `
    <div class="row-span-3 ms-20  ">
    <img class="border-[10px] border-white h-[500px] lg:h-[432px] object-cover mx-auto w-[400px] lg:w-[254px]"
        src="${item.image_url}" alt="">
</div>
<div class="col-span-2  ">
    <img class="border-[10px] border-white h-[200px] object-cover mx-auto lg:w-[254px]"
        src="${item.image1_url}" alt="">
</div>
<div class="col-span-2  ">
    <img class="border-[10px] border-white h-[200px] object-cover mx-auto lg:w-[254px]"
        src="${item.image2_url}" alt="">
</div>
<div class="row-span-3   ">
    <img class="border-[10px] border-white h-[432px] object-cover mx-auto lg:w-[254px]"
        src="${item.image3_url}"
        alt="">
</div>
    
    `
    
    stestingList.insertAdjacentHTML('beforeend', html)


    const htmll = `
    <p class="">
        ${item.description}
    </p>
    <p>
    ${item.short_desc}
    </p>
    `

    stestinwords.insertAdjacentHTML('beforeend', htmll)


}

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


requestStesting()