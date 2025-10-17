# Swagger Petstore API Documentation

## API Purpose
The Swagger Petstore API provides a platform for managing pets, users, and orders in a pet store. It allows users to add, update, delete, and find pets, manage user accounts, and handle orders.

## Endpoints Description

### 1. Add a New Pet to the Store (POST /pet)
- **Description**: Adds a new pet to the store.
- **Example Request**:
```json
{
  "name": "doggie",
  "category": {
    "id": 1,
    "name": "Dogs"
  },
  "photoUrls": ["https://example.com/photo.jpg"],
  "tags": [{"id": 1, "name": "tag1"}],
  "status": "available"
}
```
- **Example Response**:
```json
{
  "id": 10,
  "name": "doggie",
  "category": {
    "id": 1,
    "name": "Dogs"
  },
  "photoUrls": ["https://example.com/photo.jpg"],
  "tags": [{"id": 1, "name": "tag1"}],
  "status": "available"
}
```
- **HTTP Status Codes**:
  - 200: Successful operation
  - 400: Invalid input
  - 422: Validation exception

### 2. Update an Existing Pet (PUT /pet)
- **Description**: Updates an existing pet by ID.
- **Example Request**:
```json
{
  "id": 10,
  "name": "doggie updated",
  "category": {
    "id": 1,
    "name": "Dogs"
  },
  "photoUrls": ["https://example.com/photo_updated.jpg"],
  "tags": [{"id": 1, "name": "tag1"}],
  "status": "available"
}
```
- **Example Response**:
```json
{
  "id": 10,
  "name": "doggie updated",
  "category": {
    "id": 1,
    "name": "Dogs"
  },
  "photoUrls": ["https://example.com/photo_updated.jpg"],
  "tags": [{"id": 1, "name": "tag1"}],
  "status": "available"
}
```
- **HTTP Status Codes**:
  - 200: Successful operation
  - 400: Invalid ID supplied
  - 404: Pet not found
  - 422: Validation exception

### 3. Find Pets by Status (GET /pet/findByStatus)
- **Description**: Finds pets by their status.
- **Example Request**:
```
GET /pet/findByStatus?status=available
```
- **Example Response**:
```json
[
  {
    "id": 10,
    "name": "doggie",
    "status": "available"
  }
]
```
- **HTTP Status Codes**:
  - 200: Successful operation
  - 400: Invalid status value

### 4. Find Pets by Tags (GET /pet/findByTags)
- **Description**: Finds pets by tags.
- **Example Request**:
```
GET /pet/findByTags?tags=tag1,tag2
```
- **Example Response**:
```json
[
  {
    "id": 10,
    "name": "doggie",
    "tags": [{"id": 1, "name": "tag1"}]
  }
]
```
- **HTTP Status Codes**:
  - 200: Successful operation
  - 400: Invalid tag value

### 5. Find Pet by ID (GET /pet/{petId})
- **Description**: Returns a single pet by its ID.
- **Example Request**:
```
GET /pet/10
```
- **Example Response**:
```json
{
  "id": 10,
  "name": "doggie"
}
```
- **HTTP Status Codes**:
  - 200: Successful operation
  - 400: Invalid ID supplied
  - 404: Pet not found

### 6. Update Pet with Form Data (POST /pet/{petId})
- **Description**: Updates a pet resource based on form data.
- **Example Request**:
```
POST /pet/10?name=doggie updated&status=available
```
- **Example Response**:
```json
{
  "id": 10,
  "name": "doggie updated"
}
```
- **HTTP Status Codes**:
  - 200: Successful operation
  - 400: Invalid input

### 7. Delete a Pet (DELETE /pet/{petId})
- **Description**: Deletes a pet.
- **Example Request**:
```
DELETE /pet/10
```
- **Example Response**:
```json
{
  "message": "Pet deleted"
}
```
- **HTTP Status Codes**:
  - 200: Pet deleted
  - 400: Invalid pet value

### 8. Upload Image (POST /pet/{petId}/uploadImage)
- **Description**: Uploads an image of the pet.
- **Example Request**:
```
POST /pet/10/uploadImage
```
- **Example Response**:
```json
{
  "code": 200,
  "type": "success",
  "message": "Image uploaded successfully"
}
```
- **HTTP Status Codes**:
  - 200: Successful operation
  - 400: No file uploaded
  - 404: Pet not found

### 9. Get Inventory (GET /store/inventory)
- **Description**: Returns pet inventories by status.
- **Example Request**:
```
GET /store/inventory
```
- **Example Response**:
```json
{
  "available": 5,
  "pending": 2
}
```
- **HTTP Status Codes**:
  - 200: Successful operation

### 10. Place an Order (POST /store/order)
- **Description**: Places a new order in the store.
- **Example Request**:
```json
{
  "petId": 198772,
  "quantity": 7,
  "status": "placed"
}
```
- **Example Response**:
```json
{
  "id": 10,
  "petId": 198772,
  "quantity": 7,
  "status": "placed"
}
```
- **HTTP Status Codes**:
  - 200: Successful operation
  - 400: Invalid input
  - 422: Validation exception

### 11. Find Purchase Order by ID (GET /store/order/{orderId})
- **Description**: Finds purchase order by ID.
- **Example Request**:
```
GET /store/order/10
```
- **Example Response**:
```json
{
  "id": 10,
  "petId": 198772,
  "quantity": 7,
  "status": "placed"
}
```
- **HTTP Status Codes**:
  - 200: Successful operation
  - 400: Invalid ID supplied
  - 404: Order not found

### 12. Delete Purchase Order (DELETE /store/order/{orderId})
- **Description**: Deletes a purchase order by identifier.
- **Example Request**:
```
DELETE /store/order/10
```
- **Example Response**:
```json
{
  "message": "Order deleted"
}
```
- **HTTP Status Codes**:
  - 200: Order deleted
  - 400: Invalid ID supplied
  - 404: Order not found

### 13. Create User (POST /user)
- **Description**: Creates a new user.
- **Example Request**:
```json
{
  "username": "theUser",
  "firstName": "John",
  "lastName": "James",
  "email": "john@email.com",
  "password": "12345"
}
```
- **Example Response**:
```json
{
  "id": 10,
  "username": "theUser"
}
```
- **HTTP Status Codes**:
  - 200: Successful operation

### 14. Create Users with List (POST /user/createWithList)
- **Description**: Creates a list of users with given input array.
- **Example Request**:
```json
[
  {
    "username": "theUser",
    "firstName": "John",
    "lastName": "James",
    "email": "john@email.com",
    "password": "12345"
  }
]
```
- **Example Response**:
```json
[
  {
    "id": 10,
    "username": "theUser"
  }
]
```
- **HTTP Status Codes**:
  - 200: Successful operation

### 15. Get User by Username (GET /user/{username})
- **Description**: Gets user detail based on username.
- **Example Request**:
```
GET /user/theUser
```
- **Example Response**:
```json
{
  "id": 10,
  "username": "theUser"
}
```
- **HTTP Status Codes**:
  - 200: Successful operation
  - 400: Invalid username supplied
  - 404: User not found

### 16. Update User (PUT /user/{username})
- **Description**: Updates user resource.
- **Example Request**:
```json
{
  "username": "theUser",
  "firstName": "John",
  "lastName": "Doe"
}
```
- **Example Response**:
```json
{
  "message": "User updated successfully"
}
```
- **HTTP Status Codes**:
  - 200: Successful operation
  - 400: Bad request
  - 404: User not found

### 17. Delete User (DELETE /user/{username})
- **Description**: Deletes user resource.
- **Example Request**:
```
DELETE /user/theUser
```
- **Example Response**:
```json
{
  "message": "User deleted"
}
```
- **HTTP Status Codes**:
  - 200: User deleted
  - 400: Invalid username supplied
  - 404: User not found

### 18. Login User (GET /user/login)
- **Description**: Logs user into the system.
- **Example Request**:
```
GET /user/login?username=theUser&password=12345
```
- **Example Response**:
```json
"Logged in successfully"
```
- **HTTP Status Codes**:
  - 200: Successful operation
  - 400: Invalid username/password supplied

### 19. Logout User (GET /user/logout)
- **Description**: Logs out current logged in user session.
- **Example Request**:
```
GET /user/logout
```
- **Example Response**:
```json
"Logged out successfully"
```
- **HTTP Status Codes**:
  - 200: Successful operation
