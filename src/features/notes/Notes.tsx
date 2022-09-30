import React, { useState, useEffect } from 'react';
import NotesTable from '../../components/NotesTable/NotesTable';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { Note } from '../../types';
import Modal from '../../components/Modal';
import Statistics from '../../components/Statistics';

import {
  create,
  toggleArchived,
  selectNotes
} from './notesSlice';

export interface CategoryStat {
  archived: number;
  unArchived: number;
}

export interface CategoriesObject {
  task : CategoryStat;
  idea : CategoryStat;
  thought : CategoryStat;
}
export function Notes() {
  const notes = useAppSelector(selectNotes);
  console.log('notes', notes);
  const dispatch = useAppDispatch();
  const [incrementAmount, setIncrementAmount] = useState('2');

  const incrementValue = Number(incrementAmount) || 0;


  const [ unArchivedNotes, setUnArchivedNotes ] = useState<Note[]>([]);
  const [ archivedNotes, setArchivedNotes ] = useState<Note[]>([]);
  const [ modalOpen, setModalOpen ] = useState(false);

  const closeModal = () => setModalOpen(false);
  const onAddButtonClick = () => {
    setModalOpen(true);
  };



  const initialCategories = {
    task: {
      archived: 0,
      unArchived: 0
    },
    idea: {
      archived: 0,
      unArchived: 0
    },
    thought: {
      archived: 0,
      unArchived: 0
    }
  };
  const [ categories, setCategories ] = useState<CategoriesObject>({...initialCategories});
  useEffect(() => {
    const tempArchivedNotes: Note[] = [];
    const tempUnArchivedNotes: Note[] = [];
    const tempCategories = {...initialCategories};

    notes.forEach((note) => {

      if (note.isArchived) {
        tempArchivedNotes.push(note);
        tempCategories[note.category as keyof typeof tempCategories].archived++;
      } else {
        tempUnArchivedNotes.push(note);
        tempCategories[note.category as keyof typeof tempCategories].unArchived++;
      }
    });
    setArchivedNotes(tempArchivedNotes);
    setUnArchivedNotes(tempUnArchivedNotes);
    setCategories(tempCategories);
  }, [notes]);

  return (
      <>
        {modalOpen && <Modal
          closeModal={closeModal}
        />}
    <div className={"wrapper"}>
     <NotesTable
         onAddButtonClick={onAddButtonClick}
         notes={unArchivedNotes}/>
         <Statistics statistics={categories}/>
      <NotesTable
          notes={archivedNotes}/>
    </div>
        </>
  );
}
