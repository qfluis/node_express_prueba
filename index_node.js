const http = require('http'); // opción "legacy"
//import {http} from "http"; // opción Ecma Script Modules
const app = http.createServer((request, response)=>{
  response.writeHead(200, {'content-Type':'text/plain'});  
  // si devuelve json en lugar de 'Content-Type' 'application/json'
  response.end('Hello World Holiwi');
});

const PORT = 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
