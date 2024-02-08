import { usePosts } from '../context/postContext'

function HomePage() {

  const { posts } = usePosts()
  console.log(posts)

  if (posts.length === 0) return (
    <div>
      <h1>
        There are no posts yet
      </h1>
    </div>
  )

  return (
    <>
      <h1>Homepage</h1>

      {posts.map(post => (
        <div key={post._id}>
          <h3>{post.title}</h3>
          <p>{post.description}</p>
          {post.image && <img width={200} src={post.image.url} alt={post.title} />}
        </div>
      ))}
    </>
  )
}

export default HomePage