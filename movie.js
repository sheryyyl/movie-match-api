const { getMovieByTitle } = require('./movieUtils');

const inputTitle = process.argv[2];

if (!inputTitle) {
  console.error('Por favor, proporciona el nombre de la película.');
  process.exit(1);
}

getMovieByTitle(inputTitle, (error, movie) => {
  if (error) {
    console.error(error.message);
  } else {
    console.log(movie);
  }
});