import { usePosts } from '../context/postContext'

function HomePage() {

  const myContext = usePosts()
  console.log(myContext)

  return (
    <div>HomePage</div>
  )
}

export default HomePage