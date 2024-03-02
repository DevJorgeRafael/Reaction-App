import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../styles/authForms.css'
import { useForm } from 'react-hook-form';
import { Button, TextField, Container, Typography, Box, CircularProgress, Alert } from '@mui/material';
import { useUser } from '../../context/userContext';


function LoginPage() {
  const navigate = useNavigate()
  const { user, login, loading, isAuthenticated, errors: signInErrors } = useUser()
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    login(data);
  };

  useEffect(() => {
    if (user && isAuthenticated) navigate('/posts')
  }, [user, isAuthenticated])

  const ErrorMessage = ({ error }) => {
    return error && <Alert sx={{ mb: 1 }} variant="filled" severity="error">{error}</Alert>;
  };


  if (loading) return (
    <Container component="main" maxWidth="xs" className='auth-container'>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <img src="/ReactiOn-logo.png" alt="Logo" width={125} />
        <Typography component="h1" variant="h5" sx={{ fontWeight: 'bold' }}>
          Sign In
        </Typography>
        <CircularProgress />
      </Box>
    </Container>
  )

  return (
    <Box sx={{
      mt: -5,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      height: `calc(100vh - 74px)`,
      overflow: 'auto',
      mx: {
        xs: 2,
        sm: 0
      }
    }}
    >
      <Container component="main" maxWidth="xs" className='auth-container'>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <img src="/ReactiOn-logo.png" alt="Logo" width={125} />
          <Typography component="h1" variant="h5" sx={{ fontWeight: 'bold' }}>
            Sign In
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              {...register('email')}
              error={Boolean(errors.email || signInErrors.email)}
              label="Email"
              type='email'
              variant="outlined"
              margin="normal"
              required
              fullWidth
              sx={{ backgroundColor: '#FFFFFF', borderRadius: 1 }}
            />
            <ErrorMessage error={errors.email?.message || signInErrors.email} />

            <TextField
              {...register('password')}
              error={Boolean(errors.password || signInErrors.password)}
              label="Password"
              type="password"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              sx={{
                backgroundColor: '#FFFFFF',
                borderRadius: 1,

              }}
            />
            <ErrorMessage error={errors.password?.message || signInErrors.password} />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ my: 1 }}
            >
              Sign In
            </Button>
          </form>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%', mb: 2 }}>
            <Link to='/register' variant="body2" sx={{ color: '#FFFFFF' }}>
              Don't have an account? Sign Up
            </Link>
          </Box>

        </Box>
      </Container>
    </Box>
  );
}

export default LoginPage;
