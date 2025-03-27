const { getMoviesByGenre } = require('./movieUtils');

const inputGenre = process.argv[2];

if (!inputGenre) {
  console.error('Por favor, proporciona un género.');
  process.exit(1);
}

getMoviesByGenre(inputGenre, (error, movies) => {
  if (error) {
    console.error(error.message);
  } else {
    console.log(`Películas del género "${inputGenre}":`);
    movies.forEach((movie, index) => {
      console.log(`${index + 1}. ${movie.title} (${movie.year}) - ${movie.genre}`);
    });
  }
});