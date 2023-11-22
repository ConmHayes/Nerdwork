import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./postPage.css"
export default function PostPage() {
    const [thread, setThread] = useState([]);
    const [posts, setPosts] = useState([]);
    let { thread_id } = useParams()
    thread_id = parseInt(thread_id)
    console.log("ok")
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
            const response = await fetch(`https://nerdwork-server.onrender.com/post/`, {
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
    console.log(posts)
    function displayPost() {
        return posts.map(post => (
            <article className="post-card" key={post.post_id}>
                <header className="post-head">
                    <img className="user-avatar" src={post.avatar} alt={`${post.username}'s avatar`} />
                    <h3 className="user-email">{post.email}</h3>
                </header>
                <section className="post-body">
                    <p>{post.body}</p>
                </section>
                <footer className="post-footer">
                    <span className="vote-icon"></span> {/* Replace with an actual icon */}
                    <span className="vote-count">{post.votes}</span>
                </footer>
            </article>
        ));
    }


    return (
        
        <section className="thread">
            <header className="thread-head">
                <h1 className="thread-title">{thread.title}</h1>
                <p className="thread-description">{thread.description}</p>
            </header>
            <div className="sorter">
                <label htmlFor="sort-select">Sort by:</label>
                <select id="sort-select">
                <option value="most-voted">Most voted</option>
                <option value="least-voted">Least voted</option>
                </select>
            </div>
            <div className="posts-container">
                {displayPost()}
            </div>
        </section>
        
    );
}
