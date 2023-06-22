import React, { useContext, useState, useEffect } from 'react';
import NotesBlock from './NotesBlock';
import noteContext from '../context/noteContext';
import { useNavigate } from 'react-router-dom';

export default function Home() {
    const navigate = useNavigate();
    // note state is imported with help of useContext hook
    const context = useContext(noteContext);
    // addNote function is imported from the context
    const { addNote } = context;
    // creating a newnote state to store the data
    const [newnote, setnewnote] = useState({ title: "", description: "", tag: "" })
    // function to add a new note
    const handleAdd = (e) => {
        e.preventDefault();
        // the data previously stored in newnote is added to db via addNote function
        addNote(newnote.title, newnote.description, newnote.tag);
        // set the newnote parameters empty after sending data
        setnewnote({ title: "", description: "", tag: "" })
    }
    // function to track the values in the input boxes
    const onChange = (e) => {
        setnewnote({ ...newnote, [e.target.name]: e.target.value });
    }

    const [user, setuser] = useState({name: "", username: ""});

    const getUser = async () => {
        let url = `${process.env.REACT_APP_BACKEND}/api/auth/getuser1`;
        let response = await fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "auth-token": localStorage.getItem('token')
            }
          });
          // eslint-disable-next-line
          let json = await response.json();
          setuser({name: json.user.name, username: json.user.username});
    }

    useEffect(() => {
        if(localStorage.getItem('token')){
            getUser();
        }
        else{
            navigate('/login');
        }
        // eslint-disable-next-line
    }, [])

    return (
        <>
            <div className="container">
                <div  className="my-3">
                    <p><b>User: </b>{user.name}<br/>
                    <b>Username: </b><i>{user.username}</i></p>
                </div>
                <h3 className="my-2">Add New Note</h3>
                <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">Title</span>
                    <input name="title" onChange={onChange} value={newnote.title} type="text" className="form-control" aria-describedby="basic-addon1" />
                </div>

                <div className="input-group my-2">
                    <span className="input-group-text">Description</span>
                    <textarea name="description" value={newnote.description} onChange={onChange} className="form-control"></textarea>
                </div>

                <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">Tag</span>
                    <input name="tag" onChange={onChange} value={newnote.tag} type="text" className="form-control" aria-describedby="basic-addon1" />
                </div>
                <button type="submit" className="btn btn-primary" onClick={handleAdd}>Add Note</button>
            </div>
            <div className="container">
                <NotesBlock />
            </div>
        </>
    )
}
