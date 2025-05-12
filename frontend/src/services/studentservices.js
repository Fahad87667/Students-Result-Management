import axios from "axios";
import { gettoken } from "./adminservices";

const token = gettoken();

export function fetchalldata() {
  return axios.get("http://localhost:3700/students", {
    headers: { Authorization: `Bearer ${token}` },
  });
}

export function postdata(formData) {
  return axios.post("http://localhost:3700/students", formData, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

export function deletedata(id) {
  return axios.delete(`http://localhost:3700/students/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

export function updatedata(id, formData) {
  return axios.put(`http://localhost:3700/students/${id}`, formData, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

export function getdatabyid(id) {
  return axios.get(`http://localhost:3700/students/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}
