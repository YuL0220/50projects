const imageContainer = document.getElementById('image-container');
const input = document.getElementById('input');
const form = document.getElementById('form');
const submitBtn = document.getElementById('submit');
const loader = document.getElementById('loader');

const macyInstance = Macy({
    container: imageContainer,
    margin: 10,
    breakAt: {
        760: {
            margin: {
                x: 20,
                y: 10,
            },
            columns: 1
        }
    }
})

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash API
const count = 10;
const apiKey = 'VXT3yJEIX7n0aI1rIz9YGg3Wk6WFz5Jgs3FON0lmNtw';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;





// Check if all images were loaded

function imageLoaded() {
    imagesLoaded++;
    console.log(imagesLoaded);
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
        console.log('ready =', ready);
    }
}

//Helper Function to Set AAttributes on DOM elements 
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

// create elements for links & photos, add to DOM
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    // console.log('total images', totalImages);
    // run function for each object in photosArray
    photosArray.forEach((photo) => {
        // create <a> to link to Unsplash
        const container = document.createElement('a');
        // container.setAttribute('href', photo.links.html);
        // container.setAttribute('target', '_blank');
        setAttributes(container, {
            href: photo.links.html,
            target: '_blank',
        });
        // create <img> for photo

        const img = document.createElement('img');
        // img.setAttribute('src', photo.urls.regular);
        // img.setAttribute('alt', photo.description);
        // img.setAttribute('title', photo.alt_description);
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });

        // Event Listener, check when each is finished loading

        img.addEventListener('load', imageLoaded);

        // Put <img> inside <a>, then put both inside imageContainer element
        container.appendChild(img);
        imageContainer.appendChild(container);

    })
}

// Get Photos from Unsplash API
const getPhotos = async () => {
    try {
        const res = await fetch(apiUrl);
        photosArray = await res.json();
        console.log(photosArray)
        displayPhotos();

    } catch (error) {
        // catch error here
    }
}

// Check to see if scrolling near bottom of page, load more photos
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();
    }

});

const removeAllChild = (parent) => {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild)
    }
}

// Search image

const handleSubmit = async (e) => {
    e.preventDefault();
    removeAllChild(imageContainer);
    const query = input.value;
    const apiSearchUrl = `https://api.unsplash.com/search/photos?client_id=${apiKey}&query=${query}`;
    const res = await fetch(apiSearchUrl);
    const data = await res.json();
    photosArray = data.results;
    displayPhotos();
}

submitBtn.addEventListener('click', handleSubmit);

// On load 
getPhotos();






