const elListBox = document.querySelector('.list-box');
const elLoadingAnimation = document.querySelector('.animation');
const responsiveMenu = document.querySelector('.responsive-menu');
const hamburgerIcon = document.querySelector('.hamburger-icon');
const xIcon = document.querySelector('.icon-x');

let loading = false;

const requestInstruction = () => {
    loading = true;
    elLoadingAnimation.classList.remove("hidden");

    fetch('https://qlapi.stesting.uz/api/v1/instruction/')
        .then(res => res.json())
        .then(data => {
            renderInstruction(data);
            loading = false;
            elLoadingAnimation.classList.add("hidden");
        })
        .catch(error => {
            console.error('Error fetching instruction:', error);
            loading = false;
            elLoadingAnimation.classList.add("hidden");
        })
        .finally(() => {
            if (!loading) {
                elLoadingAnimation.classList.add("hidden");
            }
        });
}

const renderInstruction = (arr) => {
    elListBox.innerHTML = ''; 

    arr.forEach((item, index) => {
      const isActive = index === 0 ? 'activee' : ''; 
      const html = `
          <li class="iframe-item py-2 px-4 text-lg hover:text-[#73777d] transition font-semibold border-b">
              <a href="${item.video}" class="video-link ${isActive}">${item.title}</a>
          </li>
      `;
      elListBox.insertAdjacentHTML('beforeend', html);
  });

    const videoLinks = document.querySelectorAll('.video-link');
    videoLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            handleLinkClick(this); 
        });
    });

  
    if (arr.length > 0) {
        const firstLink = elListBox.querySelector('.video-link');
        handleLinkClick(firstLink);
    }
}
function handleLinkClick(link) {
  const videoLinks = document.querySelectorAll('.video-link');
  
  
  videoLinks.forEach(link => {
      link.classList.remove('activee');
  });
  
  
  link.classList.add('activee');
  
  const videoUrl = link.getAttribute('href');
  embedYouTubeFromUrl(videoUrl, 'iframe-list');
}




function embedYouTubeFromUrl(videoUrl, targetElementId) {
    const iframe = document.createElement('iframe');
    iframe.height = "600";
    iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
    iframe.setAttribute('frameborder', '0');
    iframe.setAttribute('class', 'p-4 w-full sm:w-[655px]');

    const embedUrl = `https://www.youtube.com/embed/${getYouTubeVideoId(videoUrl)}`;
    iframe.src = embedUrl;

    const targetElement = document.getElementById(targetElementId);
    if (targetElement) {
        targetElement.innerHTML = ''; 
        targetElement.appendChild(iframe);
    } else {
        console.error(`Target element with id '${targetElementId}' not found.`);
    }
}

function getYouTubeVideoId(url) {
    const videoIdRegex = /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([\w-]+)/;
    const match = url.match(videoIdRegex);
    return match ? match[1] : null;
}

hamburgerIcon.addEventListener('click', () => {
    hamburgerIcon.style.visibility = 'hidden';
    responsiveMenu.style.visibility = 'visible';
    xIcon.style.visibility = 'visible';
});

xIcon.addEventListener('click', () => {
    hamburgerIcon.style.visibility = 'visible';
    responsiveMenu.style.visibility = 'hidden';
    xIcon.style.visibility = 'hidden';
});

requestInstruction();
