import axios from "axios";

const client = axios.create({
  baseURL: "/api",
});

// Fetch professor ratings and reviews
export const fetchProfessorReviews = (professorId) => 
  client.get(`/professors/${professorId}/reviews`);

// Submit a professor review
export const submitProfessorReview = (review) => 
  client.post(`/professors/${professorId}/reviews`, review);

// Get professor overall ratings
export const fetchProfessorRatings = (professorId) => 
  client.get(`/professors/${professorId}/ratings`);

// Search professors by name/department
export const searchProfessors = (query) => 
  client.get(`/professors/search?q=${query}`);