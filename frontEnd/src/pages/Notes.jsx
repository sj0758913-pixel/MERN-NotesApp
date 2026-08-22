import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { UNSAFE_shouldHydrateRouteLoader, useNavigate } from 'react-router-dom'


const Notes = () => {
    const API = import.meta.env.VITE_API_URL;

    const [Addnotebtn, setAddnotebtn] = useState('Add Note');
    const [logOutbtn, setlogOutbtn] = useState('Log out')
    const [deletebtn, setdeletebtn] = useState('Delete')

    const navigate = useNavigate();
    const [note, setNote] = useState('');
    const [Title, setTitle] = useState('');
    const [username, setusername] = useState('');
    const [Notes, setNotes] = useState([])

    // for loading page
    const [loading, setLoading] = useState(true);
    const [loadingbtn, setLoadingbtn] = useState('');
     const [Logoutloadingbtn, setLogoutLoadingbtn] = useState('');
    const [Clicked, setClicked] = useState(false);


    const fetchNotes = () => {
        axios.get(API + "/notes", {
            withCredentials: true
        })
            .then(res => {
                setNotes(res.data[0].Notes);
                setusername(res.data[0].username);
                setLoading(false);
            })
            .catch(err => {
                navigate("/Home");
                setLoading(false);
            });
    }

    useEffect(() => {
        fetchNotes();

    }, []);

    const handleNote = (e) => {
        setNote(e.target.value);
    }

    const handleTitle = (e) => {
        setTitle(e.target.value);
    }

    const handleSubmit = () => {
        // setAddnotebtn('Adding...')
        setLoadingbtn(true);

        axios.post(API + "/addNote", { note: note, Title: Title }, {
            withCredentials: true
        })
            .then(res => {
                fetchNotes();
                setAddnotebtn('Add note');
                setLoadingbtn(false)
            })
            .catch(err => {
                console.log(err)
                setLoadingbtn(false)
            });


        setNote('');
        setTitle('');
        setClicked(false);
    }

    const editNote = (id, Note, Title) => {
        navigate("/EditNote/" + id, {
            state: {
                note: Note,
                Title: Title
            }
        });
    }

    const delNote = (id, Note) => {
        axios.post(API + "/delete/" + id, {}, {
            withCredentials: true
        })
            .then(res => {

                fetchNotes()
                setdeletebtn('Delete');
            })
            .catch(err => console.log(err))

    }

    const Logout = () => {
        setLogoutLoadingbtn(true)
        axios.post(API + "/Logout", {}, {
            withCredentials: true
        })
            .then(res => {
                setlogOutbtn('Log out');
                setLogoutLoadingbtn(false)
                navigate("/Home")
                
            })
            .catch(err => {
                console.log(err);
                setLogoutLoadingbtn(false);
            });
    }
    if (loading) {
        return (
            <div className="Loading">
                <div className='spinner'>

                </div>
            </div>
        );
    }
    return (
        <>

        
            <div className='Note-page'>

                <div className="head">
                    <h2>👋 {username}</h2>
                    <button onClick={Logout}>{Logoutloadingbtn ?
                            <div className='spinnerbtn'></div>
                            : logOutbtn}</button>
                </div>
                <div>
                    <input className="Title"
                        value={Title}
                        onChange={handleTitle}
                        type="text" placeholder='Set Title' />

                    <textarea
                        value={note}
                        onChange={handleNote}
                        placeholder="Create your Note here..."></textarea>
                    <button
                        className={Clicked ? 'clickedAddbtn' : 'Add-btn'}
                        onClick={() => {

                            handleSubmit()
                            setClicked(true)
                        }}>

                        {loadingbtn ?
                            <div className='spinnerbtn'></div>
                            : Addnotebtn}</button>
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

                                    <div className='Note' key={Note._id}>

                                        <p>{Note.Title}</p>
                                        <h4>{Note.content.split(" ").slice(0, 10).join(" ")}.....</h4>
                                        <div className="edit-del">
                                            <button onClick={() => editNote(Note._id, Note)} className='edit'>view</button>
                                            <button onClick={() => delNote(Note._id, Note)} className='delete'>{deletebtn}</button>
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
