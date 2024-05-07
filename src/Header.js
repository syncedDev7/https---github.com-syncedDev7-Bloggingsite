// search more about this credentials 
import {Link} from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import { UserContext } from "./UserContext"

// better vto use link  tg than anchoir
export default function Header(){
  // const [username,setUsername] = useState("")
  //we need to call useeffect for cookie data tro retrive if logged in or not
  // we are gonna use context for this 
  const {userInfo,setUserInfo} = useContext(UserContext)
  useEffect(()=>{
    fetch("http://localhost:4000/profile",{
      credentials:"include"
    })
    .then(response =>{
      response.json()
        .then(userInfo =>{
          // setUsername(userInfo.username)
          setUserInfo(userInfo)
        })
    })
  },[])

  function logout() {
    fetch("http://localhost:4000/logout",{
      credentials:"include",
      method:"POST"
    })
    // setUsername(null);
    setUserInfo(null)
  
  }

  const username = userInfo?.username
    return (
        <header>
       
        <Link to="/" className="logo">MyBlog</Link>
          <nav>
            {/* read more about this syntax */}
            {/* {username  */
            username && (
              <>
                <Link to="/create">Create New Post</Link>
                <a onClick={logout}>Logout</a>
              </>
            )}
            {/* {!username  */
            username
            && (
              <>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
              </>
            )}
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </nav>
      </header>
    )
}