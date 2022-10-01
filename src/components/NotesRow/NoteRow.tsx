import React from 'react';
import { Note } from '../../types'
import {getCategoryName} from '../../utils';
import { useAppDispatch } from '../../app/hooks';

import {
    toggleArchived,
    deleteNote
} from '../../features/notes/notesSlice';

interface Props {

    onEditClick: (note: Note) => void
    note: Note
}
const NoteRow = ({ note, onEditClick }: Props) => {
    const {title, content, createdAt, category, id, isArchived} = note;
    let filterCont = content.replaceAll("\n", '<br/>');
    let mentionedDates = (filterCont.match(/\d{1,2}\D\d{1,2}\D(\d{4}|\d{2})/g) || []).join(', ');
    const dispatch = useAppDispatch();
return (
    <li className={'note'}>
   <div className="details">
       <div className="note-title">
           { title }
       </div>
       <div >
           { createdAt }
       </div>
       <div >
           { getCategoryName(category) }
       </div>
       <div >
           { content }
       </div>
       <div >
           { mentionedDates }
       </div>
   </div>
    <div className={'controls'} >
        <button><i className="uil uil-pen" onClick={() => onEditClick(note)}/></button>
        <button><i className="uil uil-trash-alt" onClick={() => dispatch(deleteNote(id))}/></button>
        <button>
            {!isArchived
                ? <i className="uil uil uil-import" onClick={() => dispatch(toggleArchived(id))}/>
                : <i className="uil uil-upload" onClick={() => dispatch(toggleArchived(id))}/>}
        </button>
    </div>
</li>)
}
export default NoteRow;
