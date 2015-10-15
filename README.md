# api-nfl-schedule

[![Codeship](https://img.shields.io/codeship/83dc5250-537f-0133-864a-76919038d6b2/develop.svg)](https://codeship.com/projects/83dc5250-537f-0133-864a-76919038d6b2/status?branch=develop)
[![node](https://img.shields.io/badge/node-%3E%3D4.2.1-lightgrey.svg)]()
[![npm](https://img.shields.io/badge/npm-%3E%3D2.14.7-lightgrey.svg)]()
[![dependencies](https://img.shields.io/david/n8io/api-nfl-schedule.svg)]()
[![devDependencies](https://img.shields.io/david/dev/n8io/api-nfl-schedule.svg)]()

## Getting started
1. Install [Docker](http://www.docker.com/toolbox)
2. `npm install`
3. `npm run docker-local`
4. `open http://$(docker-machine ip default):4101/heartbeat`
5. Make code changes...
6. Go to step 3. Repeat.

## Testing
1. `HOST=$(docker-machine ip default) npm run test-unit` # To run unit tests
2. `HOST=$(docker-machine ip default) npm run test-integration` # To run integration tests
3. `HOST=$(docker-machine ip default) npm run tests` # To run all tests