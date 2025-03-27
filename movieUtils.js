const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

function getMovieByTitle(title, callback) {
  const filePath = path.join(__dirname, 'data', 'movies.csv');
  const movies = [];

  fs.createReadStream(filePath)
    .pipe(csv())
    .on('data', (row) => {
      if (!title || row.title.toLowerCase().includes(title.toLowerCase())) {
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
      }
    })
    .on('end', () => {
      if (movies.length > 0) {
        const randomIndex = Math.floor(Math.random() * movies.length);
        callback(null, movies[randomIndex]);
      } else {
        callback(new Error('Película no encontrada.'));
      }
    })
    .on('error', (error) => {
      callback(error);
    });
}

function getMoviesByGenre(genre, callback) {
  const filePath = path.join(__dirname, 'data', 'movies.csv');
  const movies = [];

  fs.createReadStream(filePath)
    .pipe(csv())
    .on('data', (row) => {
      if (row.genre.toLowerCase().includes(genre.toLowerCase())) {
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
      }
    })
    .on('end', () => {
      if (movies.length > 0) {
        callback(null, movies.slice(0, 10)); // Limitar a un máximo de 10 películas
      } else {
        callback(new Error('No se encontraron películas para el género especificado.'));
      }
    })
    .on('error', (error) => {
      callback(error);
    });
}

module.exports = { getMovieByTitle, getMoviesByGenre };