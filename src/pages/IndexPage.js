import { useEffect, useState } from 'react';
import '../App.css';
import Header from '../Header';
import Layout from '../Layout';
import Post from '../Post';

//we are adding additional; code to display our things
export default function IndexPage(){
    const [posts,setPosts] = useState([])
    useEffect(() => {
        fetch('http://localhost:4000/post')
        .then(response =>{
            response.json()
                .then(posts => {
                    console.log(posts);
                    setPosts(posts)
                })
        })
    }, [])
    return(
        <>
            {posts.length >0 && posts.map(post =>(
                <Post {...post} />
            ))}
        </>
    )
}