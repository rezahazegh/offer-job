# Directory Structure
* `document`: provides some flowcharts of the complex flows in the app
* `infra`: contains required files to setup db via docker
* `payload`: provides a couple of response payloads

# Setup project on the dev env
## Requirements
you need to have `docker` and `node.js` on your system.

### 1- Setup DataBase
run `npm run infra:up` to get up and running db via docker compose

### 2- Run The App
run `npm run start:dev` to run the app

### 3- Call fetch-offers
send a `Get` request to `http://localhost:3000/offer`


