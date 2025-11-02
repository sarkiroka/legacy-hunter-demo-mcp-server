# Pharmaceutical Patents API

## API Purpose
This API provides access to manage pharmaceutical patents and their associated inventors. Users can retrieve, add, update, and delete patent information as well as get details about inventors.

## Endpoints Description

### 1. Get all patents (GET /patents)
- **Description**: Retrieves a list of all patents.
- **Example Request**:  
  ```http
  GET /patents
  ```
- **Example Response**:  
  ```json
  [
    {
      "id": "1",
      "publication_number": "20170183334",
      "title": "DASATINIB SALTS",
      "abstract": "A novel salt of dasatinib",
      "type": "Application",
      "filing_date": "2017-01-01",
      "publication_date": "2017-01-02",
      "applicant": "EGIS GYOGYSZERGYAR ZRT",
      "assignee": "EGIS GYOGYSZERGYAR ZRT",
      "inventors": ["Kara Pál", "Nagy Péter"],
      "created_at": "2021-01-01T00:00:00Z",
      "updated_at": "2021-01-01T00:00:00Z"
    }
  ]
  ```
- **HTTP Status Codes**:
  - 200: Successful retrieval of patents.

### 2. Add new patent (POST /patents)
- **Description**: Adds a new patent to the database.
- **Example Request**:  
  ```http
  POST /patents
  Content-Type: application/json
  {
    "publication_number": "20170183334",
    "title": "DASATINIB SALTS",
    "abstract": "A novel salt of dasatinib",
    "type": "Application",
    "filing_date": "2017-01-01",
    "publication_date": "2017-01-02",
    "applicant": "EGIS GYOGYSZERGYAR ZRT",
    "assignee": "EGIS GYOGYSZERGYAR ZRT",
    "inventors": ["Kara Pál", "Nagy Péter"]
  }
  ```
- **Example Response**:  
  ```json
  {
    "id": "1",
    "publication_number": "20170183334",
    "title": "DASATINIB SALTS",
    "abstract": "A novel salt of dasatinib",
    "type": "Application",
    "filing_date": "2017-01-01",
    "publication_date": "2017-01-02",
    "applicant": "EGIS GYOGYSZERGYAR ZRT",
    "assignee": "EGIS GYOGYSZERGYAR ZRT",
    "inventors": ["Kara Pál", "Nagy Péter"],
    "created_at": "2021-01-01T00:00:00Z",
    "updated_at": "2021-01-01T00:00:00Z"
  }
  ```
- **HTTP Status Codes**:
  - 201: Patent added successfully.
  - 400: Bad request.

### 3. Get patent by publication number (GET /patents/{patentNumber})
- **Description**: Retrieves details of a patent using its publication number.
- **Example Request**:  
  ```http
  GET /patents/20170183334
  ```
- **Example Response**:  
  ```json
  {
    "id": "1",
    "publication_number": "20170183334",
    "title": "DASATINIB SALTS",
    "abstract": "A novel salt of dasatinib",
    "type": "Application",
    "filing_date": "2017-01-01",
    "publication_date": "2017-01-02",
    "applicant": "EGIS GYOGYSZERGYAR ZRT",
    "assignee": "EGIS GYOGYSZERGYAR ZRT",
    "inventors": ["Kara Pál", "Nagy Péter"],
    "created_at": "2021-01-01T00:00:00Z",
    "updated_at": "2021-01-01T00:00:00Z"
  }
  ```
- **HTTP Status Codes**:
  - 200: Successful retrieval of patent details.
  - 404: Patent not found.

### 4. Update patent (PUT /patents/{patentNumber})
- **Description**: Updates the details of an existing patent.
- **Example Request**:  
  ```http
  PUT /patents/20170183334
  Content-Type: application/json
  {
    "title": "DASATINIB SALTS UPDATED",
    "abstract": "An updated abstract for dasatinib",
  }
  ```
- **Example Response**:  
  ```json
  {
    "id": "1",
    "publication_number": "20170183334",
    "title": "DASATINIB SALTS UPDATED",
    "abstract": "An updated abstract for dasatinib",
    "type": "Application",
    "filing_date": "2017-01-01",
    "publication_date": "2017-01-02",
    "applicant": "EGIS GYOGYSZERGYAR ZRT",
    "assignee": "EGIS GYOGYSZERGYAR ZRT",
    "inventors": ["Kara Pál", "Nagy Péter"],
    "created_at": "2021-01-01T00:00:00Z",
    "updated_at": "2021-01-01T00:00:00Z"
  }
  ```
- **HTTP Status Codes**:
  - 200: Patent updated successfully.
  - 400: Bad request.
  - 404: Patent not found.

### 5. Delete patent (DELETE /patents/{patentNumber})
- **Description**: Deletes a patent from the database.
- **Example Request**:  
  ```http
  DELETE /patents/20170183334
  ```
- **Example Response**:  
  ```json
  {
    "message": "Patent deleted successfully"
  }
  ```
- **HTTP Status Codes**:
  - 204: Patent deleted successfully.
  - 404: Patent not found.

### 6. Get all inventors (GET /inventors)
- **Description**: Retrieves a list of all inventors.
- **Example Request**:  
  ```http
  GET /inventors
  ```
- **Example Response**:  
  ```json
  [
    {
      "id": "1",
      "name": "Kara Pál",
      "email": "kara.pal@gmail.com",
      "patents": [],
      "created_at": "2021-01-01T00:00:00Z",
      "updated_at": "2021-01-01T00:00:00Z"
    }
  ]
  ```
- **HTTP Status Codes**:
  - 200: Successful retrieval of inventors.

### 7. Get inventor by ID or email (GET /inventors/{identifier})
- **Description**: Retrieves details of an inventor using their ID or email address.
- **Example Request**:  
  ```http
  GET /inventors/kara.pal@gmail.com
  ```
- **Example Response**:  
  ```json
  {
    "id": "1",
    "name": "Kara Pál",
    "email": "kara.pal@gmail.com",
    "patents": [],
    "created_at": "2021-01-01T00:00:00Z",
    "updated_at": "2021-01-01T00:00:00Z"
  }
  ```
- **HTTP Status Codes**:
  - 200: Successful retrieval of inventor details.
  - 404: Inventor not found.

### 8. Get inventor's patents (GET /inventors/{identifier}/patents)
- **Description**: Retrieves all patents associated with a specific inventor.
- **Example Request**:  
  ```http
  GET /inventors/kara.pal@gmail.com/patents
  ```
- **Example Response**:  
  ```json
  [
    {
      "id": "1",
      "publication_number": "20170183334",
      "title": "DASATINIB SALTS",
      "abstract": "A novel salt of dasatinib",
      "type": "Application",
      "filing_date": "2017-01-01",
      "publication_date": "2017-01-02",
      "applicant": "EGIS GYOGYSZERGYAR ZRT",
      "assignee": "EGIS GYOGYSZERGYAR ZRT",
      "inventors": ["Kara Pál", "Nagy Péter"],
      "created_at": "2021-01-01T00:00:00Z",
      "updated_at": "2021-01-01T00:00:00Z"
    }
  ]
  ```
- **HTTP Status Codes**:
  - 200: Successful retrieval of inventor's patents.
  - 404: Inventor not found.