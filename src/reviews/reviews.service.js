const knex = require("../db/connection")

function getCritic(review) {
   //const now = new Date().toISOString();
  
  return knex("critics")
  .select("critic_id","preferred_name", "surname", "organization_name")
  .where({critic_id: review.critic_id}).first()
}

function update(updated) {

    return knex("reviews")
    .where({review_id: updated.review_id})
    .update(updated)
    .then( function() {
      return knex.select("*")
      .from("reviews")
      .where({review_id: updated.review_id}).first()
    })
}


function read(reviewId) {

    return knex("reviews")
    .select("*")
    .where({review_id: reviewId}).first()
}

function destroy(reviewId) {
  
   return knex("reviews").where({ "review_id": reviewId }).del()
}

module.exports = {
    update,
    read,
    destroy,
    getCritic
}