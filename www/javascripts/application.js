
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















function generate_table(rows, cols) {
  var tags = [];
  tags.push("<table cellpadding='0' cellspacing='0'>");
  for (var i=0; i<rows; i++) {
    tags.push("<tr>");
    for (var j=0; j<cols; j++) {
      class_name = "cell" + (i * rows + j);
      if (i == Math.floor(rows/2) && j == Math.floor(cols/2)) {
        class_name += " hole";
        tags.push(
            "<td class='" + class_name + "'>"
          + "<div id='centre'>&nbsp;</div>" 
          + "</td>");
      } else {
        tags.push(
            "<td class='" + class_name + "'>"
          + "<div>&nbsp;</div>" 
          + "</td>");
      }
    }
    tags.push("</tr>");
  }
  tags.push("</table>");
  return tags.join("");
}

function map(fun, list) {
  var result = [];
  for (i in list) result.push(fun(i, list[i]));
  return result;
}
function xor(value1, value2) {
  return (value1 || value2) && !(value1 && value2);
}

$(document).ready(function() {
  var rows = cols = 3, max = rows * cols - 1, pos_history = [], user_answers = {}, max_steps = 20, n = 3, none_showing = true, running = false, timeout1, timeout2;

  function clear_board() { 
    $('table td div.current').removeClass('current'); 
    $('#report').html(map(function(i, x){ret = "was " + x.toString(); if (xor(user_answers[i], x)) ret="&#10007; "+ret; else ret="&#10003; "+ret; return ret;}, all_answers()).join('<br>'));
  }

  function new_pos() {
    if(!(running && pos_history.length < max_steps)) { stop(); return; }
    var r = Math.floor(Math.random() * max);
    if (r >= (cols * Math.floor(rows/2) + Math.floor(rows/2))) r+=1;

    none_showing = true;
    clear_board();
    $('table td.cell' + r + ' div');
    timeout2 = setTimeout(function(){add_current(r)}, 500);
    timeout1 = setTimeout(new_pos, 3000);
  }

  function add_current(r) {
    pos_history.push(r);
    //$('#centre').html(pos_history.length + "/" + max_steps);
    $('table td.cell' + r + ' div').addClass('current');
    none_showing = false;
  }

  function start() {
    running = true;
    $("#start-button").val("Stop");
    new_pos();
  }

  function stop() {
    clearTimeout(timeout1);
    clearTimeout(timeout2);
    running = false;
    clear_board();
    pos_history = [];
    user_answers = {} ;
    $("#start-button").val("Start");
  }

  function start_stop_button(event) {
    if (running)
      stop();
    else
      start();
  }

  function user_says_true() {
    if (!running)
      start();
    else
      user_answers[pos_history.length-1] = true;
  }

  /*
  function check_last_answer() {
    if (none_showing) return;
    var l = pos_history.length;
    current = pos_history[l-1];
    $('#report').append("<h3>No</h3>");
    for (var i=l-1-n; i<l-1; i++) {
      if (i < 0) continue;
      if (current == pos_history[i]) {
        $('#report').append("<h3>Yes</h3>");
        break;
      }
    }
  }
  */


  function all_answers() {
    // FIXME all answers are recalculated everytime, O = n x max_steps
    var answers_list = [];
    for (var current=0; current<pos_history.length; current++) {
      answers_list.push(false);
      for (var prev_i=current-n; prev_i<current; prev_i++) {
        if (prev_i < 0) continue;
        if (pos_history[prev_i] == pos_history[current]) {
          answers_list[answers_list.length-1] = true;
          break;
        }
      }
    }
    return answers_list
  }

  $('body #wrapper').append("<h2><i>n</i> = " + n + "</h2>");
  $('body #wrapper').append(generate_table(rows, cols));
  //$('input#yes-button').bind('click', user_says_true)
  $('#centre').bind('click', user_says_true)
  $('input#start-button').bind('click', start_stop_button)
});