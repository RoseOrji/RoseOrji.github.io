const videoElem = document.getElementById("video");
const errorElem = document.getElementById("error");
const canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");

let receivedMediaStream = null;

const constraints = {
  audio: false,
  video: {
    facingMode: "right",
  },
};

// asynchronous method:
// async function openCamera() {
//   let mediaStreams = await navigator.mediaDevices.getUserMedia(constraints);
//   videoElem.srcObject = mediaStreams;
// }

function openCamera() {
  navigator.mediaDevices
    .getUserMedia(constraints)
    .then((mediaStream) => {
      videoElem.srcObject = mediaStream;

      receivedMediaStream = mediaStream;
      videoElem.play();
    })

    .catch((error) => {
      errorElem.innerHTML = error;
      errorElem.style.display = "block";
    });
}

function clickPhoto() {
  if (!receivedMediaStream) {
    errorElem.innerHTML = "Camera is already closed!";
    errorElem.style.display = "block";
  } else {
    receivedMediaStream.getTracks().forEach((mediaTrack) => mediaTrack.stop());
    errorElem.innerHTML = "Camera closed successfully!";
    errorElem.style.display = "block";

    context.save();
    context.scale(-1, 1);
    context.drawImage(videoElem, -canvas.width, 0, canvas.width, canvas.height);
    context.restore();

    let image_data = canvas.toDataURL("image/jpeg");
  }
}
