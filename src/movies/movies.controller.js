const service = require("./movies.service")
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")

async function movieExitsts(req, res, next) {
    const {movieId} = req.params;

    const movie = await service.read(movieId)

    if(movie) {
        res.locals.movie = movie;
        return next()
    }

    return next({ status: 404,
    message: `Movie cannot be found.`})
}

async function list(req, res, next) {
    const isShowing = req.query.is_showing
    const data = await service.list(isShowing)
    res.json({data})
}

async function read(req, res, next) {
    const data = res.locals.movie
    res.json({data})
}

async function findTheaters(req, res, next) {
    const movieId = req.params.movieId
    const data = await service.findTheaters(movieId)

    res.json({data})
}

async function findReviews(req, res, next) {
  const movieId = req.params.movieId
  const data = await service.findReviews(movieId)
  
  res.json({data})
}

module.exports = {
    list: asyncErrorBoundary(list),
    read: [movieExitsts, asyncErrorBoundary(read)],
    findTheaters: [movieExitsts, asyncErrorBoundary(findTheaters)],
  findReviews: [movieExitsts, asyncErrorBoundary(findReviews)]
}