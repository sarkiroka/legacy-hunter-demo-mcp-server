# Pharmaceutical Patents API User Manual

## API Purpose
This API allows users to access and manage pharmaceutical patents and their associated inventors.

## Endpoints Description

### 1. Get all patents (GET /patents)
- **Description**: Retrieves a list of all patents.
- **Example Request**: `GET /patents`
- **Example Response**:
  ```json
  [
      {
          "id": "1",
          "publication_number": "20170183334",
          "title": "DASATINIB SALTS",
          "abstract": "A new salt form of Dasatinib...",
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
  - `200`: Successful retrieval of patents.

### 2. Add new patent (POST /patents)
- **Description**: Adds a new patent to the database.
- **Example Request**:
  ```json
  {
      "publication_number": "20170183334",
      "title": "DASATINIB SALTS",
      "abstract": "A new salt form of Dasatinib...",
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
      "abstract": "A new salt form of Dasatinib...",
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
  - `201`: Patent added successfully.
  - `400`: Bad request.

### 3. Get patent by publication number (GET /patents/{patentNumber})
- **Description**: Retrieves details of a specific patent by its publication number.
- **Example Request**: `GET /patents/20170183334`
- **Example Response**:
  ```json
  {
      "id": "1",
      "publication_number": "20170183334",
      "title": "DASATINIB SALTS",
      "abstract": "A new salt form of Dasatinib...",
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
  - `200`: Successful retrieval of patent details.
  - `404`: Patent not found.

### 4. Update patent (PUT /patents/{patentNumber})
- **Description**: Updates an existing patent by its publication number.
- **Example Request**:
  ```json
  {
      "title": "UPDATED DASATINIB SALTS"
  }
  ```
- **Example Response**:
  ```json
  {
      "id": "1",
      "publication_number": "20170183334",
      "title": "UPDATED DASATINIB SALTS",
      "abstract": "A new salt form of Dasatinib...",
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
  - `200`: Patent updated successfully.
  - `400`: Bad request.
  - `404`: Patent not found.

### 5. Delete patent (DELETE /patents/{patentNumber})
- **Description**: Deletes a specific patent by its publication number.
- **Example Request**: `DELETE /patents/20170183334`
- **Example Response**:
  ```json
  {
      "message": "Patent deleted successfully."
  }
  ```
- **HTTP Status Codes**:
  - `204`: Patent deleted successfully.
  - `404`: Patent not found.

### 6. Get all inventors (GET /inventors)
- **Description**: Retrieves a list of all inventors.
- **Example Request**: `GET /inventors`
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
  - `200`: Successful retrieval of inventors.

### 7. Get inventor by ID or email (GET /inventors/{identifier})
- **Description**: Retrieves details of a specific inventor by their ID or email address.
- **Example Request**: `GET /inventors/kara.pal@gmail.com`
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
  - `200`: Successful retrieval of inventor details.
  - `404`: Inventor not found.

### 8. Get inventor's patents (GET /inventors/{identifier}/patents)
- **Description**: Retrieves all patents associated with a specific inventor.
- **Example Request**: `GET /inventors/kara.pal@gmail.com/patents`
- **Example Response**:
  ```json
  [
      {
          "id": "1",
          "publication_number": "20170183334",
          "title": "DASATINIB SALTS",
          "abstract": "A new salt form of Dasatinib...",
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
  - `200`: Successful retrieval of inventor's patents.
  - `404`: Inventor not found.