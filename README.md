# Pharmaceutical Patents API

## API Purpose
This API allows users to access and manage pharmaceutical patents and their inventors.

## Endpoints Description

### Get All Patents (GET /patents)
- **Description**: Retrieves a list of all patents.
- **Example Request**: `GET https://patents-openapi.helga-eross.workers.dev/patents`
- **Example Response**:
  ```json
  [
      {
          "id": "1",
          "publication_number": "20170183334",
          "title": "DASATINIB SALTS",
          "abstract": "An innovative salt form of Dasatinib.",
          "type": "Application",
          "filing_date": "2017-01-01",
          "publication_date": "2017-01-10",
          "applicant": "EGIS GYOGYSZERGYAR ZRT",
          "assignee": "EGIS GYOGYSZERGYAR ZRT",
          "inventors": ["Kara Pál", "Nagy Péter"],
          "created_at": "2022-01-01T00:00:00Z",
          "updated_at": "2022-01-01T00:00:00Z"
      }
  ]
  ```
- **HTTP Status Codes**:
  - `200`: Successful retrieval of patents.

### Add New Patent (POST /patents)
- **Description**: Adds a new patent to the system.
- **Example Request**:
  ```json
  POST https://patents-openapi.helga-eross.workers.dev/patents
  {
      "publication_number": "20170183334",
      "title": "DASATINIB SALTS",
      "abstract": "An innovative salt form of Dasatinib.",
      "type": "Application",
      "filing_date": "2017-01-01",
      "publication_date": "2017-01-10",
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
      "abstract": "An innovative salt form of Dasatinib.",
      "type": "Application",
      "filing_date": "2017-01-01",
      "publication_date": "2017-01-10",
      "applicant": "EGIS GYOGYSZERGYAR ZRT",
      "assignee": "EGIS GYOGYSZERGYAR ZRT",
      "inventors": ["Kara Pál", "Nagy Péter"],
      "created_at": "2022-01-01T00:00:00Z",
      "updated_at": "2022-01-01T00:00:00Z"
  }
  ```
- **HTTP Status Codes**:
  - `201`: Patent added successfully.
  - `400`: Bad request.

### Get Patent by Publication Number (GET /patents/{patentNumber})
- **Description**: Retrieves details of a specific patent by its publication number.
- **Example Request**: `GET https://patents-openapi.helga-eross.workers.dev/patents/20170183334`
- **Example Response**:
  ```json
  {
      "id": "1",
      "publication_number": "20170183334",
      "title": "DASATINIB SALTS",
      "abstract": "An innovative salt form of Dasatinib.",
      "type": "Application",
      "filing_date": "2017-01-01",
      "publication_date": "2017-01-10",
      "applicant": "EGIS GYOGYSZERGYAR ZRT",
      "assignee": "EGIS GYOGYSZERGYAR ZRT",
      "inventors": ["Kara Pál", "Nagy Péter"],
      "created_at": "2022-01-01T00:00:00Z",
      "updated_at": "2022-01-01T00:00:00Z"
  }
  ```
- **Parameter Explanation**:
  - `patentNumber`: Patent publication number (required).
- **HTTP Status Codes**:
  - `200`: Successful retrieval of patent details.
  - `404`: Patent not found.

### Update Patent (PUT /patents/{patentNumber})
- **Description**: Updates an existing patent.
- **Example Request**:
  ```json
  PUT https://patents-openapi.helga-eross.workers.dev/patents/20170183334
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
      "abstract": "An innovative salt form of Dasatinib.",
      "type": "Application",
      "filing_date": "2017-01-01",
      "publication_date": "2017-01-10",
      "applicant": "EGIS GYOGYSZERGYAR ZRT",
      "assignee": "EGIS GYOGYSZERGYAR ZRT",
      "inventors": ["Kara Pál", "Nagy Péter"],
      "created_at": "2022-01-01T00:00:00Z",
      "updated_at": "2022-01-01T00:00:00Z"
  }
  ```
- **Parameter Explanation**:
  - `patentNumber`: Patent publication number (required).
- **HTTP Status Codes**:
  - `200`: Patent updated successfully.
  - `400`: Bad request.
  - `404`: Patent not found.

### Delete Patent (DELETE /patents/{patentNumber})
- **Description**: Deletes a specific patent.
- **Example Request**: `DELETE https://patents-openapi.helga-eross.workers.dev/patents/20170183334`
- **Example Response**:
  ```json
  {
      "message": "Patent 20170183334 deleted successfully."
  }
  ```
- **Parameter Explanation**:
  - `patentNumber`: Patent publication number (required).
- **HTTP Status Codes**:
  - `204`: Patent deleted successfully.
  - `404`: Patent not found.

### Get All Inventors (GET /inventors)
- **Description**: Retrieves a list of all inventors.
- **Example Request**: `GET https://patents-openapi.helga-eross.workers.dev/inventors`
- **Example Response**:
  ```json
  [
      {
          "id": "1",
          "name": "Kara Pál",
          "email": "kara.pal@gmail.com",
          "created_at": "2022-01-01T00:00:00Z",
          "updated_at": "2022-01-01T00:00:00Z"
      }
  ]
  ```
- **HTTP Status Codes**:
  - `200`: Successful retrieval of inventors.

### Get Inventor by ID or Email (GET /inventors/{identifier})
- **Description**: Retrieves details of a specific inventor by their ID or email.
- **Example Request**: `GET https://patents-openapi.helga-eross.workers.dev/inventors/kara.pal@gmail.com`
- **Example Response**:
  ```json
  {
      "id": "1",
      "name": "Kara Pál",
      "email": "kara.pal@gmail.com",
      "created_at": "2022-01-01T00:00:00Z",
      "updated_at": "2022-01-01T00:00:00Z"
  }
  ```
- **Parameter Explanation**:
  - `identifier`: Inventor ID or email address (required).
- **HTTP Status Codes**:
  - `200`: Successful retrieval of inventor details.
  - `404`: Inventor not found.

### Get Inventor's Patents (GET /inventors/{identifier}/patents)
- **Description**: Retrieves patents associated with a specific inventor.
- **Example Request**: `GET https://patents-openapi.helga-eross.workers.dev/inventors/kara.pal@gmail.com/patents`
- **Example Response**:
  ```json
  [
      {
          "id": "1",
          "publication_number": "20170183334",
          "title": "DASATINIB SALTS",
          "abstract": "An innovative salt form of Dasatinib."
      }
  ]
  ```
- **Parameter Explanation**:
  - `identifier`: Inventor ID or email address (required).
- **HTTP Status Codes**:
  - `200`: Successful retrieval of inventor's patents.
  - `404`: Inventor not found.