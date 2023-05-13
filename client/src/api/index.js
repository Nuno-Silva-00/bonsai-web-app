import axios from "axios";

const API = axios.create({ baseURL: "https://bonsaiapi.onrender.com" });

const url = "/api/bonsai";

export const createBonsai = (newBonsai) => API.post(`${url}`, newBonsai);

export const updateBonsai = (bonsai) =>
  API.patch(`${url}/${bonsai._id}`, bonsai);

export const deleteBonsai = (id) => API.delete(`${url}/${id}`);

export const fetchBonsais = (page) => API.get(`${url}?page=${page}`);

export const fetchBonsaiId = (id) => API.get(`${url}/${id}`);

export const fetchBonsaiByEmail = (email, loggedInUser) =>
  API.get(`${url}/email/${email}/${loggedInUser}`);

export const likeBonsai = (id, userEmail) =>
  API.patch(`${url}/${id}/likeBonsai`, { userEmail });

export const fetchBonsaiBySearch = (search) =>
  API.get(`${url}/search/query?searchQuery=${search}`);

export const createLoginUser = (user) => API.post("/api/user", user);
