# SERVER

- ```cd server && npm i```
- create .env file and add:
  - PORT = *choose a port number*
  - JWT_SECRET = *choose a secret*
  - CLIENT_URL = 'http://localhost:3000' OR deployed client url
  - DATABASE_URL = postgresql://\<pg-user\>:\<pg-password\>@localhost/\<app-name\>
- create a local **postgres** database with the name of <app-name>
- run ```nodemon``` command in terminal

Your server should be running! 
