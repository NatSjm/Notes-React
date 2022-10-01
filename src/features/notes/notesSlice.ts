import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { defaultNotes } from './defaultNotes';
import { Note} from '../../types';


const initialState: Array<Note> = defaultNotes;



export const notesSlice = createSlice({
  name: 'notes',
  initialState,

  reducers: {
    create: (state, action: PayloadAction<Note>) => {
      state.push(action.payload);
    },
    toggleArchived: (state, action: PayloadAction<number>) => {
  const id = action.payload;
  const noteToChange = state.find(n => n.id === id);
  if(noteToChange){
  const changedNote = {
    ...noteToChange,
    isArchived: !noteToChange.isArchived
  };

  return state.map(note =>
      note.id !== id ? note : changedNote
  )} else {
    return state;
  }
},
    deleteNote: (state, action: PayloadAction<number>) => {
      const idToDelete = action.payload;
      return state.filter((note) => note.id !== idToDelete);
    },
    updateNote: (state, action: PayloadAction<Note>) => {
      const newNote = action.payload;
      return state.map(note =>
          note.id !== newNote?.id ? note : newNote
      )

    }
  },



});

export const { create, toggleArchived, deleteNote, updateNote} = notesSlice.actions;


export const selectNotes = (state: RootState) => state.notes;


export default notesSlice.reducer;
