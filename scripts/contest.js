/*jslint browser: true*/
/*global $, jQuery*/
//begin window onload function
window.onload = function() {
  //Set all the required variables and grab the game area element
  var play_stage = document.getElementById("beach_wrap");
  //set the enemy id to start at 0 to give enemy elements a unique id
  var enemy_id = 0;
  //set the game speed variable to 33ms, which will be roughly 60fps
  var game_speed = 33;
  //set a gameOver condition for if the failstate has been achieved
  var gameOver = false;
  //set a variable to track explosion by a unique id for when the animation ends
  var kill_count = 0;
  //set a variable to hold the random chance that an enemy will spawn each cycle of the code (33ms), starting at 2%
  var enemy_chance = 0.98;
  //set a variable to act as the score for how many enemies have been survived
  var enemy_survived = 0;
  //set a variable to toggle during refresh cycles to ensure that onMouseMove will only be run once every 33ms,
  //limiting the resource consumption of the program
  var move_refresh = true;
  //set the game_timer variable globally, so that the interval assigned to it can be cleared within the other functions
  var game_timer;
  // set a variable boolean toggle so that the enemy speed is only increased once per score increase
  var enemy_speed_increase = false;
  //click trigger to begin game
  $("#beach_wrap").click(start_click);
  function start_click() {
    //remove click listener
    $("#beach_wrap").unbind('click');
    //remove text and overlay
    $(".message_background").remove();
    //hide mouse cursor within the game for duration for the game
    play_stage.style.cursor = "none";
    //get the mouse position relative to the play area element
    var x = event.pageX - $(this).offset().left;
    var y = event.pageY - $(this).offset().top;
    //toggle the move limiter
    move_refresh = false;
    //set the meat character to the position of the mouse, within the bounds of the container
    if(x > 536){
      $("#meat_chara").css('left', "536px");
    }
    else {
      $("#meat_chara").css('left', x + "px");
    }
    $("#meat_chara").css('top', y + "px");
    //start the interval that will act as our render cycle
    var game_timer = setInterval(play_game, game_speed);
  }
  //game render function
  function play_game() {
    //move the enemies closer to the ground, and set the trigger for moving the meat character with the mouse
    $('.enemy_box').animate({bottom: '-=3'}, 33, "linear");
    $('#beach_wrap').mousemove(move_meat);
    //once the score is over 5, increase the enemy spawn chance by 2 percent every point.
    if (enemy_survived > 5 && enemy_speed_increase === true) {
      enemy_chance -= 0.02;
      //reset the speed increase toggle so that the it is not increasing every 33ms
      enemy_speed_increase = false;
    }
    //if there is at least 1 enemy present, check for collision
    if($('.enemy_box').length > 0) {
      //get the location of the meat character
      var meat_location = $("#meat_chara").position();
      //run through each enemy to check for collision
      $('.enemy_box').each(function(enemy_index, enemy_element) {
        //get the enemy element's position
        var enemy_position = $(enemy_element).position();
        //check if there is collision between the enemy and the meat, and begin the game over if there is collision
        if((enemy_position.top + $(enemy_element).height()) > meat_location.top && (meat_location.top + $("#meat_chara").height()) > enemy_position.top && enemy_position.left < (meat_location.left + $('#meat_chara').width()) && (enemy_position.left + $(enemy_element).width()) > meat_location.left) {
          //set the explosion var
          var explosion;
          //create the explosion div element with the proper class and id
          explosion = document.createElement('div');
          explosion.setAttribute('class', 'enemy_kill');
          explosion.setAttribute('id', 'enemy_kill_' + kill_count);
          //set its position to match the colliding magma ball
          explosion.style.left = enemy_position.left + "px";
          explosion.style.top = enemy_position.top + 'px';
          //set the rotation of the explosion to match the rotation of the colliding element at the momement of collision
          explosion.style.transform = "rotate(" + getRotationDegrees($(enemy_element)) + "deg)";
          //add the created element to the playstage
          play_stage.appendChild(explosion);
          //set a listener for the end of the explosion animation
          $('#enemy_kill_' + kill_count).on('animationend', remove_explosion);
          //remove all other enemy elements on the page
          enemy_element.remove();
          //remove the player meat character
          $("#meat_chara").remove();
          //clear the render interval, effectively ending the game
          clearInterval(game_timer);
          //append the gameover overlay to the screen
           $('#beach_background').html("<div class='message_background'><h3 class='message'>GAME OVER!</h3><h3 class='message second'>Your score was: "+ enemy_survived +"</h3></div>");
           //flip the gameOver boolean toggle, to ensure that any cued or asyncronous game events do not trigger
           gameOver = true;
           //show the users cursor again
           play_stage.style.cursor = "auto";
           //exit the function
           return;


        }
      });
    }
    //if there is at least 1 enemy spawned, check if the enemy has passed the bottom of the play area
    if($('.enemy_box').length > 0) {
      //check each enemy element
      $('.enemy_box').each(function(enemy_index, enemy_element) {
        //get the position
        var enemy_position = $(enemy_element).position();
        //if the enemy has passed the bottom of the play stage
        if(enemy_position.top > 600) {
          //increase the score var
          enemy_survived++;
          //remove the enemy element from the HTML
          enemy_element.remove();
          //update the score bar
          $("#score_count").html(enemy_survived);
          //toggle the enemy speed tracker, so that the spawn chance can increase now that a point has been scored
          enemy_speed_increase = true;
        }
      });
    }
    //run the enemy spawn function
    enemy_spawn();
    //toggle the move reset tracker, so that the character can move at most once a cycle aka 33ms
    move_refresh = true;
  }
  //set the function to move the character element to where the mouse has moved
  function move_meat() {
    //only actually run the movement if the move reset trigger is true, so that we can throttle the
    //resource intensive onMouseMove listener to once a refresh cycle
    if(move_refresh === true) {
      //get the position of the moues relative to the stage element
      var x = event.pageX - $(this).offset().left;
      var y = event.pageY - $(this).offset().top;
      //toggle the move reset trigger, so that it will only be able to move once a cycle
      move_refresh = false;
      //set handling for the bounderies accounting for the width of the element itself relative to the mouse position
      if(x > 536){
        $("#meat_chara").css('left', "536px");
      }
      else {
        $("#meat_chara").css('left', x + "px");
      }
      //same but for the bottom boundary
      if(y > 536){
        $("#meat_chara").css('top', "536px");
      }
      else {
        $("#meat_chara").css('top', y + "px");
      }

    }
  }
  //Create the enemy spawn function
  function enemy_spawn() {
    //run a random function to check if an enemy should spawn, based off of the current spawn chance value
    //also, don't spawn enemy elements if the gameOver state has been triggered
    if(Math.random() > enemy_chance && gameOver === false) {
      //set a var to hold the enemy element as we construct it
      var enemy;
      //determine its x position off of a random value between 0-1 being multiplied by the spawn width of the stage
      var enemy_pos = (Math.random() * (536));
      //create the enemy div and set its class and unique id
      enemy = document.createElement('div');
      enemy.setAttribute('class', 'enemy_box');
      enemy.setAttribute('id', "enemy_" + enemy_id);
      //set its x position off the random value, and its y value just above the top of the stage
      enemy.style.left = enemy_pos + "px";
      enemy.style.bottom = 625 + 'px';
      //append the created enemy div to stage
      play_stage.appendChild(enemy);
      //increment the enemy id counter
      enemy_id++;
    }
    if (gameOver === true) {
      //extra error handling state in case an enemy is somehow spawned after the gameOver is triggered
      $(".enemy_box").remove();
    }
  }
  //create a function to remove the explosion element once the animation has finished
    function remove_explosion() {
      //remove the explosion element passed to the function
      this.remove();
      //remove the explosion animation end listener
      $('#enemy_kill_' + kill_count).off('animationend', remove_explosion);
  }

  /*Credit to user stackoverflow user TwystO for the following function for computing the current rotation state of an element*/
  function getRotationDegrees(obj) {
    var matrix = obj.css("-webkit-transform") ||
    obj.css("-moz-transform")    ||
    obj.css("-ms-transform")     ||
    obj.css("-o-transform")      ||
    obj.css("transform");
    if(matrix !== 'none') {
        var values = matrix.split('(')[1].split(')')[0].split(',');
        var a = values[0];
        var b = values[1];
        var angle = Math.round(Math.atan2(b, a) * (180/Math.PI));
    } else { var angle = 0; }
    return (angle < 0) ? angle + 360 : angle;
}

}
