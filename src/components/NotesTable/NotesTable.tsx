import { useMemo } from "react";
import { Note } from '../../types'
import NoteRow from '../NotesRow';



type TableProps = {
   notes: Note[];
   onAddButtonClick?: () => any;
   onEditClick: (note: Note) => void;
};

const NotesTable = ({notes, onAddButtonClick, onEditClick}: TableProps) => {
    const renderNotes = useMemo(() => (
        (notes|| []).map((note: Note) => <NoteRow onEditClick={onEditClick} key={note.id} note={note}/>)
    ),[notes, onEditClick]);
    return (
        <div className="table-wrapper">
            <div className="table-header">
                <div className="details">
                    <span>Name</span>
                    <span>Created</span>
                    <span>Category</span>
                    <span>Content</span>
                    <span>Dates</span>
                </div>
                <div className="controls">
                    <i className="uil uil-pen"/>
                    <i className="uil uil-trash-alt"/>
                    <i className="uil uil uil-import"/>
                </div>
            </div>
            {onAddButtonClick && <div className="add-box" onClick={onAddButtonClick}>
                <div className="icon"><i className="uil uil-plus"></i></div>
                <p>Create a note</p>
            </div>
            }
            <ul id="notes-list">
                { renderNotes }
            </ul>
        </div>
    )
}

export default NotesTable;
