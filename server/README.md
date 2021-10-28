# AFC React Practice Back-end

## Getting Started

 - In Terminal, enter: `npm install`
 - In Terminal, enter: `npm start`
 - Test the example route: `http://localhost:3001/api/items`, you should see a response with the data below

## Endpoints

| Description |Endpoint (HTTP METHOD - PATH)     |
| ----------- | ------------------------------------------- |
| All Items   | GET -  `/api/items`           |
| Add Item    | POST -   `/api/items`            |
| Update Item | PATCH -  `/api/items/:id`        |
| Delete Item | DELETE - `/api/items/:id`        |


## Working with To Do Items Data

The data is extremely simple, each To Do Item consists of 3 fields:

| Data Type   | Name               |
| ----------- | ------------------ |
| Number      | id                 |
| String      | content            |
| Boolean     | completed          |


## API Get Example Response:

GET `api/items`:
```
[
  {
    "id": 1,
    "content": "Learn React",
    "completed": false
  },
  {
    "id": 2,
    "content": "Learn Javascript",
    "completed": true
  },
  {
    "id": 3,
    "content": "Learn Spring",
    "completed": true
  },
  {
    "id": 4,
    "content": "Learn Java",
    "completed": true
  }
].
```


## Resetting your data

Copy/paste from `todos_bak.json` to `todos.json` if you want to reset your persisted data. 