# api-nfl-schedule

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