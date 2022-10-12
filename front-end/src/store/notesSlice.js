import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loadState, saveState } from "../FileStorage";
import noteService from "./services/note-services";
const errorMessage =
  "you have an empty note,Please edit before adding a new one";
const emptyNote = { title: "new note", content: "please click to edit note" };

export const getNotes = createAsyncThunk(
  "notes/getNotes",
  async (data, thunkAPI) => {
    const isLogged = thunkAPI.getState().auth.isLoggedIn;

    if (isLogged) {
      try {
        const res = await noteService.getNotes();
        const data = await res.json();
        return { data, isLocal: false };
      } catch (err) {
        console.log(err);
      }
    } else {
      return loadState()
        ? { data: loadState(), isLocal: true }
        : { data: [], isLocal: true };
    }
  }
);

export const saveNote = createAsyncThunk(
  "notes/saveNote",
  async (note, thunkAPI) => {
    const isLogged = thunkAPI.getState().auth.isLoggedIn;
    if (isLogged) {
      await noteService.saveNote(note);
      return { note, isLocal: false };
    } else {
      return { note, isLocal: true };
    }
  }
);

export const addNewNote = createAsyncThunk(
  "notes/addNewNote",
  async (_, thunkAPI) => {
    const isLogged = thunkAPI.getState().auth.isLoggedIn;
    const notes = thunkAPI.getState().notes.listOfNotes;
    const lastNote = notes[notes.length - 1];
    try {
      if (isLogged) {
        const res = await noteService.addNewNote();
        const id = await res.json();
        return id > 0
          ? { id, isLocal: false }
          : thunkAPI.rejectWithValue(errorMessage);
      } else {
        if (
          notes.length == 0 ||
          lastNote.title != emptyNote.title ||
          lastNote.content != emptyNote.content
        ) {
          const id = Date.now();
          return { id, isLocal: true };
        } else {
          return thunkAPI.rejectWithValue(errorMessage);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
);

export const deleteNote = createAsyncThunk(
  "notes/deleteNote",
  async (id, thunkAPI) => {
    const isLogged = thunkAPI.getState().auth.isLoggedIn;
    if (isLogged) {
      try {
        await noteService.removeNote(id);
        return { id, isLocal: false };
      } catch (error) {
        console.log(error);
      }
    } else {
      return { id, isLocal: true };
    }
  }
);

const notesSlice = createSlice({
  name: "notes",
  initialState: {
    listOfNotes: [],
    note: null,
    error: null,
    listIsLoading: false,
  },
  reducers: {
    showNote(state, action) {
      state.note = state.listOfNotes.find((note) => note.id == action.payload);
    },
    getLastNote(state, action) {
      state.note = state.listOfNotes[state.listOfNotes.length - 1];
    },
    closeError(state, action) {
      state.error = null;
    },
  },
  extraReducers: {
    [getNotes.fulfilled]: (state, action) => {
      state.listOfNotes = action.payload.data;
      state.error = null;
      state.listIsLoading = false;
      if (action.payload.isLocal) {
        state.note = null;
      }
    },
    [getNotes.pending]: (state, action) => {
      state.listOfNotes = [];
      state.error = null;
      state.listIsLoading = true;
    },
    [getNotes.rejected]: (state, action) => {
      state.listOfNotes = [];
      state.error = null;
      state.listIsLoading = false;
    },
    [saveNote.fulfilled]: (state, action) => {
      const index = state.listOfNotes.findIndex(
        (note) => note.id == action.payload.note.id
      );
      const oldNotes = state.listOfNotes;
      if (
        state.error &&
        oldNotes[index].title == emptyNote.title &&
        oldNotes[index].content == emptyNote.content
      ) {
        state.error = null;
      }
      oldNotes[index] = {
        ...oldNotes[index],
        title: action.payload.note.title,
        content: action.payload.note.content,
      };
      state.listOfNotes = oldNotes;

      if (action.payload.isLocal) {
        saveState(state.listOfNotes);
      }
    },
    [addNewNote.fulfilled]: (state, action) => {
      state.listOfNotes.push({
        id: action.payload.id,
        content: emptyNote.content,
        title: emptyNote.title,
      });
      if (action.payload.isLocal) {
        saveState(state.listOfNotes);
      }
      state.note = state.listOfNotes[state.listOfNotes.length - 1];
      state.error = null;
    },
    [addNewNote.rejected]: (state, action) => {
      state.error = action.payload;
    },

    [deleteNote.fulfilled]: (state, action) => {
      const newList = state.listOfNotes.filter(
        (note) => note.id !== action.payload.id
      );
      state.listOfNotes = newList;

      if (state.listOfNotes.length >= 1) {
        state.note = state.listOfNotes[0];
      }

      if (action.payload.isLocal) {
        saveState(state.listOfNotes);
      }
      if (state.listOfNotes.length < 1) {
        state.note = null;
        state.error = null;
      }
    },
  },
});

export const notesActions = notesSlice.actions;
export default notesSlice;
