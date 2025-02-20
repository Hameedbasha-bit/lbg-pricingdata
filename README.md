# Pricing Data

## Description
Pricing Data is a Node.js application that uses Express.js to serve pricing data. It integrates with Google BigQuery for data storage and retrieval.

## Installation
1. Clone the repository:
    ```sh
    git clone https://github.com/lbg-gcp-foundation/pricing-bigquery-data.git
    ```
2. Navigate to the project directory:
    ```sh
    cd pricing-data
    ```
3. Install the dependencies:
    ```sh
    npm install
    ```

## Usage
1. Create a `.env` file in the root directory and add your environment variables:
    ```env
    GOOGLE_APPLICATION_CREDENTIALS=./bigquery-config.json
    GOOGLE_CLOUD_PROJECT=playpen-122b3f
    ```

2. Start the server:
    ```sh
    npm start
    ```

3. The server will be running on `http://localhost:3000`.

### GET Queries
To retrieve pricing data, send a GET request to:
```
GET /pricing
```
Example:
```sh
curl -X GET http://localhost:3000/api/bigquery
```

### POST Queries
To add new pricing data, send a POST request to:
```
POST /pricing
```
with a JSON body containing the pricing information.
Example:
```sh
curl -X POST http://localhost:3000/api/bigquery -H "Content-Type: application/json" -d '{"RECORD_ID": "example", "FACILITY_ID": "facility", "LOAN_ID": "1234"}'
```

## API Documentation
API documentation is available at `http://localhost:3000/api-docs` using Swagger UI.

## Dependencies
- @google-cloud/bigquery: ^4.0.3
- dotenv: ^8.6.0
- express: ^4.21.2
- swagger-jsdoc: ^6.2.8
- swagger-ui-express: ^5.0.1

## License
This project is licensed under the ISC License.
