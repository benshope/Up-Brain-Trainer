

function GameCtrl($scope) {
  $scope.difficulty = 1;

  $scope.grid_size = 3;
  $scope.grid = function() {
    return Array(Math.pow($scope.grid_size, 2));
  };
  $scope.grid_class = function() {
    return 'grid-item-' + $scope.grid_size;
  };

  $scope.color_on = false;
  $scope.audio_on = false;
  $scope.math_on = false;

  $scope.training_options = [{name: 'Color', on: false, on_icon: 'fa-square', off_icon: 'fa-square-o'}, 
                             {name: 'Audio', on: false, on_icon: 'fa-volume-up', off_icon: 'fa-volume-off'}, 
                             {name: 'Math', on: false, on_icon: 'fa-sort-numeric-asc', off_icon: 'fa-sort-numeric-desc'}]

  $scope.items = [1, 3, 5, 7];

  $scope.current_item = $scope.items[Math.floor(Math.random() * $scope.items.length)];

  $scope.increase_grid = function() {
        $scope.grid_size = Math.max(($scope.grid_size + 1) % 5, 1);
  };

  $scope.increase = function(value, minimum, maximum) {
        return Math.max((value + 1) % maximum, minimum);
  };

  $scope.start = function() {
    // SET ONE ANSWER BUTTON THAT MOVES FORWARD
    $scope.guesses = 0;

    $scope.false_guesses = 0;
    $scope.true_guesses = 0;

    $scope.accuracy = 0;

    $scope.current_item = null;
    $scope.past_items = [];

    return $scope.next();
  };

  $scope.next = function() {
    $scope.current_item = $scope.items[Math.floor(Math.random() * $scope.items.length)];
    $scope.past_items.push($scope.item);

    // TEST FOR END CONDITIONS

  };

  $scope.start();

  $scope.evaluate = function(guess) {
    $scope.guesses += 1;

    if ($scope.past_items.length < $scope.difficulty) {
        return $scope.next()
    }
    else {
      // CHECK THEIR ANSWER
      item_nback = $scope.visual_queue[-$scope.difficulty];
      if (item_nback === guess) {
        $scope.true_guesses += 1;
        return $scope.next();
      }
      else {
        $scope.false_guesses +=1;
      }
    }
  };

  // ADD THE FUNCTIONS TO EVALUATE IF THE USER PRESSED THE RIGHT THING
  // Mousetrap.bind('up', function(e) {
  //   if ($scope.status === 'running') {
  //     return $scope.evaluate(false, false);
  //   }
  // });

};





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


