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

useEffect(() => {
    axios.get(`${API}/editNote/${id}`, {
        withCredentials: true
    })
    .then(res => {
        setNote(res.data.content);
    })
    .catch(err => {
        navigate("/Home");
    });
}, []);

const handleupdate = ()=>{
    setUpdateNotebtn('Updating...')
    axios.post(API+"/update/"+id ,{"text":note},{
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
                    <Link to="/notes"><a >⬅ back</a></Link>
                </div>
                <div>
                    <textarea 
                    value={note}
                     maxLength={50}
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
