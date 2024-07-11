const elSelectVideo = document.querySelector(".select-video");
const elVideoLessonVideo = document.querySelector(".video-lesson-video");
const elFormBtnPagination = document.querySelector(".pagination-list");
const elInternationArea = document.querySelector(".internation-area");
const elNationalArea = document.querySelector(".national-area");
const elLoadingAnimation = document.querySelector(".animation");
const responsiveMenu = document.querySelector(".responsive-menu");
const hamburgerIcon = document.querySelector(".hamburger-icon");
const xIcon = document.querySelector(".icon-x");

let loading = false;
let page = 1;
let areaButton = "";

const requestVideoLesson = (slug) => {
  loading = true;
  elLoadingAnimation.classList.remove("hidden");
  fetch(
    slug === "all"
      ? `https://qlapi.stesting.uz/api/v1/videocourse/?courses=${areaButton}&?page=${page}&direction=`
      : `https://qlapi.stesting.uz/api/v1/videocourse/?page=${page}&direction=${
          slug || ""
        } `
  )
    .then((res) => res.json())
    .then((data) => {
      renderLesson(data.results);
      loading = false;
      elLoadingAnimation.classList.add("hidden");
    })
    .catch((error) => {
      loading = true;
      elLoadingAnimation.classList.add("hidden");
      console.log(error);
    });
};

const renderLesson = () => {
  let pageNumber = 1;
  let pageSize = 9;

  $("#pagination-list").pagination({
    dataSource: `https://qlapi.stesting.uz/api/v1/videocourse/?courses=${areaButton}&?page=${page}&direction=`,
    locator: "results",
    pageNumber,
    ajax: function () {
      return {
        data: {
          page: pageNumber,
        },
      };
    },
    pageSize,
    // autoHidePrevious: true,
    // autoHideNext: true,
    beforePageOnClick: (_, count) => {
      pageNumber = +count;
    },
    totalNumberLocator: (response) => {
      return response.total;
    },
    disableClassName: "py-2 px-4 ",
    activeClassName: "font-black bg-[#4f95ff] !hover:bg-[#4f95ff] ",
    pageClassName:
      "px-4 py-2 border-2 text-[#007bff]  hover:bg-[#e9ecef] transition cursor-pointer",
    prevClassName: "py-2 px-5 cursor-pointer",
    nextClassName: "py-2 px-5 cursor-pointer",
    callback: function (data) {
      elVideoLessonVideo.innerHTML = null;

      data.forEach((item) => {
        const html = `
        <a target="_blank" href="${item.video}" class="flex flex-col justify-between cursor-pointer shadow mb-[40px]">
        <div class="relative h-[230px] ">
            <span class="z-10  !backdrop-blur-md py-3.5 pl-4 pr-3 left-[45%] top-[40%] shadow-xl span-logo absolute rounded-full ">
                <img class="" src="./images/PlayIcon.svg" alt="">
            </span>
            <span class=" absolute left-5 top-5 py-1 px-4 span-rba z-10 text-white uppercase text-base">${item.direction}</span>
            <div class="::after gradient-bg w-full h-full absolute"> </div>
            <img class=" object-cover !bg-cover h-full w-full" src="https://stesting.uz/_nuxt/img/videoCover.e3ce9ad.jpg" alt="">
            
            </div>
        <div class="flex flex-col justify-between px-5 py-4 !grow">
            <h3 class="mb-3 text-base font-bold line-clamp-2">
                ${item.title}
            </h3>
            <ul class="flex items-center ">
                <li class="flex items-center gap-2 mr-[30px]">
                    <i>
                        <img src="./images/eye.svg" alt="">
                    </i>
                    ${item.views}
                </li>
                <li class="flex items-center gap-2 mr-[30px]">
                    <i>
                        <img src="./images/calendar.svg" alt="">
                    </i>
                    ${item.date}
                </li>
            </ul>
        </div>
    </a>            
        `;
        elVideoLessonVideo.insertAdjacentHTML("beforeend", html);
      });
    },
  });
};

renderLesson();

// arr.forEach(item => {
//     const html = `
//     <a target="_blank" href="${item.video}" class="flex flex-col justify-between cursor-pointer shadow mb-[40px]">
//     <div class="relative h-[230px] ">
//         <span class="z-10  !backdrop-blur-md py-3.5 pl-4 pr-3 left-[45%] top-[40%] shadow-xl span-logo absolute rounded-full ">
//             <img class="" src="./images/PlayIcon.svg" alt="">
//         </span>
//         <span class=" absolute left-5 top-5 py-1 px-4 span-rba z-10 text-white uppercase text-base">${item.direction}</span>
//         <div class="::after gradient-bg w-full h-full absolute"> </div>
//         <img class=" object-cover !bg-cover h-full w-full" src="https://stesting.uz/_nuxt/img/videoCover.e3ce9ad.jpg" alt="">

//         </div>
//     <div class="flex flex-col justify-between px-5 py-4 !grow">
//         <h3 class="mb-3 text-base font-bold line-clamp-2">
//             ${item.title}
//         </h3>
//         <ul class="flex items-center ">
//             <li class="flex items-center gap-2 mr-[30px]">
//                 <i>
//                     <img src="./images/eye.svg" alt="">
//                 </i>
//                 ${item.views}
//             </li>
//             <li class="flex items-center gap-2 mr-[30px]">
//                 <i>
//                     <img src="./images/calendar.svg" alt="">
//                 </i>
//                 ${item.date}
//             </li>
//         </ul>
//     </div>
// </a>

//     `
//     elVideoLessonVideo.insertAdjacentHTML('beforeend', html)

// })

// const renderPages = (pagee) => {
//   for (let i = 0; i < pagee; i++) {
//     const pagination = `
//             <button class="page-btn px-4 py-2 border text-[#007bff] hover:bg-[#e9ecef] transition">${
//               i + 1
//             }</button>

//         `;

//     elFormBtnPagination.insertAdjacentHTML("beforeend", pagination);
//   }
//   const pageButtons = elFormBtnPagination.querySelectorAll(".page-btn");
//   pageButtons.forEach((button, index) => {
//     button.addEventListener("click", function () {
//       page = index + 1;

//       button.textContent = page;

//       pageButtons.forEach((btn) => btn.classList.remove("active"));
//       button.classList.add("active");
//       elFormBtnPagination.innerHTML = null;

//       requestVideoLesson(elSelectVideo.value);
//     });
//   });
// };

const requestSelectVideo = () => {
  fetch(`https://qlapi.stesting.uz/api/v1/videocourse/videocourse-category/`)
    .then((res) => res.json())
    .then((data) => renderSelectVideo(data));
};

const renderSelectVideo = (arr) => {
  const newOption = document.createElement("option");
  newOption.textContent = "Все";
  newOption.setAttribute("value", "all");
  elSelectVideo.append(newOption);

  newOption.addEventListener("click", () => {
    requestVideoLesson("");
  });

  arr.forEach((item) => {
    const html = `
        <option value="${item.id}">${item.title}</option>
        `;

    elSelectVideo.insertAdjacentHTML("beforeend", html);
  });
};

elSelectVideo.addEventListener("change", () => {
  const selectValue = elSelectVideo.value;
  elVideoLessonVideo.innerHTML = null;
  elFormBtnPagination.innerHTML = null;
  requestVideoLesson(selectValue);
});

elInternationArea.addEventListener("click", () => {
  areaButton = 1;
  page = 1;

  elNationalArea.setAttribute(
    "class",
    "py-2.5 px-[65px] bg-[#e1edff] text-[#4f95ff] transition hover:text-black text-base font-semibold w-full mt-3 md:mt-0"
  );
  elInternationArea.setAttribute(
    "class",
    "py-2.5 px-[65px] text-white bg-[#4f95ff] transition  text-base font-semibold w-full mt-3 md:mt-0"
  );

  elVideoLessonVideo.innerHTML = "";
  elFormBtnPagination.innerHTML = "";

  requestVideoLesson(elSelectVideo.value);
});

elNationalArea.addEventListener("click", () => {
  areaButton = 2;
  page = 1;

  elInternationArea.setAttribute(
    "class",
    "py-2.5 px-[65px] bg-[#e1edff] text-[#4f95ff] transition hover:text-black text-base font-semibold w-full mt-3 md:mt-0"
  );
  elNationalArea.setAttribute(
    "class",
    "py-2.5 px-[65px] text-white bg-[#4f95ff] transition  text-base font-semibold w-full mt-3 md:mt-0"
  );

  elVideoLessonVideo.innerHTML = "";
  elFormBtnPagination.innerHTML = "";

  requestVideoLesson(elSelectVideo.value);
});

hamburgerIcon.addEventListener("click", () => {
  hamburgerIcon.style.visibility = "hidden";
  responsiveMenu.style.visibility = "visible";
  xIcon.style.visibility = "visible";
});

xIcon.addEventListener("click", () => {
  hamburgerIcon.style.visibility = "visible";
  responsiveMenu.style.visibility = "hidden";
  xIcon.style.visibility = "hidden";
});

requestSelectVideo();
requestVideoLesson();
