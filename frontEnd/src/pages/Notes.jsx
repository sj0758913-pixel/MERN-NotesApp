import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const Notes = () => {
    const API = import.meta.env.VITE_API_URL;

    const [Addnotebtn, setAddnotebtn] = useState('Add Note');
    const [logOutbtn, setlogOutbtn] = useState('Log out')
    const [deletebtn, setdeletebtn] = useState('Delete')

    const navigate = useNavigate();
    const [note, setNote] = useState('');
    const [username, setusername] = useState('');
    const [Notes, setNotes] = useState([])


    const fetchNotes = () => {
        axios.get(API+"/notes", {
            withCredentials: true
        })
            .then(res => {
                setNotes(res.data[0].Notes);
                setusername(res.data[0].username);
            })
            .catch(err => {
                navigate("/Home");
            });
    }

    useEffect(() => {
        fetchNotes();

    }, []);

    const handleNote = (e) => {
        setNote(e.target.value);
    }

    const handleSubmit = () => {

        setAddnotebtn('Adding...')
        axios.post(API+"/addNote", { note: note }, {
            withCredentials: true
        })
            .then(res => {
                fetchNotes();
                setAddnotebtn('Add note');
            })
            .catch(err => console.log(err));

        setNote('');
    }

    const editNote = (id,Note) => {
        navigate("/EditNote/" +id, {
            state: {
                note: Note
            }
        });
    }

    const delNote = (id,Note) => {
        // if(Note){
        //     return setdeletebtn('delete..')
        // }
        axios.post(API+"/delete/" + id, {}, {
            withCredentials: true
        })
            .then(res => {
                
                fetchNotes()
                setdeletebtn('Delete');
            })
            .catch(err => console.log(err))

    }

    const Logout = () => {
        setlogOutbtn('LogOt..')
        axios.post(API+"/Logout", {}, {
            withCredentials: true
        })
            .then(res => {
                setlogOutbtn('Log out');
                navigate("/Home")
            })
            .catch(err => console.log(err));
    }

    return (
        <>

            <div className='Note-page'>
            
                <div className="head">
                    <h2><i>Welcome</i>, {username}👋</h2>
                    <button onClick={Logout}>{logOutbtn}</button>
                </div>
                <div>
                    <textarea
                        value={note}
                        onChange={handleNote}
                        maxLength={50}
                        placeholder="Create your Note here...(max - 50 character)"></textarea>
                    <button
                        className='Add-btn'
                        onClick={handleSubmit}>{Addnotebtn}</button>
                </div>

                <h3>All Notes :</h3>
                <div className='Notes'>

                    {
                        Notes.length === 0
                            ?
                            <div className='empty-notes'>
                                <h2>No records</h2>
                            </div>
                            :
                            Notes.slice().reverse().map(Note => {
                                return (

                                    <div className='Note'  key={Note._id}>
                                        
                                        <p>{Note.content}

                                        </p>
                                        <div className="edit-del">
                                            <button onClick={() => editNote(Note._id , Note)} className='edit'>Edit</button>
                                            <button onClick={() => delNote(Note._id,Note)} className='delete'>{deletebtn}</button>
                                            <p> {new Date(Note.date).toLocaleDateString("en-GB")}</p>
                                        </div>
                                    </div>

                                )
                            })

                    }

                </div>

            </div>
        </>
    )
}

export default Notes
