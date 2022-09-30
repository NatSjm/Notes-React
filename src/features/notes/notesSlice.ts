import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { defaultNotes } from './defaultNotes';
import { Note} from '../../types';


const initialState: Array<Note> = defaultNotes;



export const notesSlice = createSlice({
  name: 'notes',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    create: (state, action: PayloadAction<Note>) => {
      console.log('action', action);
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
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

  },

});

export const { create, toggleArchived } = notesSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
// export const selectCount = (state: RootState) => state.counter.value;
export const selectNotes = (state: RootState) => state.notes;
// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
// export const incrementIfOdd =
//   (amount: number): AppThunk =>
//   (dispatch, getState) => {
//     const currentValue = selectCount(getState());
//     if (currentValue % 2 === 1) {
//       dispatch(incrementByAmount(amount));
//     }
//   };

export default notesSlice.reducer;
