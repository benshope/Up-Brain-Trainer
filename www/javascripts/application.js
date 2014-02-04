
// steroids.view.navigationBar.show("Hello World");

var accelerometer = null;
var vertical = 0;
var horizontal = 0;
var sound = null;

document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    //accelerometer = navigator.accelerometer.watchAcceleration(accelerationReceived, accelerometerError, {frequency: 25});
    
    steroids.audio.prime();
    if (device.platform === "iOS") {
      sound = new Media("http://localhost/sounds/rockGuitar.mp3", null, mediaError);
    } 
    else {
      steroids.on("ready", function() {
        sound = new Media("file://" + steroids.app.absolutePath + "/sounds/rockGuitar.mp3", null, mediaError);
      });
    }
}

function playAudio() {
  if (sound) {
    sound.play();
  }
}

function mediaError(error) {
  alert("Error accessing the Media object!\n"+
        "Error code: " + error.code + "\n" +
        "Error message: " + error.message);
}

function accelerationReceived(acceleration) {
  vertical = vertical/2 + (acceleration.y * 2)/2;
  horizontal = horizontal/2 + (acceleration.x * 2)/2;

  document.getElementById('background').style.backgroundPosition = horizontal + "px " + vertical + "px";

  var resultElement = document.getElementById('accelerometer');
  resultElement.innerHTML = '<strong>Time:</strong> ' + acceleration.timestamp;
}

function accelerometerError() {
    alert('Error getting accelerometer data!');
    if (accelerometer) {
        navigator.accelerometer.clearWatch(accelerometer);
        accelerometer = null;
    }
}