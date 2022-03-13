const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json()); 
// para facilitar la recuperación de información en un POST

//Middleware
app.use((request, response, next)=>{
  console.log(`Petición recibida con el método ${request.method} en la dirección ${request.path}`);
  next();
});

let notes = [
  {id: 1, titulo: 'Nota 1', contenido:'ble ble ble'},
  {id: 2, titulo: 'Nota 2', contenido:'blu blu blu'},
  {id: 3, titulo: 'Nota 3', contenido:'bla bla bla'}
];

app.get('/', (request, response)=>{
  response.send('<h1>Hello hello</h1>');
});

app.get('/api/notes', (request, response)=>{
  response.json(notes);
});

app.get('/api/notes/:id', (request, response)=>{
  const id = Number(request.params.id);
  const note = notes.find(note => note.id === id);

  if (note) {
    response.json(note);
  } else {
    response.status(404).end();
  }
});

app.delete('/api/notes/:id', (request, response)=>{
  const id = Number(request.params.id);
  notes = notes.filter(note=> note.id !== id);
  response.status(204).end();
});

app.post('/api/notes', (request, response)=>{
  const note = request.body;   
  const ids = notes.map(note=> note.id);
  const maxId = Math.max(...ids);
  const newNote = {
    id: maxId+1, 
    titulo: note.titulo, 
    contenido: note.contenido
  };
  notes.push(newNote);
    
  response.json(newNote);        
});

app.use((request, response)=>{
  console.log(`error - ${request.path}`);
  response.status(404).json({
    error: 'Not found'
  });
});

const PORT = 3001;
app.listen(PORT, ()=>{
  console.log(`Server runing on port ${PORT}`);
});