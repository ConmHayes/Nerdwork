import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function PostPage() {
    const [thread, setThread] = useState([]);
    const [posts, setPosts] = useState([]);
    let { thread_id } = useParams()
    thread_id = parseInt(thread_id)

    useEffect(() => {
        fetchPosts(thread_id);
    },[thread_id]);

    const fetchPosts = async (thread_id) => {
    try {
        const response = await fetch(`https://nerdwork-server.onrender.com/thread/${thread_id}`, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();
        setThread(data)
        
        try {
            const response = await fetch(`http://127.0.0.1:5000/post/`, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            let postsData = await response.json();
            postsData = postsData.Posts
            const postData = postsData.filter(post => post.thread_id === thread_id)
            console.log(postData)
            setPosts(postData)
        } catch (error) {
            console.error('Error fetching threads:', error);
        }
    } catch (error) {
        console.error('Error fetching threads:', error);
    }
    };

    const handleThreadClick = async (thread_id) => {
    navigate(`thread/${thread_id}`)
    }

    function displayThreads() {
        return posts.map(post => (
            <div key={post.post_id}>
                <h2>{post.post_title}</h2>
                <p>{post.body}</p>
            </div>
        ));
    }


    return (
        <>
            <div>
                <div>{displayThreads()}</div>
            </div>
        </>
    );
}
