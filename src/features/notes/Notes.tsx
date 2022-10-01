import React, { useState, useEffect, useCallback } from 'react';
import NotesTable from '../../components/NotesTable/NotesTable';
import { useAppSelector } from '../../app/hooks';
import { Note } from '../../types';
import Modal from '../../components/Modal';
import Statistics from '../../components/Statistics';

import {
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

export function Notes() {
  const notes = useAppSelector(selectNotes);
  const [ unArchivedNotes, setUnArchivedNotes ] = useState<Note[]>([]);
  const [ archivedNotes, setArchivedNotes ] = useState<Note[]>([]);
  const [ modalOpen, setModalOpen ] = useState(false);
  const [activeNote, setActiveNote ] = useState<Note | null>(null);
  const [ categories, setCategories ] = useState<CategoriesObject>({...initialCategories});

  const closeModal = () => setModalOpen(false);
  const onAddButtonClick = () => {
    setModalOpen(true);
  };


const handleEditClick = useCallback((note: Note) => {
  setModalOpen(true);
  setActiveNote(note)
}, []);


  useEffect(() => {
    const tempArchivedNotes: Note[] = [];
    const tempUnArchivedNotes: Note[] = [];
    const tempCategories = {
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
      }};



    notes.forEach((note) => {

      if (note.isArchived) {
        tempArchivedNotes.push(note);
        tempCategories[note.category as keyof typeof tempCategories].archived ++;
      } else {
        tempUnArchivedNotes.push(note);
        tempCategories[note.category as keyof typeof tempCategories].unArchived ++;
      }
    });
    setArchivedNotes(tempArchivedNotes);
    setUnArchivedNotes(tempUnArchivedNotes);
    setCategories(tempCategories);
  }, [notes, ]);

  return (
      <>
        {modalOpen && <Modal
          closeModal={closeModal}
          activeNote={activeNote}
          setActiveNote={setActiveNote}
        />}
    <div className={"wrapper"}>
     <NotesTable
         onAddButtonClick={onAddButtonClick}
         onEditClick={handleEditClick}
         notes={unArchivedNotes}/>
         <Statistics statistics={categories}/>
      <NotesTable
          onEditClick={handleEditClick}
          notes={archivedNotes}/>
    </div>
        </>
  );
}
