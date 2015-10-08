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
      "AT-43",
      "Alhambra",
      "Anima Tactics",
      "Apples to Apples",
      "Atlantis",
      "Axis and Allies",
      "Babylon 5",
      "Backgammon",
      "Balderash",
      "Bang",
      "Bananagrams",
      "Battlefleet Gothic",
      "Battleship",
      "Battlestar Galactica",
      "BattleTech",
      "Black Powder",
      "Blitzkreig Commander",
      "Blood Bowl",
      "Blucher",
      "Bolt Action",
      "Boomerang",
      "Call of Cthulhu",
      "Candyland",
      "Carcassonne",
      "Cards Against Humanity",
      "Car Wars",
      "Caylus",
      "Checkers",
      "Chess",
      "Chinese Checkers",
      "Chutes and Ladders",
      "Clue",
      "Confrontation",
      "Confrontation: Age of Ragnarok",
      "Connect Four",
      "Cosmic Encounter",
      "Coyote",
      "Cranium",
      "Crossfire",
      "Cry Havoc",
      "Deadlands: Doomtown",
      "De Bellis Antiquitatis",
      "De Bellis Multitudinis",
      "Descent: Journeys in the Dark",
      "Discworld – Ankh-Morpork",
      "Diplomacy",
      "Dixit",
      "Dominos",
      "Don't Break the Ice",
      "Dust Tactics",
      "Dust Warfare",
      "El Grande",
      "Epic Armageddon",
      "Dominion",
      "Dominant Species",
      "Dreadfleet",
      "Dungeon!",
      "Dungeons & Dragons",
      "Dungeons & Dragons: Attack Wing",
      "Dropzone Commander",
      "Dystopian Wars",
      "Flames of War",
      "Field of Glory",
      "Fire and Fury",
      "Firestorm Armada",
      "Full Thrust",
      "Game of Life",
      "Game of Thrones CCG",
      "Galaxy Trucker",
      "Go",
      "The Golden City",
      "Gorkamorka",
      "Guess Who?",
      "Hail Caesar",
      "Hanabi",
      "Havre",
      "Hearts",
      "Hell Dorado",
      "HeroClix",
      "Hi Ho! Cherry-O",
      "Hordes",
      "Infinity",
      "Key to the Kingdom",
      "Kings of War",
      "Lasalle",
      "Legend of the Five Rings",
      "Lord of The Rings",
      "The Lord of the Rings TGC",
      "Mage Knight",
      "Magic: The Gathering",
      "Mahjong",
      "Malifaux",
      "Mancala",
      "Man O' War",
      "Mars Attacks",
      "Mastermind",
      "Maurice",
      "Mechwarrior",
      "Mercs",
      "Middle Earth",
      "Monopoly",
      "Mordheim",
      "Napoleon's Battles",
      "Necromunda",
      "Netrunner",
      "Nippon",
      "Operation",
      "Othello",
      "Pandemic",
      "Parchesi",
      "Pathfinder",
      "Pay Day",
      "Pictionary",
      "Pirates of the Spanish Main",
      "Pokemon TCG",
      "Poker",
      "Power Grid",
      "Puerto Rico",
      "Reversi",
      "Risk",
      "Saga",
      "Sails of Glory",
      "Say Anything",
      "Scattergories",
      "Scotland Yard",
      "Scrabble",
      "Set",
      "Settlers of Catan",
      "Shadowrun",
      "Shadows Over Camelot", 
      "Shogun",
      "Song of Blades and Heroes",
      "Sorry",
      "Space Hulk",
      "Spades",
      "Small World",
      "Star Trek: Attack Wing",
      "Star Wars: Armada",
      "Star Wars CCG",
      "Star Wars: X-Wing",
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
      "The Uncharted Seas",
      "Vampire: The Eternal Struggle",
      "Warhammer",
      "Warhammer Ancients",
      "Warhammer: Age of Sigmar",
      "Warhammer: 40k",
      "Warmachine",
      "Warmachine/Hordes",
      "Warmaster",
      "War of the Ring",
      "Warzone",
      "Wings of Glory",
      "Wings of War",
      "Wits and Wagers",
      "World of Warcraft TGC",
      "Yahtzee",
      "Yu-Gi-Oh"
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

    function getPictures(gamepostId) {
      return $http({
        method: "GET",
        url: "/gameposts/" + gamepostId + "/pictures"
      })
      .then(function(resp){
        return resp.data;
      })
      .catch(function(err){
        console.log("getPictures service error: ", err)
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
      deleteGame: deleteGame,
      getPictures: getPictures
  	};
  };

})();
