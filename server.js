const http = require('http');
const { getMovieByTitle } = require('./movieUtils');

const PORT = 3000;

// Función para obtener una película aleatoria
function getRandomMovie(callback) {
  const randomTitle = ''; // Título vacío para obtener cualquier película
  getMovieByTitle(randomTitle, callback);
}

// Crear el servidor
const server = http.createServer((req, res) => {
  if (req.url === '/') {
    getRandomMovie((error, movie) => {
      if (error) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Error al obtener la película: ' + error.message);
      } else {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(movie));
      }
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Ruta no encontrada');
  }
});

// Iniciar el servidor
server.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});