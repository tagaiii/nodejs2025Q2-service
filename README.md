# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone {repository URL}
```

## Move to the project directory

```
cd nodejs2025Q2-service
```

## Installing dependencies

```
npm install
```

## Create `.env` file with the content of `.env.example` file

## Running application

```
npm start
```

After starting the app on port (4000 as default) you can check it in **Postman** or **Swagger Editor**:

1.  Import doc/api.yaml file as collection to **Postman**
    or
2.  Insert api.yaml file content into **Swagger Editor**

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

To run all test with authorization

### Auto-fix and format

```
npm run lint
```

```
npm run format
```
