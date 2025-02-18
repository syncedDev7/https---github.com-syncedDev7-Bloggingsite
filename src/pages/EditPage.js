//make sure youb use Editor from react quill


import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Editor from "../Editor";
export default function EditPost(){
    const {id} = useParams()
    const [content,setContent] = useState('')
    const [summary,setSummary] = useState('')
    const [files,setFiles] = useState()
    const [title,setTitle] = useState('')
    const [redirect,setRedirect] = useState(false)

    useEffect(() =>{
        //ask to explain
        fetch('http://localhost:4000/post/'+id)
        .then(response => {
            response.json().then(postInfo =>{
                setTitle(postInfo.title);
                setContent(postInfo.content);
                setSummary(postInfo.summary);
            })
        })
    }, [])

    async function updatePost(e) {
        e.preventDefault();
        //ask to explain
        const data = new FormData()
        data.set('title',title)
        data.set('summary', summary);
        data.set('content', content);
        data.set('id', id);
        //ask to explain
        if (files?.[0]) {
            data.set('file',  files?.[0])
        }
        const response = await fetch('http://localhost:4000/post',{
            method:'PUT',
            body:data,
            credentials:'include'
        })
        if (response.ok) {
            setRedirect(true)
        }
    }

    if (redirect) {
        return <Navigate to={'/post/'+id} />
    }

    return(
        <form onSubmit={updatePost}>
        <input type="title"
        placeholder={'Title'}
        value={title}
        onChange={ev => setTitle(ev.target.value)} />
        <input type="summary"
            placeholder={'Summary'}
            value={summary}
            onChange={ev => setSummary(ev.target.value)} />
        <input type="file"
            onChange={ev => setFiles(ev.target.files)} />
        <Editor onChange={setContent} value={content} />
        <button style={{marginTop:'5px'}}>Update post</button>
        </form>
    )

}