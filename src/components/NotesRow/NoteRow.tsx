import React from 'react';
import { Note } from '../../types'
import {getCategoryName} from '../../utils';


interface Props {
    // onSubmit: (values: PatientFormValues) => void;
    // onCancel: () => void;
    note: Note
}
const NoteRow = ({ note }: Props) => {
    const {title, content, createdAt, category, id, isArchived} = note;
    let filterCont = content.replaceAll("\n", '<br/>');
    let mentionedDates = (filterCont.match(/\d{1,2}\D\d{1,2}\D(\d{4}|\d{2})/g) || []).join(', ');
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
        <button><i className="uil uil-pen"/></button>
        <button><i className="uil uil-trash-alt"/></button>
        <button>
            {!isArchived ? <i className="uil uil uil-import"/> : <i className="uil uil-upload"/>}
        </button>
    </div>
</li>)
}
export default NoteRow;
