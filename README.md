# Installation

### Local database initialization (MacOS + Docker)
```bash
$ docker pull postgres # pull docker image
$ docker volume create postgres_data # create volume
$ docker run --name postgres_container -e POSTGRES_PASSWORD=test -d -p 5432:5432 -v postgres_data:/var/lib/postgresql/data postgres # run container based on image
$ docker ps # check running container
$ psql -h localhost -p 5432 --user postgres # run postgres client and enter password (test)
```

```sql
CREATE USER test WITH PASSWORD 'test'; -- create user with specific password
CREATE DATABASE "doc-creator" OWNER test; -- create database for the created user
```

### App initialization
```bash
$ npm install
```

# Running the app

Config file path: `./src/config/config.json`.
There you can set up host (`postgres.host`), port (`postgres.port`) and database (`postgres.database`) of a Postgres instance.

Also you need to define environment variables (in command line or using .env file):

- PORT=8000
- PG_USERNAME="test"
- PG_PASSWORD="test"

Use your values in case of custom configuration.

## Local

Backend URL: `http://localhost:8000`

```bash
# development mode
$ npm run dev

# create build
$ npm run build

# production mode
$ npm run start
```

# API methods

## Create template

Method: `POST /templates`

Request body:
```typescript
{
    name: string;
    attributeFields: {
        name: string;
        type: "string" | "date" | "number"
    }[];
}
```

Response body:
```typescript
{
  id: number;
}
```

### Example:

`POST http://localhost:3000/templates`

Request body:
```json
{
  "name": "Passport2",
  "attributeFields": [
    {
      "name": "First name",
      "type": "string"
    },
    {
      "name": "Last name",
      "type": "string"
    },
    {
      "name": "Date of birth",
      "type": "date"
    },
    {
      "name": "Passport office number",
      "type": "number"
    }
  ]
}
```

Response body:
```json
{
  "id": 1
}
```

## Get template

Method: `GET /templates/TEMPLATE_ID`

Response body:
```typescript
{
    id: number;
    name: string;
    attributeFields: {
        name: string;
        type: "string" | "date" | "number"
    }[];
}
```

### Example:

`GET http://localhost:3000/templates/1`

Response body:
```json
{
  "id": 1,
  "name": "Passport",
  "attributeFields": [
    {
      "name": "First name",
      "type": "string"
    },
    {
      "name": "Last name",
      "type": "string"
    },
    {
      "name": "Date of birth",
      "type": "date"
    },
    {
      "name": "Passport office number",
      "type": "number"
    }
  ]
}
```

## Create document

Method: `POST /documents`

Request body:
```typescript
{
    name: string;
    templateId: number;
    attributeFields: {
        name: string;
        value: string | number;
    }
}
```

Response body:
```typescript
{
  id: number;
}
```

### Example:

`POST http://localhost:3000/documents`

Request body:
```json
{
  "name": "My passport",
  "templateId": 1,
  "attributeFields": [
    {
      "name": "First name",
      "value": "Ivan"
    },
    {
      "name": "Last name",
      "value": "Ivanov"
    },
    {
      "name": "Date of birth",
      "value": "1993-05-03T00:00:00.000Z"
    },
    {
      "name": "Passport office number",
      "value": 116
    }
  ]
}
```

Response body:
```json
{
  "id": 1
}
```

## Update document

Method: `PUT /documents/DOCUMENT_ID`

Request body:
```typescript
{
    name?: string;
    attributeFields?: {
        name: string;
        value: string | number;
    };
}
```

Response body:
```typescript
null
```

### Example:

`PUT http://localhost:3000/documents/1 `

Request body:
```json
{
  "name": "My new passport",
  "attributeFields": [
    {
      "name": "First name",
      "value": "Petr"
    },
    {
      "name": "Last name",
      "value": "Petrov"
    },
    {
      "name": "Date of birth",
      "value": "1995-05-03T00:00:00.000Z"
    },
    {
      "name": "Passport office number",
      "value": 123
    }
  ]
}
```

Response body:
```json
null
```

## Get document

Method: `GET /documents/DOCUMENT_ID`

Response body:
```typescript
{
    id: number;
    name: string;
    templateId: number;
    attributeFields: {
        name: string;
        value: string | number;
    }
}
```

### Example:

`GET http://localhost:3000/documents/1`

Response body:
```json
{
  "id": 1,
  "name": "My passport",
  "template": {
    "id": 1,
    "name": "Passport"
  },
  "attributeFields": [
    {
      "name": "First name",
      "value": "Ivan"
    },
    {
      "name": "Last name",
      "value": "Ivanov"
    },
    {
      "name": "Date of birth",
      "value": "1993-05-03T00:00:00.000Z"
    },
    {
      "name": "Passport office number",
      "value": 116
    }
  ]
}
```

## Delete document

Method: `DELETE /documents/DOCUMENT_ID`

### Example:

`DELETE http://localhost:3000/documents/1`

Response body:
```json
null
```