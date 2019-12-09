/*jslint browser: true*/
/*global $, jQuery*/
window.onload = function() {
  var play_stage = document.getElementById("beach_wrap");
  var position = 0;
  var projectileXPositions = [];
  var projectileYPositions = [];
  var projectileList = [];
  var enemyXPositions = [];
  var enemyYPositions = [];
  var enemyList = [];
  var enemy_id = 0;
  var projectile_id = 0;
  var game_speed = 33;
  var shoot_reset = true;
  var gameOver = false;
  var kill_count = 0;
  var enemy_chance = 0.98;
  var enemy_survived = 0;
  var move_refresh = true;
  var game_timer;
  var enemy_speed_increase = false;
  //var $explosion = $("<div class='enemy_kill'></div>")
  $("#beach_wrap").click(start_click);
  function start_click() {
    $("#beach_wrap").unbind('click');
    $(".message_background").remove();
    play_stage.style.cursor = "none";
    var x = event.pageX - $(this).offset().left;
    var y = event.pageY - $(this).offset().top;
    move_refresh = false;
    if(x > 536){
      $("#meat_chara").css('left', "536px");
    }
    else {
      $("#meat_chara").css('left', x + "px");
    }
    $("#meat_chara").css('top', y + "px");

    var game_timer = setInterval(play_game, game_speed);
  }
  function play_game() {
    // var meat_location = $("#meat_chara").position();
    $('.enemy_box').animate({bottom: '-=3'}, 33, "linear");
//    $('.enemy_kill').animate({top: '-=3'}, 33, "linear");
    $('#beach_wrap').mousemove(move_meat);
    //checkbounds();
    if (enemy_survived > 5 && enemy_speed_increase === true) {
      enemy_chance -= 0.01;
      enemy_speed_increase = false;
    }

    if($('.enemy_box').length > 0) {
      var meat_location = $("#meat_chara").position();
      $('.enemy_box').each(function(enemy_index, enemy_element) {
        var enemy_position = $(enemy_element).position();
        if((enemy_position.top + $(enemy_element).height()) > meat_location.top && (meat_location.top + $("#meat_chara").height()) > enemy_position.top && enemy_position.left < (meat_location.left + $('#meat_chara').width()) && (enemy_position.left + $(enemy_element).width()) > meat_location.left) {
          var explosion;
          //              enemy_element.remove();
          //              projectile_element.remove();
          explosion = document.createElement('div');
          explosion.setAttribute('class', 'enemy_kill');
          explosion.setAttribute('id', 'enemy_kill_' + kill_count);
          explosion.style.left = enemy_position.left + "px";
          explosion.style.top = enemy_position.top + 'px';
          //              var enemy_location_id = $(enemy_element).attr("id");
          //              var enemy_rotation = document.getElementById(enemy_location_id);
          explosion.style.transform = "rotate(" + getRotationDegrees($(enemy_element)) + "deg)";
          play_stage.appendChild(explosion);
          //              $('#enemy_kill_' + kill_count).addClass('spin_ball')
          $('#enemy_kill_' + kill_count).on('animationend', remove_explosion);
          enemy_element.remove();
          $("#meat_chara").remove();
          clearInterval(game_timer);
           $('#beach_background').html("<div class='message_background'><h3 class='message'>GAME OVER!</h3><h3 class='message second'>Your score was: "+ enemy_survived +"</h3></div>");
           gameOver = true;
           play_stage.style.cursor = "auto";
           return;


        }
      });
    }
    if($('.enemy_box').length > 0) {
      $('.enemy_box').each(function(enemy_index, enemy_element) {
        var enemy_position = $(enemy_element).position();
        if(enemy_position.top > 600) {
          enemy_survived++;
          enemy_element.remove();
          $("#score_count").html(enemy_survived);
          enemy_speed_increase = true;
        }
      });
    }
    else {

    }
    enemy_spawn();
    move_refresh = true;
    // if($('.enemy_box').length <= 2) {
    //   var enemy;
    //   var enemy_pos = (Math.random() * (600));
    //   enemyXPositions.push(enemy_pos);
    //   enemyYPositions.push(650);
    //   enemy = document.createElement('div');
    //   enemy.setAttribute('class', 'enemy_box');
    //   enemy.setAttribute('id', "enemy_" + enemy_id);
    //   enemy.style.left = enemy_pos + "px";
    //   enemy.style.bottom = 475 + 'px';
    //   play_stage.appendChild(enemy);
    //   enemyList.push(document.getElementById("enemy_" + enemy_id));
    //   enemy_id++;
    // }
//    if(enemy_id > 25) {
//      clearInterval(game_timer);
//      game_speed--;
//      game_timer = setInterval(play_game, game_speed);
//    }
  }

//  document.addEventListener('click', play_stage);
  //$('#beach_wrap').mousemove(move_meat);

  function move_meat() {
    if(move_refresh === true) {
      var x = event.pageX - $(this).offset().left;
      var y = event.pageY - $(this).offset().top;
      move_refresh = false;
      if(x > 536){
        $("#meat_chara").css('left', "536px");
      }
      else {
        $("#meat_chara").css('left', x + "px");
      }
      // $("#meat_chara").css('left', x + "px");
      $("#meat_chara").css('top', y + "px");
    }
    // var x = event.pageX - $(this).offset().left;
    // var y = event.pageY - $(this).offset().top;
    // if(x > 536){
    //   $("#meat_chara").css('left', "536px");
    // }
    // else {
    //   $("#meat_chara").css('left', x + "px");
    // }
    // // $("#meat_chara").css('left', x + "px");
    // $("#meat_chara").css('top', y + "px");
  }

//   function checkbounds() {
//     position = $('#meat_chara').position();
// //    console.log("current position: " + position.left);
//     if(position.left  <= 0 || (position.left + $('meat_chara').width()) >= 600) {
//       if(position.left <= 0) {
//         $('#meat_chara').css('left', '0px');
//       }
//       else {
//         $('#meat_chara').css('left', '536px');
//       }
//     }
//   }
  function enemy_spawn() {
    if(Math.random() > enemy_chance && /*$(".enemy_box").length % enemy_survived &&*/ gameOver === false) {
      var enemy;
      var enemy_pos = (Math.random() * (536));
      enemyXPositions.push(enemy_pos);
      enemyYPositions.push(650);
      enemy = document.createElement('div');
      enemy.setAttribute('class', 'enemy_box');
      enemy.setAttribute('id', "enemy_" + enemy_id);
      enemy.style.left = enemy_pos + "px";
      enemy.style.bottom = 625 + 'px';
      play_stage.appendChild(enemy);
      enemyList.push(document.getElementById("enemy_" + enemy_id));
      enemy_id++;
    }
    if (gameOver === true) {
      $(".enemy_box").remove();
    }
  }

    function remove_explosion() {
    this.remove();
    $('#enemy_kill_' + kill_count).off('animationend', remove_explosion);
    //clearInterval(game_timer);
    // $(".enemy_box").remove();
    // $('#beach_wrap').append("<h2>Game Over!</h2>");
  }

  function remove_flicker() {
   // console.log("removing flicker");
    $('.run_flicker').off('animationend', remove_flicker);
    $('#damage_box').removeClass('run_flicker');
  }

  function remove_shoot() {
//    console.log("removing volcano shoot");
    $('.volcano_shoot').on('animationend', remove_shoot);
    $('#volcano').removeClass('volcano_shoot');
  }

  function remove_Rskew() {
//    console.log("removing right skew");
    $('.skew_right').off('animationend', remove_Rskew);
    $('#skew_box').removeClass('skew_right');
  }

  function remove_Lskew() {
//    console.log("removing left skew");
    $('.skew_left').off('animationend', remove_Lskew);
    $('#skew_box').removeClass('skew_left');
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
