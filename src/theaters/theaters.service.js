const knex = require("../db/connection");

async function list() {
  const theaters = await getAllTheaters()
  let list = []
  
  for(let theater of theaters) {
    theater.movies = await getShowingMovies(theater.theater_id)
    list.push(theater)
  }
  return list
}

function getAllTheaters() {
  return knex("theaters")
  .select("*")
}

function getShowingMovies(theaterId) {
  return knex("movies as m")
  .join("movies_theaters as mt", "mt.movie_id", "m.movie_id")
  .select("m.rating", "m.runtime_in_minutes", "m.title")
  .where({"mt.theater_id": theaterId})
}

module.exports = {
    list
}