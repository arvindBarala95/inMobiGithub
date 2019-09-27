# InMobi Github

### IDE

[Visual studio code](https://code.visualstudio.com/)

after installing visual studio install eslint plugin on it for linting.

### Prerequisites

Node v8.9.4, npm v5.6.0 and mysql. Links are given below

* [Node](https://nodejs.org/en/) - download link
* [mysql](https://dev.mysql.com/downloads/mysql/) - download link
* For mysql use this command 
   * ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'mysql@123';
   * mysql -uroot -pmysql@123
* Create 2 table(user,user_history) using resources folder query

### Installing

clone the  repository
```
git clone https://github.com/gilllu/inMobiGithub.git
```

## Running the project

```
npm install
```

```
node app.js
```

## API
* API for get user profile :  user is github logged in user
```
http://localhost:8421/v1/inMobi/gitHub/:user?gitHubUser=avish
```
* API for get user history :
```
http://localhost:8421/v1/inMobi/gitHub/history/:user
```

* API for delete user history:
```
http://localhost:8421/v1/inMobi/gitHub/history/:user -d '{"user":"deepak"}'
```



### Who do I talk to? ###

* InMobi GitHub