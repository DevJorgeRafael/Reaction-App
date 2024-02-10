import { useUser } from "../../context/userContext"
import { Box, Button, Container, TextField, Typography, Grid, Alert, CircularProgress } from "@mui/material";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

function RegisterPage() {
  const navigate = useNavigate()
  const { user, register: signup, loading, isAuthenticated } = useUser()
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const password = watch("password", "");

  const onSubmit = async (data) => {
    await signup(data);
  };

  useEffect(() => {
    if (isAuthenticated) navigate('/posts');
  }, [])

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/posts');
    }
  }, [isAuthenticated]);

  if (loading) return (
    <Container component="main" maxWidth="xs" className='auth-container'>
      <Box
        sx={{
          marginTop: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <img src="/ReactiOn-logo.png" alt="Logo" width={100} />
        <Typography component="h1" variant="h5" sx={{ fontWeight: 'bold' }}>
          Sign Up
        </Typography>
        <CircularProgress />
      </Box>
    </Container>
  )

  return (
    <Box
      sx={{
        marginTop: 8,
        mx: {
          xs: 2,
          sm: 0
        }
      }}
    >
      <Container component="main" maxWidth="xs" className='auth-container' sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <img src="/ReactiOn-logo.png" alt="Logo" width={125} />
        <Typography component="h1" variant="h5" sx={{ fontWeight: 'bold' }}>
          Sign Up
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                {...register('name')}
                label="Name"
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
                label="Username"
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
            label="Email"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            sx={{ backgroundColor: '#FFFFFF', borderRadius: 1 }}
          />
          <TextField
            {...register('password')}
            label="Password"
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
            label="Confirm Password"
            type="password"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            sx={{ backgroundColor: '#FFFFFF', borderRadius: 1 }}
          />
          {errors.confirmPassword && <Alert sx={{ mb: 1 }} variant="filled" severity="error">{errors.confirmPassword.message}</Alert>}

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mb: 2 }}
          >
            Sign Up
          </Button>
        </form>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%', mb: 2 }}>
          <Link to='/login' variant="body2" sx={{ color: '#FFFFFF' }}>
            Already have an account? Sign In
          </Link>
        </Box>
      </Container>
    </Box>
  );
}

export default RegisterPage;
