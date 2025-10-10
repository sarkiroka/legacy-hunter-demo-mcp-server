# Swagger Petstore API

## API Purpose
This API allows users to manage pets, place orders, and manage user accounts in the Swagger Petstore.

## Endpoints Description

### 1. Add a new pet to the store
**Endpoint:** `/pet` (POST)

**Description:** Adds a new pet to the store.

**Example Request:**
```json
{
  "name": "doggie",
  "photoUrls": ["http://example.com/dog.jpg"],
  "category": {
    "id": 1,
    "name": "Dogs"
  },
  "tags": [
    { "id": 1, "name": "tag1" }
  ],
  "status": "available"
}
```

**Example Response:**
```json
{
  "id": 10,
  "name": "doggie",
  "category": {
    "id": 1,
    "name": "Dogs"
  },
  "photoUrls": ["http://example.com/dog.jpg"],
  "tags": [
    { "id": 1, "name": "tag1" }
  ],
  "status": "available"
}
```

**HTTP Status Codes:**
- 200: Successful operation
- 400: Invalid input
- 422: Validation exception

### 2. Update an existing pet
**Endpoint:** `/pet` (PUT)

**Description:** Updates an existing pet by ID.

**Example Request:**
```json
{
  "id": 10,
  "name": "doggie",
  "photoUrls": ["http://example.com/dog_updated.jpg"],
  "category": {
    "id": 1,
    "name": "Dogs"
  },
  "tags": [
    { "id": 1, "name": "tag1" }
  ],
  "status": "available"
}
```

**Example Response:**
```json
{
  "id": 10,
  "name": "doggie",
  "category": {
    "id": 1,
    "name": "Dogs"
  },
  "photoUrls": ["http://example.com/dog_updated.jpg"],
  "tags": [
    { "id": 1, "name": "tag1" }
  ],
  "status": "available"
}
```

**HTTP Status Codes:**
- 200: Successful operation
- 400: Invalid ID supplied
- 404: Pet not found
- 422: Validation exception

### 3. Find Pets by Status
**Endpoint:** `/pet/findByStatus` (GET)

**Description:** Finds pets by status.

**Example Request:**
```
GET /pet/findByStatus?status=available
```

**Example Response:**
```json
[
  {
    "id": 10,
    "name": "doggie",
    "status": "available"
  }
]
```

**HTTP Status Codes:**
- 200: Successful operation
- 400: Invalid status value

### 4. Find Pets by Tags
**Endpoint:** `/pet/findByTags` (GET)

**Description:** Finds pets by tags.

**Example Request:**
```
GET /pet/findByTags?tags=tag1,tag2
```

**Example Response:**
```json
[
  {
    "id": 10,
    "name": "doggie",
    "tags": [{ "id": 1, "name": "tag1" }]
  }
]
```

**HTTP Status Codes:**
- 200: Successful operation
- 400: Invalid tag value

### 5. Get Pet by ID
**Endpoint:** `/pet/{petId}` (GET)

**Description:** Returns a single pet by ID.

**Example Request:**
```
GET /pet/10
```

**Example Response:**
```json
{
  "id": 10,
  "name": "doggie"
}
```

**HTTP Status Codes:**
- 200: Successful operation
- 400: Invalid ID supplied
- 404: Pet not found

### 6. Update a Pet with Form Data
**Endpoint:** `/pet/{petId}` (POST)

**Description:** Updates a pet resource based on form data.

**Example Request:**
```
POST /pet/10?name=newName&status=sold
```

**Example Response:**
```json
{
  "id": 10,
  "name": "newName",
  "status": "sold"
}
```

**HTTP Status Codes:**
- 200: Successful operation
- 400: Invalid input

### 7. Delete a Pet
**Endpoint:** `/pet/{petId}` (DELETE)

**Description:** Deletes a pet.

**Example Request:**
```
DELETE /pet/10
```

**Example Response:**
```json
{
  "message": "Pet deleted successfully"
}
```

**HTTP Status Codes:**
- 200: Pet deleted
- 400: Invalid pet value

### 8. Upload an Image
**Endpoint:** `/pet/{petId}/uploadImage` (POST)

**Description:** Uploads an image of the pet.

**Example Request:**
```
POST /pet/10/uploadImage
```

**Example Response:**
```json
{
  "code": 200,
  "type": "success",
  "message": "Image uploaded successfully"
}
```

**HTTP Status Codes:**
- 200: Successful operation
- 400: No file uploaded
- 404: Pet not found

### 9. Get Inventory
**Endpoint:** `/store/inventory` (GET)

**Description:** Returns pet inventories by status.

**Example Request:**
```
GET /store/inventory
```

**Example Response:**
```json
{
  "available": 10,
  "pending": 5
}
```

**HTTP Status Codes:**
- 200: Successful operation

### 10. Place an Order
**Endpoint:** `/store/order` (POST)

**Description:** Places a new order in the store.

**Example Request:**
```json
{
  "petId": 198772,
  "quantity": 7,
  "shipDate": "2023-10-10T10:00:00Z",
  "status": "placed",
  "complete": true
}
```

**Example Response:**
```json
{
  "id": 10,
  "petId": 198772,
  "quantity": 7,
  "status": "placed"
}
```

**HTTP Status Codes:**
- 200: Successful operation
- 400: Invalid input

### 11. Get Order by ID
**Endpoint:** `/store/order/{orderId}` (GET)

**Description:** Finds purchase order by ID.

**Example Request:**
```
GET /store/order/10
```

**Example Response:**
```json
{
  "id": 10,
  "petId": 198772,
  "quantity": 7,
  "status": "placed"
}
```

**HTTP Status Codes:**
- 200: Successful operation
- 400: Invalid ID supplied
- 404: Order not found

### 12. Delete Order
**Endpoint:** `/store/order/{orderId}` (DELETE)

**Description:** Deletes a purchase order by identifier.

**Example Request:**
```
DELETE /store/order/10
```

**Example Response:**
```json
{
  "message": "Order deleted successfully"
}
```

**HTTP Status Codes:**
- 200: Order deleted
- 400: Invalid ID supplied
- 404: Order not found

### 13. Create User
**Endpoint:** `/user` (POST)

**Description:** Creates a new user.

**Example Request:**
```json
{
  "username": "theUser",
  "firstName": "John",
  "lastName": "James",
  "email": "john@email.com",
  "password": "12345",
  "phone": "12345"
}
```

**Example Response:**
```json
{
  "id": 10,
  "username": "theUser"
}
```

**HTTP Status Codes:**
- 200: Successful operation

### 14. Create Users with List Input
**Endpoint:** `/user/createWithList` (POST)

**Description:** Creates a list of users with given input array.

**Example Request:**
```json
[
  {
    "username": "user1",
    "firstName": "John",
    "lastName": "Doe"
  },
  {
    "username": "user2",
    "firstName": "Jane",
    "lastName": "Doe"
  }
]
```

**Example Response:**
```json
[
  {
    "id": 10,
    "username": "user1"
  },
  {
    "id": 11,
    "username": "user2"
  }
]
```

**HTTP Status Codes:**
- 200: Successful operation

### 15. Login User
**Endpoint:** `/user/login` (GET)

**Description:** Logs user into the system.

**Example Request:**
```
GET /user/login?username=theUser&password=12345
```

**Example Response:**
```json
"logged in successfully"
```

**HTTP Status Codes:**
- 200: Successful operation
- 400: Invalid username/password supplied

### 16. Logout User
**Endpoint:** `/user/logout` (GET)

**Description:** Logs out current logged in user session.

**Example Request:**
```
GET /user/logout
```

**Example Response:**
```json
"logged out successfully"
```

**HTTP Status Codes:**
- 200: Successful operation

### 17. Get User by Username
**Endpoint:** `/user/{username}` (GET)

**Description:** Get user by username.

**Example Request:**
```
GET /user/theUser
```

**Example Response:**
```json
{
  "id": 10,
  "username": "theUser"
}
```

**HTTP Status Codes:**
- 200: Successful operation
- 400: Invalid username supplied
- 404: User not found

### 18. Update User
**Endpoint:** `/user/{username}` (PUT)

**Description:** Update user resource.

**Example Request:**
```json
{
  "firstName": "John",
  "lastName": "Doe"
}
```

**Example Response:**
```json
"user updated successfully"
```

**HTTP Status Codes:**
- 200: Successful operation
- 400: Bad request
- 404: User not found

### 19. Delete User
**Endpoint:** `/user/{username}` (DELETE)

**Description:** Delete user resource.

**Example Request:**
```
DELETE /user/theUser
```

**Example Response:**
```json
"user deleted successfully"
```

**HTTP Status Codes:**
- 200: User deleted
- 400: Invalid username supplied
- 404: User not found
