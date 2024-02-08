import { usePosts } from '../context/postContext'
import { Card, CardHeader, CardContent, CardMedia, CardActions, IconButton, Typography } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import Masonry from 'react-masonry-css'
import { VscEmptyWindow } from 'react-icons/vsc'
import '../styles/post.css'

function PostsPage() {
    const { posts } = usePosts()

    if (posts.length === 0) return (
        <div className='d-flex justify-content-center align-items-center vh-100 flex-column'>

            <VscEmptyWindow size={200} />
            <h1>There are no posts yet</h1>
        </div>
    )

    const breakpointColumnsObj = {
        default: 3,
        1100: 3,
        700: 2,
        500: 1
    };

    return (
        <div style={{ padding: '20px' }}>
            <Masonry
                breakpointCols={breakpointColumnsObj}
                className="my-masonry-grid"
                columnClassName="my-masonry-grid_column">
                {posts.map((post, index) => (
                    <div key={post._id}>
                        <Card sx={{ maxWidth: 345, marginBottom: 2 }}>
                            <CardHeader
                                title={post.title}
                            />
                            {post.image &&
                                <CardMedia
                                    component="img"
                                    height="194"
                                    image={post.image.url}
                                    alt={post.title}
                                />
                            }
                            <CardContent>
                                <Typography variant="body2" color="text.secondary">
                                    {post.description}
                                </Typography>
                            </CardContent>
                            <CardActions disableSpacing>
                                <IconButton aria-label="add to favorites">
                                    <FavoriteIcon />
                                </IconButton>
                                <IconButton aria-label="share">
                                    <ShareIcon />
                                </IconButton>
                            </CardActions>
                        </Card>
                    </div>
                ))}
            </Masonry>
        </div>
    )
}

export default PostsPage;
