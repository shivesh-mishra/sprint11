import { useEffect, useState } from 'react';
import { getPosts, createPost, deletePost } from './api';
import PostForm from './components/PostForm';
import PostList from './components/PostList';

export default function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    getPosts()
      .then(setPosts)
      .catch((e) => setError(e.message === 'Failed to fetch'
        ? 'Cannot reach the server. Is the API running on port 5000?'
        : e.message))
      .finally(() => setLoading(false));
  }, []);
  const handleCreate = async (formData) => {
    
    const created = await createPost(formData);
    setPosts((prev) => [created, ...prev]);
  };
  const handleDelete = async (id) => {
    try {
      await deletePost(id);
      setPosts((prev) => prev.filter((p) => p._id !== id));
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <main className="container">
      <h1>Posts</h1>
      <PostForm onSubmit={handleCreate} />
      {error && (
      
      <div className="error" role="alert">
          {error} <button onClick={() => setError(null)}>Dismiss</button>
        </div>
      )}
      
      {loading ? <p>Loading…</p> : <PostList posts={posts} onDelete={handleDelete} />}
    </main>
  );
}
