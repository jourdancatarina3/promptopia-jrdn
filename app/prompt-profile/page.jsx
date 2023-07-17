"use client";

import {useState, useEffect} from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import Profile from '@components/Profile';

const PromptProfile = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const userId = searchParams.get('id');

    const [posts, setPosts] = useState([])
    console.log("name", posts.find((post) => post)?.creator?.username);
    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch(`/api/users/${userId}/posts`);
            const data = await response.json();
        
            setPosts(data);
        }
        if(userId) fetchPosts();
        }, [userId]);

    const handleEdit = (post) => {
        router.push(`/update-prompt?id=${post._id}`)
    }

    const handleDelete = async (post) => {
        const hasConfirmed = confirm("Are you sure you want to delete this prompt?");

        if(hasConfirmed) {
            try {
                await fetch(`/api/prompt/${post._id.toString()}`, {
                    method: 'DELETE'
                });

                const filteredPosts = posts.filter((p) => p._id !== post._id);

                setPosts(filteredPosts);
            } catch (error) {
                console.log(error);
            }
        }
    }

    return (
        <Profile
            name={posts.find((post) => post)?.creator?.username}
            data={posts}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
        />
    )
}

export default PromptProfile