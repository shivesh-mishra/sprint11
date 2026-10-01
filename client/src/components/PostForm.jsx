import { useState } from 'react';
export default function PostForm({ onSubmit }) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [image, setImage] = useState(null);
   const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

     const handleSubmit = async (e) => {
    e.preventDefault();
   const form = e.target;
    setSubmitting(true);
    setError('');
    try {
  const fd = new FormData();
      fd.append('title', title);
      fd.append('body', body);
      if (image) fd.append('image', image);
    await onSubmit(fd);
      setTitle(''); setBody(''); setImage(null);
      form.reset();
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);}
    


  }
  ;

  return (
    <form onSubmit={handleSubmit} className="card">
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required />
        <textarea value={body} onChange={(e) => setBody(e.target.value)} placeholder="Body" required />
     <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0] || null)} />
     {error && <p className="error">{error}</p>}
      <button disabled={submitting}>{submitting ? 'Uploading…' : 'Add post'}</button>
        </form>
  );
}
