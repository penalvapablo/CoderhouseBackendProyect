#  Coderhouse Final Proyect

## Ecommerce
[Project guidelines](https://docs.google.com/document/d/1XmStDW5LJFpTN-yaMuVK09rrYmjMLOwZPrHTUE2jLIM/edit?usp=sharing)

### Pre requirements

_**NODE:**_

Download and install  [nodejs](https://nodejs.org/es/).

### Getting started

1.  Clone the repository

2.  Install NPM packages

```bash
npm install
```
3. Start the server
```bash
npm start
```
4. Go to localhost:8080 to sign up. Then login to get the token. You can try the chat in the web, going to localhost:8080/chat. To try the products, carts and orders endpoints, read the  _[Endpoints Documentation](https://documenter.getpostman.com/view/17950634/UVyvutr4)_ 
5. If you login with user admin@admin, password "admin", yo can answer the chat messages as if you were the administrator

## Features

 - **Express** : web application framework
 - **MongoDB** :  NOSql Database
 - **Mongoose** library that creates a connection between MongoDB and Express
 - **Nodemailer**: Mail manager
 - **EJS**: templating language for the sing up, login and chat views
 - **JWT** : Authorization token generator
 - **Bcrypt** : password encryptor
 - **Socket.io**: library for real-time web applications. Used for the chat
