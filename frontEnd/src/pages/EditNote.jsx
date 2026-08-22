import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { UNSAFE_useFogOFWarDiscovery, useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom';

const EditNote = () => {
    const API = import.meta.env.VITE_API_URL;

    const [updateNotebtn, setUpdateNotebtn] = useState('Update Note')
    const { id } = useParams();
    const navigate = useNavigate();
    const [note, setNote] = useState('');
    const [Title, setTitle] = useState('')

    // for loading
    const [loading, setLoading] = useState(true);
    const [loadingbtn , setLoadingbtn] = useState('');

    useEffect(() => {
        axios.get(`${API}/editNote/${id}`, {
            withCredentials: true
        })
            .then(res => {
                setNote(res.data.content);
                setTitle(res.data.Title);
                setLoading(false);
            })
            .catch(err => {
                navigate("/Home");
                setLoading(false);
            });
    }, []);


    const handleTitle = (e) => {
        setTitle(e.target.value);
    }


    const handleupdate = () => {
        setLoadingbtn(true)
        axios.post(API + "/update/" + id, { "text": note, "Title": Title }, {
            withCredentials: true

        })
            .then(res => {
                setUpdateNotebtn('Update Note')
                        setLoadingbtn(false);
                navigate("/notes")


            })
            .catch(err => {
                        setLoadingbtn(false)
                navigate("/Home");
            })

    }

    return (
        <>
            <div className="Edit-page">
                <div className="bck-to-Note">
                    <Link to="/notes">↩ back</Link>
                </div>

                {
                    loading ? <div className='Loading'>
                        <div className='spinner'></div>
                    </div> :
                        <div>
                            <input className="Title"
                                value={Title}
                                onChange={handleTitle}
                                type="text" placeholder='Set Title' />

                            <textarea
                                value={note}
                                onChange={(e) => { setNote(e.target.value) }}></textarea>
                            <button
                                onClick={handleupdate}
                                className='updt-btn'>{loadingbtn ? <div className='spinnerbtn'></div> :updateNotebtn}</button>
                        </div>
                }

            </div>

        </>
    )
}

export default EditNote
