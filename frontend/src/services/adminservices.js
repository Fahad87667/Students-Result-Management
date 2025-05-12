import axios from "axios";

export function loginadmin(formData) {
  return axios.post("http://127.0.0.1:3700/admin/login", formData);
}

export function storetoken(token) {
  localStorage.setItem("token", token);
}

export function removetoken() {
  localStorage.removeItem("token");
}

export function gettoken() {
  localStorage.getItem("token");
}
