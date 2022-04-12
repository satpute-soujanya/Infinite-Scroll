// Importing Elements from html
const imageContainer = document.getElementById('img_container')
const loader = document.getElementById('loader')
let ready = false
let imageLoaded = 0
let totalImages = 0
let photosArray = []
let initialLoad = true
// Unsplash Url Setup
let count = 6
const apiKey = 'uztmhMr2X1gQjRp2LE3sPhhXpsnbeh6I7nAX3GPYqyA'
const apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`
// Check if Image is loading
function ImageLoded() {
  imageLoaded++
  if (imageLoaded === totalImages) {
    loader.hidden = true
    ready = true
    initialLoad = false
    count = 20
  }
}
// Helper funtion for setting Attribute
function setAttributeOnElement(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key])
  }
}

// Displaying photos from unsplash
function displayPhoto() {
  imageLoaded = 0
  // Run fuction on for each
  totalImages = photosArray.length
  photosArray.forEach((photo) => {
    // Creating link to images
    const photoItem = document.createElement('a')
    setAttributeOnElement(photoItem, {
      href: photo.links.html,
      target: '_blank',
    })
    // Creating img for photo
    const PhotoImg = document.createElement('img')
    setAttributeOnElement(PhotoImg, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    })
    // Event listener when image is finished loading
    PhotoImg.addEventListener('load', ImageLoded)
    // Put img inside a tag and all that into img_container
    photoItem.appendChild(PhotoImg)
    imageContainer.appendChild(photoItem)
  })
}

// Getting photos from Unsplash
async function getPhotosFromUnsphalsh() {
  try {
    const response = await fetch(apiURL)
    photosArray = await response.json()
    displayPhoto()
  } catch (error) {
    console.log(error)
  }
}
// Check if scrolling is happen and adding event listener to it
window.addEventListener('scroll', () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false
    getPhotosFromUnsphalsh()
    console.log('loading')
  }
})
getPhotosFromUnsphalsh()
