const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

// Función para obtener todas las películas
function getAllMovies(callback) {
  const filePath = path.join(__dirname, 'data', 'movies.csv');
  const movies = [];

  fs.createReadStream(filePath)
    .pipe(csv())
    .on('data', (row) => {
      movies.push({
        id: row.id,
        title: row.title,
        year: row.year,
        genre: row.genre,
        director: row.director,
        actors: row.actors,
        plot: row.plot,
        imdb_rating: row.imdb_rating,
        runtime_minutes: row.runtime_minutes,
      });
    })
    .on('end', () => {
      callback(null, movies); // Devuelve todas las películas
    })
    .on('error', (error) => {
      callback(error); // Manejo de errores
    });
}

// Exportar solo las funciones necesarias
module.exports = { getAllMovies };