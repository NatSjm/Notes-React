import { Note } from '../../types';
import { useState, useCallback } from 'react';
import {
  create,
    updateNote
 } from '../../features/notes/notesSlice';

import {  useAppDispatch } from '../../app/hooks';

interface Props {
    closeModal: () => void;
    activeNote: Note | null;
    setActiveNote: (note: (Note | null)) => any;
}



const Modal = ({ closeModal, activeNote, setActiveNote }: Props) => {
   const initialNote = {
        title: '',
        content: '',
        category: 'task'
    };
   const dispatch = useAppDispatch();

   const initialForm = activeNote || initialNote;
    const [form, setForm] = useState(initialForm);

    const createNote = () => {
        const timestamp = Date.now();
      const newForm = {
          ...form,
          id: timestamp,
          isArchived: false,
          createdAt: (new Date(timestamp)).toLocaleDateString(),
      };
        dispatch(create(newForm));
      closeModal();
    };

    const updateExistingNote = () => {
        if(!activeNote) return;
      const updatedNote = {
          ...activeNote,
          ...form
      };
      dispatch(updateNote(updatedNote));
      setActiveNote(null);
      closeModal();
    };

    const handleChange = useCallback((e: any) => {
        e.preventDefault();
        const target = e.target;
        const name = target.name;
        const value = target.value;
        setForm({
            ...form,
            [name as keyof typeof initialNote ]:value
        });
    },[form] );

    const onSubmit = (e: any) => {
        e.preventDefault();
        activeNote?.id ? updateExistingNote() : createNote();
    };
    return (
        <div className="popup-box">
            <div className="popup">
                <div className="content">
                    <header>
                        <p>{activeNote ? 'Update a note' : 'Create a note'}</p>
                        <i className="uil uil-times" onClick={closeModal}/>
                    </header>
                    <form action="#">
                        <div className="row title">
                            <label>Title</label>
                            <input type="text" name={'title'} onChange={handleChange} value={form.title} spellCheck="false"/>
                        </div>
                        <div className="row description">
                            <label>Content</label>
                            <textarea name={'content'} onChange={handleChange} value={form.content} spellCheck="false"/>
                        </div>
                        <div className="row category">
                            <label>Category</label>
                            <select onChange={handleChange} name="category" value={form.category} id="category">
                                <option value="task">Task</option>
                                <option value="thought">Random thought</option>
                                <option value="idea">Idea</option>
                            </select>
                        </div>
                        <button onClick={onSubmit}>{activeNote ? 'Update' : 'Create'}</button>
                    </form>
                </div>
            </div>
        </div>
    )
};

export default Modal;
