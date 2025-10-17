import axios from "axios";

const client = axios.create({
  baseURL: "/api",
});

export const fetchProfessorReviews = (professorId) => 
  client.get(`/professors/${professorId}/reviews`);

export const submitProfessorReview = (reviewData) => 
  client.post(`/professors/${reviewData.professorId}/reviews`, reviewData);

export const searchProfessors = (query) => 
  client.get(`/professors/search?q=${encodeURIComponent(query)}`);

export const fetchProfessorCourses = (professorId) => 
  client.get(`/professors/${professorId}/courses`);

export const voteHelpful = (reviewId) => 
  client.post(`/reviews/${reviewId}/helpful`);

export const reportReview = (reviewId, reason) => 
  client.post(`/reviews/${reviewId}/report`, { reason });

export const fetchProfessorDetails = (professorId) => 
  client.get(`/professors/${professorId}`);

export const fetchTopRatedProfessors = (department = null) => {
  const url = department ? 
    `/professors/top-rated?department=${department}` : 
    '/professors/top-rated';
  return client.get(url);
};