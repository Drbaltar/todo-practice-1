const fs = require('fs');
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

const todos = JSON.parse(fs.readFileSync('todos.json'));
let id = 5;

app.get('/', (req,res) => res.send("Server is Running"));

app.get('/api/items', (req, res) => res.json(todos));

app.post('/api/items', function (req, res) {
  let result;
  const todo = req.body;
  if ( todo.content) {
    todos.push({
      id: id,
      content: todo.content,
      completed: false
    });

    id++;

    result = {
      status: 'success',
      message: 'The todo was successfully saved',
    };
  } else {
    result = {
      status: 'failed',
      message: 'The todo was not saved',
    };
    res.status(400);
  }

  res.json(result);
});


app.delete('/api/items/:id', (req,res) => {

  let index;

  todos.forEach((element,i) => {
    if (element.id === parseInt(req.params.id, 10)) {
     index = i;
    }
  });

  if (index !== undefined) {
    todos.splice(index, 1);
    res.send(`Deleted todo with id ${req.params.id}`);
  } else {
    res.status(400).send(`No todo with id of ${req.params.id}`);
  }

})


app.patch('/api/items/:id', (req, res) => {
  let id = parseInt(req.params.id, 10)
  let body = req.body;
  let index;

  todos.forEach((todo,i) => {
    if (todo.id === id) {

      for (let key in body) {
        todo[key] = body[key];
      }
      
      index = i;

    }
  })

  res.json(todos[index]);
})

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
