import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/authForms.css'
import { useForm } from 'react-hook-form';
import { Button, TextField, Container, Typography, Box, CircularProgress } from '@mui/material';
import { useUser } from '../../context/userContext';


function LoginPage() {
  const navigate = useNavigate()
  const { user, login, loading } = useUser()
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    login(data);
  };

  useEffect(() => {
    if (user) navigate('/posts')
  }, [user])

  useEffect(() => {
    if (user) navigate('/posts')
  }, [])

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
          Iniciar Sesión
        </Typography>
        <CircularProgress />
      </Box>
    </Container>
  )

  return (
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
          Iniciar Sesión
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            {...register('email')}
            label="Correo electrónico"
            type='email'
            variant="outlined"
            margin="normal"
            required
            fullWidth
            sx={{ backgroundColor: '#FFFFFF', borderRadius: 1 }}
          />
          <TextField
            {...register('password')}
            label="Contraseña"
            type="password"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            sx={{ backgroundColor: '#FFFFFF', borderRadius: 1 }}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mb: 2 }}
          >
            Iniciar sesión
          </Button>
        </form>
      </Box>
    </Container>
  );
}

export default LoginPage;
