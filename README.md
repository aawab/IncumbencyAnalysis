# Incumbency Analysis

Web app to allow analysis of state redistricting maps between 2020 and 2022 to determine whether or not redistricting by parties had any maliciouse intent, i.e to undermine the voting power of certain candidates to prevent incumbency.

## To Run Client

`cd client` and run `npm install`  

Once it's finished, run `npm start`
## To Run Server

### Install latest version of gradle, use Java version 1.17

`cd server` and run `./gradlew bootRun`

The server is bound to port 8080

## To Set Up Database

Create a new database and collection in mongoDB both called `state` and import `database.json`

![](./screenshots/screenshot1.png)

![](./screenshots/screenshot2.png)