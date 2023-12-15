# News Aggregator API
Objective: Build a RESTful API that allows users to fetch news articles from multiple sources based on their preferences.

## Table of Contents

- [Implementation](#implementation)
- [Routes](#routes)
- [Installation](#installation)
- [To Start Server](#startServer)

## Implementation
- Review the project from Week 2 and identify potential security vulnerabilities.
- Implement input validation and sanitization for user registration, event creation, and updates.
- Optimize performance by implementing caching, which was implemented by me in previous week's optional extension.
- Set up unit testing and write test cases for the API endpoints, focusing on testing input validation and proper functioning of CRUD operations but still I was not able to cover all the test cases
- Refactored the API code to improve error handling, ensuring that appropriate error messages are returned for different types of errors (e.g., validation errors, authentication errors, authorization errors, and server errors).
- Tested the API using Postman or Curl to ensure it works as expected and that the implemented security measures are effective.

## Routes

- POST api/register: Register a new user.
- POST api/login: Log in a user.
- GET api/preferences: Retrieve the news preferences for the logged-in user.
- PUT api/preferences: Update the news preferences for the logged-in user.
- GET api/news: Fetch news articles based on the logged-in user's preferences.
- POST api/news/:id/read: Mark a news article as read.
- POST api/news/:id/favorite: Mark a news article as a favorite.
- GET api/news/read: Retrieve all read news articles.
- GET api/news/favorites: Retrieve all favorite news articles.
- GET api/news/search/:keyword Search article' based on keyword from title, description and content.
- 
## Installation
npm install

## To Start Server
- cd src
- run this command:- nodemon
## To Run Test Cases
- npm run test
