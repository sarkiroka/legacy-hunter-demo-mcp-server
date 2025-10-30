# Pharmaceutical Patents API

## API Purpose
This API allows users to access and manage pharmaceutical patents and their inventors efficiently.

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
          "abstract": "Abstract of the patent.",
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
  - `200`: Success

### 2. Add new patent (POST /patents)
- **Description**: Adds a new patent to the database.
- **Example Request**:
  ```json
  {
      "publication_number": "20170183334",
      "title": "DASATINIB SALTS",
      "abstract": "Abstract of the patent.",
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
      "abstract": "Abstract of the patent.",
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
  - `201`: Patent added successfully
  - `400`: Bad request

### 3. Get patent by publication number (GET /patents/{patentNumber})
- **Description**: Retrieves details of a patent by its publication number.
- **Example Request**: `GET /patents/20170183334`
- **Example Response**:
  ```json
  {
      "id": "1",
      "publication_number": "20170183334",
      "title": "DASATINIB SALTS",
      "abstract": "Abstract of the patent.",
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
  - `200`: Success
  - `404`: Patent not found

### 4. Update patent (PUT /patents/{patentNumber})
- **Description**: Updates an existing patent.
- **Example Request**:
  ```json
  {
      "title": "UPDATED TITLE"
  }
  ```
- **Example Response**:
  ```json
  {
      "id": "1",
      "publication_number": "20170183334",
      "title": "UPDATED TITLE",
      "abstract": "Abstract of the patent.",
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
  - `200`: Patent updated successfully
  - `400`: Bad request
  - `404`: Patent not found

### 5. Delete patent (DELETE /patents/{patentNumber})
- **Description**: Deletes a patent from the database.
- **Example Request**: `DELETE /patents/20170183334`
- **Example Response**: No content returned.
- **HTTP Status Codes**:
  - `204`: Patent deleted successfully
  - `404`: Patent not found

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
          "created_at": "2021-01-01T00:00:00Z",
          "updated_at": "2021-01-01T00:00:00Z"
      }
  ]
  ```
- **HTTP Status Codes**:
  - `200`: Success

### 7. Get inventor by ID or email (GET /inventors/{identifier})
- **Description**: Retrieves details of an inventor by their ID or email.
- **Example Request**: `GET /inventors/kara.pal@gmail.com`
- **Example Response**:
  ```json
  {
      "id": "1",
      "name": "Kara Pál",
      "email": "kara.pal@gmail.com",
      "created_at": "2021-01-01T00:00:00Z",
      "updated_at": "2021-01-01T00:00:00Z"
  }
  ```
- **HTTP Status Codes**:
  - `200`: Success
  - `404`: Inventor not found

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
          "abstract": "Abstract of the patent."
      }
  ]
  ```
- **HTTP Status Codes**:
  - `200`: Success
  - `404`: Inventor not found
