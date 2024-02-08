import { useUser } from "../../context/userContext"
import { Box, Button, Container, TextField, Typography, Grid, Alert } from "@mui/material";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

function RegisterPage() {
  const { user, register: signup, loading } = useUser()
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const password = watch("password", "");

  const onSubmit = (data) => {
    signup(data);
  };

  useEffect(() => {
    if (user) navigate('/posts')
  }, [])

  useEffect(() => {
    if (user) navigate('/posts')
  }, [user])

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
          Registrarse
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
        <Typography component="h1" variant="h5" sx={{fontWeight: 'bold'}}>
          Registrarse
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                {...register('name')}
                label="Nombre"
                variant="outlined"
                margin="normal"
                required
                fullWidth
                sx={{ backgroundColor: '#FFFFFF', borderRadius: 1 }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                {...register('username')}
                label="Nombre de usuario"
                variant="outlined"
                margin="normal"
                required
                fullWidth
                sx={{ backgroundColor: '#FFFFFF', borderRadius: 1 }}
              />
            </Grid>
          </Grid>
          <TextField
            {...register('email')}
            label="Correo electrónico"
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
          <TextField
            {...register('confirmPassword', {
              validate: value =>
                value === password || "Las contraseñas no coinciden"
            })}
            label="Repetir contraseña"
            type="password"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            sx={{ backgroundColor: '#FFFFFF', borderRadius: 1 }}
          />
          {errors.confirmPassword && <Alert sx={{mb: 1}} variant="filled" severity="error">{errors.confirmPassword.message}</Alert>}

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mb: 2 }}
          >
            Registrarse
          </Button>
        </form>
      </Box>
    </Container>
  );
}

export default RegisterPage;
