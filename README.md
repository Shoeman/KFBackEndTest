# KFBackEndTest
Built using:
- NodeJS v18.x
- Requests handled with Axios

Unit tested with Jest, dependencies audited with npm.

## Setup

Checkout the project and run `npm install`

For running in development mode, add the following environment variables to .env at the project root:
```
KF_API_URL=<API URL>
KF_API_KEY=<API KEY>
```
If running prod, these environment variables need to be set.
If you wish to use a different site-id, you may set it with `KF_SITE_ID`, otherwise `"norwich-pear-tree"` will be used.

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
- Cater for 500 response

## Nice to have
- Code coverage
- Higher level mocking for api calls
