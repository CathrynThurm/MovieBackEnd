const service = require("./reviews.service")
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")

async function reviewExists(req, res, next) {
    const {reviewId} = req.params

    const review = await service.read(reviewId)

    if(review) {
        res.locals.review = review;
        return next();
    }
    return next({ status: 404, message: `Review cannot be found.`})
}

async function update(req, res, next) {
  const now = new Date().toISOString();
    const updatedReview = {
        ...req.body.data,
        review_id: res.locals.review.review_id,
    }
    const result = await service.update(updatedReview)
    const critic = await service.getCritic(res.locals.review)
    critic.created_at = now
    critic.updated_at = now
    result.created_at = now
    result.updated_at = now
    result.critic = critic

    res.json({ data: result })
}

async function destroy(req, res) {
  service
    .destroy(res.locals.review.review_id)
    .then(() => res.sendStatus(204));
}

module.exports = {
    update: [reviewExists, asyncErrorBoundary(update)],
    delete: [reviewExists, asyncErrorBoundary(destroy)],
  
}