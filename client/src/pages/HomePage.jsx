import { usePosts } from '../context/postContext'

function HomePage() {

  const { posts } = usePosts()

  return (
    <>
      <h1>Homepage</h1>
    </>
  )
}

export default HomePage