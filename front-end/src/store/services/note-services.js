import { baseUrl } from "../../shared/base-url";
import axios from "axios";
import authHeader from "./auth-headers";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const getNotes = () => {
  return fetch(`${baseUrl}all`, {
    headers: authHeader(),
    method: "GET",
  });
};

const saveNote = (note) => {
  return fetch(baseUrl + "update", {
    headers: authHeader(),
    body: JSON.stringify(note),
    method: "PUT",
  });
};

const addNewNote = () => {
  return fetch(baseUrl + "add", {
    headers: authHeader(),
    method: "POST",
  });
};
const removeNote = (id) => {
  return fetch(baseUrl + "remove/" + id, {
    headers: authHeader(),
    method: "DELETE",
  });
};
const noteService = {
  getNotes,
  saveNote,
  addNewNote,
  removeNote,
};
export default noteService;
