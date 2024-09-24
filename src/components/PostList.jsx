import { useEffect, useState } from "react";
import PostCard from "./PostCard";
import axios from "axios"
import LoadingPost from "./LoadingPost";
import Error from "./Error";

function PostList () {

    const [posts, setPosts] =useState ([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState (false);

    useEffect (() => {
        async function fetchPosts() {
            try {
                setIsLoading(true);
                const response = await axios.get('https://87440e50ac31979f.mokky.dev/post');
                setPosts(response.data); //  json
            } catch (error) {
                setIsError(true);
                console.log(error);
            } finally {
                setIsLoading(false)
            }
       }
       fetchPosts();
    }, []);

    if (isError) {
        return <Error />;
    }

    return (
        <div class="all-news-block">
            {isLoading ? (<LoadingPost />) : (
                <>
                    {posts.map((post) => (
                        <PostCard key={post.id} post={post} />
                    ))}
                </>
            )}
        </div>
    ); 
}

export default PostList;