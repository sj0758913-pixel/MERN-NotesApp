import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const Notes = () => {
    const API = import.meta.env.VITE_API_URL;
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
        axios.post(API+"/addNote", { note: note }, {
            withCredentials: true
        })
            .then(res => {
                fetchNotes();
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

    const delNote = (id) => {
        axios.post(API+"/delete/" + id, {}, {
            withCredentials: true
        })
            .then(res => {
                fetchNotes()
            })
            .catch(err => console.log(err))

    }

    const Logout = () => {
        axios.post(API+"/Logout", {}, {
            withCredentials: true
        })
            .then(res => {
                console.log(res.data)
                navigate("/Home")
            })
            .catch(err => console.log(err));
    }

    return (
        <>

            <div className='Note-page'>
            
                <div className="head">
                    <h2><i>Welcome</i>, {username}👋</h2>
                    <button onClick={Logout}>Log out</button>
                </div>
                <div>
                    <textarea
                        value={note}
                        onChange={handleNote}
                        maxLength={50}
                        placeholder="Create your Note here...(max - 50 character)"></textarea>
                    <button
                        className='Add-btn'
                        onClick={handleSubmit}>Add Note</button>
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

                                    <div className='Note' onClick={()=> editNote(Note._id , Note)} key={Note._id}>
                                        
                                        <p>{Note.content}

                                        </p>
                                        <div className="edit-del">
                                            {/* <button onClick={() => editNote(Note._id , Note)} className='edit'>Edit</button> */}
                                            <button onClick={() => delNote(Note._id)} className='delete'>Delete</button>
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
