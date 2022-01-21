# My Movies App Server
My Assets App is an application to manage your movie. This app has : 
* RESTful endpoint for asset's CRUD operation
* JSON formatted response

&nbsp;

## RESTful endpoints

### POST /movies

> Create movie based on specified req.body inputs. User Id will be assigned automatically based on the creator's Id.

_URL_
```
/movies
```
_Method_
```
POST
```

_URL Paramas_
```
None
```

_Request Headers_
```
{
  "access_token" : "<JWT_TOKEN>"
}
```

_Request Body_
```
{
    "title": "<movie title for input>",
    "synopsis": "<movie synopsis for input>",
    "trailerUrl": "<movie trailerUrl for input>",
    "imgUrl": "<movie imgUrl for input>",
    "rating": "<movie rating for input>",
    "genreId": "<movie genreId for input>",
    "authorId": "<movie authorId for input>",
}
```

_Response (201) - Created_
```
{   "id": "<id give by>"
    "title": "< inputted movie title>",
    "synopsis": "<inputted movie synopsis>",
    "trailerUrl": "<inputted movie trailerUrl>",
    "imgUrl": "<inputted movie imgUrl>",
    "rating": "<inputted movie rating>",
    "genreId": "<inputted movie genreId>",
    "authorId": "<inputted movie authorId>",
}
```

_Response (400 - Bad Request)_
```
{
  "message": "Title is required"
}
```
---
### GET /movies

> View all available movie in database.

_URL_
```
/movies
```
_Method_
```
GET
```

_URL Paramas_
```
None
```

_Request Headers_
```
{
  "access_token" : "<JWT_TOKEN>"
}
```

_Request Body_
```
Not needed
```

_Response (200)_
```
{
    "id": <given id by system>,
    "title": "<posted title>",
    "synopsis": "<posted synopsis>",
    "trailerUrl": "<posted trailerUrl>",
    "imgUrl": "<posted imgUrl>",
    "rating": "<posted rating>",
    "genreId": "<posted genreId>",
    "authorId": "<posted authorId>",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z"
}
```
_Response (400 - "Bad Request")_
```
{
  "message": "SequelizeValidationError""
}
```

_Response (400 - Bad Request)_
```
{
  "message": "Bad Request"
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```
---
### GET /movies/;id

> Get available movie based on params id


__URL_
```
/movies/:id
```
_Method_
```
GET
```

_URL Paramas_
```
Movies Id AS id
```

_Request Headers_
```
{
  "access_token" : "<JWT_TOKEN>"
}
```

_Request Body_
```
Not needed
```

_Response (200)_
```
[
  {
    "id": 1,
    "title": "<movie title>",
    "synopsis": "<movie synopsis>",
    "trailerUrl": "<movie trailerUrl>",
    "imgUrl": "<movie imgUrl>",
    "rating": "<movie rating>",
    "genreId": "<movie genreId>",
    "authorId": "<movie authorId>",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
  }
]
```

_Response (404 - "Not Found")_
```
{
  "message": "Movie Not Found""
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```
---
### Update /movies/:id

> Update all parameters/properties on specified movie based on paramas id

_URL_
```
/movies/:id
```
_Method_
```
PUT
```

_URL Paramas_
```
Movies Id AS id
```

_Request Headers_
```
{
  "access_token" : "<JWT_TOKEN>"
}
```

_Request Body_
```
Not needed
```

_Response (200)_
```
[
  {
    "id":  "<specified by params>",
    "title": "<movie title>",
    "synopsis": "<movie synopsis>",
    "trailerUrl": "<movie trailerUrl>",
    "imgUrl": "<movie imgUrl>",
    "rating": "<movie rating>",
    "genreId": "<movie genreId>",
    "authorId": "<movie authorId>",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
  }
]
```
_Response (400 - "Bad Request")_
```
{
  "message": "SequelizeValidationError""
}
```

_Response (404 - "Not Found")_
```
{
  "message": "Movie Not Found""
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```
---
### Delete /movies/:id

> Delete specified movie based on params id

_URL_
```
/movies/:id
```
_Method_
```
DELETE
```

_URL Paramas_
```
Movies Id AS id
```

_Request Headers_
```
{
  "access_token" : "<JWT_TOKEN>"
}
```

_Request Body_
```
Not needed
```
_Response (200)_
```
{
  "messages": "<entity_name> success to delete"
}
```

_Response (404 - "Not Found")_
```
{
  "message": "Movie Not Found""
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```
---
### Register Admin

> Register User with role "Admin"

_URL_
```
/register
```
_Method_
```
POST
```

_URL Paramas_
```
Not needed
```

_Request Headers_
```
{
  "access_token" : "<JWT_TOKEN>"
}
```

_Request Body_
```
{
    "username": "<username>",
    "email": "<email>",
    "password": "<password>",
    "phoneNumber": "<phone number>",
	  "address": "<address>
}
```
_Response (201)_
```
{
	"messages": {
		"id": "<assigned by system>",
		"email": "<registered email>"
	}
}
```
_Response (400 - "Bad Request")_
```
{
  "messages": [
		"Username is required",
		"Email is required",
		"Password is required",
		"Password length minimum 5"
	]
}
```

_Response (404 - "Not Found")_
```
{
  "message": "Movie Not Found""
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```
---
### Login User & Admin

> Login User & Admin

_URL_
```
/sign-in
```
_Method_
```
POST
```

_URL Paramas_
```
Not needed
```

_Request Headers_
```
{
  "access_token" : "<JWT_TOKEN>"
}
```

_Request Body_
```
{
    "email": "<email>",
    "password": "<password>"
}
```
_Response (200)_
```
{
	"access_token": "<JWT_TOKEN>"
}
```
_Response (400 - "Bad Request")_
```
{
  "messages": [
		"Email/Password is required"
	]
}
```

_Response (401 - "Unauthorized")_
```
{
  "messages": [
		"Invalid Password"
	]
}
```

_Response (404 - "Not Found")_
```
{
  "messages": [
		"Email doesn't exists"
	]
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```
---

