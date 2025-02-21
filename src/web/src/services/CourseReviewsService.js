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
