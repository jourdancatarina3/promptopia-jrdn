"use client";

import {useState, useEffect} from 'react';

import PromptCard from './PromptCard';

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className='mt-16 prompt_layout'>
      {data.map((post) => (
        <PromptCard
          key={post.id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  )
}

const Feed = () => {
  const [searchText, setSearchText] = useState('');
  const [posts, setPosts] = useState([]);

  
  const searchFilter = (array) => {
    return array.filter((post) =>(
      post.prompt.toLowerCase().includes(searchText.toLowerCase()) 
      || post.tag.toLowerCase().includes(searchText.toLowerCase()) 
      || post.creator.username.toLowerCase().includes(searchText.toLowerCase()) 
    )
    );
  };

  const handleTagClick = (tagName) => {
    setSearchText(tagName);
  };
  
  

  const filtered = searchFilter(posts)
  console.log("filtered", filtered);

  const handleSearchChange = (e) => {
    setSearchText(e.target.value)
  }

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/prompt');
      const data = await response.json();

      setPosts(data);
    }

    fetchPosts();
  }, []);

  return (
    <section className='feed'>
      <form className='relative w-full flex-center' >
        <input
          type='text'
          placeholder='Search for a tag or a username'
          value={searchText}
          onChange={handleSearchChange}
          required
          className='search_input peer'
        />
      </form>

      <PromptCardList 
        data={filtered}
        handleTagClick={handleTagClick}
      />
    </section>
  )
}

export default Feed