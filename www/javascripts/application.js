function ZenCtrl($scope) {
  $scope.todos = [
    {text:'learn angular', done:true},
    {text:'build an angular app', done:false}];
 
  $scope.addTodo = function() {
    $scope.todos.push({text:$scope.todoText, done:false});
    $scope.todoText = '';
  };
 
  $scope.remaining = function() {
    var count = 0;
    angular.forEach($scope.todos, function(todo) {
      count += todo.done ? 0 : 1;
    });
    return count;
  };
 
  $scope.archive = function() {
    var oldTodos = $scope.todos;
    $scope.todos = [];
    angular.forEach(oldTodos, function(todo) {
      if (!todo.done) $scope.todos.push(todo);
    });
  };
}






// var NUMBER_OF_LAYERS = 20;
// var MAX_SQ_SIZE = 10;
// var MIN_SQ_SIZE = 40;
// var squares;
// var winW, winH;
// var lastOrientation;
// var animationId;

// function init() {
//     lastOrientation = {};
//     window.addEventListener('resize', doLayout, false);
//     window.addEventListener('deviceorientation', deviceOrientationTest, false);
//     doLayout(document);
// }

// function deviceOrientationTest(event) {
//     window.removeEventListener('deviceorientation', deviceOrientationTest);
//     if (event.beta != null && event.gamma != null) {
//         window.addEventListener('deviceorientation', onDeviceOrientationChange, false);
//         animationId = setInterval(onRenderUpdate, 10); 
//     }
// }

// function doLayout(event) {
//     winW = window.innerWidth;
//     winH = window.innerHeight;
//     var surface = id('surface');
//     surface.width = winW;
//     surface.height = winH;
//     squares = new Array(); 
//     var alphaStep = (.9 / NUMBER_OF_LAYERS);
//     for (var i = 0; i < NUMBER_OF_LAYERS; ++i) {
//         squares.push(new Array());
//         var alpha = (i * alphaStep) + .1;
//         for (var j = 0; j <= ((NUMBER_OF_LAYERS - 1) - i); ++j) {
//             var size = getRandomWholeNumber(winW/MIN_SQ_SIZE, winW/MAX_SQ_SIZE);
//             var sq = {size:size,
//                       x:getRandomWholeNumber(0, winW-size),
//                       y:getRandomWholeNumber(0, winH-size),
//                       color:'rgba('+getRandomWholeNumber(0, 255)+', '+getRandomWholeNumber(0, 255)+', '+getRandomWholeNumber(0, 255)+', '+ alpha +')'};
//             squares[i][j] = sq;
//         }
//     }
//     renderSquares();
// }

// function renderSquares() {
//     var surface = id('surface');
//     var context = surface.getContext('2d');
//     context.clearRect(0, 0, surface.width, surface.height);
    
//     var iMax = squares.length;
//     for (var i = 0; i < iMax; ++i) {
//         var jMax = squares[i].length;
//         for (var j = 0; j < jMax; ++j) {
//             var sq = squares[i][j];
//             context.fillStyle = sq.color;
//             context.fillRect(sq.x, sq.y, sq.size, sq.size);
//         }
//     }
// }

// function moveSquares(xDelta, yDelta) {
//     var iMax = squares.length;
//     for (var i = 0; i < iMax; ++i) {
//         var jMax = squares[i].length;
//         for (var j = 0; j < jMax; ++j) {
//             var sq = squares[i][j];
//             sq.x += (xDelta / (iMax - (i)));
//             sq.y += (yDelta / (iMax - (i)));
//         }
//     }
//     renderSquares();
// }

// function onDeviceOrientationChange(event) {
//     lastOrientation.gamma = event.gamma;
//     lastOrientation.beta = event.beta;
// }

// function onRenderUpdate(event) {
//     var xDelta, yDelta;
//     switch (window.orientation) {
//         case 0:
//             xDelta = lastOrientation.gamma;
//             yDelta = lastOrientation.beta;
//             break;
//         case 180:
//             xDelta = lastOrientation.gamma * -1;
//             yDelta = lastOrientation.beta * -1;
//             break;
//         case 90:
//             xDelta = lastOrientation.beta;
//             yDelta = lastOrientation.gamma * -1;
//             break;
//         case -90:
//             xDelta = lastOrientation.beta * -1;
//             yDelta = lastOrientation.gamma;
//             break;
//         default:
//             xDelta = lastOrientation.gamma;
//             yDelta = lastOrientation.beta;
//     }
//     moveSquares(xDelta, yDelta);
// }

// function id(name) { return document.getElementById(name); };
// function getRandomWholeNumber(min, max) { return Math.round(((Math.random() * (max - min)) + min)); };
// function getRandomHex() { return (Math.round(Math.random() * 0xFFFFFF)).toString(16); };

// window.onload = init;




// var accelerometer = null;
// var vertical = 0;
// var horizontal = 0;
// var sound = null;

// document.addEventListener("deviceready", onDeviceReady, false);

// function onDeviceReady() {
//     accelerometer = navigator.accelerometer.watchAcceleration(accelerationReceived, accelerometerError, {frequency: 25});
    
//     steroids.audio.prime();
//     if (device.platform === "iOS") {
//       sound = new Media("http://localhost/sounds/rockGuitar.mp3", null, mediaError);
//     } 
//     else {
//       steroids.on("ready", function() {
//         sound = new Media("file://" + steroids.app.absolutePath + "/sounds/rockGuitar.mp3", null, mediaError);
//       });
//     }
// }

// function playAudio() {
//   if (sound) {
//     sound.play();
//   }
// }

// function mediaError(error) {
//   alert("Error accessing the Media object!\n"+
//         "Error code: " + error.code + "\n" +
//         "Error message: " + error.message);
// }

// function accelerationReceived(acceleration) {
//   vertical = vertical/2 + (acceleration.y * 2)/2;
//   horizontal = horizontal/2 + (acceleration.x * 2)/2;

//   document.getElementById('background').style.backgroundPosition = horizontal + "px " + vertical + "px";

//   // var resultElement = document.getElementById('accelerometer');
//   // resultElement.innerHTML = '<strong>Time:</strong> ' + acceleration.timestamp;
// }

// function accelerometerError() {
//     alert('Error getting accelerometer data!');
//     if (accelerometer) {
//         navigator.accelerometer.clearWatch(accelerometer);
//         accelerometer = null;
//     }
// }


// // answers = [];
// // playing = false;

// // steps = 20;
// // n = 2;

// // colors = 4;
// // sounds = 10;
// // shapes = 3;
// // addition = 20;

