import { usePosts } from '../context/postContext'


import Masonry from 'react-masonry-css'
import { VscEmptyWindow } from 'react-icons/vsc'
import '../styles/post.css'
import ShowPost from '../components/posts/ShowPost';

function PostsPage() {
    const { posts } = usePosts()

    const breakpointColumnsObj = {
        default: 2,
        1100: 2,
        700: 2,
        600: 1
    };

    console.log(posts)

    return (
        <div style={{ padding: '10px' }}>
            {posts.length === 0 ? (
                <div className='d-flex justify-content-center align-items-center vh-100 flex-column'>
                    <VscEmptyWindow size={200} />
                    <h1>There are no posts yet</h1>
                </div>
            ) : (
                <Masonry
                    breakpointCols={breakpointColumnsObj}
                    className="my-masonry-grid"
                    columnClassName="my-masonry-grid_column"
                >
                    {posts.map((post) => (
                        <ShowPost key={post._id} post={post} />
                    ))}
                </Masonry>
            )}
        </div>
    )
}

export default PostsPage;
