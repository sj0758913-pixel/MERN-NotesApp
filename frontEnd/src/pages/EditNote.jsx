import axios from 'axios';
import React, { useState , useEffect} from 'react'
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom';

const EditNote = () => {
    const API = import.meta.env.VITE_API_URL;

    const [updateNotebtn, setUpdateNotebtn] = useState('Update Note')
const { id } = useParams();
 const navigate = useNavigate();
const [note , setNote] = useState('');
const [Title, setTitle] = useState('')

useEffect(() => {
    axios.get(`${API}/editNote/${id}`, {
        withCredentials: true
    })
    .then(res => {
        setNote(res.data.content);
        setTitle(res.data.Title);
    })
    .catch(err => {
        navigate("/Home");
    });
}, []);


const handleTitle = (e)=>{
        setTitle(e.target.value);
    }


const handleupdate = ()=>{
    setUpdateNotebtn('Updating...')
    axios.post(API+"/update/"+id ,{"text":note , "Title":Title},{
        withCredentials: true

    })
    .then(res=>{
       setUpdateNotebtn('Update Note');
        navigate("/notes")
         

    })
    .catch(err=>{
        navigate("/Home");
    })
    
}

    return (
        <>
            <div className="Edit-page">
                <div className="bck-to-Note">
                    <Link to="/notes">↩ back</Link>
                </div>
                <div>
                     <input className="Title" 
                    value={Title}
                    onChange={handleTitle}
                    type="text" placeholder='Set Title' />

                    <textarea 
                    value={note}
                    onChange={(e)=>{setNote(e.target.value)}}></textarea>
                    <button
                    onClick={handleupdate}
                        className='updt-btn'>{updateNotebtn}</button>
                </div>
            </div>

        </>
    )
}

export default EditNote
