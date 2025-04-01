const http = require('http');
const url = require('url'); // Importar módulo para manejar query params
const { getAllMovies } = require('./movieUtils');

const PORT = 3000;

// Crear el servidor
const server = http.createServer((req, res) => {
  if (req.url.startsWith('/movies') && req.method === 'GET') {
    const queryObject = url.parse(req.url, true).query; // Parsear query params
    const genre = queryObject.genre; // Obtener el parámetro "genre"

    const urlParts = req.url.split('/'); // Dividir la URL en partes
    if (urlParts.length === 3 && urlParts[2]) {
      // Ruta dinámica para /movies/:id_or_name
      const idOrName = decodeURIComponent(urlParts[2]); // Obtener el parámetro id_or_name
      getAllMovies((error, movies) => {
        if (error) {
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Error al obtener las películas.' }));
        } else {
          // Buscar la película por ID o nombre
          const movie = movies.find(
            (m) =>
              m.id.toLowerCase() === idOrName.toLowerCase() ||
              m.title.toLowerCase().includes(idOrName.toLowerCase())
          );
          if (movie) {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(movie)); // Devuelve la película encontrada
          } else {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Película no encontrada.' }));
          }
        }
      });
    } else if (req.url.startsWith('/movies')) {
      // Ruta para obtener todas las películas o filtradas por género
      getAllMovies((error, movies) => {
        if (error) {
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Error al obtener las películas.' }));
        } else {
          let filteredMovies = movies;

          // Filtrar por género si el parámetro "genre" está presente
          if (genre) {
            filteredMovies = movies.filter((movie) =>
              movie.genre.toLowerCase().includes(genre.toLowerCase())
            );
          }

          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(filteredMovies)); // Devuelve las películas filtradas o todas
        }
      });
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Ruta no encontrada');
    }
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Ruta no encontrada');
  }
});

// Iniciar el servidor
server.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});