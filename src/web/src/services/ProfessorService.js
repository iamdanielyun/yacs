import axios from "axios";

const client = axios.create({
  baseURL: "/api",
});

// Calculate average ratings for a professor
export const calculateProfessorRatings = (reviews) => {
  if (!reviews || reviews.length === 0) {
    return {
      overall: 0,
      teaching: 0,
      grading: 0,
      accessibility: 0,
      difficulty: 0,
      totalReviews: 0
    };
  }

  const totals = reviews.reduce((acc, review) => {
    acc.teaching += review.teaching;
    acc.grading += review.grading;
    acc.accessibility += review.accessibility;
    acc.difficulty += review.difficulty;
    return acc;
  }, { teaching: 0, grading: 0, accessibility: 0, difficulty: 0 });

  const count = reviews.length;
  
  return {
    overall: (totals.teaching + totals.grading + totals.accessibility) / (3 * count),
    teaching: totals.teaching / count,
    grading: totals.grading / count,
    accessibility: totals.accessibility / count,
    difficulty: totals.difficulty / count,
    totalReviews: count
  };
};

// Existing professor service functions
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