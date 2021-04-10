const knex = require("../db/connection")

async function list(isShowing) {
      if(isShowing) {
        const movieIds = await findShowingMovieIds()
       
        let list = []
        movieIds.forEach((value) => {
          list.push(value.movie_id)
        })
        
        return knex("movies").select("*").whereIn("movie_id", list)
      }
  
    return knex("movies").select("*")
}

function findShowingMovieIds() {
  return knex("movies as m")
    .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
    .select("mt.movie_id")
    .where({"mt.is_showing": true})
}

function read(movieId) {
    return knex("movies").select("*").where({
        movie_id: movieId}).first();
}

function findTheaterId(movieId) {
    return knex("movies_theaters").select("theater_id").where({
        movie_id: movieId
    })
}

async function findTheaters(movieId) {
    const theaterIds = await findTheaterId(movieId)
    let list = []
    theaterIds.forEach((value) => {
      list.push(value.theater_id)
    })
    return knex("theaters").select("*").whereIn("theater_id", list)
}

async function findReviews(movieId) {
  const reviews = await findReviewsId(movieId)
  
  for(let review of reviews) {
    review.critic = await findCritics(review.critic_id)
  }
  return reviews
}


function findReviewsId(movieId) {
  return knex("reviews").select("*").where({
    movie_id: movieId
  })
}

async function findCritics(criticId) {
  return knex("critics")
  .select("organization_name", "preferred_name", "surname")
  .where({"critic_id": criticId}).first()
}

module.exports = {
    list,
    read,
    findTheaters,
    findReviews
}