Adding Auth
## Description

* Secure a new express-mongoose REST API data server.
* Allows the following CRUD methods: get all, get, add new (post).

* The routes for the resource are protected, meaning a request has to come from a logged in user that presents an access token.

* This application will provide:

* Unprotected auth routes for: `signin` and `signup` for user management that return a token on success.
* A user model that can hash passwords and also compare a subsequent password
* Middleware function that "protects" the resource route