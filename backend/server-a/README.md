# Server A

This directory is for the code and documentation of the _server A_. A starter Dockerfile has been added, it has some comments to get you started.

For communicating with RabbitMQ, there are many possible approaches. In the `rabbit-utils`-directory, in _receiveTask.js_ and _sendTask.js_ files, you can see simple examples of code that can be integrated into Swagger server stub's `Order`-controller. These have been directly copied from RabbitMQ examples, and can be improved a lot for this system.

Server-a runs on **`http://localhost:5001/api`**. The default users' credentials can be found [HERE](./data/users.js)



# User Endpoint

The server provides an endpoint to **LOGIN** user and **REGISTER** new user. This two end points provide means of generating **TOKEN** required to access other resources provided by the server.
By default, the server creates [default users](./database/defaultData.js).

## CREATE OR REGISTER USER ENDPOINT

To register a new user, the client should make a `POST` request to http://localhost:5000/auth with the authorization header containing the username and password of the user in the format `Basic username:password`

### EXAMPLE REQUEST

METHOD: `POST`  
ENDPOINT: `http://localhost:5001/auth`  
REQUEST-HEADER: `"Authorization" : "Basic username:password"`  
**Note:** `"username:password"` must be encoded to **base-64** (e.g using btoa() as in JavaScript)

### EXAMPLE RESPONSE

```json
{
    "user": {
        "_id": "6078d1a072e3d9032896343a",
        "username": "user",
        "createdOn": "2021-04-15T23:52:00.891Z",
        "__v": 0
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXJuYW1lIiwicGFzc3dvcmQiOiJwYXNzd29yZCIsImlhdCI6MTYxODUzMDcyMH0.oolsilUBXSpMAQLAu-t0fK-ahhWWN-d3LID7-yJHljA"
}
```

## LOGIN USER ENDPOINT

To login an existing user, the client should make a `GET` request to http://localhost:5001/auth with the authorization header containing the username and password of the user in the format `Basic username:password`

### EXAMPLE REQUEST

METHOD: `GET`  
ENDPOINT: `http://localhost:5001/auth`  
REQUEST-HEADER: `"Authorization" : "Basic username:password"`  
**Note:** `"username:password"` must be encoded to **base-64** (e.g using `btoa()` as in JavaScript)

### EXAMPLE RESPONSE

```json
{
    "user": {
        "_id": "6078d1a072e3d9032896343a",
        "username": "user",
        "createdOn": "2021-04-15T23:52:00.891Z",
        "__v": 0
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXJuYW1lIiwicGFzc3dvcmQiOiJwYXNzd29yZCIsImlhdCI6MTYxODUzMDg5MX0.SCE2g3M7UXbHo3V--GIqQP0C6YQlQuXZnhSdzNMhxaM"
}
```


# SANDWICH ENDPOINTS

## ADD A SANDWICH

To get add a sandwich, make a **POST** request to `http://localhost:5001/api/sandwich/` with a sandwich object in the body of the request. It will return the newly created sandwich object with the \_id. Set the authorization header using the **token** generated during login/register of the user in the format `Bearer token`.

#### EXAMPLE

REQUEST: => `POST http://localhost:5001/api/sandwich/`
REQUEST-HEADER: `"Authorization" : "Bearer token"`  
REQUEST BODY

```json
{
	"name": "my-super-sandwich",
	"toppings": [
		{
			"name": "cheese"
		}
	],
	"description": "string",
	"imageUrl": "string",
	"breadType": "oats"
}
```

RESPONSE:

```json
{
	"_id": "606b2a684ad7ce001596aa1a",
	"name": "my-super-sandwich",
	"toppings": [
		{
			"_id": "606b2a684ad7ce001596aa1b",
			"name": "cheese"
		}
	],
	"description": "string",
	"imageUrl": "string",
	"breadType": "oats"
}
```

## GET A SANDWICH

To get a sandwich, make a **GET** request to `http://localhost:5001/api/sandwich/:sandwichId` with the authorization header containing the **token** generated during login/register of the user in the format `Bearer token`. Where `sandwichId` is the id of the sandwich you want. It will return an object of sandwich type.

#### EXAMPLE

REQUEST: => `GET http://localhost:5001/api/sandwich/606b2a684ad7ce001596aa1a`
REQUEST-HEADER: `"Authorization" : "Bearer token"`  
RESPONSE:

```json
{
	"_id": "606b2a684ad7ce001596aa1a",
	"name": "my-super-sandwich",
	"toppings": [
		{
			"_id": "606b2a684ad7ce001596aa1b",
			"name": "cheese"
		}
	],
	"description": "string",
	"imageUrl": "string",
	"breadType": "oats"
}
```

## GET ALL SANDWICHES

To get all sandwiches, make a **GET** request to `http://localhost:5001/api/sandwich` with the authorization header containing the **token** generated during login/register of the user in the format `Bearer token`. This will return an array of sandwich objects.

#### EXAMPLE

REQUEST: => `GET http://localhost:5001/api/sandwich`
REQUEST-HEADER: `"Authorization" : "Bearer token"`  
RESPONSE:

```json
[
	{
		"_id": "606b2a684ad7ce001596aa1a",
		"name": "my-super-sandwich",
		"toppings": [
			{
				"_id": "606b2a684ad7ce001596aa1b",
				"name": "cheese"
			}
		],
		"description": "string",
		"imageUrl": "string",
		"breadType": "oats"
	},
	{
		"_id": "606b2aa64ad7ce001596aa1c",
		"name": "boring-sandwich",
		"toppings": [
			{
				"_id": "606b2aa64ad7ce001596aa1d",
				"name": "becon"
			}
		],
		"description": "string",
		"imageUrl": "string",
		"breadType": "wheat"
	}
]
```

## MODIFY A SANDWICH

To get modify a sandwich, make a **POST** request to `http://localhost:5001/api/sandwich/:sandwichId` with a sandwich Id you wish to modify and the modified sandwich object in the body of the request. It will return the old sandwich object. Set the authorization header using the **token** generated during login/register of the user in the format `Bearer token`.

#### EXAMPLE

REQUEST: => `POST http://localhost:5001/api/sandwich/606b2a684ad7ce001596aa1a`
REQUEST-HEADER: `"Authorization" : "Bearer token"`  
REQUEST BODY

```json
{
	"name": "my-super-sandwich",
	"toppings": [
		{
			"name": "cheese"
		},
		{
			"name": "bacon"
		}
	],
	"description": "string",
	"imageUrl": "string",
	"breadType": "oats"
}
```

RESPONSE:

```json
{
	"_id": "606b2a684ad7ce001596aa1a",
	"name": "my-super-sandwich",
	"toppings": [
		{
			"_id": "606b2a684ad7ce001596aa1b",
			"name": "cheese"
		}
	],

	"description": "string",
	"imageUrl": "string",
	"breadType": "oats"
}
```

## DELETE A SANDWICH

To delete a sandwich, make a **DELETE** request to `http://localhost:5001/api/sandwich/:sandwichId` where orderid is the id of the sandwich you wish to delete. It will return the deleted sandwich object. Set the authorization header using the **token** generated during login/register of the user in the format `Bearer token`.

#### EXAMPLE

REQUEST: => `DELETE http://localhost:5001/api/sandwich/606b2a684ad7ce001596aa1a`
REQUEST-HEADER: `"Authorization" : "Bearer token"`  
RESPONSE:

```json
{
	"_id": "606b2a684ad7ce001596aa1a",
	"name": "my-super-sandwich",
	"toppings": [
		{
			"_id": "606b31d74ad7ce001596aa24",
			"name": "cheese"
		},
		{
			"_id": "606b31d74ad7ce001596aa25",
			"name": "bacon"
		}
	],

	"description": "string",
	"imageUrl": "string",
	"breadType": "oats"
}
```

# ORDER ENDPOINT

## ADD AN ORDER

To get add an order, make a **POST** request to `http://localhost:5001/api/order/`
with an order object in the body of the request. It will return the newlyo created object of order type. Set the authorization header using the **token** generated during login/register of the user in the format `Bearer token`.

#### EXAMPLE

REQUEST: => `POST http://localhost:5001/api/order/`
REQUEST-HEADER: `"Authorization" : "Bearer token"`  
REQUEST BODY  
```json
{
	"sandwichIds": ["606b2a684ad7ce001596aa1a"],
	"status": "ordered"
}
```

RESPONSE:

```json
{
	"sandwichIds": ["606b2a684ad7ce001596aa1a"],
	"_id": "606b2f054ad7ce001596aa1e",
	"status": "ordered",
	"date": "2021-04-05T15:38:45.758Z"
}
```

## GET AN ORDER

To get an order, make a **GET** request to `http://localhost:5001/api/order/:orderId`,
where `orderId` is the id of the order you want. It will return an object of order type. Set the authorization header using the **token** generated during login/register of the user in the format `Bearer token`.

#### EXAMPLE

REQUEST: => `GET http://localhost:5001/api/order/606b2ffd4ad7ce001596aa21`
REQUEST-HEADER: `"Authorization" : "Bearer token"`

RESPONSE:

```json
{
	"sandwichIds": ["606b2aa64ad7ce001596aa1c", "606b2f714ad7ce001596aa1f"],
	"_id": "606b2ffd4ad7ce001596aa21",
	"status": "ready",
	"date": "2021-04-05T15:42:53.109Z"
}
```

## GET ALL ORDERS

To get all orders, make a **GET** request to `http://localhost:5001/api/order`
This will return an array of order objects. Set the authorization header using the **token** generated during login/register of the user in the format `Bearer token`.

#### EXAMPLE

REQUEST: => `GET http://localhost:5001/api/order`
REQUEST-HEADER: `"Authorization" : "Bearer token"`

RESPONSE:

```json
[
	{
		"sandwichIds": ["606b2a684ad7ce001596aa1a"],
		"_id": "606b2f054ad7ce001596aa1e",
		"status": "ready",
		"date": "2021-04-05T15:38:45.758Z"
	},
	{
		"sandwichIds": ["606b2aa64ad7ce001596aa1c", "606b2f714ad7ce001596aa1f"],
		"_id": "606b2ffd4ad7ce001596aa21",
		"status": "ready",
		"date": "2021-04-05T15:42:53.109Z"
	}
]
```

## MODIFY A ORDER (ADMINS ONLY)

To modify an order, make a **PUT** request to `http://localhost:5001/api/order/:orderId`, where `orderId` is the id of the order you want. Set an order object in the body of the request. It will return the newly created object of order type. Set the authorization header using the **token** generated during login/register of the user in the format `Bearer token`.

#### EXAMPLE

REQUEST: => `PUT http://localhost:5001/api/order/`
REQUEST-HEADER: `"Authorization" : "Bearer token"`  
REQUEST BODY  
```json
{
	"sandwichIds": ["606b2a684ad7ce001596aa1a"],
	"status": "ordered"
}
```

RESPONSE:

```json
{
	"sandwichIds": ["606b2a684ad7ce001596aa1a"],
	"_id": "606b2f054ad7ce001596aa1e",
	"status": "ordered",
	"date": "2021-04-05T15:38:45.758Z"
}
```

# RABBITMQ

server-a uses two queue to communicate with server-b.

**orderGenerationQueue** : This queue contains the newly placed order to be sent from server-a to server-b for processing.

**orderCompletionQueue** : This queue contains orders processed by server-b to be sent to server-a
