//install react-quill
import { useState } from "react"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"
import { Navigate } from "react-router-dom";

const toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['blockquote', 'code-block'],
    ['link', 'image', 'video', 'formula'],
  
    [{ 'header': 1 }, { 'header': 2 }],               // custom button values
    [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }],
    [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
    [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
    [{ 'direction': 'rtl' }],                         // text direction
  
    [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
  
    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    [{ 'font': [] }],
    [{ 'align': [] }],
  
    ['clean']                                         // remove formatting button
  ];

const modules = {
    toolbar:toolbarOptions
}
const formats = [
    'header',
    'bold','italic','underline','strike','blockquote',
    'list','bullet','indent',
    'link','image'
]



export default function CreatePost() {
    const [title,setTitle] = useState('')
    const [summary,setSummary] = useState('')
    const [content,setContent] = useState('')
    const [files,setFiles] = useState('')
    const [redirect,setRedirect] =  useState(false)
    async function createNewPost (e){
        const data = new FormData();
        data.set('title',title)
        data.set('summary',summary)
        data.set('content',content)
        data.set('file',files[0])
        e.preventDefault()

        console.log(files);
        const response = await fetch("http://localhost:4000/post",{
            method:'post',
            body:data,
            credentials:"include"
        });
        if(response.ok){
            setRedirect(true)
        }
    } 
    if (redirect){
        return <Navigate to={'/'} />
    }
    return (
        <form onSubmit={createNewPost}>
            <input type="title" placeholder={'title'} value={title} onChange={ e => setTitle(e.target.value)}/>
            <input type="summary" placeholder={'summary'} value={summary} onChange={e => setSummary(e.target.value) }  />
            {/* why didnt we took value of file as input?? i.e value={files} */}
            <input type="file"  onChange={e => setFiles(e.target.files)} />
            
            {/* <textarea name="" id="" cols="90" rows="20" ></textarea> */}
            {/* iska onchange ka syntax alag hai */}
            <ReactQuill value={content} modules={modules} formats={formats}   onChange={newValue => setContent(newValue)} />
            <button style={{marginTop:'20px'}}>Create Post</button>
        </form>
        
    )
}