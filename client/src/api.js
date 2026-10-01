const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/posts';

async function handle(res) {
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.message || `Request failed (${res.status})`);
  }
  return res.json();
}

export const getPosts = () => fetch(API_URL).then(handle);

// FormData: do NOT set Content-Type — the browser adds the multipart boundary
export const createPost = (formData) => fetch(API_URL, { method: 'POST', body: formData }).then(handle);

export const deletePost = (id) => fetch(`${API_URL}/${id}`, { method: 'DELETE' }).then(handle);
