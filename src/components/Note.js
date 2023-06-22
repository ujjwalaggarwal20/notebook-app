import React, { useContext } from 'react';
import noteContext from '../context/noteContext';

export default function Note(props) {
    // get whole note as prop, also updateNote function (defined in NotesBlock as props)
    const {note, updateNote} = props;
    // getting current date of the system to store in note
    const date = new Date(note.date);
    const context = useContext(noteContext);
    // get deleteNote function from the context
    const { deleteNote} = context;

    return (
        <>
            <div className="card my-3 noteDesign">
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">{date.toDateString()}</h6>
                    <p className="card-text">{note.description}</p>
                    <i className="fas fa-eraser mx-2" onClick={()=>{deleteNote(note._id)}}></i>
                    <i className="far fa-edit mx-2" onClick={()=>(updateNote(note))}></i>
                </div>
            </div>
        </>
    )
}
