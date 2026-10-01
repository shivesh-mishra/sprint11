export default function PostList({ posts, onDelete }) {
  if (posts.length === 0) return <p>No posts yet.</p>;
  return (
    <div>
      {posts.map((p) => (
        <article key={p._id} className="card">
          {p.imageUrl && <img src={p.imageUrl} alt={p.title} />}
          <h3>{p.title}</h3>
          <p>{p.body}</p>
          <button className="danger" onClick={() => onDelete(p._id)}>Delete</button>
        </article>
      ))}
    </div>
  );
}
