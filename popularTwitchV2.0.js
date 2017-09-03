//Boyan P

//it takes the top games from twitch.tv using their api
//then gets the streamers of those games
//using angular.js

$(document).ready(function(){
  
  var app = angular.module("popularTwitch", []);
  
  app.controller("twitchController",["$scope","$http", function($scope,$http){
    
    $scope.games;
    $scope.streamers = [];
    
    $http.get("https://api.twitch.tv/kraken/games/top?client_id=swheeu8yk5hiqgcgo69m58amq5ynn5").success(function(topGames){
      
      console.log(topGames);
      
      $scope.games = topGames.top;
      $scope.count=0;

     console.log($scope.games[0].game.name);
     var gameQuery;
     $scope.games.forEach(function(twitchGame,index){
       gameQuery = twitchGame.game.name.replace(/\s/g,"+");
       console.log();
			 gameQuery = gameQuery.replace("&","%26");// twitch api doesn't like having & in there. 
																								// it doesn't complain about : though
       
       //console.log($scope.count);
       $http.get("https://api.twitch.tv/kraken/streams?client_id=swheeu8yk5hiqgcgo69m58amq5ynn5&game="+gameQuery).success(function(streamers){
        
         $scope.streamers.push({game:streamers.streams[0].game,
                                streams:streamers.streams.slice(0,3)});
         console.log($scope.streamers);
         
       });
      //console.log($scope.streamers[0].game);

    });
      
    });

    
    
    
    
    
  }]);//controller
  

  
  
});//document ready