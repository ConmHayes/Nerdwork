import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function ThreadsPage() {
    const [threads, setThreads] = useState(null);
    const navigate = useNavigate();
    const { community_id } = useParams()

    useEffect(() => {
        fetchThreads();
    }, [community_id]);

    const fetchThreads = async () => {
    try {
        const response = await fetch(`http://127.0.0.1:5000/community/${community_id}`, {
        headers: {
            'Content-Type': 'application/json',
        },
        });
        const data = await response.json();
        const threadData = data.threads; 
        setThreads(threadData)
    } catch (error) {
        console.error('Error fetching threads:', error);
    }
    };

    const handleCommunityClick = async (id) => {
    navigate(`communities/${id}`)
    }

    function displayThreads() {
    return threads.map(thread => (
        <div key={thread.thread_id} onClick={() => handleCommunityClick(thread.thread_id)}>
            <h2>{thread.title}</h2>
            <p>{thread.description}</p>
        </div>
        ));
    }


    return (
    <>
        <div>
        {threads === null ? (
        <p>Loading Threads...</p>
        ) : (
        <div>{displayThreads()}</div>
        )}
        </div>
    </>
    );
}
