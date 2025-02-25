import axios from "axios";

const client = axios.create({
  baseURL: "/api",  
});

/**
 * Fetches reviews for a specific course.
 * @param {string} courseCode - The code of the course (e.g., "CSCI-1200").
 * @returns {Promise<Array>} - A list of reviews for the course.
 */
export const fetchCourseReviews = (courseCode) =>
  client.get(`/courses/${courseCode}/reviews`);

/**
 * Submits a new review for a course.
 * @param {Object} review - The review object containing course code, text, rating, and date.
 * @returns {Promise<Object>} - The response from the API (e.g., success message or the created review).
 */
export const submitCourseReview = (review) =>
  client.post(`/courses/${review.courseCode}/reviews`, review);

/**
 * Updates an existing review for a course.
 * @param {Object} review - The review object containing the review ID, updated text, and rating.
 * @returns {Promise<Object>} - The response from the API (e.g., success message or the updated review).
 */
export const updateCourseReview = (review) =>
client.put(`/courses/${review.courseCode}/reviews/${review.id}`, review);

/**
* Deletes a review for a course.
* @param {string} courseCode - The code of the course (e.g., "CSCI-1200").
* @param {string} reviewId - The ID of the review to delete.
* @returns {Promise<Object>} - The response from the API (e.g., success message).
*/
export const deleteCourseReview = (courseCode, reviewId) =>
client.delete(`/courses/${courseCode}/reviews/${reviewId}`);