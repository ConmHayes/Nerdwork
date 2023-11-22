import React, { useState, useEffect } from "react";
import SearchForm from "../../components/SearchForm";
import { useNavigate } from "react-router-dom";

export default function CommunityPage() {
  const [searchString, setSearchString] = useState("");
  const [communities, setCommunities] = useState(null);
  const [communityId, setCommunityId] = useState(1)
  const navigate = useNavigate();

  useEffect(() => {
    fetchCommunities();
  }, []);

  const fetchCommunities = async () => {
    try {
      const response = await fetch('https://nerdwork-server.onrender.com/community/', {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      const communityData = data.Communities; // Access the Communities array in the response
      setCommunities(communityData)
    } catch (error) {
      console.error('Error fetching communities:', error);
    }
  };

  const handleCommunityClick = async (id) => {
    await setCommunityId(id)
    navigate(`threads/${id}`)
  }

  function displayCommunities() {
    return communities
      .filter(community => searchString.length === 0 || community.community_name.toLowerCase().includes(searchString.toLowerCase()))
      .map(community => (
        <div key={community.community_id} onClick={() => handleCommunityClick(community.community_id)}>
          <h2>{community.community_name}</h2>
          <p>{community.description}</p>
        </div>
      ));
  }
  

  return (
    <>
      <SearchForm searchString={searchString} setSearchString={setSearchString} />
      <div>
      {communities === null ? (
        <p>Loading communities...</p>
      ) : (
        <div>{displayCommunities()}</div>
      )}
      </div>
    </>
  );
}
