import { useContext, useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { UserContext } from "../UserContext"
import { formatISO9075 } from "date-fns"
export default function PostPage(cover) {
    
    const [postInfo,setPostInfo] = useState(null)
    const {userInfo} = useContext(UserContext)
    //we have to get id so we use useparams
    
    const {id} = useParams()
    
    //to edit look at code 5

    useEffect(()=>{
        fetch(`http://localhost:4000/post/${id}`)
            .then(response =>{
                response.json().
                    then(postInfo =>{
                        setPostInfo(postInfo)
                })
            })
    },[])
    
    if(!postInfo) return ''

    return(
        <div>
            
            <h1>
                {postInfo.title}
            </h1>
            
            <div className="image">
                <img src={`http://localhost:4000/${postInfo.cover}`} alt="" />
            </div>
            <time>{formatISO9075(new Date(postInfo.createdAt))}</time>
            <div className="author">by @{postInfo.author.username}</div>
            {userInfo.id === postInfo.author._id && (
                <div> 
                    <Link className="edit-btn" to={`/edit/${postInfo._id}`}>
                            edit this page
                    </Link>
                </div>
            )}
            <div dangerouslySetInnerHTML={{__html:postInfo.content}} />
        </div>
 
    )
}