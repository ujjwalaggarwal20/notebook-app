import React, { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import noteContext from '../context/noteContext';
import Note from './Note';

export default function NotesBlock() {
    const navigate = useNavigate();
    // get notes state, getNotes function and editNote function from the context (functions/states defined in noteState)
    const { notes, getNotes, editNote } = useContext(noteContext);
    // using useRef hook to put reference to the hidden show-demo button (to open the modal)
    const ref = useRef(null);
    // using useRef hook to put reference to the close button (to close the modal)
    const refClose = useRef(null);
    // newNote state to hold the data about the changes or edits
    const [newNote, setnewNote] = useState({ nid: 0, ntitle: "", ndescription: "", ntag: "" });
    // function to set state of newNote
    const updateNote = (note) => {
        ref.current.click();
        setnewNote({ nid: note._id, ntitle: note.title, ndescription: note.description, ntag: note.tag });
    }
    // function to handle change in values of input fields
    const handleChange = (e) => {
        setnewNote({ ...newNote, [e.target.name]: e.target.value })
    }
    // function to edit the note and close the modal
    const handleChangeNote = () => {
        editNote(newNote.nid, newNote.ntitle, newNote.ndescription, newNote.ntag);
        refClose.current.click();
    }

    // fetch the notes only once when loading the website/app {other operations will be performed on frontend so that not always need to re-render}
    useEffect(() => {
        if(localStorage.getItem('token')){
            getNotes();
        }
        else{
            navigate('/login');
        }
        // eslint-disable-next-line
    }, [])

    return (
        <>
            {/* <!-- Button trigger modal --> */}
            <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            {/* <!-- Modal --> */}
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="input-group mb-3">
                                <span className="input-group-text" id="basic-addon1">Title</span>
                                <input onChange={handleChange} type="text" value={newNote.ntitle} className="form-control" name="ntitle" aria-describedby="basic-addon1" />
                            </div>
                            <div className="input-group my-2">
                                <span className="input-group-text">Description</span>
                                <textarea onChange={handleChange} value={newNote.ndescription} className="form-control" name="ndescription"></textarea>
                            </div>
                            <div className="input-group mb-3">
                                <span className="input-group-text" id="basic-addon1">Tag</span>
                                <input onChange={handleChange} value={newNote.ntag} type="text" className="form-control" name="ntag" aria-describedby="basic-addon1" />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={handleChangeNote}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container">
                <div className="row">
                    {notes.map((e) => {
                        return (
                            <div className="col-sm-3" key={e._id}>
                                <Note note={e} updateNote={updateNote} />
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}
