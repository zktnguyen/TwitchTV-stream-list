
(function($) {
  var display = $(".display-list");
  var all_users = $("#all-users");
  var online_users = $("#online-users");
  var offline_users = $("#offline-users");
  var select = $(".select-status");
  var users = ["Doublelift", "ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "brunofin", "comster404", "dfx"];
  var users_streams = {};
  var users_logos = {};
  var users_twitchName = {};
  function gatherData(data, username){
    var args = Array.from(arguments);
    if (data.error){
      users_streams[username] = "Unavailable";
      users_logos[username] = null;
      users_twitchName[username] = username;
    }
    else {
      users_logos[username] = data.logo;
      users_streams[username] = "https://twitch.tv/" + data.name;
      users_twitchName[username] = data.name;
    }
    getData("streams", username);
  }
  function addToList(list, username, status){
    var twitchUser = users_twitchName[username];
    var logo = users_logos[username] != null ? 
    users_logos[username] : "https://via.placeholder.com/120";
    var stream_status = status === "Online" ? 
    "glyphicon glyphicon-play-circle" : "glyphicon glyphicon-off";
    var link = users_streams[username] != "Unavailable" ? 
    users_streams[username] : "https://twitch.tv";
    var html = "<a href=' " +  link + "' target='_blank'><li><img class='logo' src=' " 
    + logo +
    "' alt='" 
    + twitchUser + 
    "'><br><div class='logo-caption'><span class='" + stream_status + "'>" 
    +
    "</span><h4>" + twitchUser + "</h4></div></li></a>";
    list.append(html);
    status === "Online" ?
    all_users.prepend(html) : all_users.append(html);
    // list.append(users_twitchName[username]);
    // all_users.append(users_twitchName[username]);
  }
  
  function setStream(data, username){
    if (data.stream){
      addToList(online_users, username, "Online");
    }
    else {
      addToList(offline_users, username, "Offline");
    }
  }
  

  function getData(type, username){
    $.ajax({
      url: "https://wind-bow.glitch.me/twitch-api/" + type + "/" + username,
      dataType: "jsonp",
      success: function(data){
        if (type === "users"){
          gatherData(data, username); 
        }
        else if (type === "streams"){
          setStream(data, username);
        }
      },
      
    });
  }

  function start(){
    for (var i = 0; i < users.length; i++){
      getData("users", users[i]);
    }
    
  }
  start();
  select.click(function(){
    select.removeClass('active');
    $(this).addClass('active');
    var status = $(this).attr('id');
    switch(status){
      case "all":
        display.removeClass('hide');
        online_users.addClass('hide');
        offline_users.addClass('hide');
        break;
      case "online":
        display.removeClass('hide');
        all_users.addClass('hide');
        offline_users.addClass('hide');
        break;
      case "offline":
        display.removeClass('hide');
        online_users.addClass('hide');
        all_users.addClass('hide');
        break;
    }
  });
})(jQuery);