
// SET UP AUDIO
// steroids.audio.prime();
try { steroids.audio.prime(); }
catch(err) { console.log('No Steroids'); }
game_sounds = [];
game_sound_paths = [];

for (x in _.range(8)) {
  game_sounds.push(new Audio("audio/" + x + ".mp3"));
  game_sound_paths.push("audio/" + x + ".mp3");
}
game_click = new Audio("audio/click.mp3");

// CREATE THE APP WITHOUT TOUCH DELAY
myApp = angular.module('myApp', ['ngTouch']);

myApp.controller('GameCtrl', function($scope, $timeout) {

  // Add custom messages based on how good the game play actually was
  // var congrats = ['Awesome!', 'Well done!', 'Nice work!', 'Sweet!!!', 'Rock on!', 'Great work!'];
  var congrats = ['Great Work!'];
  $scope.cats = {
    square: { optional: false, on: true,  items: [],          name: 'Square-Position', on_icon: 'icon ion-grid', off_icon: 'icon ion-grid'},
    color:  { optional: true,  on: false, items: [],          name: 'Color', on_icon: 'icon ion-ios7-compose', off_icon: 'icon ion-ios7-compose-outline'},
    audio:  { optional: true,  on: false, items: _.range(8),  name: 'Audio', on_icon: 'icon ion-ios7-chatbubble', off_icon: 'icon ion-ios7-chatbubble-outline'},
    sum:    { optional: true,  on: false, items: _.range(20), name: 'Sum', on_icon: 'icon ion-ios7-plus', off_icon: 'icon ion-ios7-plus-outline'}
  };

  // No Localstorage on Chrome
  // $scope.top_bg = 'bg-blue';
  // $scope.playing = false;
  // $scope.played = false;
  // $scope.best_correct = -100;
  // $scope.best_turns = 10;
  // $scope.best_elapsed = 10000000;

  $scope.nback = JSON.parse(localStorage.getItem('nback')) || 2;
  $scope.turns = JSON.parse(localStorage.getItem('turns')) || 10;
  $scope.grid_size = JSON.parse(localStorage.getItem('grid_size')) || 9;
  $scope.cats.audio.on = JSON.parse(localStorage.getItem('audio_on')) || false;
  $scope.cats.color.on = JSON.parse(localStorage.getItem('color_on')) || false;
  $scope.cats.sum.on = JSON.parse(localStorage.getItem('sum_on')) || false;

  $scope.nback = 2;
  $scope.turns = 10;
  $scope.grid_size =  9;
  $scope.cats.audio.on =  false;
  $scope.cats.color.on =  false;
  $scope.cats.sum.on =  false;

  var user_click = function() {
    localStorage.setItem('nback', $scope.nback);
    localStorage.setItem('turns', $scope.turns);
    localStorage.setItem('grid_size', $scope.grid_size);
    localStorage.setItem('audio_on', $scope.cats.audio.on);
    localStorage.setItem('color_on', $scope.cats.color.on);
    localStorage.setItem('sum_on', $scope.cats.sum.on);
    if ($scope.cats.audio.on) {
      // steroids.audio.play('audio/click.mp3');
      try { steroids.audio.play('audio/click.mp3'); }
      catch(err) { game_click.play(); }
    }
  };

  $scope.grid = function() { return _.range($scope.grid_size); };
  $scope.grid_side = function() { return Math.sqrt($scope.grid_size)-1; };

  $scope.cats.square.items = $scope.grid();
  $scope.cats.color.items = ['red','green','blue','gold','hotpink','purple'];

  $scope.cell_color = function(cell_index) {
    var indexes = $scope.cats.square.indexes;
    if (cell_index == _.last(indexes)) {
      var color = $scope.cats.color;
      if ($scope.cats.color.on) { return color.items[_.last(color.indexes)] }
      return 'rgba(0,0,0,0.6)';
    }
  };
  $scope.cell_number = function(cell_index) {
    if ($scope.cats.sum.on) {
      if (cell_index == _.last($scope.cats.square.indexes)) {
        return $scope.sum_string;
      }
    }
    return ' ';
  };

  $scope.active_cats = function() {
    var cats = [];
    if ($scope.grid_size > 1) { cats.push($scope.cats.square); };
    if ($scope.cats.color.on) { cats.push($scope.cats.color); };
    if ($scope.cats.audio.on) { cats.push($scope.cats.audio); };
    if ($scope.cats.sum.on) { cats.push($scope.cats.sum); };
    return cats;
  };
  $scope.active_cat_names = function(and_or) {
    var text = "";
    var cats = $scope.active_cats();
    for (var x in cats) {
      var divider = ", "
      if (x == cats.length - 1) { divider = ""; }
      if (x == cats.length - 2) {
        if (cats.length == 2) { divider = " " + and_or + " "; }
        else { divider = ", " + and_or + " "; }
       }
      text = text + cats[x].name + divider;
    }
    return text;
  };

  $scope.increase_grid = function() {
    $scope.grid_size = Math.max(Math.pow(Math.sqrt($scope.grid_size) + 1, 2) % (5*5), 1);
    $scope.cats.square.items = _.range($scope.grid_size);
    user_click();
  };
  $scope.increase_nback = function() {
    $scope.nback = Math.max(($scope.nback + 1) % 6, 2);
    user_click();
  };
  $scope.increase_turns = function() {
    $scope.turns = Math.max(($scope.turns + 10) % 50, 10);
    user_click();
  };
  $scope.toggle = function(bool) {
    user_click();
    return !bool;
  };


  $scope.run_timer = function() {
    $scope.elapsed += 10;
    if ($scope.playing) { $timeout($scope.run_timer, 10); }
  };

  $scope.start = function() {
    $scope.congrat = congrats[Math.floor(Math.random()*congrats.length)];
    $scope.cats.square.on = false;
    if ($scope.grid_size > 1) {
      $scope.cats.square.on = true;
    }

    $scope.playing = true;
    for (x in $scope.cats) { $scope.cats[x].indexes = []; }
    $scope.sum_string = "";
    $scope.turn = -$scope.nback;
    $scope.correct = 0;
    $scope.elapsed = 0;

    if ($scope.grid_size == 1) {
      if (!$scope.cats.audio.on && !$scope.cats.sum.on) {
        $scope.cats.color.on = true;
      }
    }
    $scope.load_turn();
    $scope.run_timer();
  };

  $scope.load_turn = function() {
    $scope.turn += 1;
    if ($scope.turn <= $scope.turns) {
      for (x in $scope.cats) { $scope.cats[x].match = null; }
      var push_random_indexes = function() {
        for (x in $scope.cats) {
          var index = _.random($scope.cats[x].items.length - 1);
          if ($scope.turn >= 1) {
            var indexes = $scope.cats[x].indexes;
            index = _.random(10) < 6 ? index : indexes[indexes.length - $scope.nback];
          }
          $scope.cats[x].indexes.push(index); } };
      push_random_indexes();
      var set_sum_string = function() {
        var number = _.last($scope.cats.sum.indexes) + 10;
        var x = _.random(3, number - 3);
        $scope.sum_string = x + ' + ' + (number - x); };
      set_sum_string();
      if ($scope.cats.audio.on) {
        // steroids.audio.play(game_sound_paths[_.last($scope.cats.audio.indexes)]);
        try { steroids.audio.play(game_sound_paths[_.last($scope.cats.audio.indexes)]); }
        catch(err) { game_sounds[_.last($scope.cats.audio.indexes)].play(); }
      }
    }
    else {
      var end_game = function() {
        $scope.last_elapsed = $scope.elapsed;
        $scope.last_correct = $scope.correct;
        $scope.last_turns = $scope.turns;
        var last_score = $scope.last_correct/$scope.last_turns;
        var best_score = $scope.best_correct/$scope.best_turns;
        var better_score = best_score < last_score;
        var tie_but_faster = (best_score == last_score) && ($scope.last_elapsed/$scope.last_turns < $scope.best_elapsed/$scope.best_turns);
        if (!$scope.played || better_score || tie_but_faster) {
          $scope.best_elapsed = $scope.elapsed;
          $scope.best_correct = $scope.correct;
          $scope.best_turns = $scope.turns;
        }
        $scope.playing = false;
        $scope.played = true;
      }
      end_game();
    }
  };

  $scope.next_turn = function() {
    var turn_fails = 0;
    if (!$scope.playing) { $scope.start(); }
    else {
      if ($scope.turn >= 1) {
        var active = $scope.active_cats();
        for (x in active) {
          var indexes = active[x].indexes;
          var match = indexes[indexes.length - 1] == indexes[indexes.length - ($scope.nback + 1)];
          if (active[x].match == match) { $scope.correct += 1.0/active.length; }
          else { turn_fails += 1; }
        }
      }
      $scope.load_turn();
    }
    if (turn_fails > 0) {
      $scope.top_bg = 'bg-orange';
      $timeout(function () { $scope.top_bg = 'bg-blue'; }, 300);
    }
  };

  var check_answered = function() {
    console.log('checking');
    var matches = _.pluck(_.values($scope.active_cats()), 'match');
    if (!_.contains(matches, null)) { $scope.next_turn(); }
  };

  $scope.set_tf = function(cat_name, tf) {
    var keys = Object.keys($scope.cats);
    for (x in _.range(keys.length)) {
      var cat = $scope.cats[keys[x]];
      if (cat.name == cat_name) {
        $scope.cats[keys[x]].match = tf;
      }
    }
    user_click();
    check_answered();
  };

  $scope.top_click = function() { if ($scope.playing) { $scope.playing = false; } };

});




