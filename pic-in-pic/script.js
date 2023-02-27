const videoElement = document.getElementById('video');
const button = document.getElementById('button');

// Prompt to select media stream, pass to video element, then play

async function selectMediaStream() {
    try {
        const mediaStream = await navigator.mediaDevices.getDisplayMedia();
        videoElement.srcObject = mediaStream;
        videoElement.onloadedmetadata = () => {
            videoElement.play()
        }
    } catch (error) {
        // catch error here
    }
}

button.addEventListener('click', async () => {
    // disable the button
    button.disabled = true;
    // start picture in picture
    await videoElement.requestPictureInPicture();
    button.disabled = false;
});
// on load

selectMediaStream();