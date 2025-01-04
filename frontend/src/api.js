import axios from "axios";

const API_BASE_URL = "http://localhost:5000"; // Replace with your backend URL

// Leads APIs
export const getLeads = () => axios.get(`${API_BASE_URL}/leads/getLeads`);
export const createLead = (data) => axios.post(`${API_BASE_URL}/leads/createLead`, data);
export const updateLead = (id, data) => axios.put(`${API_BASE_URL}/leads/updateLead/${id}`, data);
export const deleteLead = (id) => axios.delete(`${API_BASE_URL}/leads/deleteLead/${id}`);
export const getCallsToday = () => axios.get(`${API_BASE_URL}/leads/calls-today`);
export const updateLeadStatus = (id, data) =>
  axios.put(`${API_BASE_URL}/leads/updateleadstatus/${id}`, data);

// Contacts APIs
export const getContacts = () => axios.get(`${API_BASE_URL}/contacts/getContacts`);
export const createContact = (data) =>
  axios.post(`${API_BASE_URL}/contacts/createContact`, data);
export const updateContact = (id, data) =>
  axios.put(`${API_BASE_URL}/contacts/updateContact/${id}`, data);
export const deleteContact = (id) =>
  axios.delete(`${API_BASE_URL}/contacts/deleteContact/${id}`);

// Interactions APIs
export const getInteractions = () =>
  axios.get(`${API_BASE_URL}/interactions/getInteraction`);
export const createInteraction = (data) =>
  axios.post(`${API_BASE_URL}/interactions/createInteraction`, data);
export const updateInteraction = (id, data) =>
  axios.put(`${API_BASE_URL}/interactions/updateInteraction/${id}`, data);
export const deleteInteraction = (id) =>
  axios.delete(`${API_BASE_URL}/interactions/deleteInteraction/${id}`);

// Performance APIs
export const getPerformanceMetrics = () =>
  axios.get(`${API_BASE_URL}/performance/performanceMetrics`);

// User APIs
export const loginUser = (data) =>
  axios.post(`${API_BASE_URL}/users/login`, data);
export const registerUser = (data) =>
  axios.post(`${API_BASE_URL}/users/register`, data);
