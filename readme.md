# Tech-Blog-MVC-Practice
A simple blog-posting application based on an express-node-sequelize stack with handlebars-based rendering of html views. 

A working demo of the application can be viewed at:
https://tech-blog-mvc-practice.herokuapp.com/

## Author
github.com/daniel-gregg

## Description
This blog-posting application was developed as an initial foray into learning about the creation of an express application and integration with sequelize (providing a js-based linkage to a MYSQL database) and handlebars (a rendering engine that provides rapid integration of html views with express routing appraoches).

Key learnings from this project were:
- Setting up deployment of express applications on Heroku
- Development of express routing approaches to control database integrations, login-signup-logout processes, and controlling of html views
- Use of the handlebars framework (https://handlebarsjs.com/) to render html views and to facilitate creation of reusable elements

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)

## Installation
- You must have Node installed on your computer. See here https://nodejs.org/en/download/. 
- Check that you have the latest version of npm installed. In node type this into the console: 'npm install npm@latest -g'
- npm must first be initialised using 'npm init' in your working directory
- dependencies can then be installed using 'npm install PACKAGE' where 'PACKAGE' refers to the relevant dependency. 

### Dependencies include:
- mysql2
- sequelize
- express
- dotenv

Additional option dependies are:
- nodemon

### Set up your local environment
A .envexample file is included in the github repository - use this as a guide if you wish to install on your local computer by replacing it with your own .env file. 

## Usage
Two classes of user are catered for at https://tech-blog-mvc-practice.herokuapp.com/: (1) viewers and (2) users.
### Viewers can:
- View all current posts
- Signup to become a user

### Users can:
- Comment on published posts
- Add a new post
- Update their bio

## Features
The application links to a MYSQL database providing for persistent data. Session storage is used to save the logged in status of the user. 
