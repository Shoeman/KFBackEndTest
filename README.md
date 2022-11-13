# KFBackEndTest
Built using:
- NodeJS v18.x

## Setup

Checkout the project and run `npm install`

For running in development mode, add the following environment variables to .env at the project root:
```
KF_API_URL=<API URL>
KF_API_KEY=<API KEY>
```
If running prod, these environment variables need to be set.

## Build Commands
_If using Windows: some commands will require Git Bash or PowerShell (Core)_

Clean: `npm run clean`

Compile: `npm run compile`

Unit tests: `npm run unittest`

Full checks and tests: `npm run test`

Full build and test suite: `npm run ci`

Run in development mode: `npm run dev`

Run in production mode: `npm run prod`

## TODO
- Filter outages by siteId devices
- Post outages
- Sort out index

## Nice to have
- Code coverage
- Cater for all api responses
- Higher level mocking for api calls
