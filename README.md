# api-nfl-schedule

## Getting started
1. Install [Docker](http://www.docker.com/toolbox)
2. `npm install`
3. `npm run docker-local`
4. `open http://$(docker-machine ip default):4101/heartbeat`
5. Make code changes...
6. Go to step 3. Repeat.


## Testing
1. `HOST=$(docker-machine ip default) npm test`