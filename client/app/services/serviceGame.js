(function(){

  angular.module('imgame.service')
  .factory('GamePost', GamePost);

  function GamePost($http) {
    var gamesArray = [
      "7 Wonders",
      "A Game of Thrones",
      "Acquire",
      "Agricola",
      "Arkham Horror",
      "Alhambra",
      "Apples to Apples",
      "Atlantis",
      "Axis and Allies",
      "Backgammon",
      "Balderash",
      "Bang",
      "Bananagrams",
      "Battleship",
      "Battlestar Galactica",
      "Blood Bowl",
      "Boomerang",
      "Candyland",
      "Carcassonne",
      "Cards Against Humanity",
      "Caylus",
      "Checkers",
      "Chess",
      "Chinese Checkers",
      "Chutes and Ladders",
      "Clue",
      "Connect Four",
      "Cosmic Encounter",
      "Coyote",
      "Cranium",
      "Descent: Journeys in the Dark",
      "Discworld – Ankh-Morpork",
      "Diplomacy",
      "Dixit",
      "Dominos",
      "Don't Break the Ice",
      "El Grande",
      "Dominion",
      "Dominant Species",
      "Dungeon!",
      "Game of Life",
      "Galaxy Trucker",
      "Go",
      "The Golden City",
      "Guess Who?",
      "Hanabi",
      "Havre",
      "Hearts",
      "Hi Ho! Cherry-O",
      "Key to the Kingdom",
      "Mahjong",
      "Mancala",
      "Mastermind",
      "Monopoly",
      "Operation",
      "Othello",
      "Pandemic",
      "Parchesi",
      "Pay Day",
      "Pictionary",
      "Poker",
      "Power Grid",
      "Puerto Rico",
      "Reversi",
      "Risk",
      "Say Anything",
      "Scattergories",
      "Scotland Yard",
      "Scrabble",
      "Set",
      "Settlers of Catan",
      "Shadows Over Camelot", 
      "Shogun",
      "Sorry",
      "Spades",
      "Small World",
      "Stratego",
      "Summoner Wars",
      "Uno",
      "Taboo",
      "The Invasion of Canada",
      "Through the Ages: A Story of Civlization",
      "Ticket to Ride",
      "Tigris and Euphrates",
      "Trivial Pursuit",
      "Trouble",
      "Twilight Imperium",
      "Twighlight Struggle",
      "Wits and Wagers",
      "Yahtzee"
    ];

  	function create(gameInfo){
			return $http({
        method: 'POST',
        url: '/gameposts',
        data: gameInfo
      })
      .then(function(resp) {
        return resp.data;
      })
      .catch(function(err) {
        console.log("Create game Error: ", err);
        return err.data;
      });
  	};

    function myRequests(){
      return $http({
          method: 'GET',
          url: '/me/requests'
      })
      .then(function(requests){
        return requests.data;
      });
    };

    function myHostedGames(){
      return $http({
        method: 'GET',
        url: '/me/gameposts'
      })
      .then(function(gamePosts){
        return gamePosts.data;
      });
    };

    function gamepostRequest(gamepostId) {
      return $http({
        method: 'GET',
        url: '/gameposts/' + gamepostId + '/requests'
      })
      .then(function(requests){
        console.log("gamepostRequest resp: ", requests)
        return requests.data;
      })
    };

    function requestConfirm(request) {
      return $http({
        method: "PUT",
        url: "/requests/" + request.id,
        data: request
      })
      .then(function(resp) {
        console.log("requestConfirm service resp: ", resp);
        return resp.data;
      })
      .catch(function(err) {
        console.log("requestConfirm service Error: ", err);
        return err.data;
      });
    }

    function requestCancel(request) {
       console.log("request in service", request);
      return $http({
        method: "DELETE",
        url: "/requests/" + request.id,
        data: JSON.stringify(request)
      })
      .then(function(resp) {
        console.log("delete request: ", request);
        console.log("resp", resp);
        return resp.data;
      })
      .catch(function(err) {
        console.log("requestConfirm service Error: ", err);
        return err.data;
      });
    }

    function deleteGame(game){
      console.log("game", game);
      return $http({
        method: "DELETE",
        url: "/gameposts/"+ game.id
      })
      .then(function(resp) {
        console.log("deleteresp", resp);
        return resp.data;
      })
      .catch(function(err) {
        return err.data;
      })
    }
  	
  	return {
      gamesArray: gamesArray,
  		create: create,
      myHostedGames: myHostedGames,
      myRequests: myRequests,
      gamepostRequest: gamepostRequest,
      requestConfirm: requestConfirm,
      requestCancel: requestCancel,
      deleteGame: deleteGame
  	};
  };

})();
