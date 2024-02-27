# Service API Spec

## Create Service API

Endpoint : POST /api/services

Headers :
- Authorization : token

Request Body :

```json
{
  "icon" : "academic-cap-outline", //heroicons
  "title" : "judul",
  "description" : "deskripsi",
}
```

Response Body Success :

```json
{
  "icon" : "academic-cap-outline", //heroicons
  "title" : "judul",
  "description" : "deskripsi",
}
```

Response Body Error :

```json
{
  "errors" : "title is required" 
}
```

## Update Service API

Endpoint : PATCH /api/services/:serviceId

Headers :
- Authorization : token

Request Body :

```json
{
  "icon" : "academic-cap-outline", //heroicons
  "title" : "judul",
  "description" : "deskripsi",
}
```

Response Body Success :

```json
{
  "data": {
    "id": 1,
    "icon" : "academic-cap-outline", //heroicons
    "title" : "judul",
    "description" : "deskripsi",
  }
}
```

Response Body Error :

```json
{
  "errors" : "title is required" 
}
```

## Get Service API

Endpoint : GET /api/services/:serviceId

Headers :
- Authorization : token

Response Body Success :

```json
{
  "data": {
    "id": 1,
    "icon" : "academic-cap-outline", //heroicons
    "title" : "judul",
    "description" : "deskripsi",
  }
}
```

Response Body Error :

```json
{
  "errors" : "title is required" 
}
```

## List Service API

Endpoint : GET /api/services

Headers :
- Authorization : token

Response Body Success :

```json
{
  "data": [
    {
        "id": 1,
        "icon" : "academic-cap-outline", //heroicons
        "title" : "judul",
        "description" : "deskripsi",
    },
    {
        "id": 2,
        "icon" : "academic-cap-outline", //heroicons
        "title" : "judul",
        "description" : "deskripsi",
    }
  ]
}
```

Response Body Error :

```json
{
  "errors" : "service is not found" 
}
```

## Remove Service API

Endpoint : DELETE /api/service/:serviceId

Headers :
- Authorization : token

Response Body Success :

```json
{
  "data" : "OK"
}
```

Response Body Error :

```json
{
  "errors" : "address is not found"
}