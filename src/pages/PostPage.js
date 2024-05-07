import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { UserContext } from "../UserContext"
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
            <div className="image">
                <img src={`http://localhost:4000/${postInfo.cover}`} alt="" />
            </div>
            <h1>
                {postInfo.title}
            </h1>
            <div dangerouslySetInnerHTML={{__html:postInfo.content}} />
        </div>
 
    )
}