# Auth App
In this application we want to implement basic authentication using Node Express and MongoDB as a database.

## How to use the app
### Endpoints
### http://localhost:3000/signup
Use this endpoint with the method post to add new user to the application's database. Add username and password in the request's body.    
`Example: {"username":"ahmad","password":"ahmad123"}`

### http://localhost:3000/signin
Use this endpoint with the method post to sign in to the application with a valid uswer. Add username and password in the request's header in the basic authentication field.  

### Example:
`User Name:ahmad`
`Password:ahmad123`

### http://localhost:3000/users
Use this endpoint with the method get to get all users from application's database.
