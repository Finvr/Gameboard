# GAMEBOARD

  > An application for connecting people who want to play board games.
  
  http://gameboard-finvr.herokuapp.com/


## Table of Contents

1. [What is GAMEBOARD?](#what-is-GAMEBOARD)
1. [Team](#team)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Viewing the project](#viewing-the-project)
    1. [Running tests](#running-tests)
1. [Roadmap](#roadmap)
1. [Known Bugs](#known-bugs)
1. [Contributing](#contributing)


## What is GAMEBOARD?

> GAMEBOARD connects individuals who are looking to play games together. GAMEBOARD allows users to create and schedule games, as well as join games created by other users. Unregistered users can browse through existing games, and can join games after signing up through facebook. After completing a game, users can review their fellow players based on whether they showed up, and if they enjoyed their game with that player.

## Team

  - __Product Owner__: PyNate (Nathan Leonard)
  - __Scrum Master__: fangtingPrahl (Fangting Prahl)
  - __Development Team Members__: vaishr (Vaishnavi Reddy), trsreagan3 (Reagan Schiller), gato-gordo (Ignacio Prado)
  
## Requirements
- Postgresql
- Express 
- Angular 
- Node 

## Development

### Installing Dependencies

From within the root directory:

```sh
sudo npm install -g bower
npm install
bower install
```

### Viewing the project

Starting the database:
start postgresql using postgres.app, or 'psql' from the command line

Starting the server:
- navigate to root directory
- run nodemon server/server.js

In the Chrome browser:
- Navigate to : 
- localhost:3000


### Running tests
Follow all steps in "Viewing the project" then:

Front-end tests: 
(from the project root directory in a separate tab on the command line)
gulp karma

Back-end tests:
(from the project root directory in a separate tab on the command line)
gulp mocha OR npm test

## Schema

![Schema](/gameboard_schema.png)

## API

![API](/gameboardAPI.png)

## Known Bugs

- Currently this application is built for Google Chrome
- Mobile support has not yet been tested

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.
