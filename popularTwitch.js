$(document).ready(function(){
  
  var app = angular.module("popularTwitch",[]);
  
  app.controller("twitchController",["$scope",function($scope){
    
    $scope.games=[];
    fetchGameInfo(gameInfoHandler);
    $scope.data;
    
    //callback for fetchGameInfo
    function gameInfoHandler (infoArray){
      var gameNameList=[];
  
      $scope.games=infoArray;

      //$(".content").html("games : {{game.name}}");
      //console.log($scope.games[0].name);
      //$("body").append("why am i not working");
      for(var i =0; i<$scope.games.length;i++){
        gameNameList.push($scope.games[i].name);
        $scope.games[i].streamers = fetchStreamerInfo($scope.games[i].name);// pass it a list of the game names
                                                    // so it can look up the top 3 streamers of each game
        
      }
    
    //call the next function to get streamers
    //console.log(typeof gameNameList);

    }
    
    function streamerInfoHandler(streamerData){
     // console.log(streamerData.external);
      console.log("testing");
      for( var i = 0 ; i < $scope.games.length;i++){
        console.log("what about now?");
        for(var j = 0 ; j<streamerData.length;j++){
          console.log("$scope.games name: "+$scope.games[i].name + "streamerData  gamename: "+ streamerData[j].gameName );
          if($scope.games[i].name==streamerData[j].gameName){
            
            //$scope.games[i].streamers.push(streamerData[j]);
            console.log("In steamerHandler:"+ $scope.games[i].name, $scope.games[i].streamers);
          }
          
          
        } // j for loop loops through streamers
        
        
        
      }// i - for loop loops through the games
      
      
      
    }
    
    
    
    //----------------------------------------------------------
    
    
  

    
    
  }]);//controller
  
  
  app.directive("displayTwitchData",["$compile",function($compile){
    
    return{
      
      link:function(scope , elem , attrs ){
        
        scope.$watch(function(){
          
          
        })
        
        
        
      };
      
      
      
    }
    
    
  }]);//end directive
  




  
  


   
  
  
  
  
  
  
  
  
  
  
}); //document.ready





function fetchGameInfo (callback){
      
      var twitchgames = $.getJSON("https://api.twitch.tv/kraken/games/top?callback=?",function(twitchGames){
      
        //console.log(twitchGames);
        var t_games=[];
        twitchGames.top.forEach(function(twitchGame,index){
        
          //each object in t_games has the name,number of viewers and a picture for the game
          t_games.push({name:twitchGame.game.name,
                      viewers:twitchGame.viewers,
                      picture:twitchGame.game.box.large,
                      streamers:[]
                      
        });
        //console.log(twitchGame.game.name , twitchGame.viewers);
        //console.log(t_games[t_games.length-1].picture);// t_games
        
        
        
      });
      //console.log("this is t_games in fetchGameInfo: "+ t_games[1].name);
      callback &&callback.call(this,t_games);
    });//end getJSON
    
  }
    



function fetchStreamerInfo(gameName){
    
    var url="https://api.twitch.tv/kraken/streams?game=";
    var gameQuery;
    var streams=[];
    //for(var i = 0; i< gameName.length;i++){
      //twitch api returns an empty object at the end
      
      //console.log("typeof gameName:" + typeof gameName);
      //remove spaces from the game names so u can put them in the url
      if(typeof gameName === "string"){
        gameQuery = gameName.replace(/\s/g,"+");
        var streamers = $.getJSON(url+gameQuery,function(streamers){
        
          //console.log(streamers.streams[0].channel.display_name);
          streamers.streams.forEach(function(streamer,index){
            if(index<3){
              streams.push({streamerName: streamer.channel.display_name,
                          gameName:streamer.game,
                          streamUrl:streamer.channel.url,
                          streamViewers: streamer.channel.viewers
            
                          });
              console.log(streamer.channel.display_name,streamer.game, streamer.viewers);
            }
            //console.log(streams.length);
            
          });
        //console.log("the streams: "+ streams);
        return streams;
        });
      }
    //}

    }

    
    
  
  
  
 