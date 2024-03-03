import { useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

function HomePage() {
  const navigate = useNavigate()

  return (
    <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} alignItems="center" sx={{ height: 'calc(100vh - 74px)', paddingX: 1 }}>
      <Box display="flex" justifyContent="center" alignItems="center" sx={{ flexGrow: 0, mb: { xs: 2 } }}>
        <Box component="img" src="/ReactiOn.png" alt="ReactiOn logo" sx={{ height: { xs: '100px', sm: 'auto' }, width: { xs: '100px', sm: 'auto' }, objectFit: 'contain' }} />
      </Box>

      <Box display="flex" flexDirection="column" justifyContent="start" alignItems="center" sx={{ flexGrow: 1 }}>
        <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" sx={{ mb: 2, mt: {xs: 0, sm: -7} }}>
          <Typography variant="h4" color="initial">
            Join ReactiOn App today! Start sharing your first post with your friends.
          </Typography>

          <Button variant='contained' onClick={() => navigate('/register')} sx={{
            xs: {
              mt: 10
            }
          }}>
            Sign Up
          </Button>
        </Box>

        <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
          <Typography variant="body1" color="initial" sx={{
            mt: 3
          }}>
            Already have an account?
          </Typography>
          <Button variant='contained' onClick={() => navigate('/login')}>
            Sign In
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

export default HomePage
