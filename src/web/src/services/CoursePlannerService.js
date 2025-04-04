import axios from "axios";

const client = axios.create({
  baseURL: "/api",
});

// Fetch saved planner for a user
export const fetchDegreePlanner = (userId) => 
  client.get(`/planner/${userId}`);

// Save/update planner
export const saveDegreePlanner = (userId, plannerData) => 
  client.post(`/planner/${userId}`, plannerData);

// Fetch degree requirements (e.g., "Computer Science BS")
export const fetchDegreeRequirements = (degreeId) => 
  client.get(`/degrees/${degreeId}`);